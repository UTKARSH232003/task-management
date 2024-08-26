import { Component } from '@angular/core';
import { TaskService } from './task.service';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: any[] = [];
  showHistoryDialog = false;
  taskHistory: any[] = [];
  showAddTaskDialog = false;
  showEditTaskDialog = false;
  taskToEdit: any = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (data) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }
  showTaskHistory(taskId: string) {
    this.taskService.getTaskHistory(taskId).subscribe(data => {
      this.taskHistory = data;
      this.showHistoryDialog = true;
    });
  }
  closeHistoryDialog() {
    this.showHistoryDialog = false;
  }
  openAddTaskDialog(): void {
    this.showAddTaskDialog = true;
    this.showEditTaskDialog = false; 
    this.taskToEdit = null; 
  }

  editTask(task: any): void {
    this.showAddTaskDialog = true;
    this.showEditTaskDialog = true;
    this.taskToEdit = { ...task }; 
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        console.log('Task deleted successfully');
        this.loadTasks(); 
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }

  changeTaskStatus(taskId: string, status: string, event: Event): void {
    event.preventDefault();
    this.taskService.changeTaskStatus(taskId, { status }).subscribe(
      () => {
        console.log('Task status changed successfully');
        this.loadTasks();
      },
      (error) => {
        console.error('Error changing task status:', error);
      }
    );
  }

  handleDialogClose(event: boolean): void {
    if (event) {
      this.loadTasks(); 
    }
    this.showAddTaskDialog = false; 
    this.showEditTaskDialog = false; 
    this.taskToEdit = null; 
  }

  sortBy(criteria: string): void {
    switch(criteria) {
      case 'dueDate':
        this.tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        break;
      case 'priority':
        this.tasks.sort((a, b) => a.priority - b.priority);
        break;
      case 'status':
        this.tasks.sort((a, b) => a.status.localeCompare(b.status));
        break;
      default:
        break;
    }
  }
exportToCSV(): void {
  const csvData = Papa.unparse(this.tasks, {
    quotes: true, 
    delimiter: ',', 
    header: true 
  });

  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

  const link = document.createElement('a');
  link.style.display = 'none';
  document.body.appendChild(link);

  const objURL = URL.createObjectURL(blob);
  link.href = objURL;

  link.download = 'tasks.csv';

  link.click();

  URL.revokeObjectURL(objURL);
  document.body.removeChild(link);
}
}

