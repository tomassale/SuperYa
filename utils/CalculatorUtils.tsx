export class Calculator{
  private readonly number1: number;
  private readonly number2: number;

  constructor(number1: number, number2: number){
    this.number1 = number1;
    this.number2 = number2;
  }

  sum(): number {
    return this.number1 + this.number2;
  }

  subtract(): number {
    return this.number1 - this.number2;
  }

  multiply(): number {
    return this.number1 * this.number2;
  }

  divide(): number {
    if(this.number2 === 0) throw new Error("Cannot divide by zero");
    return this.number1 / this.number2;;
  }

  percentage(): number {
    if(this.number2 === 0) return 0;
    return (this.number1 * 100) / this.number1;
  }
}