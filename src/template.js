QueryBuilder.templates.group = ({ group_id, level, conditions, icons, settings, translate, builder }) => {
  return `
<div id="${group_id}" class="rules-group-container">
  <div class="rules-group-header">
    <div class="btn-group pull-right group-actions">
      <button type="button" class="btn btn-xs btn-success" data-add="rule">
        <i class="${icons}"></i> ${translate("add_rule")}
      </button>
      ${settings.allow_groups === -1 || settings.allow_groups >= level ? `
        <button type="button" class="btn btn-xs btn-success" data-add="group">
          <i class="${icons.add_group}"></i> ${translate("add_group")}
        </button>
      ` : ''}
      ${level > 1 ? `
        <button type="button" class="btn btn-xs btn-danger" data-delete="group">
          <i class="${icons.remove_group}"></i> ${translate("delete_group")}
        </button>
      ` : ''}
    </div>
    <div class="btn-group group-conditions">
      ${conditions.map(condition => `
        <label class="btn btn-xs btn-primary">
          <input type="radio" name="${group_id}_cond" value="${condition}"> ${translate("conditions", condition)}
        </label>
      `).join('\n')}
    </div>
    ${settings.display_errors ? `
      <div class="error-container"><i class="${icons.error}"></i></div>
    ` : ''}
  </div>
  <div class=rules-group-body>
    <div class=rules-list></div>
  </div>
</div>`;
};

QueryBuilder.templates.rule = ({ rule_id, icons, settings, translate, builder }) => {
  return `
<div id="${rule_id}" class="rule-container">
  <div class="rule-header">
    <div class="btn-group pull-right rule-actions">
      <button type="button" class="btn btn-xs btn-danger" data-delete="rule">
        <i class="${icons.remove_rule}"></i> ${translate("delete_rule")}
      </button>
    </div>
  </div>
  ${settings.display_errors ? `
    <div class="error-container"><i class="${icons.error}"></i></div>
  ` : ''}
  <div class="rule-filter-container"></div>
  <div class="rule-operator-container"></div>
  <div class="rule-value-container"></div>
</div>`;
};

QueryBuilder.templates.filterSelect = ({ rule, filters, icons, settings, translate, builder }) => {
  let optgroup = null;
  return `
<select class="form-control" name="${rule.id}_filter">
  ${settings.display_empty_filter ? `
    <option value="-1">${settings.select_placeholder}</option>
  ` : ''}
  ${filters.map(filter => `
    ${optgroup !== filter.optgroup ? `
      ${optgroup !== null ? `</optgroup>` : ''}
      ${(optgroup = filter.optgroup) !== null ? `
        <optgroup label="${translate(settings.optgroups[optgroup])}">
      ` : ''}
    ` : ''}
    <option value="${filter.id}" ${filter.icon ? `data-icon="${filter.icon}"` : ''}>${translate(filter.label)}</option>
  `).join('')}
  ${optgroup !== null ? '</optgroup>' : ''}
</select>`;
};

QueryBuilder.templates.operatorSelect = ({ rule, operators, icons, settings, translate, builder }) => {
  let optgroup = null;
  return `
${operators.length === 1 ? `
<span>
${translate("operators", operators[0].type)}
</span>
` : ''}
<select class="form-control ${operators.length === 1 ? 'hide' : ''}" name="${rule.id}_operator">
  ${operators.map(operator => `
    ${optgroup !== operator.optgroup ? `
      ${optgroup !== null ? `</optgroup>` : ''}
      ${(optgroup = operator.optgroup) !== null ? `
        <optgroup label="${translate(settings.optgroups[optgroup])}">
      ` : ''}
    ` : ''}
    <option value="${operator.type}" ${operator.icon ? `data-icon="${operator.icon}"` : ''}>${translate("operators", operator.type)}</option>
  `).join('')}
  ${optgroup !== null ? '</optgroup>' : ''}
</select>`;
};

QueryBuilder.templates.ruleValueSelect = ({ name, rule, icons, settings, translate, builder }) => {
  let optgroup = null;
  return `
<select class="form-control" name="${name}" ${rule.filter.multiple ? 'multiple' : ''}>
  ${rule.filter.placeholder ? `
    <option value="${rule.filter.placeholder_value}" disabled selected>${rule.filter.placeholder}</option>
  ` : ''}
  ${rule.filter.values.map(entry => `
    ${optgroup !== entry.optgroup ? `
      ${optgroup !== null ? `</optgroup>` : ''}
      ${(optgroup = entry.optgroup) !== null ? `
        <optgroup label="${translate(settings.optgroups[optgroup])}">
      ` : ''}
    ` : ''}
    <option value="${entry.value}">${entry.label}</option>
  `).join('')}
  ${optgroup !== null ? '</optgroup>' : ''}
</select>`;
};

/**
 * Returns group's HTML
 * @param {string} group_id
 * @param {int} level
 * @returns {string}
 * @fires QueryBuilder.changer:getGroupTemplate
 * @private
 */
QueryBuilder.prototype.getGroupTemplate = function (group_id, level) {
  var h = this.templates.group({
    builder: this,
    group_id: group_id,
    level: level,
    conditions: this.settings.conditions,
    icons: this.icons,
    settings: this.settings,
    translate: this.translate.bind(this)
  }).trim();

  /**
   * Modifies the raw HTML of a group
   * @event changer:getGroupTemplate
   * @memberof QueryBuilder
   * @param {string} html
   * @param {int} level
   * @returns {string}
   */
  return this.change('getGroupTemplate', h, level);
};

/**
 * Returns rule's HTML
 * @param {string} rule_id
 * @returns {string}
 * @fires QueryBuilder.changer:getRuleTemplate
 * @private
 */
