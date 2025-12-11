import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersThree } from './members-three';

describe('MembersThree', () => {
  let component: MembersThree;
  let fixture: ComponentFixture<MembersThree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembersThree]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembersThree);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
