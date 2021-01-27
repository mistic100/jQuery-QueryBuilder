/**
 * Sync load of language file once QUnit and Blanket are ready
 * Otherwise the language file is loaded before instrumented files
 */
QUnit.begin(function() {
    $.ajax({
        async: false,
        url: '../dist/i18n/query-builder.en.js',
        dataType: 'script'
    });
});

/**
 * Add GitHub link in header
 */
QUnit.begin(function(){
    $('#qunit-header').append(
        '<div class="pull-right" style="margin:-5px 10px 0 0">' +
            '<a href="https://github.com/mistic100/jQuery-QueryBuilder">' +
    '<img src="https://assets.github.com/images/icons/emoji/octocat.png" width=32px height=32px>' +
            '</a>' +
        '</div>'
    );
});

/**
 * Modify Blanket results display
 */
QUnit.done(function(){
    $('#blanket-main')
        .css('marginTop', '10px')
        .addClass('col-lg-8 col-lg-push-2')
        .find('.bl-file a').each(function(){
            this.innerHTML = this.innerHTML.replace(/(.*)\/src\/(.*)$/, '$2');
        });
});


/**
 * Custom assert to compare rules objects
 */
QUnit.assert.rulesMatch = function(actual, expected, message) {
    var ok = (function match(a, b){
        var ok = true;

        if (a.hasOwnProperty('valid') && b.hasOwnProperty('valid')) {
            ok = QUnit.equiv(a.valid, b.valid);
        }

        if (b.hasOwnProperty('data')) {
            if (!a.hasOwnProperty('data')) {
                ok = false;
            }
            else {
                ok = QUnit.equiv(a.data, b.data);
            }
        }

        if (b.hasOwnProperty('flags')) {
            if (!a.hasOwnProperty('flags')) {
                ok = false;
            }
            else {
                ok = QUnit.equiv(a.flags, b.flags);
            }
        }

        if (b.hasOwnProperty('rules')) {
            if (!a.hasOwnProperty('rules')) {
                ok = false;
            }
            else {
                for (var i=0, l=a.rules.length; i<l; i++) {
                    if (b.rules[i]===undefined || !match(a.rules[i], b.rules[i])) {
                        ok = false;
                        break;
                    }
                }

                for (var i=0, l=b.rules.length; i<l; i++) {
                    if (a.rules[i]===undefined || !match(a.rules[i], b.rules[i])) {
                        ok = false;
                        break;
                    }
                }
            }

            ok&= a.condition == b.condition;
        }
        else if (a.hasOwnProperty('rules') && !b.hasOwnProperty('rules')) {
            ok = false;
        }
        else {
            if ($.isArray(a.value)) {
                ok&= $(a.value).not(b.value).length == 0 && $(b.value).not(a.value).length == 0;
            }
            else {
                ok&= a.value==b.value;
            }

            ok&= a.id==b.id && a.operator==b.operator;
        }

        return ok;
    }(actual, expected));

    this.pushResult({
        result: ok,
        actual: actual,
        expected: expected,
        message: message
    });
};

/**
 * Custom assert for init errors
 */
QUnit.assert.initError = function($b, options, error) {
    this.throws(
        function() { $b.queryBuilder(options); },
        error,
        'Should throw "' + error + '" error'
    );
};

/**
 * Custom assert for validation errors
 */
QUnit.assert.validationError = function($b, rule, code) {
    if (rule !== null) {
        $b.queryBuilder('setRules', {
            rules: [rule]
        });
    }

    $b.on('validationError.queryBuilder', function(e, node, error) {
        throw error[0];
    });

    this.throws(
        function() { $b.queryBuilder('validate'); },
        code,
        'Should throw "' + code + '" error'
    );

    $b.off('validationError.queryBuilder');
};

/**
 * Custom assert to test option or inputs list (in order)
 */
QUnit.assert.optionsMatch = function($target, expected, message) {
    var options = [];

    $target.each(function(){
        options.push($(this).val());
    });

    this.deepEqual(options, expected, message);
};

/**
 * Custom assert to test a regex
 */
