import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CdkStepper } from '@angular/cdk/stepper';
import { IStep, StepsService } from '../services/steps.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{provide: CdkStepper, useExisting: CdkStepper}],
})
export class StepperComponent implements OnInit {

  valid1 = new FormControl('')
  valid2 = new FormControl('')

  stepCompleted = false;
  selectedIndex = '';
  stepSub: Subscription | undefined;
  currentStep: IStep | null = null;


  constructor(
    public stepsService: StepsService,
  ) {
    this.setState(this.valid1,true)
    this.setState(this.valid2,true)
    this.stepSub = this.stepsService.onStep.subscribe((step) => {
      console.log("app.component() - step: " + JSON.stringify(step));
      this.currentStep = step;
    })
  }

  ngOnInit(): void {
    if(this.valid1.value && this.valid2.value) {
      console.log('testing ');
    }
  }

  setState(control: FormControl, state: boolean) {
    if (state) {
      control.setErrors({ "required": true })
    } else {
      if(this.valid1.value && this.valid2.value) {
        console.log('testing ');
      }
      control.reset()
    }
  }

  complete() {
    this.stepCompleted = true;
  }



  setIndex(event: any) {

    this.selectedIndex = event.selectedIndex;
    console.log('test index: ' + this.selectedIndex);
    if(this.selectedIndex == "2"){
      console.log('On est a la fin')
      this.stepsService.setIndex();
    }else{
      console.log('On est pas a la fin')
    }
  }

  triggerClick() {
    console.log(`Selected tab index: ${this.selectedIndex}`);
  }



}
