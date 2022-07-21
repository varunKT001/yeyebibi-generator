export class YeyeBibiConverter {
  private outputString: string = '';

  constructor(private inputString: string) {}

  get input() {
    return this.inputString;
  }

  get output() {
    return this.outputString;
  }

  stringToAscii(): string {
    const arr: number[] = [];

    for (let i = 0; i < this.inputString.length; i++) {
      const charCode = this.inputString.charCodeAt(i);

      arr.push(charCode);
    }

    const str = arr.join(' ');

    return str;
  }

  ternaryToDecimal(i: number): number {
    let decimal = 0;

    let base = 1;

    let temp = i;
    while (temp) {
      const lastDigit = temp % 10;
      temp = parseInt(`${temp / 10}`);

      decimal += lastDigit * base;

      base = base * 4;
    }

    return decimal;
  }

  decimalToTernary(i: number): string {
    let arr: number[] = [];

    while (i !== 0) {
      arr.push(i % 4);
      i = parseInt(`${i / 4}`);
    }

    arr.reverse();

    const str = arr.join('');

    return str;
  }

  yeyeBibiMap() {
    return ['yeye', 'bibi', 'yeyebibi', 'bibiyeye'];
  }

  toYeyeBibi(str: string): string {
    const map = this.yeyeBibiMap();

    let arr: string[] = [];

    for (let i = 0; i < str.length; i++) {
      const numberAtI = parseInt(str.charAt(i));

      arr.push(map[numberAtI]);
    }

    const yeyeBibiString = arr.join(' ');

    return yeyeBibiString;
  }

  encode() {
    const arr: string[] = [];

    for (let i = 0; i < this.inputString.length; i++) {
      const charCode = this.inputString.charCodeAt(i);

      const ternary = this.decimalToTernary(charCode);

      const yeyeBibiText = this.toYeyeBibi(ternary);

      arr.push(yeyeBibiText);
    }

    const str = arr.join(', ');

    this.outputString = str;
  }

  decode() {
    const inputStringArray: string[] = this.inputString.split(', ');
    const map = this.yeyeBibiMap();

    let output = '';

    for (let i = 0; i < inputStringArray.length; i++) {
      const arr = inputStringArray[i].split(' ');

      let str = '';

      for (let j = 0; j < arr.length; j++) {
        const element = map.indexOf(arr[j]);

        str += element;
      }

      const ternary = parseInt(str);

      const decimal = this.ternaryToDecimal(ternary);

      output += String.fromCharCode(decimal);
    }

    this.outputString = output;
  }
}
