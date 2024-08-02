import { ComponentFixture, TestBed } from '@angular/core/testing';

import { postJobComponent } from './post-job.component';

describe('postJobComponent', () => {
  let component: postJobComponent;
  let fixture: ComponentFixture<postJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ postJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(postJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
