import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { TodoService } from 'src/app/services/todo.service';
import { UserService } from 'src/app/services/user.service';

describe(HomePage.name, () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let todoService: TodoService;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [TodoService, UserService],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    userService = TestBed.inject(UserService);
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar as contagens de tarefas', () => {
    spyOn(todoService, 'getTodoListCount').and.returnValue(5);
    component.ngOnInit();
    expect(component.todoCount).toBe(5);
  });

  it('deve inicializar as contagens de usuários', () => {
    spyOn(userService, 'getUserListCount').and.returnValue(10);
    component.ngOnInit();
    expect(component.userCount).toBe(10);
  });
});
