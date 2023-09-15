import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPremiosComponent } from './list-premios.component';

describe('ListPremiosComponent', () => {
  let component: ListPremiosComponent;
  let fixture: ComponentFixture<ListPremiosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPremiosComponent]
    });
    fixture = TestBed.createComponent(ListPremiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
