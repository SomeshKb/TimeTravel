import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTravelPlayerComponent } from './time-travel-player.component';

describe('TimeTravelPlayerComponent', () => {
  let component: TimeTravelPlayerComponent;
  let fixture: ComponentFixture<TimeTravelPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeTravelPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTravelPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
