import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { Pageble } from '@tt/shared';
import { Profile } from '@tt/interfaces/profile';
import { GlobalStoreService } from '@tt/shared';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/account/';

  #globalStoreService = inject(GlobalStoreService);
  me = signal<Profile | null>(null);

  filteredProfiles = signal<Profile[]>([]);

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}me`).pipe(
      tap((res) => {
        this.me.set(res);
        this.#globalStoreService.me.set(res)
      })
    );
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}${id}`);
  }

  getSubscribersShortList(subCount: number) {
    return this.http
      .get<Pageble<Profile>>(`${this.baseApiUrl}subscribers/`)
      .pipe(map((res) => res.items.slice(0, subCount)));
  }

  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(`${this.baseApiUrl}me`, profile);
  }

  uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append('image', file);

    return this.http.post<Profile>(`${this.baseApiUrl}upload_image`, fd);
  }

  filterProfiles(params: Record<string, any>) {
    return this.http
      .get<Pageble<Profile>>(`${this.baseApiUrl}accounts`, { params })
      .pipe(
        tap((res) => {
          this.filteredProfiles.set(res.items);
        })
      );
  }
}
