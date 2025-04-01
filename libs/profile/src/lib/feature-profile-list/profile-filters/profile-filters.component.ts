import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule
} from '@angular/forms';
import { debounceTime, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SvgIconComponent } from '@tt/common-ui';
import { profileActions } from '@tt/data-access/profile';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile-filters',
  imports: [ReactiveFormsModule, SvgIconComponent],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
  standalone: true
})
export class ProfileFiltersComponent {
  fb = inject(FormBuilder);
  store = inject(Store);


  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: ['']
  });

  constructor() {
    this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(500),
        takeUntilDestroyed()
      )
      .subscribe(formValue => {
        this.store.dispatch(profileActions.filterEvents({ filters: formValue }));
        //При изменении формы, диспатчим action
      });
  }
}
