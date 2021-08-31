Hi everyone. In this article I want to show you how to render markdown content on your website or application from local .md files using [ngx-markdown](https://github.com/jfcere/ngx-markdown) library with [HttpClient](https://angular.io/api/common/http/HttpClient) service in Angular.

`ngx-markdown` is an Angular library that combines:

- Marked to parse markdown to HTML
- Prism.js for language syntax highlight
- Emoji-Toolkit for emoji support
- KaTeX for math expression rendering

# Intro

For the purpose of this blog post I will be using latest version of [Angular](https://angular.io/), Angular 12. If you're using older versions of Angular, you can update your CLI and core version of framework with this command: `ng update @angular/cli @angular/core`.
I highly recommend upgrading to Angular 12 as it is packed with new features, uses [Ivy](https://angular.io/guide/ivy) instead of View Engine and has increased performance at rendering and building your application.

You should also have basic understanding of Angular and Typescript for this blog post.

# Setup

First, we need to create new Angular project. We can do that by running a command from `@angular/cli` in an empty folder:

```

ng new markdown-render

```

By running this command it will promt some CLI options for you to choose.

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1628341591091/x0SWSD1Ws.png)

I highly recommend adding angular routing in your project, and choose stylesheet format you prefer to use.
After you chose project options, CLI will generate your project files and install npm modules.

Next we need to install `ngx-markdown` library by running this command:

```

npm i ngx-markdown

```

Great! Now that basic project setup is done, we can create markdown renderer component.

# Creating markdown rendered component

### Add ngx-markdown and Http modules to application

First, as we installed ngx-markdown library, we will import it in our `app.module.ts` file. We also need to import `HttpClientModule` in the same file as it configures dependency injection for `HttpClient`.

Our `app.module.ts` should look like this:

```

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
declarations: [
AppComponent,
],
imports: [
BrowserModule,
AppRoutingModule,
HttpClientModule,
MarkdownModule.forRoot(),
],
providers: [],
bootstrap: [AppComponent]
})
export class AppModule { }

```

### Create markdown file

Now, add markdown file in your application. For the purpose of this blog post, create new folder in your `src` folder called `markdown-files`. Inside that folder create new file called `markdown.md` and populate with some markdown content.
After that, we will add that folder to application assets so we can properly use the path to it with our `HttpClient`.

To add `markdown-files` folder to application assets, open your `angular.json` file and add `"src/markdown-files"` line of code inside `assets` array.

```

"assets": [
"src/favicon.ico",
"src/assets",
"src/markdown-files"
],

```

Do that for both development and production environment.

### Generate markdown component

Now that we imported modules in `app.module.ts`, created markdown file and added it to application assets, it is time to finally create our component.

To generate new component we can use angular cli command:

```

// Long command
ng generate component components/markdown-preview

// Short command
ng g c components/markdown-preview

```

After we generate component we need to import `HttpClient` and `MarkdownService`,. Then we need to initialize them in out component constructor.
After import your component should look like this:

```

import { Component, OnInit } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';

@Component({
selector: 'app-markdown-preview',
templateUrl: './markdown-preview.component.html',
styleUrls: ['./markdown-preview.component.sass']
})
export class MarkdownPreviewComponent implements OnInit {

constructor(private mdService: MarkdownService, private http: HttpClient) { }

ngOnInit(): void { }

}

```

Now, let's add some code to fetch markdown file and render it on our page.

Inside our component class we will define a string variable that will store compiled raw markdown content.
Add it inside component class, on the top:

```

markdown: string | undefined;

```

Then, inside `async ngOnInit()` function we need too add 2 lines od code.
First, we need to get markdown file from our `markdown-files` folder by using `HttpClient`, convert response to type of `text` and manage data as a promise by adding `.toPromise()` at the end of a line.

```

const markdownRaw = await this.http.get('/markdown-files/markdown.md',
{ responseType: 'text' }).toPromise();

```

With that line we get raw markdown content which we need to compile into HTML to render it on our page.
To do that we finally use `ngx-markdown` service to compile our markdown content.

```

this.markdown = this.mdService.compile(markdownRaw);

```

In the end, your `markdown-preview.component.ts` file should look like this:

```

import { Component, OnInit } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';

@Component({
selector: 'app-markdown-preview',
templateUrl: './markdown-preview.component.html',
styleUrls: ['./markdown-preview.component.sass']
})
export class MarkdownPreviewComponent implements OnInit {
markdown: string | undefined;
constructor(private mdService: MarkdownService, private http: HttpClient) { }

async ngOnInit() {
const markdownRaw = await this.http.get('/markdown-files/markdown.md',
{ responseType: 'text' }).toPromise();
 this.markdown = this.mdService.compile(markdownRaw);
}

}

```

To finally render it on our page, add this line to `markdown-preview.component.ts` file:

```

<markdown [data]="markdown"></markdown>

```

`<markdown>` tags comes from `ngx-markdown` library and uses `[data]` attribute to fetch compiled markdown content. In this case, `"markdown"` inside `[data]` is `markdown` class property that we defined inside our class component and appended compiled raw markdown content to.

### Add a route

Well, we are not yet done. We still need to add proper route to our markdown component.
Go to `app-routing.module.ts` file and create a route for our markdown preview component:

```

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownPreviewComponent } from './components/markdown-preview/markdown-preview.component';

const routes: Routes = [
{
path: 'my-markdown',
component: MarkdownPreviewComponent
}
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }

```

### Final touch

Finally, we need some basic navigation and router outlet in our `app-component.html` file:

```

<section class="container">
  <nav class="navigation">
    <a routerLink="/my-markdown">OPEN MARKDOWN</a>
  </nav>
  <hr />
  <router-outlet></router-outlet>
</section>

```

and some basic styles in `app-component.sass` file:

```

.container
  width: 70%
  margin: 0 auto
  .navigation
    display: flex
    justify-content: center
    align-items: flex-start
    a
      text-decoration: none
      color: #404040
      font-size: 1.25rem
      transition: 0.3s
      &:hover
        color: #0b4daf

```

And yes, I just centered anchor inside navigation with flexbox because I'm flexbox addict, I can't help myself :D

#### Now, after you completed everything, try running `ng-serve` command and see it in action!

# Conclusion

And that is it. Simple markdown renderer project with `ngx-markdown`.
You can find project github repository [here](https://github.com/mbos2/angular-markdown-renderer).
If you want to do more, check [ngx-markdown](https://github.com/jfcere/ngx-markdown) docs for more information about the library.

I hope this is helpfull to you. If you have any feedback or any issues regarding code in this blog post, feel free to leave a comment, or reach me on discord.
