import { Injectable } from '@angular/core';
import { Dispositivo } from '../model/Dispositivo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {
  urlApi="https://www.app.innoligent.com.ar/home";

  constructor(private _http: HttpClient ) {
   }

  getDispositivo(id): Promise<Dispositivo>{
    return this._http.get(this.urlApi+"/api/dispositivo/"+id).toPromise()
      .then((dispositivo:Dispositivo)=>{
        return dispositivo;
      });
  }
  getListadoDispositivos():Promise<Dispositivo[]>{
    return this._http.get(this.urlApi+ "/api/dispositivo/").toPromise()
      .then((listado:Dispositivo[])=>{
        return listado;
      });
  }

}
