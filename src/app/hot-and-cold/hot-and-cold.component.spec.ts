import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotAndColdComponent } from './hot-and-cold.component';

describe('HotAndColdComponent', () => {
  let component: HotAndColdComponent;
  let fixture: ComponentFixture<HotAndColdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotAndColdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotAndColdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
