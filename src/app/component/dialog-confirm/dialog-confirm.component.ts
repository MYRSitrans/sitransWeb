import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css']
})
export class DialogConfirmComponent implements OnInit {
  codigo = '';
  texto = 'BORRAR';
  constructor( public dialofRef: MatDialogRef<DialogConfirmComponent>,
               @Inject(MAT_DIALOG_DATA) public mensaje: string ) { }

  ngOnInit() {
  }

  onClick() {
    this.dialofRef.close();
  }


}
