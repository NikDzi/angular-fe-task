import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder  } from '@angular/forms';
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  p:number=1;
  userDetail!: FormGroup;
  userObject : User = new User();
  userList : User[]=[];
  permissionList:any=[];
  permissionListMap:Map<number,string> = new Map();
  constructor(private formBuilder : FormBuilder,private userService:UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllPermissions();
    this.userDetail = this.formBuilder.group({
      id:[''],
      firstName:[""],
      lastName:[""],
      userName:[""],
      password:[""],
      email:[""],
      status:[""],
      permissionId:[""],
    })
  }
  getAllPermissions(){
    this.userService.getAllPermissions().subscribe(res=>{
      console.log(res);
      this.permissionList=res;
      for (let i =0;i<res.length;i++){
        this.permissionListMap.set(this.permissionList[i].id,this.permissionList[i].code);
      }
    })
  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe(res=>{
      this.userList=res;
    },err=>{
      console.log("error while fetching data");
    });
  }

  addUser() {
    console.log(this.userDetail);
    this.userObject.firstName=this.userDetail.value.firstName;
    this.userObject.lastName=this.userDetail.value.lastName;
    this.userObject.userName=this.userDetail.value.userName;
    this.userObject.password=this.userDetail.value.password;
    this.userObject.email=this.userDetail.value.email;
    this.userObject.status=this.userDetail.value.status;
    this.userObject.permissionId=this.userDetail.value.permissionId;
    this.userService.addUser(this.userObject).subscribe(res=>{
      console.log(res);
      this.getAllUsers();
      var showAddSuccess = document.getElementById('add-success-alert');
      if (showAddSuccess) {
        showAddSuccess.style.display = "block";
      }
      setTimeout(function () {
        if (showAddSuccess) {
          showAddSuccess.style.display = "none"
        }
      }, 4000);
    },err=>{
      console.log(err);
    });
  }

  editUser(user : User) {
    this.userDetail.controls['id'].setValue(user.id);
    this.userDetail.controls['firstName'].setValue(user.firstName);
    this.userDetail.controls['lastName'].setValue(user.lastName);
    this.userDetail.controls['userName'].setValue(user.userName);
    this.userDetail.controls['email'].setValue(user.email);
    this.userDetail.controls['password'].setValue(user.password);
    this.userDetail.controls['status'].setValue(user.status);
    this.userDetail.controls['permissionId'].setValue(user.permissionId);
  }

  updateUser() {
    this.userObject.id=this.userDetail.value.id;
    this.userObject.firstName=this.userDetail.value.firstName;
    this.userObject.lastName=this.userDetail.value.lastName;
    this.userObject.userName=this.userDetail.value.userName;
    this.userObject.password=this.userDetail.value.password;
    this.userObject.email=this.userDetail.value.email;
    this.userObject.status=this.userDetail.value.status;
    this.userObject.permissionId=this.userDetail.value.permissionId;
    console.log(this.userObject);
    this.userService.updateUser(this.userObject.id,this.userObject).subscribe(res=> {
      console.log(res);
      this.getAllUsers();
      var showUpdateSuccess = document.getElementById('update-success-alert');
      if (showUpdateSuccess) {
        showUpdateSuccess.style.display = "block";
      }
      setTimeout(function () {
        if (showUpdateSuccess) {
          showUpdateSuccess.style.display = "none"
        }
      }, 4000);
    },err=>{
      console.log(err);
    })
  }
  prepareDelete(user : User) {
    this.userDetail.controls['id'].setValue(user.id);
  }
  deleteUser() {
    this.userObject.id=this.userDetail.value.id;
    console.log(this.userObject.id);
    this.userService.deleteUser(this.userObject.id).subscribe(res=>{
      console.log(res);
      this.getAllUsers();
      var showDeleteSuccess = document.getElementById('delete-success-alert');
      if (showDeleteSuccess) {
        showDeleteSuccess.style.display = "block";
      }
      setTimeout(function () {
        if (showDeleteSuccess) {
          showDeleteSuccess.style.display = "none"
        }
      }, 4000);
    },err=>{
      console.log(err);
    })
  }
}
