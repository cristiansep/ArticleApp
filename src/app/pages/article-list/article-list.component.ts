import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../interfaces/article.interface';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html'
})
export class ArticleListComponent implements OnInit {
  public articles: Article[] = [];
  public loading: boolean = true;
  private isFirstLoad: boolean = true;

  constructor(
    private articleService: ArticleService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const storedArticles = localStorage.getItem('articles');

    if (this.isFirstLoad && storedArticles) {
      this.articles = JSON.parse(storedArticles) as Article[];
      this.loading = false;
      if (this.articles.length <= 0) {
        this.loadArticles();
      }
    } else {
      this.loadArticles();
    }

    this.isFirstLoad = false;
  }
  


  loadArticles() {
    this.articleService.getArticles().subscribe(
      (articles: Article[]) => {
        if (!this.isFirstLoad) {
          localStorage.setItem('articles', JSON.stringify(articles));
        }

        this.articles = articles;
        this.loading = false;
      },
      error => {
        console.error('Error al obtener los artículos', error);
        this.loading = false;
      }
    );
  }

  loadArticlesStored() {
    const storedArticles = localStorage.getItem('articles');

    if (storedArticles) {
      this.articles = JSON.parse(storedArticles) as Article[];
      this.loading = false;
      if (this.articles.length <= 0) {
        this.loadArticles();
      }
    }
  }

  handleRefresh() {
   this.loadArticlesStored()
  }

}
