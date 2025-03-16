import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  input,
  Output,
  Renderer2,
} from '@angular/core';
import { audit, firstValueFrom, fromEvent, interval } from 'rxjs';
import { PostInputComponent } from '../../ui';
import { PostComponent } from '../index';
import { Post, PostComment, PostService } from '@tt/data-access/posts';
import { ProfileService } from '@tt/data-access/profile';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent {
  postService = inject(PostService);
  profile = inject(ProfileService).me;
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);

  feed = this.postService.posts;
  post = input<Post>();
  comment = input<PostComment>();
  @Output() created = new EventEmitter<string>();

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed();
  }

  constructor() {
    this.loadPosts();
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

  private loadPosts() {
    firstValueFrom(this.postService.fetchPost())
      .then((posts) => {
        this.feed.set(posts);
      })
      .catch((err) => {
        console.log('Error loading posts', err);
      });
  }

  onCreatePost(postText: string) {
    if (!postText) return;

    firstValueFrom(
      this.postService.createPost({
        title: 'Перввый пост',
        content: postText,
        authorId: this.profile()!.id,
        communityId: this.post()!.communityId,
      })
    ).then(() => {
      this.created.emit();
      this.loadPosts();
    });
    return;
  }
}
