import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ProfileService } from '../../data';
import { ProfileCardComponent } from '../../ui';
import { ProfileFiltersComponent } from '../../feature-profile-list';


@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCardComponent, ProfileFiltersComponent, AsyncPipe],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  profileService = inject(ProfileService);
  profiles = this.profileService.filteredProfiles;
}
