import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ProfileService} from "../../../data/servises/profile.service";
import {debounceTime, startWith, switchMap, takeUntil} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {SvgIconComponent} from "../../../common-ui/svg-icon/svg-icon.component";

@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SvgIconComponent
  ],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent {

  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

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
        switchMap(formValue => {
          return this.profileService.filterProfiles(formValue)
        }),
        takeUntilDestroyed()
      )
      .subscribe()
  }
}
