/**
 * @class BtCheckbox
 * @memberof module:plugins
 * @description Applies Awesome Bootstrap Checkbox for checkbox and radio inputs.
 * @param {object} [options]
 * @param {string} [options.font='glyphicons']
 * @param {string} [options.color='default']
 */
QueryBuilder.define('bt-checkbox', function(options) {
    if (options.font == 'glyphicons') {
        this.$el.addClass('bt-checkbox-glyphicons');
    }

    this.on('getRuleInput.filter', function(h, rule, name) {
        var filter = rule.filter;

        if ((filter.input === 'radio' || filter.input === 'checkbox') && !filter.plugin) {
            h.value = '';

            if (!filter.colors) {
                filter.colors = {};
            }
            if (filter.color) {
                filter.colors._def_ = filter.color;
            }

            var style = filter.vertical ? ' style="display:block"' : '';
            var i = 0;

            Utils.iterateOptions(filter.values, function(key, val) {
                var color = filter.colors[key] || filter.colors._def_ || options.color;
                var id = name + '_' + (i++);

                h.value+= '\
<div' + style + ' class="' + filter.input + ' ' + filter.input + '-' + color + '"> \
  <input type="' + filter.input + '" name="' + name + '" id="' + id + '" value="' + key + '"> \
  <label for="' + id + '">' + val + '</label> \
</div>';
            });
        }
    });
}, {
    font: 'glyphicons',
    color: 'default'
});
