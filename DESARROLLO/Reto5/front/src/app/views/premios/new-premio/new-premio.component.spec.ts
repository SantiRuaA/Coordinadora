import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPremioComponent } from './new-premio.component';

describe('NewPremioComponent', () => {
  let component: NewPremioComponent;
  let fixture: ComponentFixture<NewPremioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPremioComponent]
    });
    fixture = TestBed.createComponent(NewPremioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
