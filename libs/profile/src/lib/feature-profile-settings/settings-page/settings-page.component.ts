import { Component, effect, inject, input, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { SvgIconComponent } from '@tt/common-ui';
import { Profile } from '@tt/interfaces/profile';
import { AvatarUploadComponent, ProfileHeaderComponent } from '../../ui';
import { ProfileService } from '../../data';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule,
    SvgIconComponent,
    AvatarUploadComponent,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  profile = input<Profile>();
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);
  router = inject(Router);

  profile$ = toObservable(this.profileService.me);

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent;

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
  });

  constructor() {
    // effect работает каждый раз, когда любой  из сигналов в этой функции поменяется
    //В данном коде patchValue() — это метод формы в Angular,
    // который используется для обновления значений полей в FormGroup или FormControl.
    // В отличие от setValue(), метод patchValue() позволяет обновить только определенные
    // поля формы, оставляя остальные без изменений.
    effect(() => {
      this.form.patchValue({
        //@ts-ignore
        ...this.profileService.me(),
        stack: this.mergeStack(this.profileService.me()?.stack),
      });
    });
  }

  onSave() {
    this.form.markAllAsTouched();
    //Назначение: Этот метод отмечает все контролы формы как «затронутые» (touched).
    this.form.updateValueAndValidity();
    //Назначение: Этот метод обновляет состояние валидности (validity) и значение (value)

    if (this.form.invalid) return;

    if (this.avatarUploader.avatar) {
      // Если есть Аватар (Файл картики), то загружаем
      firstValueFrom(
        this.profileService.uploadAvatar(this.avatarUploader.avatar)
      );
    }

    firstValueFrom(
    //@ts-ignore
      this.profileService.patchProfile({
        ...this.form.value,
        stack: this.splitStack(this.form.value?.stack),
      })
    );
  }

  splitStack(stack: string | string[] | null | undefined): string[] {
    if (!stack) return [];
    return Array.isArray(stack) ? stack : stack.split(', ');
  }

  mergeStack(stack: string | string[] | null | undefined): string {
    if (!stack) return '';
    return Array.isArray(stack) ? stack.join(', ') : stack;
  }
}
