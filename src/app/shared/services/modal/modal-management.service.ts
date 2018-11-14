import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ModalManagementService {

  constructor(private modalService: NgbModal) { }

  // Se abre una modal y se establece su configuracion
  public openModal(component: any, context: any, titleObservable: Observable<any>, textObservable: Observable<any>, callbackAccept?: Function, callbackClose?: Function): void {
    let modalRef: NgbModalRef = this.modalService.open(component);
    modalRef.componentInstance.context = context;
    modalRef.componentInstance.titleObservable = titleObservable;
    modalRef.componentInstance.textObservable = textObservable;
    modalRef.componentInstance.callbackAccept = callbackAccept;
    modalRef.componentInstance.callbackClose = callbackClose;
  }

}
