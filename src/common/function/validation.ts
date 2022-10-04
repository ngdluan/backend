import { fail } from "../const";
import { throwError } from "./";

class V {
  fail: string[] = [];
  regexCheck = "";
  checkOptional: boolean;
  constructor(public str: any, public key = "", public isOptional = false) {
    this.checkOptional =
      this.isOptional && (this.str === null || this.str === undefined);
  }
  regex(r: RegExp) {
    if (this.checkOptional) return this;
    const result = r.test(this.str);
    if (!result) {
      this.fail.push(this.regexCheck === "" ? fail.regex : this.regexCheck);
      throwError(`${this.key}${this.fail[0]}`, 500, "hjaha");
    }
    this.regexCheck = "";
    return this;
  }

  isEmail() {
    this.regexCheck = fail.isEmail;
    return this.regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  }

  haveSpecial() {
    this.regexCheck = fail.haveSpecial;
    return this.regex(/[!@#$%^&*()_+-={}|:"<>?,./;'[]\]/g);
  }

  haveNomalChar() {
    this.regexCheck = fail.haveNomalChar;
    return this.regex(/[a-z]/g);
  }

  haveUpperChar() {
    this.regexCheck = fail.haveUpperChar;
    return this.regex(/[A_Z]/g);
  }

  haveNumber() {
    this.regexCheck = fail.haveNumber;
    return this.regex(/[0-9]/g);
  }

  isString() {
    if (this.checkOptional) return this;
    if (!(typeof this.str === "string")) throwError(this.key + fail.isString);
    return this;
  }

  isNumber() {
    if (this.checkOptional) return this;
    if (!(typeof this.str === "number")) throwError(this.key + fail.isNumber);
    return this;
  }

  isNotEmpty() {
    if (this.checkOptional) return this;
    if (this.str === undefined || this.str === null)
      throwError(this.key + fail.isNotEmpty);
    return this;
  }

  isArray() {
    if (this.checkOptional) return this;
    if (!Array.isArray(this.str)) throwError(this.key + fail.isArray);
    return this;
  }

  isUndefined() {
    if (this.checkOptional) return this;
    if (!this.str === undefined) throwError(this.key + fail.isUndefined);
    return this;
  }

  isNull() {
    if (this.checkOptional) return this;
    if (!this.str === null) throwError(this.key + fail.isNull);
    return this;
  }

  isObject() {
    if (this.checkOptional) return this;
    let checkObject =
      typeof this.str === "object" &&
      this.str !== null &&
      Array.isArray(this.str);
    if (!checkObject) throwError(this.key + fail.isObject);
    return this;
  }

  minLen(min: number) {
    if (this.checkOptional) return this;
    if (!this.str?.length || this.str.length < min)
      throwError(this.key + fail.minLen);
    return this;
  }

  maxLen(max: number) {
    if (this.checkOptional) return this;
    if (!this.str?.length || this.str.length > max)
      throwError(this.key + fail.maxLen);
    return this;
  }

  len(min: number, max: number) {
    if (this.checkOptional) return this;
    if (!this.str.length || this.str.length < min || this.str.length > max)
      throwError(this.key + fail.len);
    return this;
  }

  check() {
    return true;
  }
}
export default V;
