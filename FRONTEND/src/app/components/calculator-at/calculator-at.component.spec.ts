import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorATComponent } from './calculator-at.component';

describe('CalculatorATComponent', () => {
  let component: CalculatorATComponent;
  let fixture: ComponentFixture<CalculatorATComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorATComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorATComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
