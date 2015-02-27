/*!
 * jQuery QueryBuilder MongoDB Support
 * Copyright 2014-2015 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

(function($){

    // DEFAULT CONFIG
    // ===============================
    $.fn.queryBuilder.defaults.set({
        mongoOperators: {
            equal:            function(v){ return v[0]; },
            not_equal:        function(v){ return {'$ne': v[0]}; },
            in:               function(v){ return {'$in': v}; },
            not_in:           function(v){ return {'$nin': v}; },
            less:             function(v){ return {'$lt': v[0]}; },
            less_or_equal:    function(v){ return {'$lte': v[0]}; },
            greater:          function(v){ return {'$gt': v[0]}; },
            greater_or_equal: function(v){ return {'$gte': v[0]}; },
            between:          function(v){ return {'$gte': v[0], '$lte': v[1]}; },
            begins_with:      function(v){ return {'$regex': '^' + escapeRegExp(v[0])}; },
            not_begins_with:  function(v){ return {'$regex': '^(?!' + escapeRegExp(v[0]) + ')'}; },
            contains:         function(v){ return {'$regex': escapeRegExp(v[0])}; },
            not_contains:     function(v){ return {'$regex': '^((?!' + escapeRegExp(v[0]) + ').)*$', '$options': 's'}; },
            ends_with:        function(v){ return {'$regex': escapeRegExp(v[0]) + '$'}; },
            not_ends_with:    function(v){ return {'$regex': '(?<!' + escapeRegExp(v[0]) + ')$'}; },
            is_empty:         function(v){ return ''; },
            is_not_empty:     function(v){ return {'$ne': ''}; },
            is_null:          function(v){ return null; },
            is_not_null:      function(v){ return {'$ne': null}; }
        },

        mongoRuleOperators: {
            $ne: function(v) {
                v=v.$ne;
                var obj={'val':v};
                if (v===null) { obj.op='is_not_null'; }
                else if (v==='') { obj.op='is_not_empty'; obj.val=null; }
                else { obj.op='not_equal'; }
                return obj;
            },
            $regex: function(v) {
                v=v.$regex;
                var obj={};
                if (v.substring(0,4) === '^(?!' &&
                    v.indexOf(')', v.length - 1) !== -1) {
                    obj.op='not_begins_with';
                    obj.val=v.substring(4,v.length-1);
                }
                else if (v.substring(0,5) === '^((?!' &&
                    v.indexOf(').)*$', v.length - 5) !== -1) {
                    obj.op='not_contains';
                    obj.val=v.substring(5,v.length-5);
                }
                else if (v.substring(0,4) === '(?<!' &&
                    v.indexOf(')$', v.length - 2) !== -1) {
                    obj.op='not_ends_with';
                    obj.val= v.substring(4,v.length-2);
                }
                else if (v.indexOf('$', v.length - 1) !== -1) {
                    obj.op='ends_with';
                    obj.val= v.slice(0,-1);
                }
                else if (v.substring(0,1) === '^') {
                    obj.op='begins_with';
                    obj.val= v.substring(1);
                }
                else {
                    obj.op='contains';
                    obj.val=v;
                }
                return obj;
            },
            between : function(v) { var obj={'val':[v.$gte, v.$lte],'op':'between'}; return obj; },
            $in : function(v) { var obj={'val': v.$in,'op':'in'}; return obj; },
            $nin : function(v) { var obj={'val': v.$nin,'op':'not_in'}; return obj; },
            $lt : function(v) { var obj={'val': v.$lt,'op':'less'}; return obj; },
            $lte : function(v) { var obj={'val': v.$lte,'op':'less_or_equal'}; return obj; },
            $gt : function(v) { var obj={'val': v.$gt,'op':'greater'}; return obj; },
            $gte : function(v) { var obj={'val': v.$gte,'op':'greater_or_equal'}; return obj; }
        }
    });


    // PUBLIC METHODS
    // ===============================
    $.fn.queryBuilder.extend({
        /**
         * Get rules as MongoDB query
         * @param data {object} (optional) rules
         * @return {object}
         */
        getMongo: function(data) {
            data = (data===undefined) ? this.getRules() : data;

            var that = this;

            return (function parse(data) {
                if (!data.condition) {
                    data.condition = that.settings.default_condition;
                }
                if (['AND', 'OR'].indexOf(data.condition.toUpperCase()) === -1) {
                    $.error('Unable to build MongoDB query with '+ data.condition +' condition');
                }

                if (!data.rules) {
                    return {};
                }

                var parts = [];

                $.each(data.rules, function(i, rule) {
                    if (rule.rules && rule.rules.length>0) {
                        parts.push(parse(rule));
                    }
                    else {
                        var mdb = that.settings.mongoOperators[rule.operator],
                            ope = that.getOperatorByType(rule.operator),
                            values = [];

                        if (mdb === undefined) {
                            $.error('MongoDB operation unknown for operator '+ rule.operator);
                        }

                        if (ope.accept_values) {
                            if (!(rule.value instanceof Array)) {
                                rule.value = [rule.value];
                            }

                            rule.value.forEach(function(v, i) {
                                values.push(changeType(v, rule.type, 'mongo'));
                            });
                        }

                        var part = {};
                        part[rule.field] = mdb.call(that, values);
                        parts.push(part);
                    }
                });

                var res = {};
                if (parts.length > 0) {
                    res[ '$'+data.condition.toLowerCase() ] = parts;
                }
                return res;
            }(data));
        },

        /**
         * Get rules from MongoDB query
         * @param data {object} (required) mongo query object
         * @return {object}
         */
        getRulesFromMongo: function(data) {
            if (data === undefined || data === null) {
                return null;
            }
            var condition='';
            var conditions=['$and','$or'];

            var that = this;

            return (function parse(data,condition) {
                var topKeys = Object.keys(data);

                if (topKeys.length > 1) {
                    $.error('Invalid MongoDB query format.');
                }
                if (conditions.indexOf(topKeys[0].toLowerCase()) === -1) {
                    $.error('Unable to build Rule from MongoDB query with '+ topKeys[0] +' condition');
                }
                condition = topKeys[0] === conditions[0] ? 'AND' : 'OR';

                var rules = data[topKeys[0]];
                var parts = [];

                $.each(rules, function(i, rule) {
                    var keys = Object.keys(rule);

                    if (conditions.indexOf(keys[0].toLowerCase()) !== -1) {
                        parts.push(parse(rule));
                    }
                    else {
                        var part = {};
                        var field = Object.keys(rule)[0];
                        var value = rule[field];
                        part.id = field;

                        if (value !== null && typeof value === 'object') {
                            var subkeys = Object.keys(value);
                            var operator;
                            if (subkeys.length === 1) {
                                operator = subkeys[0];
                            }
                            else {
                                if ((subkeys[0] === '$gte' && subkeys[1] === '$lte') ||
                                    (subkeys[0] === '$lte' && subkeys[1] === '$gte')) {
                                    operator = 'between';
                                }
                                else if ((subkeys[0] === '$regex' && subkeys[1] === '$options') ||
                                    (subkeys[0] === '$options' && subkeys[1] === '$regex')) {
                                    operator = '$regex';
                                }
                                else {
                                    $.error('Invalid MongoDB query format.');
                                }
                            }
                            var mdbrl = that.settings.mongoRuleOperators[operator];
                            if (mdbrl === undefined) {
                                $.error('JSON Rule operation unknown for operator '+ operator);
                            }
                            var opVal = mdbrl.call(that,value);
                            part.operator = opVal.op;
                            part.value = opVal.val;
                        }
                        else if (value === null) {
                            part.operator = 'is_null';
                            part.value = null;
                        }
                        else {
                            part.operator = 'equal';
                            part.value = value;
                            if (value === '') {
                                part.operator = 'is_empty';
                                part.value = null;
                            }
                        }
                        parts.push(part);
                    }
                });

                var res = {};
                if (parts.length > 0) {
                    res.condition = condition;
                    res.rules = parts;
                }
                return res;
            }(data,condition));
        }
    });


    // UTILITIES
    // ===============================
    /**
     * Change type of a value to int, float or boolean
     * @param value {mixed}
     * @param type {string}
     * @return {mixed}
     */
    function changeType(value, type, db) {
        switch (type) {
            case 'integer': return parseInt(value);
            case 'double': return parseFloat(value);
            case 'boolean':
                var bool = value.trim().toLowerCase() === "true" || value.trim() === '1' || value === 1;
                if (db === 'sql') {
                    return bool ? 1 : 0;
                }
                else if (db === 'mongo') {
                    return bool;
                }
                break;
            default: return value;
        }
    }

    /**
     * Escape value for use in regex
     * @param value {string}
     * @return {string}
     */
    function escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }

}(jQuery));