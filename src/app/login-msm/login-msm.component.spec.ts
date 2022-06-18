import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMsmComponent } from './login-msm.component';

describe('LoginMsmComponent', () => {
  let component: LoginMsmComponent;
  let fixture: ComponentFixture<LoginMsmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginMsmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
