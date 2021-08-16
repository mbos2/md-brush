import { Component, ElementRef, OnInit } from '@angular/core';
import { MarkdownComponent, MarkdownService } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import bulmaCollapsible from '@creativebulma/bulma-collapsible';
import { fromEvent } from 'rxjs';
import { markdownDefaultConfig } from '../../config/markdown-default';


@Component({
  selector: 'app-markdown-preview',
  templateUrl: './markdown-preview.component.html',
  styleUrls: ['./markdown-preview.component.sass']
})
  
export class MarkdownPreviewComponent implements OnInit {
  @ViewChild('markdownContainer') private markdownContainer?: MarkdownComponent;
  @ViewChild('scrollOne', {static: true}) scrollOne: ElementRef | undefined;
  @ViewChild('scrollTwo') scrollTwo: ElementRef | undefined;
  private markdownNativeElement: any;
  cssString = '';
  markdownTheme = markdownDefaultConfig;

  markdownRaw: any;
  markdown: string | undefined;
  typescriptMarkdown: any;
  panelOpenState = false;
  collapsibles: any;

  constructor(private mdService: MarkdownService, private http: HttpClient, private clipboard: Clipboard) { }

  async ngOnInit() {
    this.markdownRaw = await this.http.get('/assets/md/starter-template.md', 
      { responseType: 'text' }).toPromise();
      this.markdown = this.mdService.compile(this.markdownRaw);
    this.markdownNativeElement = this.markdownContainer?.element.nativeElement;

    this.collapsibles = bulmaCollapsible.attach(".is-collapsible");    
  }

  getMarkdownContentValue(event: Event): string {
    return this.markdown = this.mdService.compile((event.target as HTMLInputElement).value);
  }

  //#region Theme styles functions

  //#region Background
  private markdownBackgroundColorChange(color: string) {
    const wrapper = document.querySelector('.md-preview-section') as HTMLElement;
    return wrapper.style.backgroundColor = color;
  }

  onMarkdownBackgroundColorChangeEvent($event: Event) {    
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.backgroundColor = target.value;
    return this.markdownBackgroundColorChange(this.markdownTheme.backgroundColor);
  }
  //#endregion

  //#region Headers
  headersColorChange(color: string) {
    const headers = this.markdownNativeElement.querySelectorAll('h1,h2,h3,h4,h5,h6');
    for (let i = 0; i <= headers!.length; i++) {
      headers![i].style.color = color;
    }
  }

  onHeadersColorChangeEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.headers.color = target.value;
    return this.headersColorChange(this.markdownTheme.headers.color);
  }

  headersLetterSpacingChange(number: string) {
    const headers = this.markdownNativeElement.querySelectorAll('h1,h2,h3,h4,h5,h6');
    for (let i = 0; i <= headers!.length; i++) {
      headers![i].style.letterSpacing = `${number}px`;
    }
  }

  onHeadersLetterSpacingChangeEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.headers.letterSpacing = target.value;
    return this.headersLetterSpacingChange(this.markdownTheme.headers.letterSpacing);
  }

  //#endregion

  //#region Paragraphs
  private paragraphColorChange(color: string) {
    const paragraphs = this.markdownNativeElement.querySelectorAll('p');
    for (let i = 0; i <= paragraphs!.length; i++) {
      paragraphs[i].style.color = color;      
    }
  }

  onParagraphColorChangeEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.paragraph.color = target.value;
    return this.paragraphColorChange(this.markdownTheme.paragraph.color);
  }

  private paragraphLetterSpacingChange(number: string) {
    const paragraphs = this.markdownNativeElement.querySelectorAll('p');
    for (let i = 0; i <= paragraphs!.length; i++) {
      paragraphs[i].style.letterSpacing = `${number}px`;
    }
  }

  onParagraphLetterSpacingChangeEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.paragraph.letterSpacing = target.value;
    return this.paragraphLetterSpacingChange(this.markdownTheme.paragraph.letterSpacing);
  }
  //#endregion

  //#region Links

  private anchorsColorChange(color: string) {
    const anchors = this.markdownNativeElement.querySelectorAll('a');
    for (let i = 0; i < anchors!.length; i++) {
      anchors![i].style.color = color;
    }
  }

  onAnchorsColorChangeEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.anchors.color = target.value;
    return this.anchorsColorChange(this.markdownTheme.anchors.color);
  }


  private anchorLetterSpacingChange(number: string) {
    const anchors = this.markdownNativeElement.querySelectorAll('a');
    for (let i = 0; i < anchors!.length; i++) {
      anchors[i].style.letterSpacing = `${number}px`;
    }
  }

  onAnchorsLetterSpacingChangeEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.anchors.letterSpacing = target.value;
    return this.anchorLetterSpacingChange(this.markdownTheme.anchors.letterSpacing);
  }

  private anchorsFontWeightChange(number: string) {
    const anchors = this.markdownNativeElement.querySelectorAll('a');
    for (let i = 0; i < anchors!.length; i++) {
      anchors![i].style.fontWeight = number;
    }
  }

  onAnchorsFontWeightChangeEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.anchors.fontWeight = target.value;
    return this.anchorsFontWeightChange(this.markdownTheme.anchors.fontWeight);
  }

  private anchorsTextDecorationChange(string: string) {
    const anchors = this.markdownNativeElement.querySelectorAll('a');
    for (let i = 0; i < anchors!.length; i++) {
      anchors![i].style.textDecoration = string;
    }
  }

  onAnchorsTextDecorationChangeEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    let isChecked = target.checked;
    this.markdownTheme.anchors.textDecoration = (isChecked == true) ? 'underline' : 'none';
    return this.anchorsTextDecorationChange(this.markdownTheme.anchors.textDecoration);
  }
  //endregion

  //#endregion

  openDialog() {
    this.generateCss();
    document.getElementById('myModal')?.classList.add('is-active');
  }

  closeDialog() {
    document.getElementById('myModal')?.classList.remove('is-active');
  }

  copyCss() {
    const css = document.querySelector('#css-code')?.textContent as string;
    return this.clipboard.copy(css);
  }

  resetForm() {
    // return this.markdownTheme = markdownDefaultConfig;
    const anchors = this.markdownNativeElement.querySelectorAll('a');
    for (let i = 0; i < anchors!.length; i++) {
      anchors![i].style.textDecoration = 'none';
    }
  }

  generateCss() {
    const theme = this.markdownTheme;    
    return this.cssString =
    `
    :root {
      --theme-background: ${theme.backgroundColor};
    }
    .markdown {
      background-color: var(--theme-background);
    }

    .markdown h1,h2,h3,h4,h5,h6 {
      color: ${theme.headers.color}; ${(theme.headers.letterSpacing == '0' ? '' : `\n      letter-spacing:${theme.headers.letterSpacing}px`)}     
    }
    
    .markdown p {
      color: ${theme.paragraph.color}; ${(theme.paragraph.letterSpacing == '0' ? '' : `\n      letter-spacing:${theme.paragraph.letterSpacing}px`)}  
    }
    `
  }

  arrowAnimationToggle($event: Event) {
    const target = $event.currentTarget as HTMLElement;
    const icon = target.querySelector('.icofont-rounded-down');
    icon?.classList.toggle('green-arrow');
    icon?.classList.toggle('icofont-rotate-270');
  }

  updateVerticalScrollPreview(): void {
    this.scrollTwo!.nativeElement.scrollTop = this.scrollOne!.nativeElement.scrollTop;
  }

  updateVerticalScrollEditor() {
    this.scrollOne!.nativeElement.scrollTop = this.scrollTwo!.nativeElement.scrollTop;
  }
  
} 
