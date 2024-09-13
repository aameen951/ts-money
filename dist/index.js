"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Money = void 0;
function abs(v) {
    return v < 0 ? -v : v;
}
function _round_div10(v) {
    return (v + (v > 0n ? 5n : -5n)) / 10n;
}
class Money {
    _v = 0n;
    static _constructor(value) {
        const result = new Money();
        result._v = value;
        return result;
    }
    neg() { return Money._constructor(-this._v); }
    add(v) { return Money._constructor(this._v + v._v); }
    sub(v) { return Money._constructor(this._v - v._v); }
    mul(v) { return Money._constructor(_round_div10(this._v * v._v / 10n)); }
    div(v) { return Money._constructor(_round_div10(this._v * 1000n / v._v)); }
    mul_div(mul, div) {
        return Money._constructor(_round_div10(this._v * mul._v * 10n / div._v));
    }
    // NOTE: we want to multiply the money value by a scaler. This scaler could be anything.
    // It could be a 1000 or 0.0001. We have to convert it to bigint to be able to use it.
    // So we multiply it by some big value 10e+n before we round to integer to maintain as 
    // much precision as possible. Then we do the scale and we divide back by that number-1.
    // The last digit is kept for rounding properly instead of truncating.
    // DEPRECATED: NOTE(ameen): This function doesn't work as _v get bigger. When _v is very big,
    // v need more precision to compute the scaled value accurately which defeat the purpose of using bigint.
    // The following line should demonstrate the problem: 
    //   ((BigInt(Math.round((.15/1.15) * 10**16)) * 276000000000000000000000n / BigInt(10**16)) - 36000000000000000000000n)
    // _deprecated_scale(v: number) {
    //   let s = BigInt(Math.round(v * 10000000000000000)) * this._v / 1000000000000000n;
    //   // round the last digit
    //   s = (s + 5n) / 10n;
    //   return Money._constructor(s);
    // }
    abs() {
        return this._v < 0 ? Money._constructor(-this._v) : this;
    }
    min(v) {
        return v._v < this._v ? v : this;
    }
    max(v) {
        return v._v > this._v ? v : this;
    }
    equ(v) {
        return this._v === v._v;
    }
    gt(v) {
        return this._v > v._v;
    }
    lt(v) {
        return this._v < v._v;
    }
    ge(v) {
        return this._v >= v._v;
    }
    le(v) {
        return this._v <= v._v;
    }
    get is_zero() {
        return this._v === 0n;
    }
    get is_positive() {
        return this._v >= 0n;
    }
    get is_negative() {
        return this._v < 0n;
    }
    to_str() {
        const s = this._v < 0 ? '-' : '';
        let v = abs(this._v);
        const int_part = v / 100n;
        const dec_part = (v % 100n).toString().padStart(2, '0');
        return `${s}${int_part}.${dec_part}`;
    }
    to_num() {
        return Number(this._v) / 100;
    }
    toJSON() {
        return this.to_str();
    }
    static get zero() {
        return this._constructor(0n);
    }
    static get v100() {
        return this._constructor(10000n);
    }
    static get v1() {
        return this._constructor(100n);
    }
    static parse_str(value) {
        const match = value.replace(/,/g, "").match(/^\s*([+-]?)(\d*)(\.(\d+)?)?\s*$/);
        if (match === null) {
            return null;
        }
        const sign = match[1] || '+';
        const int_part = sign + (match[2] || '0');
        let decimal_part = ((match[4] || '0') + "000").slice(0, 3);
        let result = BigInt(int_part + decimal_part.slice(0, 2));
        if (decimal_part.charCodeAt(2) >= 53)
            result += 1n;
        return this._constructor(result);
    }
    static from_str_or_error(value) {
        const result = this.parse_str(value);
        if (!result)
            throw new Error(`The string '${value}' is not a valid money`);
        return result;
    }
    static from_str_or_zero(value) {
        const result = this.parse_str(value);
        return result ? result : Money.zero;
    }
    static from_num(value) {
        const v = BigInt(Math.round(value * 100));
        return this._constructor(v);
    }
    format() {
        let s = this.to_str().split(".");
        s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (s[0][0] !== '-')
            s[0] = " " + s[0];
        return s.join(".");
    }
}
exports.Money = Money;
//# sourceMappingURL=index.js.map