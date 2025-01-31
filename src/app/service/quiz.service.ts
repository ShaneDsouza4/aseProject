import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  url: any = "https://quizapi.io//api/v1/questions";

  quizQuestionList:any = []

  constructor(private http: HttpClient) { 
    //let quizListX:any = localStorage.getItem('quizQuestionList');
    //this.quizQuestionList = JSON.parse(quizListX);
  }

  getQuizQuestions(difficulty:any, limit:number):Observable<any>{
    let headers = {'X-Api-Key': "ZTFIoch3iDITxi0q6Yk294NHbvPz8P24bggcvtT0"};
    return this.http.get(`${this.url}?difficulty=${difficulty}&limit=${5}`, {headers: headers});
  }

  
}
