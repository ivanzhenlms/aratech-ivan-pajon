import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { UserManagementService } from '../../shared/services/user/user-management-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { FormManagementService } from 'src/app/shared/services/form/form-management.service';
import { ModalInfoComponent } from '../modals/modal-info/modal-info.component';
import { ModalManagementService } from '../../shared/services/modal/modal-management.service';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})

export class ViewUserComponent implements OnInit {

  userForm: FormGroup;
  user: User;
  id: number;
  isEditing: boolean;
  modalDeleteTitleObservable: Observable<string>;
  modalDeleteTextObservable: Observable<string>;
  modalEditTitleObservable: Observable<string>;
  modalEditTextObservable: Observable<string>;

  constructor(private activatedRoute: ActivatedRoute,
              public formService: FormManagementService,
              private userService: UserManagementService,
              private modalService: ModalManagementService,
              private translateService: TranslateService,
              private router: Router) {
    this.isEditing = false;
    this.id = this.activatedRoute.snapshot.params['id'];
    this.userService.getUserById(this.id)
    .subscribe(
      user => {
        this.user = user;

        this.userForm = new FormGroup({
          'name': new FormControl(this.user.name, [
            Validators.required
          ]),
          'birthdate': new FormControl(moment(this.user.birthdate).toDate(), [
            Validators.required
          ])
        });
      },
      error => {
        console.log('Ocurrió un error en ViewUserComponent', error);
      }
    );

    this.modalDeleteTitleObservable = this.translateService.stream('view_user.modal.delete_title');
    this.modalDeleteTextObservable = this.translateService.stream('view_user.modal.delete_text');

    this.modalEditTitleObservable = this.translateService.stream('view_user.modal.edit_title');
    this.modalEditTextObservable = this.translateService.stream('view_user.modal.edit_text');
  }

  ngOnInit() { }

  // Se edita el usuario
  onEditUser(): void {
    this.modalService.openModal(ModalInfoComponent, this, this.modalEditTitleObservable, this.modalEditTextObservable, this.modalOnEditUser);
  }

  // Se pone el usuario consultado en modo edicion
  onStartEdition(): void {
    this.isEditing = true;
  }

  // Se cancela la edición del usuario
  onCancelEditing(): void {
    this.userForm.reset({ 'name': this.user.name, 'birthdate': moment(this.user.birthdate).toDate() });
    this.userForm.markAsPristine();
    this.userForm.markAsUntouched();
    this.isEditing = false;
  }

  // Se elimina el usuario
  onDeleteUser(): void {
    this.modalService.openModal(ModalInfoComponent, this, this.modalDeleteTitleObservable, this.modalDeleteTextObservable, this.modalOnDeleteUser);
  }

  // Funcion que se ejecutara cuando se elimine un usuario y se acepte la modal
  modalOnDeleteUser(): void {
    this.userService.deleteUser(this.id)
    .subscribe(
      user => {
        this.router.navigate(['/']);
      },
      error => {
        console.log('Ocurrio un error en modalOnDeleteUser()', error);
      }
    );
  }

  // Funcion que se ejecutara cuando se edite un usuario y se acepte la modal
  modalOnEditUser(): void {
    Object.assign(this.user, this.userForm.value);

    this.userService.modifyUser(this.user)
    .subscribe(
      user => {
        this.router.navigate(['/']).then(data => this.router.navigate(['/view-user/' + this.id]));
        this.isEditing = false;
      },
      error => {
        console.log('Ocurrio un error en modalOnEditUser()', error);
      }
    );
  }

}
