import { Money } from "./index";

export class MoneyDistributor {
  private available_amount: Money;
  private available_shares: Money;

  constructor(total: Money, shares: number) {
    this.available_amount = total;
    this.available_shares = Money.from_num(shares);
  }

  get remaining_amount() {
    return this.available_amount;
  }
  get remaining_shares() {
    return this.available_shares.to_num();
  }

  take(wanted_shares: number){
    let wanted = Money.from_num(wanted_shares);

    if(wanted.gt(this.available_shares))throw new Error();

    let result = this.available_amount.mul_div(wanted, this.available_shares);

    this.available_amount = this.available_amount.sub(result);
    this.available_shares = this.available_shares.sub(wanted);

    return result;
  }
}

export class MoneyDistributor2 {
  private available_amount: Money;
  private available_shares: Money;

  constructor(total: Money, shares: Money) {
    this.available_amount = total;
    this.available_shares = shares;
  }

  get remaining_amount() {
    return this.available_amount;
  }
  get remaining_shares() {
    return this.available_shares;
  }

  take(wanted_shares: Money){
    let wanted = wanted_shares;

    if(wanted.gt(this.available_shares))throw new Error();

    let result = this.available_amount.mul_div(wanted, this.available_shares);

    this.available_amount = this.available_amount.sub(result);
    this.available_shares = this.available_shares.sub(wanted);

    return result;
  }
}
