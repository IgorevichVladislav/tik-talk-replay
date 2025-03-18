import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AvatarCircleComponent } from '@tt/common-ui';
import { PostComment } from '@tt/data-access/posts';


@Component({
    selector: 'app-comment',
    imports: [AvatarCircleComponent, DatePipe],
    templateUrl: './comment.component.html',
    styleUrl: './comment.component.scss'
})
export class CommentComponent {
  comment = input<PostComment>();
}
