import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPuntajesComponent } from './list-puntajes.component';

describe('ListPuntajesComponent', () => {
  let component: ListPuntajesComponent;
  let fixture: ComponentFixture<ListPuntajesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPuntajesComponent]
    });
    fixture = TestBed.createComponent(ListPuntajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
