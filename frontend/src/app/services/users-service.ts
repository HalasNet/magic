
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  list(filter: string = null) {
    const like = filter === null ||
      filter === '' ||
      filter === undefined ?
        '' :
        '?username.like=' + encodeURIComponent('%' + filter + '%');

    return this.httpClient.get<any>(
      environment.apiURL +
      'magic/modules/magic_auth/users' + like);
  }

  listRoles(filter: string = null) {
    const like = filter === null ||
      filter === '' ||
      filter === undefined ?
        '' :
        '?name.like=' + encodeURIComponent('%' + filter + '%');

    return this.httpClient.get<any>(
      environment.apiURL +
      'magic/modules/magic_auth/roles' + like);
  }

  createUser(username: string, password: string) {
    return this.httpClient.post<any>(environment.apiURL + 'magic/modules/magic_auth/users', {
      username,
      password,
    });
  }

  createRole(name: string, description: string) {
    return this.httpClient.post<any>(environment.apiURL + 'magic/modules/magic_auth/roles', {
      name,
      description
    });
  }

  deleteUser(username: string) {
    return this.httpClient.delete<any>(
      environment.apiURL + 
      'magic/modules/magic_auth/users?username=' + encodeURIComponent(username));
  }

  deleteRole(name: string) {
    return this.httpClient.delete<any>(
      environment.apiURL + 
      'magic/modules/magic_auth/roles?name=' + encodeURIComponent(name));
  }

  getRoles(username: string) {
    return this.httpClient.get<any>(
      environment.apiURL +
      'magic/modules/magic_auth/users_roles?user.eq=' + encodeURIComponent(username));
  }

  addRoleToUser(user: string, role: string) {
    return this.httpClient.post<any>(environment.apiURL + 'magic/modules/magic_auth/users_roles', {
      user,
      role,
    });
  }

  deleteRoleFromUser(user: string, role: string) {
    return this.httpClient.delete<any>(
      environment.apiURL + 
      'magic/modules/magic_auth/users_roles?role=' + encodeURIComponent(role) +
      '&user=' + encodeURIComponent(user));
  }

  getAllRoles() {
    return this.httpClient.get<any>(environment.apiURL + 'magic/modules/magic_auth/roles');
  }
}
