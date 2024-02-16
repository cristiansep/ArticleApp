import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environmets } from '../environments/environments';
import { Article, ArticleResponse } from '../interfaces/article.interface';

@Injectable({providedIn: 'root'})
export class ArticleService {


    private baseUrl: string = environmets.baseUrlNews;
    private rapidKey: string = environmets.rapidKey;
    private rapidHost: string = environmets.rapidHost;

    constructor(private httpClient: HttpClient) { }

    getArticles():Observable<Article[]> {

        const headers = new HttpHeaders({
            'X-RapidAPI-Key': this.rapidKey,
            'X-RapidAPI-Host': this.rapidHost
        });
    
        const url = `${this.baseUrl}/top-headlines`;
        return this.httpClient.get<ArticleResponse>(url, { headers: headers })
        .pipe(
            map(response => {
              const articlesWithId = response.articles.map(article => ({
                ...article,
                id: Math.floor(Math.random() * 1000) + 1
              }));
              
              return articlesWithId;
            })
          );
    }
    
}