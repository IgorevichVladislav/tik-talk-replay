import {
  Component,
  HostBinding,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { AvatarCircleComponent, DndDirective, SvgIconComponent, TimeAgoPipe } from '@tt/common-ui';
import { ProfileService } from '@tt/profile';
import { CommentComponent, PostInputComponent } from '../../ui';
import { Post, PostComment } from '@tt/interfaces/posts';
import { PostService } from '../../data';

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
    TimeAgoPipe,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  profile = inject(ProfileService).me;
  post = input<Post>();
  comment = input<PostComment>();
  isCommentInput = input(false);

  comments = signal<PostComment[]>([]);

  // @ts-ignore
  postService = inject(PostService);

  @HostBinding('class.dashed-comment')
  get isComment() {
    return this.isCommentInput();
  }

  async ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCreated(commentText: string) {
    firstValueFrom(
      this.postService.createComment({
        text: commentText,
        authorId: this.profile()!.id,
        postId: this.post()!.id,
        commentId: this.comment()?.id,
      })
    ).then(async () => {
      const comment = await firstValueFrom(
        this.postService.getCommentsByPostId(this.post()!.id)
      );
      this.comments.set(comment);
    });
    return;
  }
}
