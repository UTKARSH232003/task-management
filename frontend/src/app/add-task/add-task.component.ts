import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  @Input() taskToEdit: any = null;
  @Output() close = new EventEmitter<boolean>();

  newTask = {
    title: '',
    description: '',
    dueDate: '',
    priority: 'low',
    status: 'pending'
  };

  isEditing: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnChanges(): void {
    if (this.taskToEdit) {
      this.newTask = { ...this.taskToEdit };
      this.isEditing = true;
    } else {
      this.resetForm();
      this.isEditing = false;
    }
  }

  private updateTask(): void {
    const updatedFields = this.getChangedFields(this.taskToEdit, this.newTask);
    
    this.taskService.updateTask(this.taskToEdit._id, updatedFields).subscribe(
      (updatedTask) => {
        this.close.emit(true);
      },
      (error) => {
        console.error('Error updating task:', error);
        alert('Failed to update task. Please try again.');
      }
    );
  }

  private addTask(): void {
    this.taskService.addTask(this.newTask).subscribe(
      (addedTask) => {
        this.closeDialog();
      },
      (error) => {
        console.error('Error adding task:', error);
        alert('Failed to add task. Please try again.');
      }
    );
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.updateTask();
    } else {
      this.addTask();
    }
  }

  closeDialog(): void {
    this.resetForm();
    this.close.emit(true);
  }

  resetForm(): void {
    this.newTask = {
      title: '',
      description: '',
      dueDate: '',
      priority: 'low',
      status: 'pending'
    };
  }

  getSubmitButtonText(): string {
    return this.isEditing ? 'Update Task' : 'Add Task';
  }

  private getChangedFields(original: any, updated: any): any {
    const changedFields: any = {};
    for (const key in updated) {
      if (updated.hasOwnProperty(key) && updated[key] !== original[key]) {
        changedFields[key] = updated[key];
      }
    }
    return changedFields;
  }
}
