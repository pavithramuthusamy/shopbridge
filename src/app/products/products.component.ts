import { Component, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import * as ELEMENT_DATA from '../../assets/products.json'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  displayedColumns: string[] = ['id', 'name', 'price', 'action'];
  dataSource: any = (ELEMENT_DATA as any).default;
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;

  constructor(public dialog: MatDialog,
  ) { }

  ngonInit() {

  }

  openDialog(action: any, obj: any) {

    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '450px',
      height: '400px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {

      switch (result.event) {
        case 'Add':
          this.addRowData(result.data);
          break;
        case 'Update':
          this.updateRowData(result.data);
          break;
        case 'Delete':
          this.deleteRowData(result.data);
          break;
      }

    });
  }

  addRowData(row_obj: any) {

    var d = new Date();
    this.dataSource.push({
      id: d.getTime(),
      name: row_obj.name,
      price: row_obj.price,
      description: row_obj.description
    });
    this.table.renderRows();

  }
  updateRowData(row_obj: any) {


    this.dataSource = this.dataSource.filter((value: any, key: any) => {


      if (value.id == row_obj.id) {
        value.name = row_obj.name;
        value.price = row_obj.price;
        value.description = row_obj.description;
      }
      return true;
    });

  }
  deleteRowData(row_obj: any) {

    this.dataSource = this.dataSource.filter((value: { id: any; }, key: any) => {
      return value.id != row_obj.id;
    });
  }
}
