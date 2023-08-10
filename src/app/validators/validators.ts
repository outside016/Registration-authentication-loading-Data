import {AbstractControl, FormControl, ValidationErrors} from '@angular/forms'
import {group} from "@angular/animations";


export class MyValidators {

  // create password

  static validPasswords(control: FormControl): ValidationErrors | null {
    const value = control.value;
    const hasNumber = /[0-9]/.test(value);
    const hasCapitalLetter = /[A-ZА-ЯЁ]/.test(value);
    const hasLowercaseLetter = /[a-zа-яё]/.test(value);
    const hasSymbol = /[-`~@#$%&*=_|/'"?,!().^+]/.test(value);

    if (!hasNumber && !(value == null) && !(value.length < 8)) {
      return {invalidPasswordNumber: true};
    }
    if (!hasCapitalLetter && !(value == null) && !(value.length < 8)) {
      return {invalidCapitalLetter: true};
    }
    if (!hasLowercaseLetter && !(value == null) && !(value.length < 8)) {
      return {invalidLowercaseLetter: true};
    }
    if (!hasSymbol && !(value == null) && !(value.length < 8)) {
      return {invalidSymbol: true};
    }
    return null;
  }

  static checkPasswords(control: AbstractControl): ValidationErrors | null {
    const group = control.parent ?? control.root?.get('main');
    if (!group) return null;

    const confirmPass = group.get('passwordCheck')!.value;
    const pass = group.get('password')!.value;
    return !pass || pass === confirmPass ? null : {notSame: true};
  }

  static checkDate(control: AbstractControl): ValidationErrors | null {
    let dateNow = new Date().toDateString();
    let dateBrith = control.value
    if (dateBrith) {
      let sum = Date.parse(dateBrith) - Date.parse(dateNow)
      if (sum < -568036800000) {
        return null
      }
    }
    return {
      checkDate: true
    }
  }
}
