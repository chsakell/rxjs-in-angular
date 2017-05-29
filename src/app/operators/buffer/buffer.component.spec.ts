import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BufferComponent } from './buffer.component';

describe('BufferComponent', () => {
  let component: BufferComponent;
  let fixture: ComponentFixture<BufferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BufferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BufferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
