import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersDetails } from './members-details';

describe('MembersDetails', () => {
  let component: MembersDetails;
  let fixture: ComponentFixture<MembersDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembersDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembersDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
