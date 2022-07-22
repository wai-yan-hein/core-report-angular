import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCompanyAssignComponent } from './user-company-assign.component';

describe('UserCompanyAssignComponent', () => {
  let component: UserCompanyAssignComponent;
  let fixture: ComponentFixture<UserCompanyAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCompanyAssignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCompanyAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