QUnit.assert.match = function(actual, regex, message) {
    this.pushResult({
        result: regex.test(actual),
        actual: actual,
        expected: regex,
        message: message
    });
};


/**
 * Drag & Drop simulation
 * https://gist.github.com/mistic100/37c95fab77b5626c5623
 */
(function($) {
    $.fn.simulateDragDrop = function(options) {
        return this.each(function() {
            new $.simulateDragDrop(this, options);
        });
    };

    $.simulateDragDrop = function(elem, options) {
        var that = this;

        this.options = options;
        this.elem = elem;

        if (this.options.start) {
            this.options.start.call(this.elem);
        }

        setTimeout(function() {
            that.dragstart();
        }, this.options.dragStartDelay || 0);
    };

    $.extend($.simulateDragDrop.prototype, {
        dragstart: function() {
            var that = this;

            var event = this.createEvent('dragstart');
            this.dispatchEvent(this.elem, 'dragstart', event);

            setTimeout(function() {
                that.drop(event);
            }, this.options.dropDelay || 0);
        },
        drop: function(event) {
            var that = this;

            var dropEvent = this.createEvent('drop');
            dropEvent.dataTransfer = event.dataTransfer;
            this.dispatchEvent($(this.options.dropTarget)[0], 'drop', dropEvent);

            setTimeout(function() {
                that.dragend(event);
            }, this.options.dragEndDelay || 0);
        },
        dragend: function(event) {
            var dragEndEvent = this.createEvent('dragend');
            dragEndEvent.dataTransfer = event.dataTransfer;
            this.dispatchEvent(this.elem, 'dragend', dragEndEvent);

            if (this.options.done) {
                this.options.done.call(this.elem);
            }
        },
        createEvent: function(type) {
            var event = document.createEvent('CustomEvent');
            event.initCustomEvent(type, true, true, null);
            event.dataTransfer = {
                data: {},
                setData: function(type, val) {
                    this.data[type] = val;
                },
                getData: function(type) {
                    return this.data[type];
                }
            };
            return event;
        },
        dispatchEvent: function(elem, type, event) {
            if (elem.dispatchEvent) {
                elem.dispatchEvent(event);
            }
            else if (elem.fireEvent) {
                elem.fireEvent('on' + type, event);
            }
        }
    });
})(jQuery);


var basic_filters = [{
    id: 'name',
    label: 'Name',
    type: 'string',
    value_separator: ','
}, {
    id: 'category',
    label: 'Category',
    type: 'string',
    input: 'select',
    multiple: true,
    values: {
        'bk': 'Books',
        'mo': 'Movies',
        'mu': 'Music',
        'to': 'Tools',
        'go': 'Goodies',
        'cl': 'Clothes'
    },
    operators: ['in', 'not_in', 'equal', 'not_equal', 'is_null', 'is_not_null']
}, {
    id: 'in_stock',
    label: 'In stock',
    type: 'integer',
    input: 'radio',
    values: {
        1: 'Yes',
        0: 'No'
    },
    operators: ['equal']
}, {
    id: 'price',
    label: 'Price',
    type: 'double',
    validation: {
        min: 0,
        step: 0.01
    },
    description: 'Lorem ipsum sit amet'
}, {
    id: 'id',
    label: 'Identifier',
    type: 'string',
    placeholder: '____-____-____',
    operators: ['equal', 'not_equal'],
    validation: {
        format: /^.{4}-.{4}-.{4}$/,
        messages: {
            format: 'Custom format error message'
        }
    }
}, {
    id: 'age',
    label: 'Age',
    type: 'integer',
    input: 'text',
    value_separator: '|',
    default_operator: 'in'
}];

var basic_rules = {
    condition: 'AND',
    rules: [{
        id: 'price',
        field: 'price',
        operator: 'less',
        value: 10.25
    }, {
        id: 'name',
        field: 'name',
        operator: 'is_null',
        value: null
    }, {
        condition: 'OR',
        rules: [{
            id: 'category',
            field: 'category',
            operator: 'in',
            value: ['mo', 'mu']
        }, {
            id: 'id',
            field: 'id',
            operator: 'not_equal',
            value: '1234-azer-5678'
        }]
    }]
};
