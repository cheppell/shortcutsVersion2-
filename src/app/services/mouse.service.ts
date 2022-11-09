import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MouseService {

  distance: number = 9;
  _x: number = 0;
  // <------------------------ test ------------------------------->
  _y: number = 0;
  // <------------------------ test ------------------------------->

  constructor() {
    console.log("mouse.service()");
  }

  onMouseMove(): void {
    // console.log("mouse.service.onMouseMove()");
    this._x += this.distance;
    this._y -= this.distance;
  }

  start(): void {
    console.log("mouse.service.start()");
    setInterval( () => {
      this.tick();
    } , 50);
  }

  stop(): void {
    console.log("mouse.service.stop()");
    // clearInterval(this.tick);
  }

  tick(): void {
    // console.log("mouse.service.tick() -> x: " + this._x);
    this._x -= this._x / 9 ;
    this._x = (this._x < 0) ? 0 : this._x;
    // <------------------------ test ------------------------------->
    this._y -= this._y * 9 ;
    this._y = (this._y > 0) ? 0 : this._y;
    // <------------------------ test ------------------------------->
  }
}
