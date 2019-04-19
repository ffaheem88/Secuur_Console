import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-addmarker',
  templateUrl: './addmarker.component.html',
  styleUrls: ['./addmarker.component.css']
})
export class AddmarkerComponent implements OnInit {

  selected;
  description:string;
  constructor(private dialogRef: MatDialogRef<AddmarkerComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
     }

  ngOnInit() {
    console.log(this.data);
  }

  save() {
    let send = 
    {
      selected:this.selected,
      description:this.description
    }
    console.log(this.selected);
    this.dialogRef.close(send);
    console.log(this.description);
    
}
close(): void {
  this.dialogRef.close();
}

}
