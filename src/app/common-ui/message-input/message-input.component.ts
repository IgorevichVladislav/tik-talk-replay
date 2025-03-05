import {Component, EventEmitter, inject, input, Input, Output, Renderer2} from '@angular/core';
import {ProfileService} from "../../data/servises/profile.service";
import {AvatarCircleComponent} from "../avatar-circle/avatar-circle.component";
import {NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SvgIconComponent} from "../svg-icon/svg-icon.component";

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    NgIf,
    ReactiveFormsModule,
    SvgIconComponent,
    FormsModule
  ],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss'
})
export class MessageInputComponent {
  r2 = inject(Renderer2);
  me = inject(ProfileService).me

  @Input() placeholderText = 'Напишите что-нибудь'

  @Output() created = new EventEmitter<string>();
  postId = input<number>(0)

  postText = ''

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  onSend() {
    if (this.postText.trim()) {
      this.created.emit(this.postText);
      this.postText = '';
    }
  }

  onKeyUp() {
    this.onSend()
  }

}
