import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { UserFormComponent } from 'src/app/pages/share/dialogs/user-form/user-form.component';
import { DataProviderService, UserInterface } from 'src/app/pages/share/services/data-provider.service';

declare var swal:any;

@Component({
  selector: 'users-area',
  templateUrl: './users-area.component.html',
  styleUrls: ['./users-area.component.scss']
})
export class UsersAreaComponent implements OnInit {

  displayedColumns: string[] = ['select', 'email', 'name', 'last_name', 'role', 'created'];

  dataSource: MatTableDataSource<UserInterface>;
  selection = new SelectionModel<UserInterface>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private asyncLoad = false;

  constructor(
    private _location: Location,
    private dialog: MatDialog,
    private dataProvider: DataProviderService,
  ) {
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.asyncLoad = true;
  }
  
  ngAfterViewChecked(): void {
    if(this.asyncLoad){
      this.asyncLoad = false;
      
      this.dataProvider.getUserList().subscribe((users)=>{
        console.log(users);
        this.dataSource = new MatTableDataSource(users);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }
  }

  openUserForm(){
    this.dialog.open(UserFormComponent,{
      width: '30rem',
      data: {
        type: "new"
      }
    });
  }
   
  singleSelect(row){
    this.selection.clear();
    this.selection.toggle(row)
  }

  editUser() {
    if(this.selection.selected[0]){
      this.dialog.open(UserFormComponent,{
        width: '30rem',
        data: {
          type: "edit",
          ref: this.selection.selected[0].ref
        }
      });
    }
  }

  deleteUser(){
    if(this.selection.selected[0]){
      swal.fire({
        title: 'Are you sure to delete the user?',
        text: "This deleted data can not be recovered",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete!',
        cancelButtonText: 'No',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.dataProvider.deleteUser(this.selection.selected[0].ref);
        }
      })
    }
  }

  formatDate(d){
    try{
      var date = new Date(d);
    }catch(e){
      console.log(e);
      return ""
    }
    return date.toLocaleDateString("es-ES",{day: 'numeric', month: 'long', year: 'numeric'})
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  backClicked() {
    this._location.back();
  }
}