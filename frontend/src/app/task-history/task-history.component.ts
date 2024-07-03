import {Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrl: './task-history.component.css'
})
export class TaskHistoryComponent {
  @Input() taskHistory: any[] = [];
  @Output() close = new EventEmitter<void>();
  private getChangedFields(original: any, updated: any): any {
    const changedFields: any = {};
    for (const key in updated) {
      if (updated.hasOwnProperty(key) && updated[key] !== original[key]) {
        changedFields[key] = updated[key];
      }
    }
    return changedFields;
  }

  isObject(value: any): boolean {
    return value && typeof value === 'object' && !Array.isArray(value);
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  closeHistoryDialog() {
    this.close.emit();
  }
}
