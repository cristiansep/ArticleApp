import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewArticleComponent } from './pages/new-article/new-article.component';
import { ArticleListComponent } from './pages/article-list/article-list.component';

const routes: Routes = [
  { path: 'new-article', component: NewArticleComponent },
  { path: 'edit/:id', component: NewArticleComponent},
  { path: 'list', component: ArticleListComponent},
  { path: '**', redirectTo: 'list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
