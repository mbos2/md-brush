import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auth0Service } from 'src/app/services/auth0.service';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-my-themes',
  templateUrl: './my-themes.component.html',
  styleUrls: ['./my-themes.component.sass']
})
export class MyThemesComponent implements OnInit {

  userId: any;
  themes: any;
  constructor(private supabaseService: SupabaseService, private auth0: Auth0Service) {
    this.auth0.user$.subscribe(user => {
      return this.userId = user?.sub;
    });
    console.log(this.userId)
  }

  async ngOnInit() {
    this.themes = await (await this.supabaseService.selectThemesByUserId(this.userId)).body;
    console.log(this.themes)
    console.log()
  }
}
