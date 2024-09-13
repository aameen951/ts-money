export declare class Money {
    _v: bigint;
    private static _constructor;
    neg(): Money;
    add(v: Money): Money;
    sub(v: Money): Money;
    mul(v: Money): Money;
    div(v: Money): Money;
    mul_div(mul: Money, div: Money): Money;
    abs(): Money;
    min(v: Money): Money;
    max(v: Money): Money;
    equ(v: Money): boolean;
    gt(v: Money): boolean;
    lt(v: Money): boolean;
    ge(v: Money): boolean;
    le(v: Money): boolean;
    get is_zero(): boolean;
    get is_positive(): boolean;
    get is_negative(): boolean;
    to_str(): string;
    to_num(): number;
    toJSON(): string;
    static get zero(): Money;
    static get v100(): Money;
    static get v1(): Money;
    static parse_str(value: string): Money | null;
    static from_str_or_error(value: string): Money;
    static from_str_or_zero(value: string): Money;
    static from_num(value: number): Money;
    format(): string;
}
