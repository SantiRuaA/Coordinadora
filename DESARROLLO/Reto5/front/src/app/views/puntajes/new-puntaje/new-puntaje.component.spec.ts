import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPuntajeComponent } from './new-puntaje.component';

describe('NewPuntajeComponent', () => {
  let component: NewPuntajeComponent;
  let fixture: ComponentFixture<NewPuntajeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPuntajeComponent]
    });
    fixture = TestBed.createComponent(NewPuntajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
