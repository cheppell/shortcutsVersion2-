
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, Input, AfterContentInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MouseService } from './services/mouse.service';
import { IStep, StepsService } from './services/steps.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { MatSelectChange } from "@angular/material/select";
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

interface Animal {
  name: string;
  sound: string;
}

const SAMPLE_TEXT= "-Première ligne copie pas ici -Deuxième ligne copie oui <- -Stop touche pas a elle"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class AppComponent implements AfterViewInit, OnDestroy, OnInit, AfterContentInit{
  //title = 'Shortcuts New Version';
  //title = 'angular-shortcuts-new-version';
  animalControl = new FormControl<Animal | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    {name: 'Dog', sound: 'Woof! Non Mauvais'},
    {name: 'Cat', sound: 'Meow! Non Mauvais'},
    {name: 'Cow', sound: 'Meuu! Non Mauvais'},
    {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow! Yeahh!'},
    {name: 'Lion', sound: 'Roarrr! Non Mauvais'},
  ];
  selectedData: { value: string; text: string } = {
    value: "",
    text: ""
  };

  myGroupes = new FormGroup({
    txtCopier: new FormControl(SAMPLE_TEXT),
  });

  //
  title = 'shortcuts';
  stepSub: Subscription | undefined;
  currentStep: IStep | null = null;
  dialogRef: any;

  @Input() public autoFocus: boolean = false;

  constructor(
      public stepsService: StepsService,
      public mouseService:MouseService,
      public dialog: MatDialog,
      public route: ActivatedRoute,
      public element: ElementRef,
    ) {
    console.info("AppComponent()");
    // this.stepsService.reset();
    this.stepSub = this.stepsService.onStep.subscribe((step) => {
      console.log("app.component() - step: " + JSON.stringify(step));
      this.currentStep = step;
    })
  }
  // <------------------------ test ------------------------------->
  ngOnInit() {
    console.info("ngOnInit()");
    // <------------------------ for the end and reset to the first step ------------------------------->
    var step = this.currentStep?.index;

    console.log("step is " + step);

    if(step?.toString() ==  "10"){
      console.log("Test si on se rend a 9");
      this.stepsService.reset();
    }

    console.log("currentStep " + this.currentStep?.index);
    // <------------------------ for the end and reset to the first step ------------------------------->
    this.route.queryParamMap.subscribe(params => {
      if(params.get('test')) {
        console.log("param test is " + params.get('test'));
        this.stepsService.setIndex();
      } else {
        console.log("param test is NOT set!")
      }
    })
  }

  public ngAfterContentInit(): void {
    setTimeout(()=>{
      this.element.nativeElement.focus();
    }, 500)
  }

  ngAfterViewInit(): void {
    console.info("ngAfterViewInit()");
    this.mouseService.start();
  }

  ngOnDestroy(): void {
    this.stepsService.unsetIndex();
    this.stepSub?.unsubscribe();
    this.mouseService.stop();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler() {
      console.log("app.component.beforeunloadHandler()");
      this.stepsService.unsetIndex();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove() {
    // console.log(e);
    // console.log("app.component.onMouseMove()");
    this.mouseService.onMouseMove();
  }

  onClickMain(enterAnimationDuration: string , exitAnimationDuration : string ): void {
    this.openDialogue(enterAnimationDuration, exitAnimationDuration);
  }

  onNewTextChange(event: any): void {
    console.log("test");
    console.log(event);
    event.value == "patate-martin-et-sylvain";
    console.log(event.value);
    {
      this.stepsService.setIndex();
    }
  }

  selectedValue(event: MatSelectChange) {
    this.selectedData = {
      value: event.value,
      text: event.source.triggerValue
    };
    console.log(this.selectedData);
    if(this.selectedData.text == "Fox"){
      console.log("Good c'est le bon choix!");
      {
        this.stepsService.setIndex();
      }
    }else{
      console.log("C'est pas le bon choix!");
    }
  }



  openDialogue(enterAnimationDuration: string , exitAnimationDuration : string ): void {
    this.dialogRef = this.dialog.open(DialogExampleComponent,
      {
        width: '450px',
        enterAnimationDuration,
        exitAnimationDuration,
        disableClose: true,
      }
    );
  }
}
@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {

  }
}
