import { Injectable } from '@angular/core';

import { animate } from 'animejs';


@Injectable({
  providedIn: 'root'
})
export class AnimationService {
    // this service allows any consumer to call `animateElement` on an HTMLElement to apply an animation effect
    // the range of effects supported are only limited by the underlying `animejs` library
    // which has an amazingly simple API that can applay a wide array of animation effects

    // NOTE: the scope of the animations this application applies is small,
    // but using the `animejs` library in my experience makes all animations MUCH more smooth than directly manipulating DOM elements with Javascript

    constructor() { }

    private elementIsValid(element: any): boolean { return element !== null && element !== undefined; }

    public defaultAnimationDuration: string = '1s';
    public isTransitionComplete: boolean = false;
    public redrawIntervalMilliseconds: number = 1000;
    public animationScaleCoefficient: number = 3;
    

    // generic animation function to wrap the anime.js `animate` function and log change attempt
    animateElement(element: any, parameters: any) {
        if (this.elementIsValid(element)) {
            animate(element, parameters);
        } else {
        console.log(`failed to apply animation effect to element ${element}; its reference is either null or undefined`);
        }
    }
}
