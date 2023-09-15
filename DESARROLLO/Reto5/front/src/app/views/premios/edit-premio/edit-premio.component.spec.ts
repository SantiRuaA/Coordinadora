import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPremioComponent } from './edit-premio.component';

describe('EditPremioComponent', () => {
  let component: EditPremioComponent;
  let fixture: ComponentFixture<EditPremioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPremioComponent]
    });
    fixture = TestBed.createComponent(EditPremioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
