import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipro, Ires } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  BASE_URL : string = environment.BASE_URL
  PROD_URL : string = `${this.BASE_URL}/products.json`

  constructor(
    private _httpClient : HttpClient
  ) { }

  private newProdSub$ : Subject<Ipro> = new Subject<Ipro>()
  newProObs$ : Observable<Ipro> = this.newProdSub$.asObservable()
  setNewPro( p : Ipro) {
    this.newProdSub$.next(p)
  }

   private editProSub$ : Subject<Ipro> = new Subject<Ipro>()
  editProObs$ : Observable<Ipro> = this.newProdSub$.asObservable()
  setEditPro( p : Ipro) {
    this.newProdSub$.next(p)
  }


   private removeProSub$ : Subject<string> = new Subject<string>()
  removeProObs$ : Observable<string> = this.removeProSub$.asObservable()
  setRemovePro( p : string) {
    this.removeProSub$.next(p)
  }

   private updateProSub$ : Subject<Ipro> = new Subject<Ipro>()
  updateProObs$ : Observable<Ipro> = this.updateProSub$.asObservable()
  setUpdatePro( p : Ipro) {
    this.updateProSub$.next(p)
  }

  fetchAllProducts() : Observable<Ipro[]>{
    return this._httpClient.get<any>(this.PROD_URL).pipe(
      map(obj => {
        let arr : Array<Ipro> = []
        for(const key in obj){
          arr.unshift({...obj[key],id:key})
        }
        return arr
      })
    )
  }

  createProd(pro : Ipro) : Observable<Ires>{
    return this._httpClient.post<any>(this.PROD_URL,pro)
  }

  removePro(id :string) : Observable<any>{
    let Remove_url = `${this.BASE_URL}/products/${id}.json`
    return this._httpClient.delete(Remove_url)
  }

  updatePro(update : Ipro) : Observable<Ipro>{
    let update_url = `${this.BASE_URL}/products/${update.id}.json`
    return this._httpClient.patch<Ipro>(update_url,update)
  }


}
