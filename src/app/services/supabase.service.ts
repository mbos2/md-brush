import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})

export class SupabaseService {

  supabase: SupabaseClient = createClient('https://yhfjivjqoqesyceweada.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyOTk5MjI4OCwiZXhwIjoxOTQ1NTY4Mjg4fQ.e7iLoo-sCkXzaPrNqA4KdgWxY1pfnBTP18p6F84FHmE');
  constructor() {
    
  }

  async selectAllThemes() {
    return await this.supabase
      .from('mdThemes')
      .select('*');
  }

}