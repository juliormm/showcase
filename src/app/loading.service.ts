import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class LoadingService {

  private subject = new BehaviorSubject({ display: false, fade: false });

  obs$ = this.subject.asObservable();

  show() {
    this.subject.next({ display: true, fade: false });
  }

  hide() {
    this.subject.next({ display: false, fade: true });
  }
}
