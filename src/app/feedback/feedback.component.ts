import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ProjectService } from '../service/project.service';
import { CreatePostModalComponent } from '../create-post-modal/create-post-modal.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgMultiSelectDropDownModule,
    RouterLink,
    FontAwesomeModule
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent implements OnInit{

  
  faArrowUp = faArrowAltCircleUp
  faArrowDown = faArrowAltCircleDown

  showComments:boolean = false

  eventsList:any = [];
  loggedInDetails: any = {}
  loggedInUserID: any
  loggedIn: boolean = false;
  allowedToGiveFeedback: boolean = false

  ticketCount:any = 0

  constructor(public dialog: MatDialog, private _projectService: ProjectService){}

  ngOnInit(): void {

    //Login Logout Check
    let loggedInX = localStorage.getItem('loggedInUser')
    if (loggedInX !== null) {
      this.loggedInDetails = JSON.parse(loggedInX);
      this.loggedInUserID = Number(this.loggedInDetails.id)
      this.loggedIn = true
    } else {
      this.loggedIn = false
    }

    this._projectService.getFeedbacks().subscribe((res:any)=>{
      console.log("Feedbacks:-----------------------  ", res);
      if(res.status == 1){
        console.log(res.feedback)
        this.eventsList = res.feedback;
      }else{
        this.eventsList = []
      }
    })

    // let postListX:any = localStorage.getItem('postsList');
    // console.log("Post List: ", postListX)
    // this.postsList = JSON.parse(postListX);
    // console.log("Post List: ", this.postsList)
  }

  upLikePost(postID:any){
    //console.log("Post ID: ", postID);
    //console.log(this.postsList.find(x=>x.postID == postID));
    // let post = this.postsList.find((x:any)=>x.postID == postID)
    // post.postUpLikes = post.postUpLikes+1;
  }

  downLikePost(postID:any){
    //console.log("Post ID: ", postID);
    //console.log(this.postsList.find(x=>x.postID == postID));
    // let post = this.postsList.find((x:any)=>x.postID == postID)
    // post.postDownLikes = post.postDownLikes-1;
    //console.log("post Updated: ", post);
  }

  showCommentsArea(){
    this.showComments = true
  }
  openCreatePostModal(){
    if (!this.loggedIn) {
      this.allowedToGiveFeedback = true
      var _popupLogin = this.dialog.open(LoginComponent, {
        width: '60%',
        data: {
          title: "Login"
        }
      })
    } else {
      this.allowedToGiveFeedback = false
      var _popup = this.dialog.open(CreatePostModalComponent, {
        width: '60%',
        
      })
      _popup.afterClosed().subscribe((item:any)=>{
        //console.log("Post DetailsX:", item)
        //this.postsList = item;
        //localStorage.setItem('postsList', JSON.stringify(this.postsList));
        // var FoundIndex = this.projectList.findIndex((x:any)=>x.id == item.id)
        // this.projectList[FoundIndex] = item
        // localStorage.setItem('projects', JSON.stringify(this.projectList));
        /* const ObjectToReplace = this.projectList.find((x:any)=>{
          x.id == item.id
        })
        console.log("Object To Replace:", ObjectToReplace) */
      })
    }



    
  }

  increasetTicket(){
    
    this.ticketCount++;
  }

  decreasetTicket(){
    if(this.ticketCount > 0){
      this.ticketCount--;
    }
    
  }

  getTickets(event:any){
    if(this.ticketCount >0){
      alert(this.ticketCount+ " ticket reserved for event: "+ event.eventName);
      this.ticketCount = 0;
    }
    
  }

  

}
