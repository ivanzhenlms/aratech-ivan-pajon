import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { FormManagementService } from '../../shared/services/form/form-management.service';
import { UserManagementService } from '../../shared/services/user/user-management-service.service';
import { Router } from '@angular/router';
import { ModalInfoComponent } from '../modals/modal-info/modal-info.component';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ModalManagementService } from '../../shared/services/modal/modal-management.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {

  userForm: FormGroup;
  user: User;
  modalTitleObservable: Observable<string>;
  modalTextObservable: Observable<string>;

  constructor(public formService: FormManagementService,
              private userService: UserManagementService,
              private modalService: ModalManagementService,
              private translateService: TranslateService,
              private router: Router) {
    this.user = {
      name: null,
      birthdate: null
    };

    this.userForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required
      ]),
      'birthdate': new FormControl('', [
        Validators.required
      ])
    });

    this.modalTitleObservable = this.translateService.stream('create_user.modal.success_title');

    this.modalTextObservable = this.translateService.stream('create_user.modal.success_text');
  }

  ngOnInit() { }

  // Se crea un usuario nuevo
  onCreateUser(): void {
    Object.assign(this.user, this.userForm.value);

    this.userService.createUser(this.user)
    .subscribe(
      user => {
        this.modalService.openModal(ModalInfoComponent, this, this.modalTitleObservable, this.modalTextObservable, this.modalOnAccept, this.modalOnAccept);
      },
      error => {
        console.log('Ocurrió un error en onCreateUser()', error);
      }
    );
  }

  // Funcion ejecutada al aceptar la modal
  modalOnAccept(): void {
    this.router.navigate(['/']);
  }

}
