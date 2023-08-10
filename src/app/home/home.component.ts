import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MyValidators} from "../validators/validators";
import {HttpService} from "../http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  error: string = ''

  form = this.fb.group({
    name: new FormControl(null, [
      Validators.required,
      Validators.maxLength(32),
      Validators.pattern('^[A-Za-zА-Яа-яЁё \s \w-]+$')
    ]),
    lastname: new FormControl(null, [
      Validators.required,
      Validators.maxLength(32),
      Validators.pattern('^[A-Za-zА-Яа-яЁё \s \w-]+$')
    ]),
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      MyValidators.validPasswords
    ]),
    passwordCheck: new FormControl(null, [
      Validators.required,
      MyValidators.checkPasswords
    ]),
    dateOfBirth: new FormControl(null, [
      Validators.required,
      MyValidators.checkDate
    ])
  })


  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(() => {
      }
    )
  }


  submit(): void {
    if (this.form.valid) {
      const dateOfBirth = this.form.get('dateOfBirth')?.value
      const passwordCheck = this.form.get('passwordCheck')?.value
      const password = this.form.get('password')?.value
      const email = this.form.get('email')?.value
      const lastname = this.form.get('lastname')?.value
      const name = this.form.get('name')?.value

      this.httpService.addUser({
        name,
        lastname,
        email,
        password,
        passwordCheck,
        dateOfBirth
      }).subscribe(() => {
        this.router.navigate(['/auth'])
        this.form.reset()
      }, error => {
        this.error = error.message
      })
    }
  }
}
