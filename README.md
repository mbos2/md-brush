# Introduction

Hello everyone. As part of [Hashnode x Auth0 hackathon](https://townhall.hashnode.com/auth0-hackathon?source=events_widget) I'd like to present you MD Brush. 

MD Brush is color theme generator application that generates color theme for your own blog site. And, it doesn't only generates colors, but also some other relative styles of certain markdown styles like:

- font family
- paddings
- font weight
- border radius
- border width and font style for blockquote
- text decoration for links

All so you could instantly have shaped theme for your rendered markdown in your blog post.

Inspiration for this application I got from [this post about markdown rendered](https://mbosnjak.hashnode.dev/render-your-markdown-file-in-angular-with-ngx-markdown-and-httpclient) where I described how can you render local markdown files on your website with Angular. It renders markdown content as HTML on your page and as I was experimenting with styling such feature with custom sass, I thought to myself why not try to build an app that would easily create styles which I can preview and copy-paste to my code.

# Tech stack

- Angular 12 - As frontend framework
- Auth0 - For authenthication
- Bulma + custom sass - For design
- Supabase - For database to store user and theme data

# Showcase

## Home page

When you go to [MD Brush](https://md-brush.vercel.app/) it will start with home page.
![home.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1630420875794/txUJV3GKy.png)

As show in the image, you have a page to explore publicly made themes or create your own.

## Explore

To explore themes, simply click on `Explore` navigation link either on home page or in the navigation bar and you will see this page:

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1630421021597/mQAeu0gBt.png)

On the explore page there are currently 5 themes made public. Theme container consists of colors used in the theme, preview button and number of seens in the bottom right circle.

## Your themes

You can check your own themes when you click on user button in navigation then go to `My themes` section:

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1630421175020/7qYLTfnfIp.png)

If you have generated a theme, or multiple themes, going on `My themes` section will show you a page like this:

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1630421224047/Y6RpL3Pik.png)

There you can edit your theme, delete it, change its name or set as public with a click on a button.
NOTE that when you create your theme it is not public by default, so it will not be shown in `Explore` page. You can toggle between public and private states of the theme whenever you want.

## Create theme

To create your own theme you must sign in or sign up to the application so it knows which user generates the theme.

When you click on `Generate` it will prompt a form to enter theme name:

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1630421431098/2BWVD4yt5.png)

After you enter your theme name (or leave default one), click on `Create theme` button and it will redirect you to theme editor where you can edit styles inside the form on the right:

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1630421530499/ifl6PpCoV.png)

When you're done with theming, there are 2 buttons on top of the form.

Get CSS:

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1630421866622/DIKj94o5T.png)

Preview:

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1630421895360/QvhQtg8mpi.png)

# Demo and code

- You can check demo app here: [MD Brush](https://md-brush.vercel.app/)
- You can check source code here: [Github](https://github.com/mbos2/md-brush)

This project is MIT licensed.
