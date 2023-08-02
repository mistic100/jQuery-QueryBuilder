// Type definitions for jQuery-QueryBuilder 2.4.3

/// <reference path="../jquery/jquery.d.ts" />

declare namespace jQueryQueryBuilder {

    interface QueryBuilder {
        constructor($el: JQuery, options: Options): QueryBuilder;
        //static readonly DEFAULTS: Object;
        //static Group: Function;
        //static readonly OPERATORS : Map<string, Object>;
        //static readonly regional: Map<string, Object>;
        //static Rule: Function;
        //static readonly selectors: Map<string, string>;
        //static readonly templates: Map<string, string>;
        //static utils: Object;
        readonly $el: JQuery;
        readonly filters: Array<FilterOptions>;
        readonly icons: {
            add_group?: string;//'glyphicon glyphicon-plus-sign'
            add_rule?: string;//'glyphicon glyphicon-plus'
            remove_group?: string;//'glyphicon glyphicon-remove'
            remove_rule?: string;//'glyphicon glyphicon-remove'
            error?: string;//'glyphicon glyphicon-warning-sign'
        };

        readonly lang: { lang_code: "en" | string };
        //readonly model: Model;
        readonly operators: Array<OperatorDefinition>;
        readonly plugins: Map<string, Object>;
        readonly settings: Options;
        readonly status: {
            generated_id:boolean;
            group_id:number;
            has_operator_oprgroup:boolean;
            has_optgroup:boolean;
            id:string;
            rule_id:number;
        };
        readonly templates: Map<string, Function>;

        addFilter(a:any,b:any);
        addGroup(a:any,b:any,c:any,d:any);
        addRule(a:any,b:any,c:any);
        applyDisabledFilters(a:any);
        applyGroupFlags(a:any);
        applyRuleFlags(a:any);
        bindEvents();
        change(a:any,b:any);
        checkFilters(a:any);
        checkOperators(a:any);
        clear();
        clearDisabledFilters(a:any);
        clearErrors(a:any);
        createRuleFilters(a:any);
        createRuleInput(a:any);
        createRuleOperators(a:any);
        deleteGroup(a:any);
        deleteRule(a:any);
        destroy();
        displayError(a:any);
        getFilterById(a:any,b:any);
        getGroupFlags(a:any,b:any);
        getGroupTemplate(a:any,b:any);
        getModel(element?: JQuery): jQueryQueryBuilder.Node;
        getMongo(a:any);
        getOperatorByType(a:any,b:any);
        getOperators(a:any);
        getRuleFilterSelect(a:any,b:any);
        getRuleFlags(a:any,b:any);
        getRuleInput(a:any,b:any);
        getRuleInputValue(a:any);
        getRuleOperatorSelect(a:any,b:any);
        getRuleTemplate(a:any);
        getRules(options?: { skip_empty: boolean, get_flags: boolean | 'all', allow_invalid: boolean }): jQueryQueryBuilder.IConjunction;
        getRulesFromMongo(a:any);
        getRulesFromSQL(a:any,b:any);
        getSQL(a:any,b:any,c:any);
        getValidationMessage(a:any,b:any,c:any);
        init(c,d);
        initPlugins();
        invert(a:any,b:any);
        nextGroupId();
        nextRuleId();
        off(a:any,b:any);
        on(a:any,b:any);
        once(a:any,b:any);
        parseGroupFlags(a:any);
        parseRuleFlags(a:any);
        refreshGroupsConditions();
        removeFilter(a:any,b:any);
        reset();
        setFilters(a:any,b:any);
        setOptions(a:any);
        setRoot(a:any,b:any,c:any);
        setRuleInputValue(a:any,b:any);
        setRules(rules: jQueryQueryBuilder.IConjunction, options?: { allow_invalid: boolean }): void;
        setRulesFromMongo(a:any);
        setRulesFromSQL(a:any,b:any);
        tojQueryEvent(a:any,b:any);
        translateLabel(a:any);
        trigger(a:any);
        triggerValidationError(a:any,b:any,c:any);
        updateDisabledFilters(a:any);
        updateGroupCondition(a:any);
        updateGroupNot(a:any);
        updateRuleFilter(a:any,b:any);
        updateRuleOperator(a:any,b:any);
        updateRuleValue(a:any);
        validate(options?: { skip_empty: boolean }): void;
        validateValue(a:any,b:any);
        validateValueInternal(a:any,b:any);
    }

    interface QueryBuilderEvent extends Event {
        builder: QueryBuilder;
    }

    interface TriggerHandler {
        <T>(e: QueryBuilderEvent, rule: Rule, error: string, value: T): void;
    }

    interface ChangerHandler {
        <T>(e: QueryBuilderEvent & { value: T }, level: number): void;
    }

