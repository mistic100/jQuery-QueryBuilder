// Type definitions for jQuery-QueryBuilder v2.4.3
// Definitions by: Ron Newcomb <https://github.com/RonNewcomb>

/// <reference types="jquery" />

declare namespace jQueryQueryBuilder {

    interface QueryBuilder {
        constructor($el: JQuery, options: Options): QueryBuilder;
        //static readonly DEFAULTS: object;
        //static Group: Function;
        //static readonly OPERATORS : Map<string, object>;
        //static readonly regional: Map<string, object>;
        //static Rule: Function;
        //static readonly selectors: Map<string, string>;
        //static readonly templates: Map<string, string>;
        //static utils: object;
        readonly $el: JQuery;
        readonly filters: Array<FilterOptions>;
        readonly icons: {};
        readonly lang: object;
        //readonly model: Model;
        readonly operators: Array<OperatorDefinition>;
        readonly plugins: Map<string, object>;
        readonly settings: object;
        readonly templates: Map<string, Function>;
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

    interface Conjunction {
        condition: string;
        rules: Rule[];
    }

    interface Node {
        $el: JQuery;
        parent: Group;
        level: number;
        id: string;
        error: string;
        data: object;
        isRoot(): boolean;
        getPos(): number;
        drop(): void;
        moveAfter(ruleOrGroup: Node): void;
        moveAtBeing(group: Group): void;
        moveAtEnd(group: Group): void;
    }

    interface Group extends Node {
        condition: string;
        empty(): void;
        length(): number;
        addGroup(el: JQuery, index:number): Group;
        addRule(el: JQuery, index:number): Rule;
        each(cbRule: (node: Node) => boolean, cbGroup?: (node: Node) => boolean, context?: object): boolean;
        each(reverse: boolean, cbRule: (node: Node) => boolean, cbGroup?: (node: Node) => boolean, context?: object): boolean;
        contains(ruleOrGroup: Node, x: boolean): boolean;
    }

    interface Rule extends Node {
        filter: object;
        operator: object;
        value: any;
        flags: {
            filter_readonly?: boolean;
            operator_readonly?: boolean;
            value_readonly?: boolean;
            no_delete?: boolean;
        };
        empty: boolean;
    }

    interface ValidationOptions {
        format: string | object;
        min?: number | string;
        max?: number | string;
        step?: number;
        messages?: {};
        allow_empty_value?: boolean;
        callback?: (value: any, rule: Rule) => true | string;
    }

    interface OperatorDefinition {
        type: string;
        optgroup: string;
        nb_inputs: number;
        multiple: boolean;
        apply_to: string[];
    }

    interface FilterOptions {
        id: string;
        field?: string;
        label?: string;
        optgroup?: string | object;
        type: string;
        input?: string | Function;
        values?: Array<object> | object;
        value_separator?: string;
        default_value?: any;
        input_event?: string;
        size?: number;
        rows?: number;
        multiple?: boolean;
        placeholder?: string;
        vertical?: boolean;
        validation?: ValidationOptions;
        operators?: Array<string> | Array<OperatorDefinition>;
        plugin?: string;
        plugin_config?: object
        data?: object;
        valueSetter?: (rule: Rule, value: any) => void;
        valueGetter?: (rule: Rule) => any;
    }

    interface Options {
        filters: FilterOptions[];
        plugins?: {};
        rules?: object;
        optgroups?: object;
        default_filter?: string;
        sort_filters?: boolean | Function;
        allow_groups?: boolean | number;
        allow_empty?: boolean;
        display_errors?: boolean;
        conditions?: string[];
        default_condition?: string;
        inputs_separator?: string;
        display_empty_filter?: boolean;
        select_placeholder?: string;
        operators?: object[];
        lang_code?: string;
        lang?: object;
        icons?: {
            add_group?: string;//'glyphicon glyphicon-plus-sign'
            add_rule?: string;//'glyphicon glyphicon-plus'
            remove_group?: string;//'glyphicon glyphicon-remove'
            remove_rule?: string;//'glyphicon glyphicon-remove'
            error?: string;//'glyphicon glyphicon-warning-sign'
        };
        templates?: object;
    }

}

interface JQuery {
    queryBuilder(method: 'validate', options?: { skip_empty: boolean }): void;
    queryBuilder(method: 'getRules', options?: { skip_empty: boolean, get_flags: boolean | 'all', allow_invalid: boolean }): jQueryQueryBuilder.Conjunction | jQueryQueryBuilder.Rule[];
    queryBuilder(method: 'setRules', rules: jQueryQueryBuilder.Conjunction | jQueryQueryBuilder.Rule[], options?: { allow_invalid: boolean }): void;
    queryBuilder(method: 'getModel', element?: JQuery): jQueryQueryBuilder.Node;
    queryBuilder(method: 'reset'): void;
    queryBuilder(method: 'destroy'): void;
    queryBuilder(options?: jQueryQueryBuilder.Options): void;
}
