import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})

export class SupabaseService {

  supabase: SupabaseClient = createClient('https://yhfjivjqoqesyceweada.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyOTk5MjI4OCwiZXhwIjoxOTQ1NTY4Mjg4fQ.e7iLoo-sCkXzaPrNqA4KdgWxY1pfnBTP18p6F84FHmE');

  async selectAllPublicThemes() {
    return await this.supabase
      .from('mdThemes')
      .select('*')
      .is('isPublic', true);
  }

  async selectThemeById(themeId: string) {
    return await this.supabase
      .from('mdThemes')
      .select('*')
      .eq('id', themeId);
  }

  async selectThemesByUserId(userId: string) {
    return await this.supabase
      .from('mdThemes')
      .select('*')
      .eq('userId', userId);
  }

  async createTheme(id: string, userId: string | undefined, themeName: string, themeStringifiedObject: string) {
    const { data, error } = await this.supabase
      .from('mdThemes')
      .insert([
        { id, userId: userId, name: themeName, themeObject: themeStringifiedObject, isPublic: false },
      ])
    return data;
  }

  async updateThemeName(themeName: string, themeId: string) {
    return await this.supabase
      .from('mdThemes')
      .update({ name: themeName })
      .eq('id', themeId);
  }

  async updateThemeObjectOnChange(themeId: string, themeStringifiedObject: string) {
    return await this.supabase
      .from('mdThemes')
      .update({ themeObject: themeStringifiedObject })
      .eq('id', themeId);
  }

  async deleteThemeById(userId: string, themeId: string) {
    return await this.supabase
      .from('mdThemes')
      .delete()
      .eq('id', themeId)
      .eq('userId', userId);
  }

  async publishTheme(themeId: string) {
    return await this.supabase
      .from('mdThemes')
      .update({ isPublish: true })
      .eq('id', themeId);
  }

}