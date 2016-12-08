QueryBuilder.templates.group = '\
<dl id="{{= it.group_id }}" class="rules-group-container" data-stype="{{= it.section_type || "" }}"> \
  <dt class="rules-group-header"> \
    <div class="btn-group pull-right group-actions"> \
      <button type="button" class="btn btn-xs btn-success" data-add="rule"> \
        <i class="{{= it.icons.add_rule }}"></i> {{= it.lang.add_rule }} \
      </button> \
      {{? it.settings.allow_groups===-1 || it.settings.allow_groups>=it.level }} \
        <button type="button" class="btn btn-xs btn-success" data-add="group"> \
          <i class="{{= it.icons.add_group }}"></i> {{= it.lang.add_group }} \
        </button> \
      {{?}} \
      {{? it.settings.allow_sections && it.settings.has_sections && !it.in_section }} \
        <button type="button" class="btn btn-xs btn-success" data-add="section"> \
          <i class="{{= it.icons.add_section }}"></i> {{= it.lang.add_section }} \
        </button> \
      {{?}} \
      {{? it.level>1 && !it.section_root }} \
        <button type="button" class="btn btn-xs btn-danger" data-delete="group"> \
          <i class="{{= it.icons.remove_group }}"></i> {{= it.lang.delete_group }} \
        </button> \
      {{?}} \
    </div> \
    <div class="btn-group group-conditions"> \
      {{~ it.conditions: condition }} \
        <label class="btn btn-xs btn-primary"> \
          <input type="radio" name="{{= it.group_id }}_cond" value="{{= condition }}"> {{= it.lang.conditions[condition] || condition }} \
        </label> \
      {{~}} \
    </div> \
    {{? it.settings.display_errors }} \
      <div class="error-container"><i class="{{= it.icons.error }}"></i></div> \
    {{?}} \
  </dt> \
  <dd class=rules-group-body> \
    <ul class=rules-list></ul> \
  </dd> \
</dl>';

QueryBuilder.templates.section = '\
<dl id="{{= it.section_id }}" class="rules-section-container" data-stype=""> \
  <dt class="rules-section-header"> \
    <div class="btn-section pull-right section-actions"> \
      <button type="button" class="btn btn-xs btn-danger" data-delete="section"> \
        <i class="{{= it.icons.remove_section }}"></i> {{= it.lang.delete_section }} \
      </button> \
    </div> \
    <div class="btn-group section-exists-options"> \
      {{~ it.exist_options: option }} \
        <label class="btn btn-xs btn-primary"> \
          <input type="radio" name="{{= it.section_id }}_exists" value="{{= option }}"> {{= it.lang.exist_options[option] || option }} \
        </label> \
      {{~}} \
    </div> \
    {{? it.settings.display_errors }} \
      <div class="error-container"><i class="{{= it.icons.error }}"></i></div> \
    {{?}} \
  </dt> \
  <div class="rule-stype-container"></div> \
  <dd class="rules-section-body"> \
  </dd> \
</dl>';

QueryBuilder.templates.stypeSelect = '\
<select class="form-control" name="{{= it.section.id }}_section_type"> \
  {{? it.settings.display_empty_stype_filter }} \
    <option value="-1">{{= it.settings.select_placeholder }}</option> \
  {{?}} \
  {{~ it.stypes: stype }} \
    <option value="{{= stype.id }}">{{= it.translate(stype.label) }}</option> \
  {{~}} \
</select>';

QueryBuilder.templates.rule = '\
<li id="{{= it.rule_id }}" class="rule-container" data-stype="{{= it.section_type || "" }}"> \
  <div class="rule-header"> \
    <div class="btn-group pull-right rule-actions"> \
      <button type="button" class="btn btn-xs btn-danger" data-delete="rule"> \
        <i class="{{= it.icons.remove_rule }}"></i> {{= it.lang.delete_rule }} \
      </button> \
    </div> \
  </div> \
  {{? it.settings.display_errors }} \
    <div class="error-container"><i class="{{= it.icons.error }}"></i></div> \
  {{?}} \
  <div class="rule-filter-container"></div> \
  <div class="rule-operator-container"></div> \
  <div class="rule-value-container"></div> \
</li>';

