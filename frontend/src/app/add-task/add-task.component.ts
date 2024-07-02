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

  onSubmit(): void {
    if (this.isEditing) {
      this.taskService.updateTask(this.taskToEdit._id, this.newTask).subscribe(
                (updatedTask) => {
                  console.log('Task updated successfully:', updatedTask);
                  // Emit true to indicate success and close the modal
                  this.close.emit(true);
                },
        (error) => {
          console.error('Error updating task:', error);
        }
      );
    } else {
      this.taskService.addTask(this.newTask).subscribe(
        (addedTask) => {
          console.log('Added task:', addedTask);
          this.closeDialog();
        },
        (error) => {
          console.error('Error adding task:', error);
        }
      );
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
}
