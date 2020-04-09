import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { apiService } from '../service/service.service';
import {MatDialog} from '@angular/material/dialog';
import { TaskComponent } from '../task/task.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private service: apiService,public dialog: MatDialog) { }

  ngOnInit() {
     this.service.getAllTask().subscribe(res=>{
       this.tracks = res;
       this.getTaskReport()
    })
  }
  title = 'angular-drag-drop';
  
  tracks:any[] =[];
  percentage:any = 0;
  // private tracks: any = this.jsonData;
    /**
   * An array of all track ids. Each id is associated with a `cdkDropList` for the
   * track talks. This property can be used to connect all drop lists together.
   */
  get trackIds(): string[] {
    return this.tracks.map(track => track.id);
  }

  onTalkDrop(event: CdkDragDrop<any[]>) {
    // In case the destination container is different from the previous container, we
    // need to transfer the given task to the target data array. This happens if
    // a task has been dropped on a different track.
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onTaskDrop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.getTaskReport()
}

  addNewTask(){ 
    // document.getElementById("openModalButton").click();  
      const dialogRef = this.dialog.open(TaskComponent, {
        width: '400px',
        height:'450px',
        data: {title:"ADD TASK"}
      });  

      dialogRef.afterClosed().subscribe(result => {
       if(result.refresh){
         this.getTaskReport();
         this.service.sortingByDate();
       }
      });
}
editTask(d){
  const dialogRef = this.dialog.open(TaskComponent, {
    width: '400px',
    height:'450px',
    data: {title:"EDIT TASK",patchData:d}
  }); 
  dialogRef.afterClosed().subscribe(result => {
    if(result.refresh){
      this.getTaskReport();
      this.service.sortingByDate();
    }
   });
}

cardOperation(section,data,operationType,index){
        if(section ==='pending'){
                   if(operationType ==='edit'){
                         this.editTask(data);
                   }
                   else if(operationType ==='delete'){
                           this.service.deleteTask(index,0);
                           this.getTaskReport();
                   }
                   else if(operationType === 'priority'){
                         data.priority  =  data.priority === 'high' ? 'low' :'high'
                         this.service.updateTask(this.tracks)
                   }
        }
        else if(section === 'inprogress')
        {
          if(operationType ==='delete'){
            this.service.deleteTask(index,1);
            this.getTaskReport();
          }
          else if(operationType === 'priority'){
            data.priority  =  data.priority === 'high' ? 'low' :'high'
            this.service.updateTask(this.tracks)
          }
        }
  
}
  getTaskReport(){
    this.percentage = this.service.percentageCalculator();
    console.log(this.tracks[0].tasks)
  }
}
