import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  accountForm !: FormGroup;
  actionBtn: string = 'save'
  hide = true;


  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private api: ApiService, private dialogRef: MatDialogRef<DialogComponent>) { }


  ngOnInit(): void {

    this.accountForm = this.formBuilder.group({
      accountCard: ['', Validators.required],
      emailCard: ['', Validators.required],
      passCard: ['', Validators.required],
      urlCard: ['', Validators.required],
    });

    console.log("la data que llego es: ", this.editData)

    if (this.editData != 1) {
      this.actionBtn = "Update";
      this.accountForm.controls['accountCard'].setValue(this.editData.accountCard);
      this.accountForm.controls['emailCard'].setValue(this.editData.emailCard);
      this.accountForm.controls['passCard'].setValue(this.editData.passCard);
      this.accountForm.controls['urlCard'].setValue(this.editData.urlCard);
    } else {
      console.log("la data es null, solo guarda", this.editData)
    }

  }


  //add new account
  addAccount(i: number) {
    console.log("number es en addAccount:", i)
    if (i == 1) {
      this.actionBtn = "Save";
      if (this.accountForm.valid) {
      

        this.api.postAccount(this.accountForm.value)
          .subscribe({
            next: (res) => {
              alert("acc added succss")
              this.accountForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("error while try to add")
            }
          })
      }
    } else if (i == 0) {


      this.api.putAccount(this.accountForm.value, this.editData.id)
        .subscribe({
          next: (res: any) => {
            alert("update succss");
            this.accountForm.reset();
            this.dialogRef.close('update');
          },
          error: () => {
            alert("error in updated");
          }
        })
    }
  }


}





