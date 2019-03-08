import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { OrganizationFormComponent } from 'src/app/pages/share/dialogs/organization-form/organization-form.component';
import { DataProviderService, OrganizationInterface } from 'src/app/pages/share/services/data-provider.service';

declare var swal:any;

@Component({
  selector: 'organizations-area',
  templateUrl: './organizations-area.component.html',
  styleUrls: ['./organizations-area.component.scss']
})
export class OrganizationsAreaComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name', 'description', 'address', 'organization_color'];

  dataSource: MatTableDataSource<OrganizationInterface>;
  selection = new SelectionModel<OrganizationInterface>(true, []);

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
      
      this.dataProvider.getOrganizationList().subscribe((organizations)=>{
        console.log(organizations);
        this.dataSource = new MatTableDataSource(organizations);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }
  }

  openOrganizationForm(){
    this.dialog.open(OrganizationFormComponent,{
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

  editOrganization() {
    if(this.selection.selected[0]){
      this.dialog.open(OrganizationFormComponent,{
        width: '30rem',
        data: {
          type: "edit",
          ref: this.selection.selected[0].ref
        }
      });
    }
  }

  deleteOrganization(){
    if(this.selection.selected[0]){
      swal.fire({
        title: 'Are you sure to delete the organization?',
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
          this.dataProvider.deleteOrganization(this.selection.selected[0].ref);
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