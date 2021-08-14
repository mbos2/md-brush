import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';

export class MarkdownServices {

  markedOptionsFactory(): MarkedOptions {
    const renderer = new MarkedRenderer();
    return {
      renderer: renderer,
      gfm: true,
      breaks: false,
      pedantic: false,
      smartLists: true,
      smartypants: false,
    };
  }
}
