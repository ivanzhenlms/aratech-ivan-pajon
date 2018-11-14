import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.css']
})

export class ModalInfoComponent {

  context: this;
  titleObservable: Observable<string>;
  textObservable: Observable<string>;
  callbackAccept: Function;
  callbackClose: Function;

  constructor(public activeModal: NgbActiveModal) { }

  // Función ejecutada cuando se acepta la modal
  accept(): void {
    if (this.callbackAccept) {
      this.callbackAccept.call(this.context);
      this.activeModal.dismiss();
    }
    else {
      this.activeModal.dismiss();
    }
  }

  // Función ejecutada cuando se cancela la modal
  close(): void {
    if (this.callbackClose) {
      this.callbackClose.call(this.context);
      this.activeModal.dismiss();
    }
    else {
      this.activeModal.dismiss();
    }
  }

}
