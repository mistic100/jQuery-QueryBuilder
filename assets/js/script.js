$(function() {
  // build side menu
  var html = '';

  $('.bs-docs-section').each(function() {
    var h1 = $(this).find('h1[id]').first(),
      h23 = $(this).find('h2[id], h3[id]:not([data-no-menu])');

    if (h1.length) {
      html += '<li><a href="#' + h1[0].id + '">' + h1.clone().children().remove().end().text() + '</a>';

      if (h23.length) {
        html += '<ul class="nav">';
        h23.each(function() {
          html += '<li><a href="#' + this.id + '">' + $(this).clone().children().remove().end().text() + '</a></li>';
        });
        html += '</ul>';
      }

      html += '</li>';
    }
  });

  if (html == '') {
    $('[role=complementary]').hide();
    $('[role=main]').toggleClass('col-md-9 col-md-12');
  }
  else {
    $('.bs-docs-sidenav').html(html);
  }

  // add heading anchors
  $('h1[id], h2[id], h3[id], h4[id], h5[id]').each(function() {
    $(this).prepend('<a href="#' + this.id + '" class="anchor-link">§</i>');
  });

  // enable bootbox
  $('[data-bootbox]').on('click', function() {
    var $target = $('#' + $(this).data('bootbox'));
    bootbox.alert({
      title: $target.attr('title'),
      message: $target.html(),
      size: $(this).data('bootbox-size')
    });
  });
});

function trianglify(color1, color2, seed) {
  var header = $('#content');
  var pattern = Trianglify({
    width: window.screen.width | header.outerWidth(),
    height: header.outerHeight(),
    cell_size: 90,
    seed: seed,
    x_colors: [color1, color2]
  });

  header.css('background-image', 'url(' + pattern.png() + ')');
}
