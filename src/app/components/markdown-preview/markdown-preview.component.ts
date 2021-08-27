import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { MarkdownComponent, MarkdownService } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import bulmaCollapsible from '@creativebulma/bulma-collapsible';
import { markdownDefaultConfig } from '../../config/markdown-default';
import { SupabaseService } from 'src/app/services/supabase.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-markdown-preview',
  templateUrl: './markdown-preview.component.html',
  styleUrls: ['./markdown-preview.component.sass']
})
  
export class MarkdownPreviewComponent implements OnInit {
  @ViewChild('markdownContainer') private markdownContainer?: MarkdownComponent;
  id: string | null;
  private markdownNativeElement: any;
  cssString = '';
  markdownTheme = markdownDefaultConfig;

  markdownRaw: any;
  markdown: string | undefined;
  typescriptMarkdown: any;
  panelOpenState = false;
  collapsibles: any;

  @HostListener('scroll', ['$event']) // for window scroll events
  onScroll(event: Event, updatedElementId: string) {
    const el = event.target as HTMLElement;
    const secondElement = document.getElementById(updatedElementId);
    secondElement!.scrollTop = el.scrollTop;
  }

  constructor(private mdService: MarkdownService, private supabaseService: SupabaseService, private http: HttpClient, private clipboard: Clipboard, private route: ActivatedRoute) {
    const routeParams = this.route.snapshot.paramMap;
    this.id = routeParams.get('id');
  }

  async ngOnInit() {
    this.supabaseService.selectThemeById(this.id!)
      .then(data => {
        console.log(data);
      })
    
    this.markdownRaw = await this.http.get('/assets/md/starter-template.md', 
      { responseType: 'text' }).toPromise();
    this.markdown = this.mdService.compile(this.markdownRaw);
    this.markdownNativeElement = this.markdownContainer?.element.nativeElement;

    this.collapsibles = bulmaCollapsible.attach(".is-collapsible");
    document.body.style.overflow = 'hidden';    
  }

  getMarkdownContentValue(event: Event): string {
    return this.markdown = this.mdService.compile((event.target as HTMLInputElement).value);
  }

  //#region Theme styles functions

  //#region Font family
  private markdownFontFamilyChange(fontFamily: string) {
    const markdown = this.markdownContainer?.element.nativeElement;
    return markdown!.style.fontFamily = fontFamily;
  }

  onMarkdownFontFamilyChangeEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.fontFamily = target.value;
    return this.markdownFontFamilyChange(this.markdownTheme.fontFamily);
  }
  //#endregion

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
  //#endregion

  //#region Inline code block

  private inlineCodeColorChange(color: string) {
    const code = this.markdownNativeElement.querySelectorAll('code');
    for (let i = 0; i < code!.length; i++) {
      if (code![i].parentElement.nodeName.toLowerCase() !== 'pre') {
        code![i].style.color = color;
      }
    }
  }

  oninlineCodeColorChangeEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.codeInline.color = target.value;
    return this.inlineCodeColorChange(this.markdownTheme.codeInline.color);
  }

  private inlineCodeBackgroundColorChange(color: string) {
    const code = this.markdownNativeElement.querySelectorAll('code');
    for (let i = 0; i < code!.length; i++) {
      if (code![i].parentElement.nodeName.toLowerCase() !== 'pre') {
        code![i].style.backgroundColor = color;
      }
    }
  }

  oninlineBackgroundCodeColorChangeEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.codeInline.backgroundColor = target.value;
    return this.inlineCodeBackgroundColorChange(this.markdownTheme.codeInline.backgroundColor);
  }

  private inlineCodeFontWeightChange(fontWeight: string) {
    const code = this.markdownNativeElement.querySelectorAll('code');
    for (let i = 0; i < code!.length; i++) {
      if (code![i].parentElement.nodeName.toLowerCase() !== 'pre') {
        code![i].style.fontWeight = fontWeight;
      }
    }
  }

  oninlineCodeFontWeightChangeEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.codeInline.fontWeight = target.value;
    return this.inlineCodeFontWeightChange(this.markdownTheme.codeInline.fontWeight);
  }

  private inlineCodeBorderRadiusChange(number: string) {
    const code = this.markdownNativeElement.querySelectorAll('code');
    for (let i = 0; i < code!.length; i++) {
      if (code![i].parentElement.nodeName.toLowerCase() !== 'pre') {
        code![i].style.borderRadius = `${number}px`;
      }
    }
  }

  oninlineCodeBorderRadiusEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.codeInline.borderRadius = target.value;
    return this.inlineCodeBorderRadiusChange(this.markdownTheme.codeInline.borderRadius);
  }

  private inlineCodePaddingXChange(number: string) {
    const code = this.markdownNativeElement.querySelectorAll('code');
    for (let i = 0; i < code!.length; i++) {
      if (code![i].parentElement.nodeName.toLowerCase() !== 'pre') {
        code![i].style.paddingLeft = `${number}px`;
        code![i].style.paddingRight = `${number}px`;
      }
    }
  }

  oninlineCodePaddingXEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.codeInline.paddingX = target.value;
    return this.inlineCodePaddingXChange(this.markdownTheme.codeInline.paddingX);
  }

  private inlineCodePaddingYChange(number: string) {
    const code = this.markdownNativeElement.querySelectorAll('code');
    for (let i = 0; i < code!.length; i++) {
      if (code![i].parentElement.nodeName.toLowerCase() !== 'pre') {
        code![i].style.paddingTop = `${number}px`;
        code![i].style.paddingBottom = `${number}px`;
      }
    }
  }

  oninlineCodePaddingYEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.codeInline.paddingY = target.value;
    return this.inlineCodePaddingYChange(this.markdownTheme.codeInline.paddingY);
  }


  //#endregion

  //#region Pre Code block

  private codeBlockColorChange(color: string) {
    const code = this.markdownNativeElement.querySelectorAll('pre');
    for (let i = 0; i < code!.length; i++) {
      code![i].style.color = color;      
    }
  }

  onCodeBlockColorChangeEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.codeBlock.color = target.value;
    return this.codeBlockColorChange(this.markdownTheme.codeBlock.color);
  }

  private codeBlockBackgroundColorChange(color: string) {
    const code = this.markdownNativeElement.querySelectorAll('pre');
    for (let i = 0; i < code!.length; i++) {
      code![i].style.backgroundColor = color;
    }
  }

  onCodeBlockBackgroundColorChangeEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.codeBlock.backgroundColor = target.value;
    return this.codeBlockBackgroundColorChange(this.markdownTheme.codeBlock.backgroundColor);
  }

  private codeBlockFontWeightChange(fontWeight: string) {
    const code = this.markdownNativeElement.querySelectorAll('pre');
    for (let i = 0; i < code!.length; i++) {
        code![i].style.fontWeight = fontWeight;
    }
  }

  onCodeBlockFontWeightChangeEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.codeBlock.fontWeight = target.value;
    return this.codeBlockFontWeightChange(this.markdownTheme.codeBlock.fontWeight);
  }

  private codeBlockBorderRadiusChange(number: string) {
    const code = this.markdownNativeElement.querySelectorAll('pre');
    for (let i = 0; i < code!.length; i++) {
      code![i].style.borderRadius = `${number}px`;
    }
  }

  onCodeBlockBorderRadiusEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.codeBlock.borderRadius = target.value;
    return this.codeBlockBorderRadiusChange(this.markdownTheme.codeBlock.borderRadius);
  }

  private codeBlockPaddingXChange(number: string) {
    const code = this.markdownNativeElement.querySelectorAll('pre');
    for (let i = 0; i < code!.length; i++) {
      code![i].style.paddingLeft = `${number}px`;
      code![i].style.paddingRight = `${number}px`;
    }
  }

  onCodeBlockPaddingXEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.codeBlock.paddingX = target.value;
    return this.codeBlockPaddingXChange(this.markdownTheme.codeBlock.paddingX);
  }

  private codeBlockPaddingYChange(number: string) {
    const code = this.markdownNativeElement.querySelectorAll('pre');
    for (let i = 0; i < code!.length; i++) {
        code![i].style.paddingTop = `${number}px`;
        code![i].style.paddingBottom = `${number}px`;
    }
  }

  onCodeBlockPaddingYEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.codeBlock.paddingY = target.value;
    return this.codeBlockPaddingYChange(this.markdownTheme.codeBlock.paddingY);
  }
  //#endregion

  //#region Blockquotes
  
  private blockquoteColorChange(color: string) {
    const blockquotes = this.markdownNativeElement.querySelectorAll('blockquote');
    for (let i = 0; i < blockquotes!.length; i++) {
      blockquotes![i].style.color = color;
    }
  }

  onBlockquoteColorChangeEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.blockquotes.color = target.value;
    return this.blockquoteColorChange(this.markdownTheme.blockquotes.color);
  }

  private blockquoteBorderLeftColorChange(color: string) {
    const blockquotes = this.markdownNativeElement.querySelectorAll('blockquote');
    for (let i = 0; i < blockquotes!.length; i++) {
      blockquotes![i].style.borderLeftColor = color;
    }
  }

  onBlockquoteBorderLeftColorChangeEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.blockquotes.borderLeftColor = target.value;
    return this.blockquoteBorderLeftColorChange(this.markdownTheme.blockquotes.borderLeftColor);
  }

  private blockquoteBorderLeftWidthChange(number: string) {
    const blockquotes = this.markdownNativeElement.querySelectorAll('blockquote');
    for (let i = 0; i < blockquotes!.length; i++) {
      blockquotes![i].style.borderLeftWidth = `${number}px`;
    }
  }

  onBlockquoteBorderLeftWidthChangeEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.blockquotes.borderLeftWidth = target.value;
    return this.blockquoteBorderLeftWidthChange(this.markdownTheme.blockquotes.borderLeftWidth);
  }

  private blockquotePaddingLeftChange(number: string) {
    const blockquotes = this.markdownNativeElement.querySelectorAll('blockquote');
    for (let i = 0; i < blockquotes!.length; i++) {
      blockquotes![i].style.paddingLeft = `${number}px`;
    }
  }

  onBlockquotePaddingLeftChangeEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.blockquotes.paddingLeft = target.value;
    return this.blockquotePaddingLeftChange(this.markdownTheme.blockquotes.paddingLeft);
  }

  private blockquoteFontStyleChange(value: string) {
    const blockquotes = this.markdownNativeElement.querySelectorAll('blockquote');
    for (let i = 0; i < blockquotes!.length; i++) {
      blockquotes![i].style.fontStyle = value;
    }
  }

  onBlockquoteFontStyleChangeEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    let isChecked = target.checked;
    this.markdownTheme.blockquotes.fontStyle = (isChecked) ? 'italic' : 'normal';
    console.log(this.markdownTheme.blockquotes.fontStyle)
    return this.blockquoteFontStyleChange(this.markdownTheme.blockquotes.fontStyle);
  }

  //#endregion
  
  //#region List
    private listColorChange(color: string) {
      const list = this.markdownNativeElement.querySelectorAll('ol,ul');
      for (let i = 0; i < list!.length; i++) {
        list![i].style.color = color;      
      }
    }

    onListColorChangeEvent($event: Event) {
      const target = $event.target as HTMLInputElement;
      this.markdownTheme.lists.color = target.value;
      return this.listColorChange(this.markdownTheme.lists.color);
    }  
  //#endregion

  //#endregion
  
  openDialog() {
    this.generateCss();
    document.getElementById('myModal')?.classList.add('is-active');
  }

  closeDialog() {
    document.getElementById('myModal')?.classList.remove('is-active');
  }

  openPreviewDialog() {
    this.generateCss();
    document.getElementById('previewModal')?.classList.add('is-active');
    let preview = document.getElementById('previewModal');
    let css = document.createElement('style');
    css.innerHTML = `${this.cssString}`;
    preview?.appendChild(css);
  }

  closePreviewDialog() {
    document.getElementById('previewModal')?.classList.remove('is-active');
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
      --theme-global-fontFamily: ${theme.fontFamily};
      --theme-global-background: ${theme.backgroundColor};
      --theme-h-color: ${theme.headers.color};
      --theme-h-letterSpacing: ${theme.headers.letterSpacing}px;
      --theme-p-color: ${theme.paragraph.color};
      --theme-p-letterSpacing: ${theme.paragraph.letterSpacing}px;
      --theme-a-color: ${theme.anchors.color};
      --theme-a-letterSpacing: ${theme.anchors.letterSpacing}px;
      --theme-a-textDecoration: ${theme.anchors.textDecoration};
      --theme-a-fontWeight: ${theme.anchors.fontWeight}px;
      --theme-codeInline-color: ${theme.codeInline.color};
      --theme-codeInline-backgroundColor: ${theme.codeInline.backgroundColor};
      --theme-codeInline-fontWeight: ${theme.codeInline.fontWeight}px;
      --theme-codeInline-paddingX: ${theme.codeInline.paddingX}px;
      --theme-codeInline-paddingY: ${theme.codeInline.paddingY}px;
      --theme-codeInline-borderRadius: ${theme.codeInline.borderRadius}px;
      --theme-codeBlock-color: ${theme.codeBlock.color};
      --theme-codeBlock-backgroundColor: ${theme.codeBlock.backgroundColor};
      --theme-codeBlock-paddingX: ${theme.codeBlock.paddingX}px;
      --theme-codeBlock-paddingY: ${theme.codeBlock.paddingY}px;
      --theme-codeBlock-borderRadius: ${theme.codeBlock.borderRadius}px;
      --theme-blockquotes-color: ${theme.blockquotes.color};
      --theme-blockquotes-fontStyle: ${theme.blockquotes.fontStyle};
      --theme-blockquotes-paddingLeft: ${theme.blockquotes.paddingLeft}px;
      --theme-blockquotes-borderLeftColor: ${theme.blockquotes.borderLeftColor};
      --theme-blockquotes-borderLeftWidth: ${theme.blockquotes.borderLeftWidth};
      --theme-list-color: ${theme.lists.color};
    }

    .markdown {
      background-color: var(--theme-global-background);
      font-family: var(--theme-global-fontFamily);
    }

    .markdown h1,h2,h3,h4,h5,h6 {
      color: var(--theme-h-color); 
      letter-spacing: var(--theme-h-letterSpacing);
    }
    
    .markdown p {
      color: var(--theme-p-color); 
      letter-spacing: var(--theme-p-letterSpacing);
    }

    .markdown a {
      color: var(--theme-a-color); 
      letter-spacing: var(--theme-a-letterSpacing);
      font-weight: var(--theme-a-fontWeight);
      text-decoration: var(--theme-a-textDecoration); 
    }

    .markdown code {
      color: var(--theme-codeInline-color);
      background-color: var(--theme-codeInline-backgroundColor);
      font-weight: var(--theme-codeInline-fontWeight);
      border-radius: var(--theme-codeInline-borderRadius);
      padding-left: var(--theme-codeInline-paddingX);
      padding-right: var(--theme-codeInline-paddingX);
      padding-top: var(--theme-codeInline-paddingY);
      padding-bottom: var(--theme-codeInline-paddingY);
    }

    .markdown pre {
      color: var(--theme-codeBlock-color);
      background-color: var(--theme-codeBlock-backgroundColor);
      font-weight: var(--theme-codeBlock-fontWeight);
      border-radius: var(--theme-codeBlock-borderRadius);
      padding-left: var(--theme-codeBlock-paddingX);
      padding-right: var(--theme-codeBlock-paddingX);
      padding-top: var(--theme-codeBlock-paddingY);
      padding-bottom: var(--theme-codeBlock-paddingY);
    }

    .markdown pre code {
      color: var(--theme-codeBlock-color);
      background-color: var(--theme-codeInline-backgroundColor);
    }

    .markdown blockquoote {
      color: var(--theme-blockquotes-color);
      font-style: var(--theme-blockquotes-fontStyle);
      padding-left: var(--theme-blockquotes-paddingLeft);
      border-left-color: var(--theme-blockquotes-borderLeftColor);
      border-left-width: var(--theme-blockquotes-borderLeftWidth);
    }

    .markdown ul,ol {
      color: var(--theme-list-color);
    }

    .markdown ul::before {
      color: var(--theme-list-markerColor);      
    }

    .markdown ol::before {
      color: var(--theme-list-markerColor);
    }
    `
  }

  arrowAnimationToggle($event: Event) {
    const target = $event.currentTarget as HTMLElement;
    const icon = target.querySelector('.icofont-rounded-down');
    icon?.classList.toggle('green-arrow');
    icon?.classList.toggle('icofont-rotate-270');
  }
} 