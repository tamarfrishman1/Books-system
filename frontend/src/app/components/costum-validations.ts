import { ValidatorFn } from "@angular/forms";

export class CostumValidations {
    constructor() {  
    }
   static createValidatorArr(cntName: string, min: number, max: number): Array<ValidatorFn> {
        let arrErrors = [];
        arrErrors.push(f => f.touched && !f.value ? { "val": `${cntName} is required` } : null);
        arrErrors.push(f => f.value && f.value.length > max ? { "val": `${cntName} is max ${max} chars` } : null);
        arrErrors.push(f => f.value && f.value.length < min ? { "val": `${cntName} is min ${min} chars` } : null);
        if (cntName != "password")
          arrErrors.push(f => f.value && !f.value.match(/[a-z]/i) ? { "val": `${cntName} must contains English chars` } : null);
        return arrErrors;
      }
}