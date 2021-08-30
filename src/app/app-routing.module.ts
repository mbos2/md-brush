import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownPreviewComponent } from './components/markdown-preview/markdown-preview.component';
import { AuthenticationGuard } from './guards/auth-guard.guard';
import { ExploreComponent } from './pages/explore/explore.component';
import { IndexComponent } from './pages/index/index.component';
import { MyThemesComponent } from './pages/my-themes/my-themes.component';
import { NewThemeComponent } from './pages/new-theme/new-theme.component';
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'theme/:id',
    component: MarkdownPreviewComponent,
  },
  {
    path: 'new',
    component: NewThemeComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'explore',
    component: ExploreComponent,
  },
  {
    path: 'my-themes',
    component: MyThemesComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: 'not-authorized',
    component: NotAuthorizedComponent
  },
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
