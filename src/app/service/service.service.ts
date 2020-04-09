import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class apiService {

  constructor() { }
  tracks: any[] = [{
    "title": "Pending",
    "id": "pending",
    "tasks": [
      {
        "id": "taskabc2",
        "title": "Anonymous Task 1",
        "description": "This is my first task 1",
        "priority": "high",
        "date": "04/25/2020"
      }
    ]
  },
  {
    "title": "In Progress",
    "id": "inprogress",
    "tasks": [
      {
        "id": "first-task2",
        "title": "Anonymous Task 2",
        "description": "This is my first task 2",
        "priority": "high",
        "date": "04/05/2020"
      }
    ]
  },
  {
    "title": "Complete",
    "id": "complete",
    "tasks": [
      {
        "id": "first-task3",
        "title": "Anonymous Task 3",
        "description": "This is my first task 3",
        "priority": "high",
        "date": "04/08/2020"
      }
    ]
  }];

  getAllTask(): any {
    const observer = new Observable(observer => {
      observer.next(this.tracks);
    });
    return observer;
  }
  createTask(d): any {
    this.tracks[0].tasks.push(d);
  }

  deleteTask(index, sectionIndex) {
    this.tracks[sectionIndex].tasks.splice(index, 1);
  }
  updateTask(data) {
    this.tracks[0].tasks = this.tracks[0].tasks.map(ele => {
      if (ele.id === data.id) {
        return ele = Object.assign({}, data);
      } else return ele;
    });
  }

  percentageCalculator(){
    let pendingTaskQty = this.tracks[0].tasks.length;
    let inprogressTaskQty = this.tracks[1].tasks.length;
    let completedTaskQty = this.tracks[2].tasks.length;

    let totalTaskQty = pendingTaskQty + inprogressTaskQty + completedTaskQty;
    let percentageQty = (completedTaskQty/totalTaskQty) * 100;
    return percentageQty.toFixed(2);
  }

  sortingByDate(){
  let pendingArr:any;
  pendingArr = this.tracks[0].tasks;
  this.tracks[0].tasks =  pendingArr.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());

}
}
