(function() {
  /**
   * Fetch releases from github with a cache of 1 hour
   * @returns {promise<object[]>}
   */
  function fetchReleases() {
    var cacheDate = localStorage.releasesCacheDate;

    if (cacheDate && (new Date() - new Date(cacheDate)) < 1000 * 3600) {
      return $.when(JSON.parse(localStorage.releasesCache));
    }
    else {
      return $.getJSON(releasesAPI)
        .then(function(data) {
          localStorage.releasesCacheDate = new Date().toString();
          localStorage.releasesCache = JSON.stringify(data);
          return data;
        });
    }
  }

  /**
   * Adds a release to #releases
   * @param {object} release
   */
  function appendRelease(release) {
    // Format date
    var date = moment(release.published_at).format('LL');

    // Convert markdown to html
    var desc = marked(release.body, { breaks: true });

    // Remove some escaping done by marked.js
    desc = desc.replace(/&quot;/g, '"').replace(/&#39;/g, "'");

    // Add links to issues
    desc = desc.replace(/(#([0-9]+))/g, '<a href="' + issuesBase + '$2">$1</a>');

    // Exclude headers from side menu
    desc = desc.replace(/(<h[2-5])/g, '$1 data-no-menu');

    // Build dom
    $('#releases').append(
      $('<section>')
        .addClass('bs-docs-section')
        .append(
          $('<h1>')
            .addClass('page-header')
            .attr('id', release.id)
            .text(release.name)
            .append(
              $('<small>')
                .text(date),
              $('<a>')
                .addClass('release-date')
                .attr('href', release.html_url)
                .append(
                  $('<i>').addClass('glyphicon glyphicon-tag')
                )
            ),
          $('<article>').html(desc)
        )
    );
  }

  fetchReleases()
    .then(function(releases) {
      $('#spinner').remove();

      releases.forEach(function(release) {
        appendRelease(release);
      });

      if (jekyllBootstrapDoc) {
        jekyllBootstrapDoc.buildSideMenu();
        jekyllBootstrapDoc.addHeadingAnchors();
      }

      if (window.location.hash && $(window.location.hash).length) {
        $(window.location.hash)[0].scrollIntoView();
      }
    });
}());
