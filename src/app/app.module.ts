// App Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@auth0/auth0-angular';
import {IvyCarouselModule} from 'angular-responsive-carousel';

// App components
import { AppComponent } from './app.component';
import { MarkdownPreviewComponent } from './components/markdown-preview/markdown-preview.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';

import { ClipboardModule } from '@angular/cdk/clipboard';
import { Auth0Service } from './services/auth0.service';
import { environment } from 'src/environments/environment';
import { IndexComponent } from './pages/index/index.component';
import { SecurityContext } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SupabaseService } from './services/supabase.service';
import { MyThemesComponent } from './pages/my-themes/my-themes.component';
import { NewThemeComponent } from './pages/new-theme/new-theme.component';
import { ThemeContainerComponent } from './components/theme-container/theme-container.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { PublicThemeContainerComponent } from './components/public-theme-container/public-theme-container.component';

@NgModule({
  declarations: [
    AppComponent,
    MarkdownPreviewComponent,
    NavigationComponent,
    AuthButtonComponent,
    IndexComponent,
    NotAuthorizedComponent,
    NotFoundComponent,
    MyThemesComponent,
    NewThemeComponent,
    ThemeContainerComponent,
    ExploreComponent,
    PublicThemeContainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MarkdownModule.forRoot({sanitize: SecurityContext.NONE}),
    BrowserAnimationsModule,
    AuthModule.forRoot({
      domain: environment.auth.domain,
      clientId: environment.auth.client_id
    }), 
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule,
    IvyCarouselModule,
  ],
  providers: [Auth0Service, SupabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
