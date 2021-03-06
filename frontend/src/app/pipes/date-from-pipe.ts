import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fromNow'
})
export class DateFromPipe implements PipeTransform {
  transform(value: any, args: string[]): any {
    const due = new Date(value).getTime();
    const now = new Date().getTime();
    const deltaSeconds = Math.round((due - now) / 1000);
    if (deltaSeconds < 180) {
      return `${deltaSeconds} seconds from now`;
    }
    const deltaMinutes = Math.round(deltaSeconds / 60);
    if (deltaMinutes < 60) {
      return `${deltaMinutes} minutes from now`;
    }
    const deltaHours = Math.round(deltaMinutes / 60);
    if (deltaHours < 24) {
      return `${deltaHours} hours from now`;
    }
    const deltaDays = Math.round(deltaHours / 24);
    if (deltaDays < 60) {
      return `${deltaDays} days from now`;
    }
    const deltaWeeks = Math.round(deltaDays / 7);
    if (deltaWeeks < 20) {
      return `${deltaWeeks} weeks from now`;
    }
    const deltaMontsh = Math.round(deltaWeeks / 4.2);
    return `${deltaMontsh} months from now`;
  }
}
