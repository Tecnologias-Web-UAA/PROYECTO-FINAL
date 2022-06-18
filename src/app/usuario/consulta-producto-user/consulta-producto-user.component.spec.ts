import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaProductoUserComponent } from './consulta-producto-user.component';

describe('ConsultaProductoUserComponent', () => {
  let component: ConsultaProductoUserComponent;
  let fixture: ComponentFixture<ConsultaProductoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaProductoUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaProductoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
