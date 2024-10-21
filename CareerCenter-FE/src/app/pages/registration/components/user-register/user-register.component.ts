import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SignIn } from '../../../../core/models/signin';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUp } from '../../../../core/models/signup';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'svs-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  // title : string = "Sign In";
  // prev : string = "You don't have an account";
  result: any;
  // signFlag: boolean = true;
  flag: boolean = false;
  registerForm!: FormGroup;
  logInForm!: FormGroup;
  signIn!: SignIn;
  signUp!: SignUp;

  /**
   *!this.signFlag?Validators.required:Validators.maxLength(30),Validators.minLength(3)
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.checkForm();

    if (localStorage.getItem('token')) {
      this.router.navigate(['/welcome']);
    }
  }

  checkForm() {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.maxLength(30)]],
      lastname: ['', [Validators.required, Validators.maxLength(30)]],
      username: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          // Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')
        ],
      ],
    });

    this.logInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          // Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')
        ],
      ],
    });
  }

  onSignIn() {
    this.signIn = new SignIn(this.logInForm.value);
    this.authService.signIn(this.signIn).subscribe(
      (res) => {
        console.log(res);
        this.result = '';
        this.refreshUserInfo(res);
        this.router.navigate(['/selection-page']);
        this.toastr.info(
          'Welcome to our website. We hope you enjoy our services and do not forget to discover all the advantages of our website.'
        );
      },
      (error) => {
        this.result = error.error.message;
        this.toastr.error('Not Authenticated');
        this.toastr.info(
          'The account you entered may be wrong or the password may be incorrect. Make sure the data is correct',
          'DelveHub'
        );
      }
    );
  }

  onSignUp() {
    this.signUp = new SignUp(this.registerForm.value);
    console.log(this.registerForm.value);
    this.authService.signUp(this.signUp).subscribe(
      (res) => {
        console.log(res);
        this.result = '';
        this.refreshUserInfo(res);
        this.router.navigate(['/selection-page']);
      },
      (error) => {
        this.result = error.error.message;
        this.toastr.error('Not Valid');
      }
    );
  }

  refreshUserInfo(res: any) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('userId', res.userId);
    localStorage.setItem('userName', res.userName);
    localStorage.setItem('userEmail', res.email);
    localStorage.setItem('firstName', res.firstName);
    localStorage.setItem('lastName', res.lastName);
    localStorage.setItem('roles', JSON.stringify(res.roles));
    console.log(res.firstName);
  }

  toggleFlag() {
    this.flag = !this.flag;
  }
}
