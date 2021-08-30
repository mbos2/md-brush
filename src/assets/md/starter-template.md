# HEADERS

# H1

## H2

### H3

#### H4

##### H5

###### H6

# PARAGRAPHS | LINKS | INLINE CODE BLOCKS

Markdown is intended to be as easy-to-read and easy-to-write as is feasible.

Readability, however, is emphasized above all else. A Markdown-formatted
document should be publishable as-is, as plain text, without looking
like it's been marked up with tags or formatting instructions. While
Markdown's syntax has been influenced by several existing text-to-HTML
filters -- including [Setext](http://docutils.sourceforge.net/mirror/setext.html), [atx](http://www.aaronsw.com/2002/atx/), [Textile](http://textism.com/tools/textile/), [reStructuredText](http://docutils.sourceforge.net/rst.html),
[Grutatext](http://www.triptico.com/software/grutatxt.html), and [EtText](http://ettext.taint.org/doc/) -- the single biggest source of
inspiration for Markdown's syntax is the format of plain text email.

A paragraph is simply one or more consecutive lines of text, separated
by one or more blank lines. (A blank line is any line that looks like a
blank line -- a line containing nothing but spaces or tabs is considered
blank.) Normal paragraphs should not be indented with spaces or tabs.

The implication of the "one or more consecutive lines of text" rule is
that Markdown supports "hard-wrapped" text paragraphs. This differs
significantly from most other text-to-HTML formatters (including Movable
Type's "Convert Line Breaks" option) which translate every line break
character in a paragraph into a `<br />` tag.

When you _do_ want to insert a `<br />` break tag using Markdown, you
end a line with two or more spaces, then type return.

# CODE BLOCKS

```
import { Injectable } from  '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from  '@angular/router';
import { Observable } from  'rxjs';
import { AuthService } from  '@auth0/auth0-angular';
import { map } from  'rxjs/operators';

@Injectable({
	providedIn:  'root'
})

export  class  AuthenticationGuard  implements  CanActivate {

	constructor(private  auth0: AuthService, private  router: Router) {}

	canActivate(
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot):
  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return  this.auth0.isAuthenticated$.pipe(
			map(e  => {
				if (!e) {
					return  this.router.parseUrl('/not-authorized');
				}
				return  true;
			}),
		);
	}
}
```

# BLOCKQUOTES

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.

> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.

# LISTS

- Overview
  - Philosophy
  - Inline HTML
  - Automatic Escaping for Special Characters
- Block Elements
  - Paragraphs and Line Breaks
  - [HEADERS LINK](#header)
  - Blockquotes
  - [LIST LINK](#list)
  - Code Blocks
