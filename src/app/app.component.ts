import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './task.model';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private http: HttpClient){
    
  }

  ngOnInit(): void {
    this.fetchTasks();
  }

  title = 'buyqa-12-angular-01-coursework-initial';
  tasks : Task[]= [];
  task : Task = <Task>{};

  added :boolean = false;
  deleted : boolean = false;

  onAddTask(){
    
    //this.tasks.push(this.task);
    this.createTask(this.task);
    this.task.name = '';
    this.added = true;
    //this.fetchtasks='';
  

    setTimeout(() => {
      this.added = false;
    }, 2000);
  }
    
  onDeleteTask(index: number){
    
    //this.tasks.splice(index,1);
    this.deleteTask(this.tasks[index].idTask as string);
    this.deleted = true;
    //this.task='';

    setTimeout(() => {
      this.deleted = false;
    }, 5000);
  }

  fetchTasks(){
    this.http.get<{[key : string]: Task}>
                ('https://testbusyqa-91303-default-rtdb.firebaseio.com/tasks.json')
                .pipe(
                  map(responseData => {
                    const tasksArray = []; 
          
                    for (const key in responseData) { 
                      if (responseData.hasOwnProperty(key)) { 
                        tasksArray.push({ ...responseData[key], idTask: key }); 
                      }
                    }
                    return tasksArray;
                  })
                )      
                  .subscribe(tasks => {
                    console.log(tasks);
                    this.tasks= tasks;
                  });
    
  }

  createTask(task : Task){
    this.http.post('https://testbusyqa-91303-default-rtdb.firebaseio.com/tasks.json',task)
                  .subscribe(()=>{
                    //console.log('Task created on the Backend');
                    this.fetchTasks();
                  })
  }

  deleteTask(idTask: string){
    this.http.delete(
      `https://testbusyqa-91303-default-rtdb.firebaseio.com/tasks/${idTask}.json`) 
    .subscribe(()=> {
      this.fetchTasks();
    });
  }
    
}
