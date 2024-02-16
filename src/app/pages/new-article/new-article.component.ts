import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Article } from '../../interfaces/article.interface';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html'
})
export class NewArticleComponent implements OnInit {


  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private snackbar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  urlRegex = '^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$';

  public articleForm:FormGroup = this.fb.group({ 
    id: new FormControl<number | null>(null),       
    title: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),     
    url: new FormControl<string>('', [Validators.required, Validators.pattern(this.urlRegex)]),           
    publicher_name: new FormControl<string>('', [Validators.required, Validators.minLength(3)])
  });

  articles: Article[] = [];
  newArticle: Article = 
  { 
    id: 0, 
    title: '', 
    url: '', 
    published_date: new Date, 
    publisher: {
      name: ""
    }
 };

 get currentArticle(): Article {
  this.newArticle.id = this.articleForm.value.id 
    ? this.articleForm.value.id as number
    : Math.floor(Math.random() * 1000) + 1;
  this.newArticle.title = this.articleForm.value.title as string;
  this.newArticle.url = this.articleForm.value.url as string;
  this.newArticle.published_date = formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ssZ', 'en-US');
  this.newArticle.publisher.name = this.articleForm.value.publicher_name as string;
  return this.newArticle;
}

get isEdit(): boolean {
  return this.router.url.includes('edit') ? true : false;
}


isValidField(field: string): boolean | null {
  return this.articleForm.controls[field].errors && 
         this.articleForm.controls[field].touched
}

getFieldError( field: string ): string | null {
  if ( !this.articleForm.controls[field] ) return null;

  const errors = this.articleForm.controls[field].errors || {};

  for (const key of Object.keys(errors) ) {
    switch( key ) {
      case 'required':
        return 'Este campo es requerido';

      case 'minlength':
        return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;

      case 'pattern':
        return `Debe introducir una URL válida`;
    }
  }

  return null;
}

 ngOnInit() {
  const storedArticles = localStorage.getItem('articles');
  if (storedArticles) {
    this.articles = JSON.parse(storedArticles);
  }

  if(!this.router.url.includes('edit')) return;


  this.activatedRoute.params.subscribe(params => {
    const articleId = params['id']
  
    if (storedArticles) {
      const articles: Article[] = JSON.parse(storedArticles);
      
      const article = articles.find(article => article.id == articleId);

      this.articleForm.reset({
        title: article?.title,
        publicher_name: article?.publisher.name,
        url: article?.url,
        id: article?.id
      })
    }
  });

}

  onSubmit():void {

    if(this.articleForm.invalid) {
      this.articleForm.markAllAsTouched();
      return;
    };
    if(this.articleForm.value.id) {

      const indexToEdit = this.articles.findIndex(article => article.id === this.articleForm.value.id);
      
      if (indexToEdit !== -1) {
        this.articles[indexToEdit] = this.currentArticle;
        localStorage.setItem('articles', JSON.stringify(this.articles));
      }
      this.showSnackbar('Artículo actualizado correctamente')
      return;

    }
      this.articles.push({ ...this.currentArticle });
      localStorage.setItem('articles', JSON.stringify(this.articles));
      this.router.navigate(['/edit', this.newArticle.id])
      this.showSnackbar('Artículo creado correctamente');

  }


  showSnackbar(msg: string): void {
    this.snackbar.open(msg, 'Ok', {
      duration: 2500
    })
  }

  goBack():void {
    this.router.navigate(['/'])
  }

}
