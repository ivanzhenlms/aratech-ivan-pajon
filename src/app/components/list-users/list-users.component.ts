import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { Observable } from 'rxjs';
import { UserManagementService } from '../../shared/services/user/user-management-service.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})

export class ListUsersComponent implements OnInit {

  users: Observable<User[]>;

  constructor(private userService: UserManagementService) {
    this.users = this.userService.getAllUsers();
  }

  ngOnInit() { }

}
