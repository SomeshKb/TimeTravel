import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentPlayerComponent } from './present-player.component';

describe('PresentPlayerComponent', () => {
  let component: PresentPlayerComponent;
  let fixture: ComponentFixture<PresentPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
