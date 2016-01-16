$.fn.queryBuilder = function(option) {
    if (this.length > 1) {
        Utils.error('Config', 'Unable to initialize on multiple target');
    }

    var data = this.data('queryBuilder');
    var options = (typeof option == 'object' && option) || {};

    if (!data && option == 'destroy') {
        return this;
    }
    if (!data) {
        this.data('queryBuilder', new QueryBuilder(this, options));
    }
    if (typeof option == 'string') {
        return data[option].apply(data, Array.prototype.slice.call(arguments, 1));
    }

    return this;
};

$.fn.queryBuilder.constructor = QueryBuilder;
$.fn.queryBuilder.defaults = QueryBuilder.defaults;
$.fn.queryBuilder.extend = QueryBuilder.extend;
$.fn.queryBuilder.define = QueryBuilder.define;
$.fn.queryBuilder.regional = QueryBuilder.regional;
