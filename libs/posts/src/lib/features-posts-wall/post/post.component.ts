import {
  Component,
  HostBinding,
  inject,
  input,
  OnInit,
  signal
} from '@angular/core';

import { AvatarCircleComponent, SvgIconComponent, TimeAgoPipe } from '@tt/common-ui';
import { CommentComponent, PostInputComponent } from '../../ui';
import { Post, PostComment } from '@tt/data-access/posts';
import { ProfileService } from '@tt/data-access/profile';
import { Store } from '@ngrx/store';
import { postsActions } from '@tt/data-access/posts/store';

@Component({
  selector: 'app-post',
  imports: [
    AvatarCircleComponent,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
    TimeAgoPipe
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  standalone: true
})
export class PostComponent implements OnInit {
  profile = inject(ProfileService).me;
  post = input<Post>();
  comment = input<PostComment>();
  isCommentInput = input(false);
  store = inject(Store)

  comments = signal<PostComment[]>([]);

  @HostBinding('class.dashed-comment')
  get isComment() {
    return this.isCommentInput();
  }

  async ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCreated(commentText: string) {

    this.store.dispatch(postsActions.createComment({
      commentDto: {
            text: commentText,
            authorId: this.profile()!.id,
            postId: this.post()!.id,
            commentId: this.comment()?.id
      }
    }))
  }
}
