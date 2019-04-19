import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbankaccountComponent } from './addbankaccount.component';

describe('AddbankaccountComponent', () => {
  let component: AddbankaccountComponent;
  let fixture: ComponentFixture<AddbankaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbankaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbankaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
