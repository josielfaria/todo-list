import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveTodoPage } from './remove-todo.page';

describe('RemoveTodoPage', () => {
  let component: RemoveTodoPage;
  let fixture: ComponentFixture<RemoveTodoPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveTodoPage]
    });
    fixture = TestBed.createComponent(RemoveTodoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
