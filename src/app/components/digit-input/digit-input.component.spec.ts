import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DigitInputComponent } from './digit-input.component';

describe('DigitInputComponent', () => {
  let component: DigitInputComponent;
  let fixture: ComponentFixture<DigitInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigitInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DigitInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
