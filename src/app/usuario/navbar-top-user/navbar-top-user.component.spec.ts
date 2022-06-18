import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTopUserComponent } from './navbar-top-user.component';

describe('NavbarTopUserComponent', () => {
  let component: NavbarTopUserComponent;
  let fixture: ComponentFixture<NavbarTopUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarTopUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarTopUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
