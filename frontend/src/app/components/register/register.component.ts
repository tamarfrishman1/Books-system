import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import swal from 'sweetalert2'
import { CostumValidations } from '../costum-validations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  obj: typeof Object = Object;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: new FormControl('', CostumValidations.createValidatorArr("firstnsame", 2, 15)),
      lastname: new FormControl('', CostumValidations.createValidatorArr("lastname", 2, 15)),
      username: new FormControl('', CostumValidations.createValidatorArr("username", 3, 15)),
      password: new FormControl('', CostumValidations.createValidatorArr("password", 5, 10))
    });
  }

  //get form fields:
  get formControls() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (!this.registerForm.invalid) {
      this.userService.register(JSON.stringify(this.registerForm.value)).subscribe(info=>{
      if(!info)
      swal({
        title: 'This user already exists!',
        text: 'please change either username nor password',
        type: 'error',
        confirmButtonText: 'OK'
      })
      else
      {
        this.userService.logUserIn(info);
        swal({
          title: 'This user was added successfully!',
          type: 'success',
          confirmButtonText: 'OK'
        })}
      });
    }
  }
}
