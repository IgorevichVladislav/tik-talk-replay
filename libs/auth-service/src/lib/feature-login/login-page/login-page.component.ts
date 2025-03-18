import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { SvgIconComponent } from '@tt/common-ui';
import { AuthService } from '@tt/data-access/auth/service/auth.service';


@Component({
    selector: 'app-login-page',
    imports: [ReactiveFormsModule, SvgIconComponent],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  authService = inject(AuthService);
  router = inject(Router);
  isPasswordVisible = signal<boolean>(false);

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
//@ts-ignore
      this.authService.login(this.loginForm.value).subscribe((res) => {
        this.router.navigate(['']);
        console.log(res);
      });
    }
  }
}
