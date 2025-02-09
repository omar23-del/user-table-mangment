import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-user-table',
  standalone: false,

  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent implements OnInit {
  iscreateuserformopen: boolean = false
  iseditformopen: boolean = false
  currentuser : any = null
  newuser = {id: 0, name:"",  dateCreated:"", role:"", email:""}


  users = [
    {
      id: 1,
      name: '',
      dateCreated: '',
      role: '',
      email: '',
    },
  ];

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }


deleteuser(userid : number) {
this.users = this.users.filter(user => user.id !== userid)

localStorage.setItem('users', JSON.stringify(this.users));


this.toastr.success('User has been deleted','' ,{
  timeOut: 3000,
  positionClass: 'toast-top-right',
  progressBar: true,
  toastClass: 'toast-deleted',
});
}

edituser(user : any) {
this.currentuser = {...user}
}

saveuser() {
  const index = this.users.findIndex(user => user.id === this.currentuser.id)

  if(index === 0) {
    this.users[index] = {...this.currentuser}
    localStorage.setItem('users', JSON.stringify(this.users));
    this.toastr.success('User has been updated', '', {
      timeOut: 3000,
      positionClass: 'toast-top-right',
      progressBar: true,
      toastClass: 'toast-saved ',
    });
    this.currentuser = null
  }
}

toggleCreateform() {
  this.iscreateuserformopen = true
}

closecreateform() {
  this.iscreateuserformopen = false
}

closeeditform() {
  this.currentuser = null;
}


createnewuser() {
if(this.newuser.name && this.newuser.email && this.newuser.role) {
  this.newuser.dateCreated = new Intl.DateTimeFormat('en-CA').format(new Date());
  this.users.push({...this.newuser})
  localStorage.setItem('users', JSON.stringify(this.users));
  this.newuser = {id: 0, name:"",  dateCreated:"", role:"", email:""}

  this.toastr.success('User has been created', '', {
    timeOut: 3000,
    positionClass: 'toast-top-right',
    progressBar: true,
    toastClass: 'toast-created ',
  });
}
}
}
