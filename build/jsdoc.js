(function() {
    var header = $('.page-header');
    var pattern = Trianglify({
        width: window.screen.width | header.outerWidth(),
        height: header.outerHeight(),
        cell_size: 90,
        seed: 'jQuery QueryBuilder',
        x_colors: ['#0074d9', '#001224']
    });

    header.css('background-image', 'url(' + pattern.png() + ')');
}());
