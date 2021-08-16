import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Logs } from '../model/Logs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  urlApi="http://localhost:8000/home";
  constructor(private _http: HttpClient ) {
   }
  getLogsByIdElectrovalvula(id):Promise<Logs[]>{     
    return this._http.get(this.urlApi+"/api/logs/"+id+"/todas").toPromise()
      .then((Logs:Logs[])=>{
        return Logs;
      })
  };
  insertNewLogRiego(log:Logs){     
    return this._http.post(this.urlApi+"/api/logs/insert",
    {logRiegoId:log.LogRiegoId, electrovalvulaId:log.electrovalvulaId, apertura:log.apertura, fecha:log.fecha})
    .toPromise()
    .then((result)=>{
        return result;
    })
  };
}