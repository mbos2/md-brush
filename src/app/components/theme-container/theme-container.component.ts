import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-container',
  templateUrl: './theme-container.component.html',
  styleUrls: ['./theme-container.component.sass']
})
export class ThemeContainerComponent implements OnInit {
  @Input() theme: any;
  themeColors: any;
  constructor() { }

  ngOnInit(): void {
    const themeParsed = JSON.parse(this.theme.themeObject);
    this.themeColors = [
      themeParsed.backgroundColor,
      themeParsed.headers.color,
      themeParsed.paragraph.color,
      themeParsed.anchors.color,
      themeParsed.codeInline.color,
      themeParsed.codeBlock.color,
      themeParsed.blockquotes.color,
      themeParsed.lists.color
    ];
    console.log(this.themeColors)

  }

  appendDivColors() {
    let divs = document.querySelectorAll('.color')
  }

}
