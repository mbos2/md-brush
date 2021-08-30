import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { MarkdownComponent, MarkdownService } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import bulmaCollapsible from '@creativebulma/bulma-collapsible';
import { markdownDefaultConfig } from '../../config/markdown-default';
import { SupabaseService } from 'src/app/services/supabase.service';
import { ActivatedRoute } from '@angular/router';
import { Auth0Service } from 'src/app/services/auth0.service';


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
  fontFamily: any;
  isThemeOwner = false;

  @HostListener('scroll', ['$event']) // for window scroll events
  onScroll(event: Event, updatedElementId: string) {
    const el = event.target as HTMLElement;
    const secondElement = document.getElementById(updatedElementId);
    secondElement!.scrollTop = el.scrollTop;
  }

  constructor(private mdService: MarkdownService, private supabaseService: SupabaseService, private http: HttpClient, private clipboard: Clipboard, private route: ActivatedRoute, private auth0: Auth0Service) {
    const routeParams = this.route.snapshot.paramMap;
    this.id = routeParams.get('id');    
  }

  async ngOnInit() {
    this.auth0.user$.subscribe(user => {
      if (user === null || user == null) {
        return console.log('User is not authenthicated')
      }
      const theme = this.supabaseService.selectThemeById(this.id as string)
        .then(data => {
          console.log(data.body![0].userId, user.sub)
          if (user.sub === data.body![0].userId) {
            console.log('owner')
            this.isThemeOwner = true;
          } else {
            console.log('not owner')
            this.isThemeOwner = false;
          }
        });   
    })
    const theme = await this.supabaseService.selectThemeById(this.id!)
    this.id = theme.body![0].id;
    this.markdownTheme = JSON.parse(theme.body![0].themeObject);
    
    this.markdownRaw = await this.http.get('/assets/md/starter-template.md', 
      { responseType: 'text' }).toPromise();
    this.markdown = this.mdService.compile(this.markdownRaw);
    this.markdownNativeElement = this.markdownContainer?.element.nativeElement;

    this.collapsibles = bulmaCollapsible.attach(".is-collapsible");
    document.body.style.overflow = 'hidden';
    
    this.fontFamily = this.markdownTheme.fontFamily;
    setTimeout(() => {
      this.setTheme();      
    }, 1);
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
    this.markdownFontFamilyChange(this.markdownTheme.fontFamily);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
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
    this.markdownBackgroundColorChange(this.markdownTheme.backgroundColor);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
  }
  //#endregion

  //#region Headers
  headersColorChange(color: string) {
    const headers = this.markdownNativeElement.querySelectorAll('h1,h2,h3,h4,h5,h6');
    for (let i = 0; i < headers!.length; i++) {
      headers![i].style.color = color;
    }
  }

  onHeadersColorChangeEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.headers.color = target.value;
    this.headersColorChange(this.markdownTheme.headers.color);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme));
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
    this.headersLetterSpacingChange(this.markdownTheme.headers.letterSpacing);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
  }

  //#endregion

  //#region Paragraphs
  private paragraphColorChange(color: string) {
    const paragraphs = this.markdownNativeElement.querySelectorAll('p');
    for (let i = 0; i < paragraphs!.length; i++) {
      paragraphs[i].style.color = color;      
    }
  }

  onParagraphColorChangeEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.paragraph.color = target.value;
    this.paragraphColorChange(this.markdownTheme.paragraph.color);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
  }

  private paragraphLetterSpacingChange(number: string) {
    const paragraphs = this.markdownNativeElement.querySelectorAll('p');
    for (let i = 0; i < paragraphs!.length; i++) {
      paragraphs[i].style.letterSpacing = `${number}px`;
    }
  }

  onParagraphLetterSpacingChangeEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.paragraph.letterSpacing = target.value;
    this.paragraphLetterSpacingChange(this.markdownTheme.paragraph.letterSpacing);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
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
    this.anchorsColorChange(this.markdownTheme.anchors.color);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
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
    this.anchorLetterSpacingChange(this.markdownTheme.anchors.letterSpacing);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
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
    this.anchorsFontWeightChange(this.markdownTheme.anchors.fontWeight);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
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
    this.anchorsTextDecorationChange(this.markdownTheme.anchors.textDecoration);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
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
    this.inlineCodeColorChange(this.markdownTheme.codeInline.color);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
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
    this.inlineCodeBackgroundColorChange(this.markdownTheme.codeInline.backgroundColor);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
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
    this.inlineCodeFontWeightChange(this.markdownTheme.codeInline.fontWeight);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
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
    this.inlineCodeBorderRadiusChange(this.markdownTheme.codeInline.borderRadius);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
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
    this.inlineCodePaddingXChange(this.markdownTheme.codeInline.paddingX);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
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
    this.inlineCodePaddingYChange(this.markdownTheme.codeInline.paddingY);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
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
    this.codeBlockColorChange(this.markdownTheme.codeBlock.color);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
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
    this.codeBlockBackgroundColorChange(this.markdownTheme.codeBlock.backgroundColor);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
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
    this.codeBlockFontWeightChange(this.markdownTheme.codeBlock.fontWeight);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
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
    this.codeBlockBorderRadiusChange(this.markdownTheme.codeBlock.borderRadius);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
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
    this.codeBlockPaddingXChange(this.markdownTheme.codeBlock.paddingX);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
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
    this.codeBlockPaddingYChange(this.markdownTheme.codeBlock.paddingY);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
  }
  //#endregion

  //#region Blockquotes
  
  private blockquoteColorChange(color: string) {
    const blockquotes = this.markdownNativeElement.querySelectorAll('blockquote');
    for (let i = 0; i < blockquotes!.length; i++) {
      blockquotes![i].style.color = color;
      let paragraphs = blockquotes![i].querySelectorAll('p');
      console.log(paragraphs)
      for (let j = 0; j < paragraphs.length; j++) {
        paragraphs[j].style.color = color;
      }
    }
  }

  onBlockquoteColorChangeEvent($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.markdownTheme.blockquotes.color = target.value;
    this.blockquoteColorChange(this.markdownTheme.blockquotes.color);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
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
    this.blockquoteBorderLeftColorChange(this.markdownTheme.blockquotes.borderLeftColor);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
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
    this.blockquoteBorderLeftWidthChange(this.markdownTheme.blockquotes.borderLeftWidth);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
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
    this.blockquotePaddingLeftChange(this.markdownTheme.blockquotes.paddingLeft);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
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
    this.blockquoteFontStyleChange(this.markdownTheme.blockquotes.fontStyle);
    return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
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
      this.listColorChange(this.markdownTheme.lists.color);
      return this.supabaseService.updateThemeObjectOnChange(this.id, JSON.stringify(this.markdownTheme))
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
      --theme-a-fontWeight: ${theme.anchors.fontWeight};
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
      --theme-blockquotes-borderLeftWidth: ${theme.blockquotes.borderLeftWidth}px;
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
      line-height: 2;
    }

    .markdown pre code {
      color: var(--theme-codeBlock-color);
      background-color: var(--theme-codeInline-backgroundColor);
    }

    .markdown blockquote {
      color: var(--theme-blockquotes-color);
      font-style: var(--theme-blockquotes-fontStyle);
      padding-left: var(--theme-blockquotes-paddingLeft);
      border-left-color: var(--theme-blockquotes-borderLeftColor);
      border-left-width: var(--theme-blockquotes-borderLeftWidth);
    }

    .markdown blockquote p {
      color: var(--theme-blockquotes-color);
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

  private async setTheme() {
    const markdown = document.querySelector('.md-preview-section') as HTMLElement;    
    markdown!.style.backgroundColor = this.markdownTheme.backgroundColor;
    const mdContainer = this.markdownContainer?.element.nativeElement;
    
    mdContainer!.style.fontFamily = this.markdownTheme.fontFamily;
    mdContainer!.style.backgroundColor = this.markdownTheme.backgroundColor;

    const headers = mdContainer!.querySelectorAll('h1,h2,h3,h4,h5,h6');
    for (let i = 0; i < headers!.length; i++) {
      let h = headers[i] as HTMLElement;
      h.style.color = this.markdownTheme.headers.color;
      h.style.letterSpacing = `${this.markdownTheme.headers.letterSpacing}px`;
    }

    const paragraphs =  mdContainer!.querySelectorAll('p');
    for (let i = 0; i < paragraphs!.length; i++) {
      paragraphs[i].style.color = this.markdownTheme.paragraph.color;
      paragraphs[i].style.letterSpacing = `${this.markdownTheme.paragraph.letterSpacing}px`;
    }

    const anchors = mdContainer!.querySelectorAll('a');
    for (let i = 0; i < anchors!.length; i++) {
      anchors![i].style.color = this.markdownTheme.anchors.color;
      anchors![i].style.letterSpacing = `${this.markdownTheme.anchors.letterSpacing}px`;
      anchors![i].style.textDecoration = this.markdownTheme.anchors.textDecoration;
      anchors![i].style.fontWeight = this.markdownTheme.anchors.fontWeight;
    }

    const code = this.markdownNativeElement.querySelectorAll('code');
    for (let i = 0; i < code!.length; i++) {
      if (code![i].parentElement.nodeName.toLowerCase() !== 'pre') {
        code![i].style.color = this.markdownTheme.codeInline.color;
        code![i].style.backgroundColor = this.markdownTheme.codeInline.backgroundColor;
        code![i].style.fontWeight = this.markdownTheme.codeInline.fontWeight;
        code![i].style.borderRadius = `${ this.markdownTheme.codeInline.borderRadius}px`;
        code![i].style.paddingLeft = `${ this.markdownTheme.codeInline.paddingX}px`;
        code![i].style.paddingRight = `${ this.markdownTheme.codeInline.paddingX}px`;
        code![i].style.paddingTop = `${ this.markdownTheme.codeInline.paddingY}px`;
        code![i].style.paddingBottom = `${ this.markdownTheme.codeInline.paddingY}px`;
      }
    }

    const preCode = this.markdownNativeElement.querySelectorAll('pre');
    for (let i = 0; i < preCode!.length; i++) {
        preCode![i].style.color = this.markdownTheme.codeBlock.color;
        preCode![i].style.backgroundColor = this.markdownTheme.codeBlock.backgroundColor;
        preCode![i].style.fontWeight = this.markdownTheme.codeBlock.fontWeight;
        preCode![i].style.borderRadius = `${ this.markdownTheme.codeBlock.borderRadius}px`;
        preCode![i].style.paddingLeft = `${ this.markdownTheme.codeBlock.paddingX}px`;
        preCode![i].style.paddingRight = `${ this.markdownTheme.codeBlock.paddingX}px`;
        preCode![i].style.paddingTop = `${ this.markdownTheme.codeBlock.paddingY}px`;
        preCode![i].style.paddingBottom = `${ this.markdownTheme.codeBlock.paddingY}px`;      
    }

    const blockquotes = this.markdownNativeElement.querySelectorAll('blockquote');
    for (let i = 0; i < blockquotes!.length; i++) {
      blockquotes![i].style.color = this.markdownTheme.blockquotes.color;
      blockquotes![i].style.borderLeftColor = this.markdownTheme.blockquotes.borderLeftColor;
      blockquotes![i].style.paddingLeft = `${ this.markdownTheme.blockquotes.paddingLeft}px`;
      blockquotes![i].style.fontStyle = this.markdownTheme.blockquotes.fontStyle;
      blockquotes![i].style.borderLeftWidth = `${this.markdownTheme.blockquotes.borderLeftWidth}px`;
      let paragraphs = blockquotes![i].querySelectorAll('p');
      for (let j = 0; j < paragraphs.length; j++) {
        paragraphs[j].style.color = this.markdownTheme.blockquotes.color;
      }
    }

    const list = this.markdownNativeElement.querySelectorAll('ol,ul');
    for (let i = 0; i < list!.length; i++) {
      list![i].style.color = this.markdownTheme.lists.color;
    }
  }
} 