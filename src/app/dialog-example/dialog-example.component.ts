import { Component, OnInit } from '@angular/core';
import { Directive, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.scss']
})
export class DialogExampleComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogExampleComponent>,) { }

  ngOnInit(): void {
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    console.log(event);
    this.dialogRef.close();
  }

  // onKeydown(event: KeyEvent) {
  //   console.log("key pressed: " + event.key);
  //   if (event.key === "ESC") {
  //     console.log("ESC PRESSED!");
  //     console.log(event);
  //   }
  // }

}

 export interface KeyEvent {
  key : string;
 }
