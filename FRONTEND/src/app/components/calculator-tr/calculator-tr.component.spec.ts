import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorTRComponent } from './calculator-tr.component';

describe('CalculatorTRComponent', () => {
  let component: CalculatorTRComponent;
  let fixture: ComponentFixture<CalculatorTRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorTRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorTRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
