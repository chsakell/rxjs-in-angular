import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchMapComponent } from './switch-map.component';

describe('SwitchMapComponent', () => {
  let component: SwitchMapComponent;
  let fixture: ComponentFixture<SwitchMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
