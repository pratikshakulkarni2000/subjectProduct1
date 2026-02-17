import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Ipro } from '../../models/products';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit {

  prodArr : Array<Ipro> = []

  constructor(
    private _prodService : ProductsService,
    private _snackbar : SnackbarService
  ) { }

  ngOnInit(): void {
    this.fetchData()
    this.onAdd()
    this.onPUpdate()
    this.onRemovePro()
  }

  fetchData(){
    this._prodService.fetchAllProducts().subscribe({
      next : data => {
        console.log(data);
        this.prodArr = data
      },
      error : err => {
        console.log(err);
      }
    })
  }

  onAdd(){
    this._prodService.newProObs$.subscribe({
      next : data => {
        console.log(data)
        this.prodArr.unshift(data)
        this._snackbar.opensnackbar(`Added successfully!!!`)
      },
      error :err => {
        console.log(err)
      }
    })
  }


  onPUpdate(){
    this._prodService.updateProObs$.subscribe(res => {
      let get = this.prodArr.findIndex(u => u.id === res.id)
      this.prodArr[get] = res
      this._snackbar.opensnackbar(`Updated successfully!!!`)

    })
  }

  onRemovePro(){
    this._prodService.removeProObs$.subscribe(res => {
      let get = this.prodArr.findIndex(r => r.id === res)
      this.prodArr.splice(get,1)
      this._snackbar.opensnackbar(`Removed successfully!!!`)

    })
  }

}
