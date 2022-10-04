import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatCardContent, MatCardActions, MatCardTitle, MatCardSubtitle, MatCardLgImage } from '@angular/material/card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'LastPassv2';

  source: any[];
  sourceOriginal: any;

  displayedColumns: string[] = ['accountCard', 'emailCard', 'passCard', 'urlCard', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) {
    this.source = [];

  }
  ngOnInit(): void {
    this.getAllAccounts();
  }


  openDialog(data: number) {

    if (data == 1) {
      this.dialog.open(DialogComponent, {
        width: '30%',
        data: data
      }).afterClosed().subscribe(val => {
        if (val === 'save') {
          this.getAllAccounts();
         
        }
      })

    } else {
      this.dialog.open(DialogComponent, {
        width: '30%',
        data: this.source,
      }).afterClosed().subscribe(val => {
        console.log("update ok")
        if (val === 'update') {
          console.log("update ok")
          this.getAllAccounts();
        }
      })
    }
  }

 
  getAllAccounts() {
    this.api.getAccount()
      .subscribe({
        next: (res: any) => {
          this.source = res;
          this.sourceOriginal = res
        },
        error: (err) => {
          alert("error while fetch data")
        }
      })
  }

  editAccount(card: any) {

    this.dialog.open(DialogComponent, {
      width: '30%',
      data: card
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllAccounts();
      }
    })
  }

  deleteAccount(id: any) {
    this.api.deleteAccount(id)
      .subscribe({
        next: (res) => {
          alert("account deleted")
          this.getAllAccounts();
        },
        error: () => {
          alert("error while deleting acc")
        }
      })
  }


  applyFilter(event: Event) {

    const filterValue = ((event.target as HTMLInputElement).value).toLowerCase();

    if (filterValue.length < 1) {
      console.log("no hay datos para buscar")
      this.source = this.sourceOriginal

    }

    this.source = this.source.filter((items: any) => items.accountCard.toLowerCase().includes(filterValue));

  }

}