QueryBuilder.templates.filterSelect = '\
{{ var optgroup = null; }} \
<select class="form-control" name="{{= it.rule.id }}_filter"> \
  {{? it.settings.display_empty_filter }} \
    <option value="-1">{{= it.settings.select_placeholder }}</option> \
  {{?}} \
  {{~ it.filters: filter }} \
    {{? optgroup !== filter.optgroup }} \
      {{? optgroup !== null }}</optgroup>{{?}} \
      {{? (optgroup = filter.optgroup) !== null }} \
        <optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}"> \
      {{?}} \
    {{?}} \
    <option value="{{= filter.id }}">{{= it.translate(filter.label) }}</option> \
  {{~}} \
  {{? optgroup !== null }}</optgroup>{{?}} \
</select>';

QueryBuilder.templates.operatorSelect = '\
{{? it.operators.length === 1 }} \
<span> \
{{= it.lang.operators[it.operators[0].type] || it.operators[0].type }} \
</span> \
{{?}} \
{{ var optgroup = null; }} \
<select class="form-control {{? it.operators.length === 1 }}hide{{?}}" name="{{= it.rule.id }}_operator"> \
  {{~ it.operators: operator }} \
    {{? optgroup !== operator.optgroup }} \
      {{? optgroup !== null }}</optgroup>{{?}} \
      {{? (optgroup = operator.optgroup) !== null }} \
        <optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}"> \
      {{?}} \
    {{?}} \
    <option value="{{= operator.type }}">{{= it.lang.operators[operator.type] || operator.type }}</option> \
  {{~}} \
  {{? optgroup !== null }}</optgroup>{{?}} \
</select>';

/**
 * Returns group HTML
 * @param group_id {string}
 * @param level {int}
 * @param section_type {string}
 * @param in_section {bool}
 * @param section_root {bool}
 * @return {string}
 */
QueryBuilder.prototype.getGroupTemplate = function(group_id, level, section_type, in_section, section_root) {
    var h = this.templates.group({
        builder: this,
        group_id: group_id,
        level: level,
        section_type: section_type,
        in_section: in_section,
        section_root: section_root,
        conditions: this.settings.conditions,
        icons: this.icons,
        lang: this.lang,
        settings: this.settings
    });

    return this.change('getGroupTemplate', h, level, section_type, in_section, section_root);
};

/**
 * Returns rule HTML
 * @param rule_id {string}
 * @param section_type {string}
 * @return {string}
 */
QueryBuilder.prototype.getRuleTemplate = function(rule_id, section_type) {
    var h = this.templates.rule({
        builder: this,
        rule_id: rule_id,
        section_type: section_type,
        icons: this.icons,
        lang: this.lang,
        settings: this.settings
    });

    return this.change('getRuleTemplate', h, section_type);
};

/**
 * Returns section HTML
 * @param section_id {string}
 * @param level {int}
 * @return {string}
 */
QueryBuilder.prototype.getSectionTemplate = function(section_id, level) {
    var h = this.templates.section({
        builder: this,
        section_id: section_id,
        level: level,
        exist_options: this.settings.exist_options,
        icons: this.icons,
        lang: this.lang,
        settings: this.settings
    });

    return this.change('getSectionTemplate', h);
};

/**
 * Returns section type <select> HTML
 * @param section {Section}
 * @param stypes {array}
 * @return {string}
 */
QueryBuilder.prototype.getSectionTypeSelect = function(section, stypes) {
    var h = this.templates.stypeSelect({
        builder: this,
        section: section,
        stypes: stypes,
        icons: this.icons,
        lang: this.lang,
        settings: this.settings,
        translate: this.translateLabel
    });

    return this.change('getSectionTypeSelect', h, section);
};

