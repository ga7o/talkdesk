import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsSectionComponent } from './applications-section.component';

describe('ApplicationsSectionComponent', () => {
  let component: ApplicationsSectionComponent;
  let fixture: ComponentFixture<ApplicationsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
