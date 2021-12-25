import { Money } from ".";

function test(a: string, b: number){
  if(Money.parse_str(a)?._v !== Money.from_num(b)._v)throw new Error(`${a} !== ${b}`);
}
function test2(a: string, b: string){
  if(Money.parse_str(a)?.to_str() !== b)throw new Error(`${a} !== ${b}`);
}
function test3(a: Money, b: string){
  if(a.to_str() !== b)throw new Error(`${a.to_str()} !== ${b}`);
}

test(".", 0);
test("0.", 0);
test("0.0", 0);
test(".0", 0);
test("+.", 0);
test("+0.", 0);
test("+0.0", 0);
test("+.0", 0);
test("-.", 0);
test("-0.", 0);
test("-0.0", 0);
test("-.0", 0);

test("1.", 1);
test("1.1", 1.1);
test(".1", .1);
test("+1.", 1);
test("+.1", .1);
test("+1.1", 1.1);
test("-1.", -1);
test("-.1", -.1);
test("-1.1", -1.1);

test2(".", "0.00");
test2("0.", "0.00");
test2("0.0", "0.00");
test2(".0", "0.00");
test2("+.", "0.00");
test2("+0.", "0.00");
test2("+0.0", "0.00");
test2("+.0", "0.00");
test2("-.", "0.00");
test2("-0.", "0.00");
test2("-0.0", "0.00");
test2("-.0", "0.00");
test2("1.",   "1.00");
test2("1.1",  "1.10");
test2(".1",   "0.10");
test2("+1.",  "1.00");
test2("+.1",  "0.10");
test2("+1.1", "1.10");
test2("-1.",  "-1.00");
test2("-.1",  "-0.10");
test2("-1.1", "-1.10");

test3(Money.from_num(1).div(Money.from_num(2)), "0.50");
test3(Money.from_num(1).mul(Money.from_num(2)), "2.00");
test3(Money.from_num(0.05).div(Money.from_num(2)), "0.03");
test3(Money.from_num(0.05).mul(Money.from_num(0.5)), "0.03");
test3(Money.from_num(0.03).div(Money.from_num(2)), "0.02");
test3(Money.from_num(0.03).mul(Money.from_num(0.5)), "0.02");
test3(Money.from_num(800).mul(Money.from_num(0.15)).div(Money.from_num(1.15)), "104.35");
test3(Money.from_num(817).mul(Money.from_num(0.15)).div(Money.from_num(1.15)), "106.57");
test3(Money.from_num(841).mul(Money.from_num(0.15)).div(Money.from_num(1.15)), "109.70");
