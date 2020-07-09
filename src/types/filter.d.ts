export interface FilterRule {
    field: string;
    operate:
        | 'and'
        | 'or'
        | 'equal'
        | 'notequal'
        | 'less'
        | 'lessorequal'
        | 'greater'
        | 'greaterorequal'
        | 'in'
        | 'like'
        | 'startwith'
        | 'endwith';
    value: any;
    type?: 'String' | 'int' | 'jsonb';
}

export interface FilterGroup {
    operate: 'and' | 'or';
    rules?: FilterRule[];
    groups?: FilterGroup;
}

export interface FilterOrder {
    orderKey: string;
    rule: number;
}

export interface FilterParams {
    memberId?: number;
    pageNum?: number;
    pageSize?: number;
    single?: boolean;
    orders?: FilterOrder[];
    [key: string]: any;
}
