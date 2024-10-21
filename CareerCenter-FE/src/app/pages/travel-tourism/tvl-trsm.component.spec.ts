import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvlTrsmComponent } from './tvl-trsm.component';

describe('TvlTrsmComponent', () => {
  let component: TvlTrsmComponent;
  let fixture: ComponentFixture<TvlTrsmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TvlTrsmComponent]
    });
    fixture = TestBed.createComponent(TvlTrsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
