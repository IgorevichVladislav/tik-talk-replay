import {Component, HostBinding, inject, input, OnInit, signal} from '@angular/core';
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
import {ProfileService} from "../../../data/servises/profile.service";

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
  profile = inject(ProfileService).me;
  post = input<Post>()
  comment = input<PostComment>()
  isCommentInput = input(false);

  comments = signal<PostComment[]>([])

  postService = inject(PostService);

  @HostBinding('class.dashed-comment')
  get isComment() {
    return this.isCommentInput();
  }

  async ngOnInit() {
    this.comments.set(this.post()!.comments)
  }

  async onCreated(commentText: string) {

    firstValueFrom(this.postService.createComment({
      text: commentText,
      authorId: this.profile()!.id,
      postId: this.post()!.id,
      commentId: this.comment()?.id
    })).then(async () => {
      const comment = await firstValueFrom(this.postService.getCommentsByPostId(this.post()!.id))
      this.comments.set(comment)
    })
    return;
  }

}
