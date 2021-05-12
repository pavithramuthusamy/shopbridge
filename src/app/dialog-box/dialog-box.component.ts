//dialog-box.component.ts
import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ProductData {
  name: string;
  id: number;
  price: number;
  description: string;
}


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {

  action: string;
  local_data: any;
  productListForm: FormGroup;
  isValid = true;
  isDisabled = false;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>, private formBuilder: FormBuilder,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ProductData) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.createContactForm();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    if (this.local_data.action == 'Delete') {
      this.productListForm.get('name').disable();
      this.productListForm.get('description').disable();
      this.productListForm.get('price').disable();
    }


  }

  createContactForm() {
    this.productListForm = this.formBuilder.group({
      name: [this.local_data.name, Validators.required],
      id: [this.local_data.id],
      description: [this.local_data.description, Validators.required],
      price: [this.local_data.price, Validators.required]
    });

  }

  doAction() {
    if (!this.productListForm.value.id) this.productListForm.value.id = new Date().getMilliseconds()


    for (var key in this.productListForm.value) {

      if (this.productListForm.value[key] === null || this.productListForm.value[key] == "") {
        this.isValid = false;
        return;
      }
    }
    this.dialogRef.close({ event: this.action, data: this.productListForm.value });

  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  onSubmit() {
  }

}
