import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { UserComment } from "../utilities/user-comment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SiteService } from "../services/site.service";

@Component({
    selector: 'svs-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css'],
    
})
export class WelcomeComponent implements OnInit,OnDestroy {

    comments: UserComment[] = [];
    commentsNum: number = 0;
    commentForm!: FormGroup;

    private subs: Subscription = new Subscription();
    /**
     *
     */
    constructor(private siteService: SiteService,
                private fb: FormBuilder) {}

    ngOnInit(): void {
        this.getComments();
        this.commentForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            text: ['', [Validators.required, Validators.maxLength(300)]],
            createdDate: [new Date()]
        })
    }

    getComments() {
        this.siteService.getComments().subscribe(res => {
            this.comments = res;
            this.commentsNum = this.comments.length;
        })
    }

    onComment() {
        var newComment = new UserComment(this.commentForm.value);
        this.siteService.addComment(newComment).subscribe(res => {
            this.getComments();
            this.commentForm.reset();
        })
    }
    ngOnDestroy(): void {
        
    }

}