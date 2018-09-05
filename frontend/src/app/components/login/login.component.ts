import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { UserService } from '../../shared/services/user.service';
import { CostumValidations } from '../costum-validations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  obj: typeof Object = Object;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) {

    // reset login status
    this.userService.logout();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', CostumValidations.createValidatorArr("name", 3, 15)),
      password: new FormControl('', CostumValidations.createValidatorArr("password", 5, 10))
    });



  }
  //get form fields:
  get formControls() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (!this.loginForm.invalid) {
      this.userService.login(this.formControls.username.value, this.formControls.password.value).subscribe(res => {
        if (res) {
          this.userService.logUserIn(res);
          
        }
        else  swal({
          title: 'This user does not exist!',
          type: 'warning',
          confirmButtonText: 'OK'
        })


      });


    }

  }

}