QueryBuilder.prototype.getRuleTemplate = function (rule_id) {
  var h = this.templates.rule({
    builder: this,
    rule_id: rule_id,
    icons: this.icons,
    settings: this.settings,
    translate: this.translate.bind(this)
  }).trim();

  /**
   * Modifies the raw HTML of a rule
   * @event changer:getRuleTemplate
   * @memberof QueryBuilder
   * @param {string} html
   * @returns {string}
   */
  return this.change('getRuleTemplate', h);
};

/**
 * Returns rule's filter HTML
 * @param {Rule} rule
 * @param {object[]} filters
 * @returns {string}
 * @fires QueryBuilder.changer:getRuleFilterTemplate
 * @private
 */
QueryBuilder.prototype.getRuleFilterSelect = function (rule, filters) {
  var h = this.templates.filterSelect({
    builder: this,
    rule: rule,
    filters: filters,
    icons: this.icons,
    settings: this.settings,
    translate: this.translate.bind(this)
  }).trim();

  /**
   * Modifies the raw HTML of the rule's filter dropdown
   * @event changer:getRuleFilterSelect
   * @memberof QueryBuilder
   * @param {string} html
   * @param {Rule} rule
   * @param {QueryBuilder.Filter[]} filters
   * @returns {string}
   */
  return this.change('getRuleFilterSelect', h, rule, filters);
};

/**
 * Returns rule's operator HTML
 * @param {Rule} rule
 * @param {object[]} operators
 * @returns {string}
 * @fires QueryBuilder.changer:getRuleOperatorTemplate
 * @private
 */
QueryBuilder.prototype.getRuleOperatorSelect = function (rule, operators) {
  var h = this.templates.operatorSelect({
    builder: this,
    rule: rule,
    operators: operators,
    icons: this.icons,
    settings: this.settings,
    translate: this.translate.bind(this)
  }).trim();

  /**
   * Modifies the raw HTML of the rule's operator dropdown
   * @event changer:getRuleOperatorSelect
   * @memberof QueryBuilder
   * @param {string} html
   * @param {Rule} rule
   * @param {QueryBuilder.Operator[]} operators
   * @returns {string}
   */
  return this.change('getRuleOperatorSelect', h, rule, operators);
};

/**
 * Returns the rule's value select HTML
 * @param {string} name
 * @param {Rule} rule
 * @returns {string}
 * @fires QueryBuilder.changer:getRuleValueSelect
 * @private
 */
QueryBuilder.prototype.getRuleValueSelect = function (name, rule) {
  var h = this.templates.ruleValueSelect({
    builder: this,
    name: name,
    rule: rule,
    icons: this.icons,
    settings: this.settings,
    translate: this.translate.bind(this)
  }).trim();

  /**
   * Modifies the raw HTML of the rule's value dropdown (in case of a "select filter)
   * @event changer:getRuleValueSelect
   * @memberof QueryBuilder
   * @param {string} html
   * @param [string} name
   * @param {Rule} rule
   * @returns {string}
   */
  return this.change('getRuleValueSelect', h, name, rule);
};

/**
 * Returns the rule's value HTML
 * @param {Rule} rule
 * @param {int} value_id
 * @returns {string}
 * @fires QueryBuilder.changer:getRuleInput
 * @private
 */
QueryBuilder.prototype.getRuleInput = function (rule, value_id) {
  var filter = rule.filter;
  var validation = rule.filter.validation || {};
  var name = rule.id + '_value_' + value_id;
  var c = filter.vertical ? ' class=block' : '';
  var h = '';
  var placeholder = Array.isArray(filter.placeholder) ? filter.placeholder[value_id] : filter.placeholder;

  if (typeof filter.input == 'function') {
    h = filter.input.call(this, rule, name);
  }
  else {
    switch (filter.input) {
      case 'radio':
      case 'checkbox':
        Utils.iterateOptions(filter.values, function (key, val) {
          h += '<label' + c + '><input type="' + filter.input + '" name="' + name + '" value="' + key + '"> ' + val + '</label> ';
        });
        break;

      case 'select':
        h = this.getRuleValueSelect(name, rule);
        break;

      case 'textarea':
        h += '<textarea class="form-control" name="' + name + '"';
        if (filter.size) h += ' cols="' + filter.size + '"';
        if (filter.rows) h += ' rows="' + filter.rows + '"';
        if (validation.min !== undefined) h += ' minlength="' + validation.min + '"';
        if (validation.max !== undefined) h += ' maxlength="' + validation.max + '"';
        if (placeholder) h += ' placeholder="' + placeholder + '"';
        h += '></textarea>';
        break;

      case 'number':
        h += '<input class="form-control" type="number" name="' + name + '"';
        if (validation.step !== undefined) h += ' step="' + validation.step + '"';
        if (validation.min !== undefined) h += ' min="' + validation.min + '"';
        if (validation.max !== undefined) h += ' max="' + validation.max + '"';
        if (placeholder) h += ' placeholder="' + placeholder + '"';
        if (filter.size) h += ' size="' + filter.size + '"';
        h += '>';
        break;

      default:
        h += '<input class="form-control" type="text" name="' + name + '"';
        if (placeholder) h += ' placeholder="' + placeholder + '"';
        if (filter.type === 'string' && validation.min !== undefined) h += ' minlength="' + validation.min + '"';
        if (filter.type === 'string' && validation.max !== undefined) h += ' maxlength="' + validation.max + '"';
        if (filter.size) h += ' size="' + filter.size + '"';
        h += '>';
    }
  }

  /**
   * Modifies the raw HTML of the rule's input
   * @event changer:getRuleInput
   * @memberof QueryBuilder
   * @param {string} html
   * @param {Rule} rule
   * @param {string} name - the name that the input must have
   * @returns {string}
   */
  return this.change('getRuleInput', h, rule, name);
};
