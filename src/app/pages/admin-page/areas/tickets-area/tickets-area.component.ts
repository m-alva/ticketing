import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';

import { TicketFormComponent } from 'src/app/pages/share/dialogs/ticket-form/ticket-form.component';
import { Ticket, DataProviderService } from 'src/app/pages/share/services/data-provider.service';

declare var swal:any;

@Component({
  selector: 'tickets-area',
  templateUrl: './tickets-area.component.html',
  styleUrls: ['./tickets-area.component.scss']
})
export class TicketsAreaComponent implements OnInit {
  organizationRef;
  organization

  dataSource: MatTableDataSource<Ticket>;
  selection = new SelectionModel<Ticket>(true, []);

  private asyncLoad = false;
  
  constructor(
    private _location: Location,
    private dialog: MatDialog,
    private dataProvider: DataProviderService,
    private route: ActivatedRoute,
  ) {
    this.organizationRef = <any>this.route.snapshot.paramMap.get('organization');
    this.dataProvider.getOrganizationPusher().doc(this.organizationRef).valueChanges().subscribe((org)=>{
      this.organization = org;
    });
    this.dataProvider.getTicketList(this.organizationRef).subscribe((tickets)=>{
      this.dataSource = new MatTableDataSource(tickets);
    })
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.asyncLoad = true;
  }

  ngAfterViewChecked(): void {
    if(this.asyncLoad) {
      this.asyncLoad = false;
      this.dataProvider.getTicketList(this.organizationRef).subscribe((tickets) => {
        console.log(tickets);
        this.dataSource = new MatTableDataSource(tickets);
      })
    }
  }

  openTicketForm() {
    this.dialog.open(TicketFormComponent, {
      maxWidth: '30rem',
      data: {
        type: "new",
        organization: this.organizationRef,
      }
    });
  }
   
  editTicket() {
    if(this.selection.selected[0]) {
      this.dialog.open(TicketFormComponent, {
        width: "30rem",
        data: {
          type: "edit",
          ref: this.selection.selected[0].ref,
          organization: this.organizationRef,
        }
      });
    }
  }

  deleteTicket() {
    if(this.selection.selected[0]){
      swal.fire({
        title: 'Are you sure to delete the course?',
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
          this.dataProvider.deleteTicket(this.organizationRef,this.selection.selected[0].ref)
        }
      })
    }
  }

  singleSelect(row) {
    this.selection.clear();
    this.selection.toggle(row)
  }

  backClicked() {
    this._location.back();
  }
}
