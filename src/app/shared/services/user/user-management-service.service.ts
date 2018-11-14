import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const BASE_URL = 'https://hello-world.innocv.com/api/User';

@Injectable({
  providedIn: 'root'
})

export class UserManagementService {

  constructor(private http: HttpClient) { }

  // Se obtienen todos los usuarios
  public getAllUsers(): Observable<User[]> {
    let header = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    return this.http.get<User[]>(BASE_URL, { headers: header });
  }

  // Se obtiene un usuario por ID
  public getUserById(id: number): Observable<User> {
    let header = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    return this.http.get<User>(BASE_URL + '/' + id, { headers: header });
  }

  // Se crea un usuario nuevo
  public createUser(user: User): Observable<User> {
    let header = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    return this.http.post<User>(BASE_URL, JSON.stringify(user), { headers: header });
  }

  // Se elimina un usuario existente
  public deleteUser(id: number): Observable<User> {
    let header = new HttpHeaders({
        'Content-Type': 'application/json'
    });
  
    return this.http.delete<User>(BASE_URL + '/' + id, { headers: header });
  }

  // Se modifica un usuario existente
  public modifyUser(user: User): Observable<User> {
    let header = new HttpHeaders({
        'Content-Type': 'application/json'
    });
  
    return this.http.put<User>(BASE_URL, JSON.stringify(user), { headers: header });
  }
}
