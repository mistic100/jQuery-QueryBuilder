var jekyllBootstrapDoc = {
  buildSideMenu: function() {
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
      $('[role=main]').removeClass('col-md-9').addClass('col-md-12');
    }
    else {
      $('[role=complementary]').show();
      $('[role=main]').removeClass('col-md-12').addClass('col-md-9');
      $('.bs-docs-sidenav').html(html);
    }
  },

  addHeadingAnchors: function() {
    $('h1[id], h2[id], h3[id], h4[id], h5[id]').each(function() {
      if ($(this).children('.anchor-link').length === 0) {
        $(this).prepend('<a href="#' + this.id + '" class="anchor-link">§</i>');
      }
    });
  },

  enableBootbox: function() {
    $('[data-bootbox]').off('click').on('click', function() {
      var $target = $('#' + $(this).data('bootbox'));
      bootbox.alert({
        title: $target.attr('title'),
        message: $target.html(),
        size: $(this).data('bootbox-size')
      });
    });
  },

  trianglify: function(color1, color2, seed) {
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
};

$(function() {
  jekyllBootstrapDoc.buildSideMenu();
  jekyllBootstrapDoc.addHeadingAnchors();
  jekyllBootstrapDoc.enableBootbox();
});
