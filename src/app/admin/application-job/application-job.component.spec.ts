import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationJobComponent } from './application-job.component';

describe('ApplicationJobComponent', () => {
  let component: ApplicationJobComponent;
  let fixture: ComponentFixture<ApplicationJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationJobComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
