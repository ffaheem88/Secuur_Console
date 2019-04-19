import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedjobsComponent } from './bookedjobs.component';

describe('BookedjobsComponent', () => {
  let component: BookedjobsComponent;
  let fixture: ComponentFixture<BookedjobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedjobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