/**
 * Returns rule filter <select> HTML
 * @param rule {Rule}
 * @param filters {array}
 * @return {string}
 */
QueryBuilder.prototype.getRuleFilterSelect = function(rule, filters) {
    var h = this.templates.filterSelect({
        builder: this,
        rule: rule,
        filters: filters,
        icons: this.icons,
        lang: this.lang,
        settings: this.settings,
        translate: this.translateLabel
    });

    return this.change('getRuleFilterSelect', h, rule);
};

/**
 * Returns rule operator <select> HTML
 * @param rule {Rule}
 * @param operators {object}
 * @return {string}
 */
QueryBuilder.prototype.getRuleOperatorSelect = function(rule, operators) {
    var h = this.templates.operatorSelect({
        builder: this,
        rule: rule,
        operators: operators,
        icons: this.icons,
        lang: this.lang,
        settings: this.settings,
        translate: this.translateLabel
    });

    return this.change('getRuleOperatorSelect', h, rule);
};

/**
 * Return the rule value HTML
 * @param rule {Rule}
 * @param filter {object}
 * @param value_id {int}
 * @return {string}
 */
QueryBuilder.prototype.getRuleInput = function(rule, value_id) {
    var filter = rule.filter;
    var validation = rule.filter.validation || {};
    var name = rule.id + '_value_' + value_id;
    var c = filter.vertical ? ' class=block' : '';
    var h = '';

    if (typeof filter.input == 'function') {
        h = filter.input.call(this, rule, name);
    }
    else {
        switch (filter.input) {
            case 'radio': case 'checkbox':
                Utils.iterateOptions(filter.values, function(key, val) {
                    h+= '<label' + c + '><input type="' + filter.input + '" name="' + name + '" value="' + key + '"> ' + val + '</label> ';
                });
                break;

            case 'select':
                h+= '<select class="form-control" name="' + name + '"' + (filter.multiple ? ' multiple' : '') + '>';
                if (filter.placeholder) {
                    h+= '<option value="' + filter.placeholder_value + '" disabled selected>' + filter.placeholder + '</option>';
                }
                Utils.iterateOptions(filter.values, function(key, val) {
                    h+= '<option value="' + key + '">' + val + '</option> ';
                });
                h+= '</select>';
                break;

            case 'textarea':
                h+= '<textarea class="form-control" name="' + name + '"';
                if (filter.size) h+= ' cols="' + filter.size + '"';
                if (filter.rows) h+= ' rows="' + filter.rows + '"';
                if (validation.min !== undefined) h+= ' minlength="' + validation.min + '"';
                if (validation.max !== undefined) h+= ' maxlength="' + validation.max + '"';
                if (filter.placeholder) h+= ' placeholder="' + filter.placeholder + '"';
                h+= '></textarea>';
                break;

            default:
                switch (QueryBuilder.types[filter.type]) {
                    case 'number':
                        h+= '<input class="form-control" type="number" name="' + name + '"';
                        if (validation.step !== undefined) h+= ' step="' + validation.step + '"';
                        if (validation.min !== undefined) h+= ' min="' + validation.min + '"';
                        if (validation.max !== undefined) h+= ' max="' + validation.max + '"';
                        if (filter.placeholder) h+= ' placeholder="' + filter.placeholder + '"';
                        if (filter.size) h+= ' size="' + filter.size + '"';
                        h+= '>';
                        break;

                    default:
                        h+= '<input class="form-control" type="text" name="' + name + '"';
                        if (filter.placeholder) h+= ' placeholder="' + filter.placeholder + '"';
                        if (filter.type === 'string' && validation.min !== undefined) h+= ' minlength="' + validation.min + '"';
                        if (filter.type === 'string' && validation.max !== undefined) h+= ' maxlength="' + validation.max + '"';
                        if (filter.size) h+= ' size="' + filter.size + '"';
                        h+= '>';
                }
        }
    }

    return this.change('getRuleInput', h, rule, name);
};
