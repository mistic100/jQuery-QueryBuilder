/**
 * @class NotGroup
 * @memberof module:plugins
 * @description Adds a "Not" checkbox in front of group conditions.
 * @param {object} [options]
 * @param {string} [options.icon_checked='glyphicon glyphicon-checked']
 * @param {string} [options.icon_unchecked='glyphicon glyphicon-unchecked']
 */
QueryBuilder.define('not-group', function(options) {
    var self = this;

    // Bind events
    this.on('afterInit', function() {
        self.$el.on('click.queryBuilder', '[data-not=group]', function() {
            var $group = $(this).closest(QueryBuilder.selectors.group_container);
            var group = self.getModel($group);
            group.not = !group.not;
        });

        self.model.on('update', function(e, node, field) {
            if (node instanceof Group && field === 'not') {
                self.updateGroupNot(node);
            }
        });
    });

    // Init "not" property
    this.on('afterAddGroup', function(e, group) {
        group.__.not = false;
    });

    // Modify templates
    if (!options.disable_template) {
        this.on('getGroupTemplate.filter', function(h) {
            var $h = $($.parseHTML(h.value));
            $h.find(QueryBuilder.selectors.condition_container).prepend(
                '<button type="button" class="btn btn-xs btn-default" data-not="group">' +
                '<i class="' + options.icon_unchecked + '"></i> ' + self.translate('NOT') +
                '</button>'
            );
            h.value = $h.prop('outerHTML');
        });
    }

    // Export "not" to JSON
    this.on('groupToJson.filter', function(e, group) {
        e.value.not = group.not;
    });

    // Read "not" from JSON
    this.on('jsonToGroup.filter', function(e, json) {
        e.value.not = !!json.not;
    });

    // Export "not" to SQL
    this.on('groupToSQL.filter', function(e, group) {
        if (group.not) {
            e.value = 'NOT ( ' + e.value + ' )';
        }
    });

    // Parse "NOT" function from sqlparser
    this.on('parseSQLNode.filter', function(e) {
        if (e.value.name && e.value.name.toUpperCase() == 'NOT') {
            e.value = e.value.arguments.value[0];

            // if the there is no sub-group, create one
            if (['AND', 'OR'].indexOf(e.value.operation.toUpperCase()) === -1) {
                e.value = new SQLParser.nodes.Op(
                    self.settings.default_condition,
                    e.value,
                    null
                );
            }

            e.value.not = true;
        }
    });

    // Request to create sub-group if the "not" flag is set
    this.on('sqlGroupsDistinct.filter', function(e, group, data, i) {
        if (data.not && i > 0) {
            e.value = true;
        }
    });

    // Read "not" from parsed SQL
    this.on('sqlToGroup.filter', function(e, data) {
        e.value.not = !!data.not;
    });

    // Export "not" to Mongo
    this.on('groupToMongo.filter', function(e, group) {
        var key = '$' + group.condition.toLowerCase();
        if (group.not && e.value[key]) {
            e.value = { '$nor': [e.value] };
        }
    });

    // Parse "$nor" operator from Mongo
    this.on('parseMongoNode.filter', function(e) {
        var keys = Object.keys(e.value);

        if (keys[0] == '$nor') {
            e.value = e.value[keys[0]][0];
            e.value.not = true;
        }
    });

    // Read "not" from parsed Mongo
    this.on('mongoToGroup.filter', function(e, data) {
        e.value.not = !!data.not;
    });
}, {
    icon_unchecked: 'glyphicon glyphicon-unchecked',
    icon_checked: 'glyphicon glyphicon-check',
    disable_template: false
});

/**
 * From {@link module:plugins.NotGroup}
 * @name not
 * @member {boolean}
 * @memberof Group
 * @instance
 */
Utils.defineModelProperties(Group, ['not']);

QueryBuilder.selectors.group_not = QueryBuilder.selectors.group_header + ' [data-not=group]';

QueryBuilder.extend(/** @lends module:plugins.NotGroup.prototype */ {
    /**
     * Performs actions when a group's not changes
     * @param {Group} group
     * @fires module:plugins.NotGroup.afterUpdateGroupNot
     * @private
     */
    updateGroupNot: function(group) {
        var options = this.plugins['not-group'];
        group.$el.find('>' + QueryBuilder.selectors.group_not)
            .toggleClass('active', group.not)
            .find('i').attr('class', group.not ? options.icon_checked : options.icon_unchecked);

        /**
         * After the group's not flag has been modified
         * @event afterUpdateGroupNot
         * @memberof module:plugins.NotGroup
         * @param {Group} group
         */
        this.trigger('afterUpdateGroupNot', group);

        this.trigger('rulesChanged');
    }
});
