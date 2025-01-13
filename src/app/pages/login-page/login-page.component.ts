import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {SvgIconComponent} from "../../common-ui/svg-icon/svg-icon.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SvgIconComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})

export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);
  isPasswordVisible = signal<boolean>(false)


  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      //@ts-ignore
      this.authService.login(this.loginForm.value)
        .subscribe(res => {
          this.router.navigate(['']);
          console.log(res)
        })
    }
  }
}
