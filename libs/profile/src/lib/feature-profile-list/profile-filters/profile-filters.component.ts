import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule
} from '@angular/forms';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SvgIconComponent } from '@tt/common-ui';
import { profileActions, selectedSavedFilters } from '@tt/data-access/profile';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile-filters',
  imports: [ReactiveFormsModule, SvgIconComponent],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
  standalone: true
})
export class ProfileFiltersComponent implements OnInit {
  fb = inject(FormBuilder);
  store = inject(Store);
  savedFilters = this.store.selectSignal(selectedSavedFilters);

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: ['']
  });

  constructor() {

    this.searchForm.valueChanges
      .pipe(
        debounceTime(500),
        takeUntilDestroyed()
      )
      .subscribe(formValue => {
        this.store.dispatch(profileActions.saveResults({ saveFilters: formValue }));
        this.store.dispatch(profileActions.filterEvents({ filters: formValue }));
      });

  }

  ngOnInit() {
    this.searchForm.patchValue(this.savedFilters())
  }
}
