import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { apiService } from '../service/service.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  task: any = {
    id: '',
    title: '',
    description: '',
    priority: '',
    date: ''
  }
  title: any = "";
  constructor(public dialogRef: MatDialogRef<TaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: apiService) { }

  ngOnInit() {
        if(this.data.patchData){
          this.task = Object.assign({},this.data.patchData)
          this.task.date = new Date(this.task.date);
        }
  }
  buttonAction(action) {
    if (action === 'cancel') {
      this.dialogRef.close({ refresh: false });
    }
    else if (action === 'save') {
      this.addNewTask();
      this.dialogRef.close({ refresh: true });

    } else if (action === 'update') {
      this.updateTask();
      this.dialogRef.close({ refresh: true });

    }
  }

  randomIdGenerator(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
  addNewTask(){
    this.task.id = this.randomIdGenerator(8);
    this.service.createTask(this.task)
  }
  updateTask(){
    this.service.updateTask(this.task);
  }


}
