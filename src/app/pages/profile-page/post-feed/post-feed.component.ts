import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  input,
  Output,
  Renderer2
} from '@angular/core';
import {PostInputComponent} from "../post-input/post-input.component";
import {PostComponent} from "../post/post.component";
import {PostService} from "../../../data/servises/post.service";
import {audit, firstValueFrom, fromEvent, interval} from "rxjs";
import {ProfileService} from "../../../data/servises/profile.service";

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [
    PostInputComponent,
    PostComponent
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss'
})
export class PostFeedComponent {
  postService = inject(PostService);
  profile = inject(ProfileService).me;
  hostElement = inject(ElementRef)
  r2 = inject(Renderer2)

  feed = this.postService.posts

  isCommentInput = input(false);
  postId = input<number>(0)
  commentId = input<number>(0)

  @Output() created = new EventEmitter();


  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed()
  }

  constructor() {
    firstValueFrom(this.postService.fetchPost())
  }

  ngAfterViewInit() {
    this.resizeFeed()

    fromEvent(window, 'resize')
      .pipe(
        audit(() => interval(1000))
      )
      .subscribe(() => {
        console.log('3333')
      })

    //ДЗ
  }

  resizeFeed() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 24 - 24;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`)
  }

  onCreatePost(postText: string) {
    if (!this.postService) return

    if (this.isCommentInput()) {
      firstValueFrom(this.postService.createComment({
        text: postText,
        authorId: this.profile()!.id,
        postId: this.postId(),
        commentId: this.commentId()
      })).then(() => {
        postText = ''
        this.created.emit()
      })
      return;
    }


    firstValueFrom(this.postService.createPost({
      title: 'Перввый пост',
      content:postText,
      authorId: this.profile()!.id,
    })).then(() => postText = '')
    return;
  }
}
