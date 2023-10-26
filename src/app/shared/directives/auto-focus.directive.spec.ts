import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AutoFocusDirective } from './auto-focus.directive';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerDialogComponent } from 'src/app/customer-dialog/customer-dialog.component';
import { By } from '@angular/platform-browser';

describe('AutoFocusDirective', () => {
  let fixture: ComponentFixture<any>;
  let element: DebugElement;
  let directive: AutoFocusDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoFocusDirective, CustomerDialogComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(CustomerDialogComponent);
    element = fixture.debugElement.query(By.directive(AutoFocusDirective));
    directive = element.injector.get(AutoFocusDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should focus on the element after view initialization', () => {
    fixture.detectChanges();
    expect(document.activeElement).toBe(element.nativeNode);
  });

  it('ngAfterViewInit should have been called', () => {
    const spy = spyOn(directive, 'ngAfterViewInit').and.callFake(() => {
      console.log('whatever you say officer');
    });
    // TODO: i do not know why ngAfterViewInit has not been called yet
    // directive.ngAfterViewInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should autofocus on input element', () => {
    const spy = spyOn(element.nativeNode, 'focus');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
// --------------------------second-test-suite-----------------------------
@Component({
  template: `
    <div>
      <input type="text" appAutoFocus>
    </div>
    `,
})
class HostComponent {
}

fdescribe('FocusTrap', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        HostComponent,
        AutoFocusDirective
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
  });

  it('spy on input', () => {
    let inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const spy = spyOn(inputElement, 'focus');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

});