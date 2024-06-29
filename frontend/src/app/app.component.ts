import { Component } from '@angular/core';
import { TaskService } from './task.service';
import * as Papa from 'papaparse'; // Import Papaparse

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: any[] = [];
  showAddTaskDialog = false;
  showEditTaskDialog = false;
  taskToEdit: any = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
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

  openAddTaskDialog(): void {
    this.showAddTaskDialog = true;
    this.showEditTaskDialog = false; // Ensure edit dialog is closed
    this.taskToEdit = null; // Clear taskToEdit
  }

  editTask(task: any): void {
    // Open the edit task dialog
    this.showAddTaskDialog = true;
    this.showEditTaskDialog = true;
    this.taskToEdit = { ...task }; // Create a copy of the task object
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        console.log('Task deleted successfully');
        this.loadTasks(); // Reload tasks after deletion
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
        this.loadTasks(); // Reload tasks after status change
      },
      (error) => {
        console.error('Error changing task status:', error);
      }
    );
  }

  handleDialogClose(event: boolean): void {
    if (event) {
      this.loadTasks(); // Reload tasks after adding or editing
    }
    this.showAddTaskDialog = false; // Close the dialog
    this.showEditTaskDialog = false; // Ensure edit dialog is closed
    this.taskToEdit = null; // Clear taskToEdit
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
        // Default case or error handling
        break;
    }
  }
exportToCSV(): void {
  const csvData = Papa.unparse(this.tasks, {
    quotes: true, // Add quotes around fields
    delimiter: ',', // Delimiter is comma
    header: true // Include header line
  });

  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

  // Create a link element, hide it, direct it towards the blob, and then 'click' it programatically
  const link = document.createElement('a');
  link.style.display = 'none';
  document.body.appendChild(link);

  // Create object URL to reference our blob
  const objURL = URL.createObjectURL(blob);
  link.href = objURL;

  // Set the name of the file to be downloaded
  link.download = 'tasks.csv';

  // Trigger the click to download the CSV
  link.click();

  // Clean up and remove the link
  URL.revokeObjectURL(objURL);
  document.body.removeChild(link);
}
}


// import { Component } from '@angular/core';
// import { TaskService } from './task.service';
// import * as Papa from 'papaparse'; // Import Papaparse

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   tasks: any[] = [];
//   showAddTaskDialog = false;
//   showEditTaskDialog = false;
//   taskToEdit: any = null;

//   constructor(private taskService: TaskService) {}

//   ngOnInit(): void {
//     this.loadTasks();
//   }

//   loadTasks(): void {
//     this.taskService.getTasks().subscribe(
//       (data) => {
//         this.tasks = data;
//       },
//       (error) => {
//         console.error('Error fetching tasks:', error);
//       }
//     );
//   }

//   openAddTaskDialog(): void {
//     this.showAddTaskDialog = true;
//     this.showEditTaskDialog = false; // Ensure edit dialog is closed
//     this.taskToEdit = null; // Clear taskToEdit
//   }

//   editTask(task: any): void {
//     // Open the edit task dialog
//     this.showAddTaskDialog = true;
//     this.showEditTaskDialog = true;
//     this.taskToEdit = { ...task }; // Create a copy of the task object
//   }

//   deleteTask(taskId: string): void {
//     this.taskService.deleteTask(taskId).subscribe(
//       () => {
//         console.log('Task deleted successfully');
//         this.loadTasks(); // Reload tasks after deletion
//       },
//       (error) => {
//         console.error('Error deleting task:', error);
//       }
//     );
//   }

//   changeTaskStatus(taskId: string, status: string, event: Event): void {
//     event.preventDefault();
//     this.taskService.changeTaskStatus(taskId, { status }).subscribe(
//       () => {
//         console.log('Task status changed successfully');
//         this.loadTasks(); // Reload tasks after status change
//       },
//       (error) => {
//         console.error('Error changing task status:', error);
//       }
//     );
//   }

//   handleDialogClose(event: boolean): void {
//     if (event) {
//       this.loadTasks(); // Reload tasks after adding or editing
//     }
//     this.showAddTaskDialog = false; // Close the dialog
//     this.showEditTaskDialog = false; // Ensure edit dialog is closed
//     this.taskToEdit = null; // Clear taskToEdit
//   }

//   exportToCSV(): void {
//     const csvData = Papa.unparse(this.tasks, {
//       quotes: true, // Add quotes around fields
//       delimiter: ',', // Delimiter is comma
//       header: true // Include header line
//     });

//     const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

//     // Create a link element, hide it, direct it towards the blob, and then 'click' it programatically
//     const link = document.createElement('a');
//     link.style.display = 'none';
//     document.body.appendChild(link);

//     // Create object URL to reference our blob
//     const objURL = URL.createObjectURL(blob);
//     link.href = objURL;

//     // Set the name of the file to be downloaded
//     link.download = 'tasks.csv';

//     // Trigger the click to download the CSV
//     link.click();

//     // Clean up and remove the link
//     URL.revokeObjectURL(objURL);
//     document.body.removeChild(link);
//   }
// }
