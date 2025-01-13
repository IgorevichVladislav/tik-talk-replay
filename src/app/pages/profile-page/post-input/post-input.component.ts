import {
  Component,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  input,
  numberAttribute,
  Output,
  Renderer2
} from '@angular/core';
import {ProfileService} from "../../../data/servises/profile.service";
import {AvatarCircleComponent} from "../../../common-ui/avatar-circle/avatar-circle.component";
import {NgIf} from "@angular/common";
import {SvgIconComponent} from "../../../common-ui/svg-icon/svg-icon.component";
import {PostService} from "../../../data/servises/post.service";
import {FormsModule} from "@angular/forms";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    NgIf,
    SvgIconComponent,
    FormsModule
  ],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss'
})
export class PostInputComponent {

  r2 = inject(Renderer2);
  isCommentInput = input(false);


  profile = inject(ProfileService).me;

  @Input() placeholderText = 'Напишите что-нибудь'

  @HostBinding('class.dashed-comment')
  get isComment() {
    return this.isCommentInput();
  }

  postText = ''

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }



}
