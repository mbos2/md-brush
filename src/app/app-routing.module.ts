import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MarkdownPreviewComponent } from './components/markdown-preview/markdown-preview.component';
import { IndexComponent } from './pages/index/index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'generate',
    component: MarkdownPreviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
