import { Component, OnInit } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from '../model/Dispositivo';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  listadoDispositivo:Dispositivo[];

  constructor(public dispositivoServ:DispositivoService)
    {
      this.llamoAservicio();
    }
  

  async llamoAservicio() {
    let listado= await this.dispositivoServ.getListadoDispositivos();
    this.listadoDispositivo=listado;
  }

}


