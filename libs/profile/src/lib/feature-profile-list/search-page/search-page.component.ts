import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileCardComponent } from '../../ui';
import { ProfileFiltersComponent } from '../index';
import { selectFilteredProfiles } from '@tt/data-access/profile';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCardComponent, ProfileFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  standalone: true
})

export class SearchPageComponent {
  store = inject(Store)
  profiles = this.store.selectSignal(selectFilteredProfiles)
  //Достаем из store селект selectFilteredProfiles. Сам select observable, поэтому изменяем его в signal
}
