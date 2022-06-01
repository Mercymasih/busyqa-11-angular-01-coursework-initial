import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'buyqa-11-angular-01-coursework-initial';
  tasks : string[]= [];
  task='';

  added :boolean = false;
  deleted : boolean = false;

  onAddTask(){
    
    this.tasks.push(this.task);
    this.added = true;
    this.task='';

    setTimeout(() => {
      this.added = false;
    }, 2000);
  }
    
  onDeleteTask(index : number){
    
    this.tasks.splice(index,1);
    this.deleted = true;
    this.task='';

    setTimeout(() => {
      this.deleted = false;
    }, 5000);
  }
    
}
