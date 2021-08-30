import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.sass']
})
export class ExploreComponent implements OnInit {
  themes: any;
  constructor(private supabaseService: SupabaseService) {
  }

  async ngOnInit(): Promise<void> {
    await this.supabaseService.selectAllPublicThemes()
    .then(data => {
      console.log(data.body)
      this.themes = data.body;
    });
    console.log(this.themes)
  }

}
