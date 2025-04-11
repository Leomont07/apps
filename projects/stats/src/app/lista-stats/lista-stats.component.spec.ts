import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaStatsComponent } from './lista-stats.component';

describe('ListaStatsComponent', () => {
  let component: ListaStatsComponent;
  let fixture: ComponentFixture<ListaStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