    interface Node {
        $el: JQuery;
        parent: Group;
        level: number;
        id: string;
        error: string;
        data: Object;
        isRoot(): boolean;
        getPos(): number;
        drop(): void;
        moveAfter(ruleOrGroup: Node): void;
        moveAtBeing(group: Group): void;
        moveAtEnd(group: Group): void;
    }

    interface Group extends Node {
        readonly rules: Rule[];
        condition: string;
        empty(): void;
        length(): number;
        addGroup(el: JQuery, index:number): Group;
        addRule(el: JQuery, index:number): Rule;
        each(cbRule: (node: Node) => boolean, cbGroup?: (node: Node) => boolean, context?: Object): boolean;
        each(reverse: boolean, cbRule: (node: Node) => boolean, cbGroup?: (node: Node) => boolean, context?: Object): boolean;
        contains(ruleOrGroup: Node, x: boolean): boolean;
    }

    interface Rule extends Node {
        filter: Object;
        operator: Object;
        value: any;
        flags: {
            filter_readonly?: boolean;
            operator_readonly?: boolean;
            value_readonly?: boolean;
            no_delete?: boolean;
        };
        empty: boolean;
    }
    
    interface IConjunction {
        condition: string;
        rules: (IConjunction | IRule)[];
        valid: boolean;
    }

    interface IRule {
        field: string;
        id: string;
        input: "text" | "textarea" | "radio" | "checkbox" | "select";
        operator: string;//"equal"
        type: "string"|"integer"|"date";
        value: any;    
    }

    interface ValidationOptions {
        format: string | Object;
        min?: number | string;
        max?: number | string;
        step?: number;
        messages?: {};
        allow_empty_value?: boolean;
        callback?: (value: any, rule: Rule) => true | string;
    }

    type BuiltinOperators = "equal" | "not_equal" | "in" | "not_in" | "less" | "less_or_equal" | "greater" | "greater_or_equal" | "between" | "not_between" | "begins_with" | "not_begins_with" | "contains" | "not_contains" | "ends_with" | "not_ends_with" | "is_empty" | "is_not_empty" | "is_null" | "is_not_null";

    interface OperatorDefinition {
        type: BuiltinOperators | string;
        optgroup: string;
        nb_inputs: number;
        multiple: boolean;
        apply_to: string[];
    }

    interface FilterOptions {
        id: string;
        field?: string;
        label?: string;
        optgroup?: string | Object;
        type: string;
        input?: string | Function;
        values?: Array<Object> | Object;
        value_separator?: string;
        default_value?: any;
        input_event?: string;
        size?: number;
        rows?: number;
        multiple?: boolean;
        placeholder?: string;
        vertical?: boolean;
        validation?: ValidationOptions;
        operators?: Array<BuiltinOperators> | Array<OperatorDefinition>;
        plugin?: string;
        plugin_config?: Object
        data?: Object;
        valueSetter?: (rule: Rule, value: any) => void;
        valueGetter?: (rule: Rule) => any;
    }

    interface Options {
        allow_groups?: boolean | number;
        allow_empty?: boolean;
        conditionOpposites?: Map<string,string>;
        conditions?: string[];
        default_condition?: string;
        default_filter?: string;
        display_empty_filter?: boolean;
        display_errors?: boolean;
        filters: FilterOptions[];
        icons?: {
            add_group?: string;//'glyphicon glyphicon-plus-sign'
            add_rule?: string;//'glyphicon glyphicon-plus'
            remove_group?: string;//'glyphicon glyphicon-remove'
            remove_rule?: string;//'glyphicon glyphicon-remove'
            error?: string;//'glyphicon glyphicon-warning-sign'
        };
        inputs_separator?: " , " | string;
        lang_code?: string;
        lang?: Object;
        operatorOpposites?: Map<string,string>;
        operators?: BuiltinOperators[] | OperatorDefinition[];
        optgroups?: Object;
        plugins?: {};
        rules?: jQueryQueryBuilder.IConjunction;
        select_placeholder?: string;
        sort_filters?: boolean | Function;
        templates?: Object;
    }

}

interface JQuery {
    queryBuilder(method: 'validate', options?: { skip_empty: boolean }): void;
    queryBuilder(method: 'getRules', options?: { skip_empty: boolean, get_flags: boolean | 'all', allow_invalid: boolean }): jQueryQueryBuilder.IConjunction;
    queryBuilder(method: 'setRules', rules: jQueryQueryBuilder.IConjunction, options?: { allow_invalid: boolean }): void;
    queryBuilder(method: 'getModel', element?: JQuery): jQueryQueryBuilder.Node;
    queryBuilder(method: 'reset'): void;
    queryBuilder(method: 'destroy'): void;
    queryBuilder(options?: jQueryQueryBuilder.Options): void;
}
