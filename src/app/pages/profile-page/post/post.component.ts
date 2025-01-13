import {Component, inject, input, OnInit, signal} from '@angular/core';
import {PostService} from "../../../data/servises/post.service";
import {PostComment, Post} from "../../../data/interfaces/post.interface";
import {AvatarCircleComponent} from "../../../common-ui/avatar-circle/avatar-circle.component";
import {DatePipe} from "@angular/common";
import {SvgIconComponent} from "../../../common-ui/svg-icon/svg-icon.component";
import {PostInputComponent} from "../post-input/post-input.component";
import {DndDirective} from "../../../common-ui/directives/dnd.directive";
import {CommentComponent} from "./comment/comment.component";
import {firstValueFrom} from "rxjs";
import {TimeAgoPipe} from "../../../helpers/pipes/time-ago.pipe";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    DatePipe,
    SvgIconComponent,
    PostInputComponent,
    DndDirective,
    CommentComponent,
    TimeAgoPipe
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  post = input<Post>()

  comments = signal<PostComment[]>([])

  postService = inject(PostService);

  async ngOnInit() {
    this.comments.set(this.post()!.comments)
  }

  async onCreated() {
    const comment = await firstValueFrom(this.postService.getCommentsByPostId(this.post()!.id))
    this.comments.set(comment)
  }
}
