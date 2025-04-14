import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  input, OnInit,
  Output,
  Renderer2
} from '@angular/core';
import { audit, firstValueFrom, fromEvent, interval } from 'rxjs';
import { Post, PostComment, PostService } from '@tt/data-access/posts';
import { ProfileService } from '@tt/data-access/profile';
import { PostComponent } from '../post/post.component';
import { PostInputComponent } from '../../ui/post-input/post-input.component';
import { Store } from '@ngrx/store';
import { postsActions, selectPosts } from '@tt/data-access/posts/store';


@Component({
  selector: 'app-post-feed',
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  standalone: true
})
export class PostFeedComponent implements OnInit, AfterViewInit{
  postService = inject(PostService);
  profile = inject(ProfileService).me;
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);
  store = inject(Store);

  feed = this.store.selectSignal(selectPosts)
  post = input<Post>();
  comment = input<PostComment>();
  @Output() created = new EventEmitter<string>();

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed();
  }


  ngAfterViewInit() {
    this.resizeFeed();

    fromEvent(window, 'resize')
      .pipe(audit(() => interval(1000)))
      .subscribe(() => {
        console.log(3333);
        this.resizeFeed();
      });
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 24 - 24;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  onCreatePost(postText: string) {
    if (!postText) return;

    this.store.dispatch(postsActions.createPost({
      postDto: {
            title: 'Первый пост',
            content: postText,
            authorId: this?.profile()!.id,
            // communityId: this.post()!.communityId,
      }
    }))

  }

  ngOnInit() {
    this.store.dispatch(postsActions.fetchPosts({}));

  }
}
