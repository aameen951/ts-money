"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneyDistributor = void 0;
const index_1 = require("./index");
class MoneyDistributor {
    available_amount;
    available_shares;
    constructor(total, shares) {
        this.available_amount = total;
        this.available_shares = index_1.Money.from_num(shares);
    }
    get remaining_amount() {
        return this.available_amount;
    }
    get remaining_shares() {
        return this.available_shares.to_num();
    }
    take(wanted_shares) {
        let wanted = index_1.Money.from_num(wanted_shares);
        if (wanted.gt(this.available_shares))
            throw new Error();
        let result = this.available_amount.mul_div(wanted, this.available_shares);
        this.available_amount = this.available_amount.sub(result);
        this.available_shares = this.available_shares.sub(wanted);
        return result;
    }
}
exports.MoneyDistributor = MoneyDistributor;
//# sourceMappingURL=money_distributer.js.map