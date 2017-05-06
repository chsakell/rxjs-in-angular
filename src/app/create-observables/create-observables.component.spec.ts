import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateObservablesComponent } from './create-observables.component';

describe('CreateObservablesComponent', () => {
  let component: CreateObservablesComponent;
  let fixture: ComponentFixture<CreateObservablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateObservablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
