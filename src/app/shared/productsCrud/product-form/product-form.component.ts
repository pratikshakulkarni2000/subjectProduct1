import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../service/products.service';
import { Ipro } from '../../models/products';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  prodForm !: FormGroup
  isInEditMode : boolean = false
  editId !: string

  constructor(
    private _prodService : ProductsService
  ) { }

  ngOnInit(): void {
    this.createForm()
    this.patch()
  }

  createForm(){
    this.prodForm = new FormGroup({
      name : new FormControl(null,[Validators.required]),
      overview : new FormControl(null,[Validators.required]),
      image : new FormControl(null,[Validators.required]),
    })
  }

  get f() {
    return this.prodForm.controls
  }

  onSubmit(){
    if(this.prodForm.valid){
      let obj = this.prodForm.value
      console.log(obj);

      this._prodService.createProd(obj).subscribe({
        next : data => {
          console.log(data);
          this.prodForm.reset()
          
          this._prodService.setNewPro({...obj,id : data.name})
        },
        error : err => {
          console.log(err)
        }
      })
      
    }
  }


  patch(){
    this._prodService.editProObs$.subscribe({
      next : data => {
        console.log(data);
        this.isInEditMode = true
        this.editId = data.id
        
        this.prodForm.patchValue(data)
      }
    })
  }

  onUpdate(){
    if(this.prodForm.valid){
      let obj : Ipro = {
        ...this.prodForm.value,
        id : this.editId
      }
      this._prodService.updatePro(obj).subscribe({
        next : data => {
          console.log(data);
          this.isInEditMode = false
          this.prodForm.reset()

          this._prodService.setUpdatePro(obj)
          
        },
        error : err => {
          console.log(err)
        }
      })
    }
  }

  


}
