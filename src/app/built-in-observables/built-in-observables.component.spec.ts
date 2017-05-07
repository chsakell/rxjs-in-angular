import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuiltInObservablesComponent } from './built-in-observables.component';

describe('BuiltInObservablesComponent', () => {
  let component: BuiltInObservablesComponent;
  let fixture: ComponentFixture<BuiltInObservablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuiltInObservablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuiltInObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
