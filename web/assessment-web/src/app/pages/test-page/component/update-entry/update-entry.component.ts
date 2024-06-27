import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TestPageModel } from '../../model/test-page-model';
import { FormControl } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { TestPageService } from '../../service/test-page.service';

@Component({
  selector: 'vex-update-entry',
  templateUrl: './update-entry.component.html',
  styleUrls: ['./update-entry.component.scss']
})
export class UpdateEntryComponent implements OnInit {

  rowData: TestPageModel;

  myControl = new FormControl();
  
  constructor(private dialogRef: MatDialogRef<UpdateEntryComponent>,
    private toast: NgToastService,
    private testService: TestPageService,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.rowData = data;
    console.log(this.rowData); 
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.updateEntry();
  }

  updateEntry(){
    console.log(this.rowData.description);
    let reqDto = {id: this.rowData.id, description: this.rowData.description};
    console.log(reqDto);
    this.testService.updateEntry(this.rowData.id, reqDto).subscribe(
      (response: any) => {
        this.toast.success({detail:"SUCCESS", summary: "Successfully Updated.", duration:10000, position:'topRight'});
        this.close();
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
    
  }

  close(){
    this.dialogRef.close();
  }

}
