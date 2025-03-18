import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ProfileCardComponent } from '../../ui';
import { ProfileFiltersComponent } from '../../feature-profile-list';
import { ProfileService } from '@tt/data-access/profile';


@Component({
    selector: 'app-search-page',
    imports: [ProfileCardComponent, ProfileFiltersComponent, AsyncPipe],
    templateUrl: './search-page.component.html',
    styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  profileService = inject(ProfileService);
  profiles = this.profileService.filteredProfiles;
}
