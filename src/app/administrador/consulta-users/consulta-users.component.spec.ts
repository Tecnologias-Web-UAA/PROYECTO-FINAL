import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaUsersComponent } from './consulta-users.component';

describe('ConsultaUsersComponent', () => {
  let component: ConsultaUsersComponent;
  let fixture: ComponentFixture<ConsultaUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
