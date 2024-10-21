import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogJobComponent } from './dialog-job.component';

describe('DialogJobComponent', () => {
  let component: DialogJobComponent;
  let fixture: ComponentFixture<DialogJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogJobComponent]
    });
    fixture = TestBed.createComponent(DialogJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
