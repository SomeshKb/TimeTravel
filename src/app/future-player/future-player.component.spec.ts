import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuturePlayerComponent } from './future-player.component';

describe('FuturePlayerComponent', () => {
  let component: FuturePlayerComponent;
  let fixture: ComponentFixture<FuturePlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuturePlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuturePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
