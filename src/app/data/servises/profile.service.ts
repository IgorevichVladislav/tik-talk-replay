import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profile} from "../interfaces/profile.interface";
import {Pageble} from "../interfaces/pageble.interfase";
import {map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient)
  baseApiUrl = 'https://icherniakov.ru/yt-course/account/'
  me = signal<Profile | null | undefined>(null)
  filteredProfiles = signal<Profile[]>([])

  constructor() {
  }

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}test_accounts`)
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}me`)
      .pipe(
        tap(res => {
          this.me.set(res)
        })
      )
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}${id}`)
  }


  getSubscribersShortList(subCount: number) {
    return this.http.get<Pageble<Profile>>(`${this.baseApiUrl}subscribers/`)
      .pipe(
        map(res => res.items.slice(0, subCount))
      )

  }

  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(
      `${this.baseApiUrl}me`,
      profile
    )
  }

  uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append("image", file)

    return this.http.post<Profile>(`${this.baseApiUrl}upload_image`, fd)
  }


  filterProfiles(params: Record<string, any>) {
    return this.http.get<Pageble<Profile>>(
      `${this.baseApiUrl}accounts`,
      {params}
    ).pipe(
      tap(res => {
        this.filteredProfiles.set(res.items)
      })
    )
  }

}

