import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-theme-container',
  templateUrl: './theme-container.component.html',
  styleUrls: ['./theme-container.component.sass']
})
export class ThemeContainerComponent implements OnInit {
  @Input() theme: any;
  name = new FormControl('');
  themeColors: any;
  themeParsed: any
  editingThemeName: boolean = false;
  isThemePublic: boolean = false;
  constructor(private supabase: SupabaseService) { }

  ngOnInit(): void {
    this.themeParsed = JSON.parse(this.theme.themeObject);
    this.themeColors = [
      this.themeParsed.backgroundColor.toUpperCase(),
      this.themeParsed.headers.color.toUpperCase(),
      this.themeParsed.paragraph.color.toUpperCase(),
      this.themeParsed.anchors.color.toUpperCase(),
      this.themeParsed.codeInline.color.toUpperCase(),
      this.themeParsed.codeBlock.color.toUpperCase(),
      this.themeParsed.blockquotes.color.toUpperCase(),
      this.themeParsed.lists.color.toUpperCase()
    ];
    this.name.setValue(this.theme.name);
    this.isThemePublic = this.theme.isPublic;
  }

  invertSpanColor(event: Event) {
    const target = event.target as HTMLElement;
    let spanColor = target.style.backgroundColor as any;
    let colors = spanColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    let brightness = 1;

   //@ts-ignore
    let r = colors[1];//@ts-ignore
    let g = colors[2];//@ts-ignore
    let b = colors[3];

    let ir = Math.floor((255-r)*brightness);
    let ig = Math.floor((255-g)*brightness);
    let ib = Math.floor((255-b)*brightness);
    let spans = target.querySelectorAll('span');
    for (let i = 0; i < spans.length; i++) {
      spans[i].style.color = `rgb(${ir},${ig},${ib})`;
    }   
  }

  editThemeName() {
    this.editingThemeName = true;    
  }

  saveThemeName() {
    this.supabase.updateThemeName(this.name.value, this.theme.id);
    this.theme.name = this.name.value;
    this.editingThemeName = false;
  }

  deleteTheme() {
    this.supabase.deleteThemeById(this.theme.id);
    return window.location.reload();
  }

  setThemePublic() {
    this.supabase.publishTheme(this.theme.id, true);
    this.isThemePublic = true;
  }

  setThemePrivate() {
    this.supabase.publishTheme(this.theme.id, this.isThemePublic);
    this.isThemePublic = false;
  }

  cancel() {
    this.editingThemeName = false;
  }

}
