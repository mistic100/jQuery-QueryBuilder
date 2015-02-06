/*jshint multistr:true */

/**
 * Returns group HTML
 * @param group_id {string}
 * @param level {int}
 * @return {string}
 */
QueryBuilder.prototype.getGroupTemplate = function(group_id, level) {
    var h = '\
<dl id="'+ group_id +'" class="rules-group-container"> \
  <dt class="rules-group-header"> \
    <div class="btn-group pull-right group-actions"> \
      <button type="button" class="btn btn-xs btn-success" data-add="rule"> \
        <i class="' + this.icons.add_rule + '"></i> '+ this.lang.add_rule +' \
      </button> \
      '+ (this.settings.allow_groups===-1 || this.settings.allow_groups>=level ?
        '<button type="button" class="btn btn-xs btn-success" data-add="group"> \
          <i class="' + this.icons.add_group + '"></i> '+ this.lang.add_group +' \
        </button>'
      :'') +' \
      '+ (level>1 ? 
        '<button type="button" class="btn btn-xs btn-danger" data-delete="group"> \
          <i class="' + this.icons.remove_group + '"></i> '+ this.lang.delete_group +' \
        </button>'
      : '') +' \
    </div> \
    <div class="btn-group group-conditions"> \
      '+ this.getGroupConditions(group_id) +' \
    </div> \
    '+ (this.settings.display_errors ?
      '<div class="error-container"><i class="' + this.icons.error + '"></i></div>'
    :'') +'\
  </dt> \
  <dd class=rules-group-body> \
    <ul class=rules-list></ul> \
  </dd> \
</dl>';

    return this.change('getGroupTemplate', h, level);
};

/**
 * Returns group conditions HTML
 * @param group_id {string}
 * @return {string}
 */
QueryBuilder.prototype.getGroupConditions = function(group_id) {
    var h = '';

    for (var i=0, l=this.settings.conditions.length; i<l; i++) {
        var cond = this.settings.conditions[i],
            active = cond == this.settings.default_condition,
            label = this.lang['condition_'+ cond.toLowerCase()] || cond;

        h+= '\
        <label class="btn btn-xs btn-primary '+ (active?'active':'') +'"> \
          <input type="radio" name="'+ group_id +'_cond" value="'+ cond +'" '+ (active?'checked':'') +'> '+ label +' \
        </label>';
    }

    return this.change('getGroupConditions', h);
};

/**
 * Returns rule HTML
 * @param rule_id {string}
 * @return {string}
 */
QueryBuilder.prototype.getRuleTemplate = function(rule_id) {
    var h = '\
<li id="'+ rule_id +'" class="rule-container"> \
  <div class="rule-header"> \
  <div class="btn-group pull-right rule-actions"> \
    <button type="button" class="btn btn-xs btn-danger" data-delete="rule"> \
      <i class="' + this.icons.remove_rule + '"></i> '+ this.lang.delete_rule +' \
    </button> \
  </div> \
  </div> \
  '+ (this.settings.display_errors ?
    '<div class="error-container"><i class="' + this.icons.error + '"></i></div>'
  :'') +'\
  <div class="rule-filter-container"></div> \
  <div class="rule-operator-container"></div> \
  <div class="rule-value-container"></div> \
</li>';

    return this.change('getRuleTemplate', h);
};

/**
 * Returns rule filter <select> HTML
 * @param rule_id {string}
 * @return {string}
 */
QueryBuilder.prototype.getRuleFilterSelect = function(rule_id) {
    var optgroup = null;

    var h = '<select name="'+ rule_id +'_filter">';
    h+= '<option value="-1">'+ this.lang.filter_select_placeholder +'</option>';

    $.each(this.filters, function(i, filter) {
        if (optgroup != filter.optgroup) {
            if (optgroup !== null) h+= '</optgroup>';
            optgroup = filter.optgroup;
            if (optgroup !== null) h+= '<optgroup label="'+ optgroup +'">';
        }

        h+= '<option value="'+ filter.id +'">'+ filter.label +'</option>';
    });

    if (optgroup !== null) h+= '</optgroup>';
    h+= '</select>';

    return this.change('getRuleFilterSelect', h);
};

