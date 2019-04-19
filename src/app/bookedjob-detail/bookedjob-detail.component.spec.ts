import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedjobDetailComponent } from './bookedjob-detail.component';

describe('BookedjobDetailComponent', () => {
  let component: BookedjobDetailComponent;
  let fixture: ComponentFixture<BookedjobDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedjobDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedjobDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
