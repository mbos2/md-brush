import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicThemeContainerComponent } from './public-theme-container.component';

describe('PublicThemeContainerComponent', () => {
  let component: PublicThemeContainerComponent;
  let fixture: ComponentFixture<PublicThemeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicThemeContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicThemeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
