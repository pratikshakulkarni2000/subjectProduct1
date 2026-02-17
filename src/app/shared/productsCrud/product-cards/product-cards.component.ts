import { Component, Input, OnInit } from '@angular/core';
import { Ipro } from '../../models/products';
import { ProductsService } from '../../service/products.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';

@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.scss']
})
export class ProductCardsComponent implements OnInit {

  @Input() data !: Ipro

  constructor(
    private _proService : ProductsService,
    private _dialog : MatDialog
  ) { }

  ngOnInit(): void {
  }

  onEdit(){
    this._proService.setEditPro(this.data)
  }

  onRemove(){
    let matConfig = new MatDialogConfig()
    matConfig.data = `Are you sure to remove this card?`
    matConfig.width = "500px"

    let matRef = this._dialog.open(GetConfirmComponent,matConfig)
    matRef.disableClose = true
    matRef.afterClosed().subscribe(res => {
      if(res){
        this._proService.removePro(this.data.id).subscribe({
          next : data => {
            console.log(data);
            this._proService.setRemovePro(this.data.id)
          },
          error : err =>{
            console.log(err)
          }
        })
      }
    })
  }

}
