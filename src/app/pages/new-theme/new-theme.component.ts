import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth0Service } from 'src/app/services/auth0.service';
import { SupabaseService } from 'src/app/services/supabase.service';
import { markdownDefaultConfig } from '../../config/markdown-default';
const { v4: uuidv4 } = require('uuid');

@Component({
  selector: 'app-new-theme',
  templateUrl: './new-theme.component.html',
  styleUrls: ['./new-theme.component.sass']
})
export class NewThemeComponent {

  name: any = new FormControl('Default theme 1');
  constructor(private supabaseService: SupabaseService, private auth0: Auth0Service, private router: Router) { }

  async createTheme() {
    const markdownTheme = JSON.stringify(markdownDefaultConfig);
    return this.auth0.user$.subscribe(user => {
      const id = uuidv4();
      this.supabaseService.createTheme(id, user?.sub, this.name.value, markdownTheme)
        .then((data: any) => {
          setTimeout(() => {
          this.router.navigate([`theme/${id}`])
        }, 2000)
      })
    })
  }
}
