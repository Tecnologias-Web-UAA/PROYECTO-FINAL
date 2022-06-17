import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaExistenciasProdComponent } from './grafica-existencias-prod.component';

describe('GraficaExistenciasProdComponent', () => {
  let component: GraficaExistenciasProdComponent;
  let fixture: ComponentFixture<GraficaExistenciasProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaExistenciasProdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaExistenciasProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
