import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommentService } from '../service/comment/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  commentForm: any;
  id: any;
  sub: any;
  currentUser: any;
  comments: any;
  

  constructor(
    private commentService: CommentService,
    private _fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.commentForm = this._fb.group({
      content: new FormControl('')
    });
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.currentUser = localStorage.getItem("currentUser");
      this.getAllComment(this.id);
    })
  }

  comment(comment: any) {
    let body = { 'item_id': this.id, comment };
    this.commentService.sendComment(body).subscribe(data => {
      if (data.status == 'no_content') {
        alert('You have to buy this product to review!');
      }
      else
        this.comments.push(data);
    });
    this.commentForm.controls['content'].setValue('');
  }

  getAllComment(id){
    this.commentService.getAllComment(id).subscribe(data => {
      this.comments = data;
    })
  }

}
