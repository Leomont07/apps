import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedWarningsComponent } from './shared-warnings.component';

describe('SharedWarningsComponent', () => {
  let component: SharedWarningsComponent;
  let fixture: ComponentFixture<SharedWarningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedWarningsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedWarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
