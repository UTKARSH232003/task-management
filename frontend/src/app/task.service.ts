import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // private apiUrl = 'http://localhost:5001/tasks/';
  // private statusApiUrl = 'http://localhost:5001/status/change-status/';
  private apiUrl = 'http://task-management-1-zwte.onrender.com/tasks/';

  private statusApiUrl = 'http://task-management-1-zwte.onrender.com/status/change-status/';

  
  constructor(private http: HttpClient) { }
  
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTask(taskData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}add`, taskData);
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + 'delete/' + taskId);
  }

  updateTask(taskId: string, updatedTask: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + 'update/' + taskId, updatedTask);
  }

  changeTaskStatus(taskId: string, statusChange: { status: string }): Observable<any> {
    return this.http.put<any>(this.statusApiUrl + taskId, statusChange);
  }
}
