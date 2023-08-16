import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveTaskPageComponent } from './remove-task-page.component';

describe('RemoveTaskPageComponent', () => {
  let component: RemoveTaskPageComponent;
  let fixture: ComponentFixture<RemoveTaskPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveTaskPageComponent]
    });
    fixture = TestBed.createComponent(RemoveTaskPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
