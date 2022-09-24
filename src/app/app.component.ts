import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isfetching = false;
  error = null;
  private errorSub: Subscription

  constructor(private http: HttpClient, private ps: PostsService) {}

  ngOnDestroy(): void {
   this.errorSub.unsubscribe()
  }

  ngOnInit() {
    this.errorSub = this.ps.error.subscribe(errmsg => {
      this.error = errmsg
    })

    this.isfetching = true;
    this.ps.fetchPosts().subscribe(posts => {
      this.isfetching = false;
      this.loadedPosts = posts;
    })
  }

  onCreatePost(postData: Post) {
    this.ps.saveAndUpdate(postData);
  }

  onFetchPosts() {
    this.isfetching = true;
    this.ps.fetchPosts().subscribe(posts => {
      this.isfetching = false;
      this.loadedPosts = posts;
    }, error => {
      console.log(error);
      this.isfetching = false;
      this.error = error.message
    })
  }
  

  onClearPosts() {
    this.ps.deleteposts().subscribe((res) => {
      // console.log(res);
      this.loadedPosts = [];
    })
  }

  onhandleerror() {
    this.error = null
  }


}
