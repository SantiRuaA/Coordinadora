import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPuntajeComponent } from './edit-puntaje.component';

describe('EditPuntajeComponent', () => {
  let component: EditPuntajeComponent;
  let fixture: ComponentFixture<EditPuntajeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPuntajeComponent]
    });
    fixture = TestBed.createComponent(EditPuntajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
