import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDialogComponent } from './customer-dialog.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PhoneNumberValidator } from '../shared/validators/custom-validators';

describe('CustomerDialogComponent', () => {
  let component: CustomerDialogComponent;
  let fixture: ComponentFixture<CustomerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDialogComponent ],
      imports: [ReactiveFormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return null if the control value is valid', () => {
    const control = new FormControl('shayan');
    const validatorFn = Validators.pattern(/^[a-z0-9\u0627-\u06cc]{3,32}$/i);
    const result = validatorFn(control);
    expect(result).toBeNull();
  });

});


describe('pattern', () => {

  it('string length range from 3 to 32, a to z and  0 to 9 and persian alphabet without space', () => {
    expect(Validators.pattern(/^[a-z0-9\u0627-\u06cc]{3,32}$/i)(new FormControl('شایان'))).toBeNull();
  });

  it('persian dateOfBirth regex', () => {
    expect(Validators.pattern(/^[1-4]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/)(new FormControl('1372/07/07'))).toBeNull();
  });

  it('email regex', () => {
    expect(Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)(new FormControl(''))).toBeNull();
  });

  it('persian card number', () => {
    expect(Validators.pattern(/^\d{4}-\d{4}-\d{4}-\d{4}$/)(new FormControl(''))).toBeNull();
  });

});