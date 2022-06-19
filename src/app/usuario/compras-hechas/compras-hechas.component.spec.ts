import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasHechasComponent } from './compras-hechas.component';

describe('ComprasHechasComponent', () => {
  let component: ComprasHechasComponent;
  let fixture: ComponentFixture<ComprasHechasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprasHechasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasHechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
