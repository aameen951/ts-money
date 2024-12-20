import { Money } from "./index";
export declare class MoneyDistributor {
    private available_amount;
    private available_shares;
    constructor(total: Money, shares: number);
    get remaining_amount(): Money;
    get remaining_shares(): number;
    take(wanted_shares: number): Money;
}
export declare class MoneyDistributor2 {
    private available_amount;
    private available_shares;
    constructor(total: Money, shares: Money);
    get remaining_amount(): Money;
    get remaining_shares(): Money;
    take(wanted_shares: Money): Money;
}
