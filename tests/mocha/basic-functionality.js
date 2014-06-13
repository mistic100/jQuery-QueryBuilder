// globals: $
describe("QueryBuilder (Basic API)", function () {


  it("can set a different language interface", function (done) {
    expect($.fn.queryBuilder.defaults.get().lang.delete_group).to.eql('Delete');

    var original = $.fn.queryBuilder.defaults.get();

    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '../../src/i18n/fr.js';

    var checkit = function () {
      expect($.fn.queryBuilder.defaults.get().lang.delete_group).to.eql('Supprimer');
      $.fn.queryBuilder.defaults.set(original);
      expect($.fn.queryBuilder.defaults.get().lang.delete_group).to.eql('Delete');
      done();
    };

    script.onreadystatechange = function () {
      if (this.readyState == 'complete') checkit();
    };
    script.onload= checkit;

    head.appendChild(script);

  });
});