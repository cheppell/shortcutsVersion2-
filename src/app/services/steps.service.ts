import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepsService {


  stepIndex: IStep = {
    index: 0
  };
  onStep: BehaviorSubject<IStep> = new BehaviorSubject({index:1});

  constructor() {
    console.log("steps.service()");
    var retrievedObject = localStorage.getItem('STEP_INDEX') || JSON.stringify(this.stepIndex);
    this.stepIndex =  JSON.parse(retrievedObject); // <-- commented here before test and decommented after that.
    this.setIndex();

  }

  public setIndex(): void {
    console.log("steps.service.setIndex() START " + this.stepIndex.index);
    this.stepIndex.index += 1;
    this.save();
    console.log("steps.service.setIndex() END " + this.stepIndex.index);
    this.onStep.next(this.stepIndex);
    this.diagnose();
  }

  public unsetIndex(): void {
    console.log("steps.service.unsetIndex()");
    this.stepIndex.index -= 1;
    this.save();
    this.onStep.next(this.stepIndex);
    this.diagnose();
  }

  public reset(): void {
    this.stepIndex.index = 1;
    this.save();
    this.onStep.next(this.stepIndex);
    this.diagnose();
  }

  public save(): void {
    console.log("steps.service.save()");
    localStorage.setItem('STEP_INDEX', JSON.stringify(this.stepIndex));
  }

  public diagnose(): void {
    console.log("steps.service.diagnose() stepIndex: " + JSON.stringify(this.stepIndex));
  }
}


export interface IStep{
  index: number;
}
