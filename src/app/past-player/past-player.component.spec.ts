import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastPlayerComponent } from './past-player.component';

describe('PastPlayerComponent', () => {
  let component: PastPlayerComponent;
  let fixture: ComponentFixture<PastPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
