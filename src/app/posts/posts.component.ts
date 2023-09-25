import {Component, OnInit} from '@angular/core';
import {HttpService, Post} from "../http.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

    posts: Post[] = []
    oldPost: any

    page: number = 1
    count: number = 0
    tableSize: number = 10


    error: string = ''

    formPost = this.fb.group({
        title: new FormControl(null, [
            Validators.required
        ]),
        body: new FormControl(null, [
            Validators.required
        ])
    })


    constructor(
        private httpService: HttpService,
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        this.fetchPosts()
        this.everyMin()
    }

    fetchPosts() {
        this.httpService.fetchPosts()
            .subscribe(posts => {
                this.posts = posts
            })
    }

    everyMin() {
            setInterval(() => {
                this.fetchPosts()
            }, 120000)
    }

    onTableDataChange(event: any) {
        this.page = event
        this.fetchPosts()
    }

    onEdit(postObj: any) {
        this.oldPost = JSON.stringify(postObj)
        this.posts.forEach(element => {
            element.isEdit = false
        })

        postObj.isEdit = true
    }

    onUpdate(post: any) {
        if (post.title && post.body) {
            this.httpService.putPost(post.title, post.body, post.id)
                .subscribe(null, error => {
                    this.error = error.message
                })
            post.isEdit = false
        } else this.onCancel(post)
    }

    onCancel(post: any) {
        const oldPostObj = JSON.parse(this.oldPost)
        post.title = oldPostObj.title
        post.body = oldPostObj.body
        post.isEdit = false
    }


    submit() {
        const title = this.formPost.get('title')?.value
        const body = this.formPost.get('body')?.value
        this.httpService.addPost({
            title,
            body
        }).subscribe(post => {
            this.posts.unshift(post)
            this.formPost.reset()
        }, error => {
            this.error = error.message
        })
    }

    remotePost(id: number | undefined) {
        this.httpService.remotePost(id)
            .subscribe(() => {
                    this.posts = this.posts.filter(p => p.id !== id)
                }, error => {
                    this.error = error.message
                }
            )

    }

}
