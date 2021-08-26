import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyThemesComponent } from './my-themes.component';

describe('MyThemesComponent', () => {
  let component: MyThemesComponent;
  let fixture: ComponentFixture<MyThemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyThemesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
