import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // private apiUrl = 'http://localhost:5001/tasks/';
  // private statusApiUrl = 'http://localhost:5001/status/change-status/';
  private apiUrl = 'https://task-management-9.onrender.com/tasks/';
  private statusApiUrl = 'https://task-management-9.onrender.com/status/change-status/';

  
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
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}update/${taskId}`, updatedTask, { headers });
  }
  changeTaskStatus(taskId: string, statusChange: { status: string }): Observable<any> {
    return this.http.put<any>(this.statusApiUrl + taskId, statusChange);
  }
  getTaskHistory(taskId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}history/${taskId}`);
  }
}
