import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from '../../interfaces/article.interface';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-article',
  templateUrl: './card-article.component.html',
  styleUrl: './card-article.component.css'
})
export class CardArticleComponent implements OnInit {

  @Output() refreshEvent = new EventEmitter<void>();

  @Input()
  public article!:Article;
  articles: Article[] = [];

  ngOnInit(): void {
    if(!this.article) throw Error( "No se ha pasado ningun articulo" );

    const storedArticles = localStorage.getItem('articles');
    if (storedArticles) {
      this.articles = JSON.parse(storedArticles) as Article[];
    }
  }

  constructor(
    public dialog: MatDialog,
    private router:Router
  ) {}


  onConfirmDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.article
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;
      this.onDelete()
    });
  }


  onDelete() {
    const indexToDelete = this.articles.findIndex(art => art.id === this.article.id);

    if (indexToDelete !== -1) {
      this.articles.splice(indexToDelete, 1);
      localStorage.setItem('articles', JSON.stringify(this.articles));
      // this.router.navigate(['/']);
      this.refreshEvent.emit();
    }
  }

  getLargeText(text: string): string {
    return text.length > 20 ? text.slice(0, 20) + '...' : text;
  }

}
