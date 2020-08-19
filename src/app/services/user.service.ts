import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  GetByUsername(username): Promise<any> {
    const fakePromise = new Promise((resolve, reject) => {
      var filtered = this.getUsers().find(
        (user) => user['username'] === username
      );
      var user = filtered ? filtered : null;
      resolve(user);
    });
    return fakePromise;
  }

  Create(user): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.GetByUsername(user.username).then((duplicateUser) => {
          if (duplicateUser !== null) {
            resolve({
              success: false,
              message: 'Username "' + user.username + '" is already taken',
            });
          } else {
            var users = this.getUsers();

            // assign id
            var lastUser = users[users.length - 1] || { id: 0 };
            user.id = lastUser['id'] + 1;

            // save to local storage
            users.push(user);
            this.setUsers(users);

            resolve({ success: true });
          }
        });
      }, 1000);
    });
  }

  getUsers(): {}[] {
    if (!localStorage.users) {
      localStorage.users = JSON.stringify([]);
    }

    return JSON.parse(localStorage.users);
  }

  setUsers(users) {
    localStorage.users = JSON.stringify(users);
  }
}
