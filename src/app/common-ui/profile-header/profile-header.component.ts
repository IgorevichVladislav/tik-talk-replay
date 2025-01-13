import {Component, inject, input} from '@angular/core';
import {Profile} from "../../data/interfaces/profile.interface";
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";
import {AvatarCircleComponent} from "../avatar-circle/avatar-circle.component";
import {switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {toObservable} from "@angular/core/rxjs-interop";
import {ProfileService} from "../../data/servises/profile.service";

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [
    ImgUrlPipe,
    AvatarCircleComponent
  ],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {
  profile = input<Profile>()

}