/**
 * Returns rule operator <select> HTML
 * @param rule_id {string}
 * @param operators {object}
 * @return {string}
 */
QueryBuilder.prototype.getRuleOperatorSelect = function(rule_id, operators) {
    var h = '<select name="'+ rule_id +'_operator">';

    for (var i=0, l=operators.length; i<l; i++) {
        var label = this.lang.operators[operators[i].type] || operators[i].type;
        h+= '<option value="'+ operators[i].type +'">'+ label +'</option>';
    }

    h+= '</select>';

    return this.change('getRuleOperatorSelect', h);
};

/**
 * Return the rule value HTML
 * @param $rule {jQuery}
 * @param filter {object}
 * @param value_id {int}
 * @return {string}
 */
QueryBuilder.prototype.getRuleInput = function($rule, filter, value_id) {
    var validation = filter.validation || {},
        name = $rule[0].id +'_value_'+ value_id,
        h = '', c;

    if (typeof filter.input === 'function') {
        h = filter.input.call(this, $rule, filter, name);
    }
    else {
        switch (filter.input) {
            case 'radio':
                c = filter.vertical ? ' class=block' : '';
                iterateOptions(filter.values, function(key, val) {
                    h+= '<label'+ c +'><input type="radio" name="'+ name +'" value="'+ key +'"> '+ val +'</label> ';
                });
                break;

            case 'checkbox':
                c = filter.vertical ? ' class=block' : '';
                iterateOptions(filter.values, function(key, val) {
                    h+= '<label'+ c +'><input type="checkbox" name="'+ name +'" value="'+ key +'"> '+ val +'</label> ';
                });
                break;

            case 'select':
                h+= '<select name="'+ name +'"'+ (filter.multiple ? ' multiple' : '') +'>';
                iterateOptions(filter.values, function(key, val) {
                    h+= '<option value="'+ key +'"> '+ val +'</option> ';
                });
                h+= '</select>';
                break;

            case 'textarea':
                h+= '<textarea name="'+ name +'"';
                if (filter.size) h+= ' cols="'+ filter.size +'"';
                if (filter.rows) h+= ' rows="'+ filter.rows +'"';
                if (validation.min !== undefined) h+= ' minlength="'+ validation.min +'"';
                if (validation.max !== undefined) h+= ' maxlength="'+ validation.max +'"';
                if (filter.placeholder) h+= ' placeholder="'+ filter.placeholder +'"';
                h+= '></textarea>';
                break;

            default:
                switch (filter.internalType) {
                    case 'number':
                        h+= '<input type="number" name="'+ name +'"';
                        if (validation.step !== undefined) h+= ' step="'+ validation.step +'"';
                        if (validation.min !== undefined) h+= ' min="'+ validation.min +'"';
                        if (validation.max !== undefined) h+= ' max="'+ validation.max +'"';
                        if (filter.placeholder) h+= ' placeholder="'+ filter.placeholder +'"';
                        if (filter.size) h+= ' size="'+ filter.size +'"';
                        h+= '>';
                        break;

                    default:
                        h+= '<input type="text" name="'+ name +'"';
                        if (filter.placeholder) h+= ' placeholder="'+ filter.placeholder +'"';
                        if (filter.type === 'string' && validation.min !== undefined) h+= ' minlength="'+ validation.min +'"';
                        if (filter.type === 'string' && validation.max !== undefined) h+= ' maxlength="'+ validation.max +'"';
                        if (filter.size) h+= ' size="'+ filter.size +'"';
                        h+= '>';
                }
        }
    }

    return this.change('getRuleInput', h, $rule, filter, name);
};