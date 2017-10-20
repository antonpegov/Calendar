import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEventDialogComponent } from './new-event-dialog.component';

describe('NewEventDialogComponent', () => {
  let component: NewEventDialogComponent;
  let fixture: ComponentFixture<NewEventDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEventDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
