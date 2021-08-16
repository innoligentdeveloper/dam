//correr antes npm install --save highcharts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { MedicionService } from '../services/medicion.service';
import { LogService } from '../services/log.service';
import { Medicion } from '../model/Medicion';
import { Logs } from '../model/Logs';

declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-dispositivos',
  templateUrl: './dispositivos.page.html',
  styleUrls: ['./dispositivos.page.scss'],
})
export class DispositivosPage implements OnInit {
  public medicion:number;
  public mediciones:Medicion[];
  public logs:Logs[];
  public idDispositivo:string;
  public idElectrovalvula:string;
  public myChart: any;
  private chartOptions: any;
  public estadoElectrovalvula:number;
  public btnOnOff:string;

  constructor(
    private router:ActivatedRoute, 
    private mServ:MedicionService,
    private logServ:LogService,
    public toastController: ToastController,
    public modalController: ModalController
  ) {
    setTimeout(()=>{
      console.log("Cambio el valor del sensor");
      //this.medicion=0;
      //llamo al update del chart para refrescar y mostrar el nuevo valor
      this.myChart.update({series: [{
          name: 'kPA',
          data: [this.medicion],
          tooltip: {
              valueSuffix: ' kPA'
          }
      }]});
    },3000);
  }
  onOffElectrovalvula(){
    if (this.btnOnOff=="ABRIR"){
      this.btnOnOff="CERRAR";
      this.abrirElectrovalvula();
    }else{
      this.btnOnOff="ABRIR";
      this.cerrarElectrovalvula();
    }
  }
  abrirElectrovalvula(){
    console.log("ABRIO ELECTROVÁLVULA");
    //insertar Log de riego
    let elLog: Logs=new Logs(99999, "", 1, Number(this.idElectrovalvula));
    console.log(elLog);
    this.logServ.insertNewLogRiego(elLog).then(()=>{
      this.presentToast("VALVULA ABIERTA");
    });
    this.logServ.getLogsByIdElectrovalvula(this.idElectrovalvula).then((logs)=>{
      this.logs=logs;
      this.estadoElectrovalvula=logs[0].apertura;
      if (this.estadoElectrovalvula==0){
        this.btnOnOff="ABRIR";
      }else{
        this.btnOnOff="CERRAR";
      }    
    })
    .catch((err)=>{
      console.log(err);
    });
  }
  cerrarElectrovalvula(){
    console.log("SE CERRÓ LA ELECTROVÁLVULA");
    //insertar Log de riego
    let elLog: Logs=new Logs(999999, "", 0, Number(this.idElectrovalvula));
    console.log(elLog);
    this.logServ.insertNewLogRiego(elLog).then(()=>{
      this.presentToast("VALVULA CERRADA");
    })
    this.logServ.getLogsByIdElectrovalvula(this.idElectrovalvula).then((logs)=>{
      this.logs=logs;
      this.estadoElectrovalvula=logs[0].apertura;
      if (this.estadoElectrovalvula==0){
        this.btnOnOff="ABRIR";
      }else{
        this.btnOnOff="CERRAR";
      }    
    })
    .catch((err)=>{
      console.log(err);
    });
    //insertar medicion con new value
    let aleat= Math.floor(Math.random() * 101);
    let laMed: Medicion=new Medicion(99999, "", aleat, Number(this.idDispositivo));
    this.mServ.insertNewMedicion(laMed).then(()=>{
      console.log("NUEVA MEDICION AGREGADA");
    });
    this.mServ.getMedicionesByIdDispositivo(this.idDispositivo).then((meds)=>{
      this.mediciones=meds;
      console.log(this.mediciones)
    });
    this.medicion=aleat;
    this.myChart.update({series: [{
      name: 'kPA',
      data: [this.medicion],
      tooltip: {
          valueSuffix: ' kPA'
      }
    }]});
  }

  verTodasLasMediciones(){
    console.log("TODAS LAS MEDICIONES");
    this.presentModalMed();
  }
  verLogDeRiegos(){
    console.log("LOG DE RIEGOS");
    this.presentModalLog();
  }
  
  ionViewWillEnter() {
  }

  ngOnInit() {
    this.idDispositivo = this.router.snapshot.paramMap.get('id');
    this.idElectrovalvula=  this.router.snapshot.paramMap.get('idEl');
    this.mServ.getMedicionByIdDispositivo(this.idDispositivo).then((med)=>{
      this.medicion=Number(med.valor);
    });
    this.mServ.getMedicionesByIdDispositivo(this.idDispositivo).then((meds)=>{
      this.mediciones=meds;
      console.log(this.mediciones)
    });
    this.logServ.getLogsByIdElectrovalvula(this.idElectrovalvula).then((logs)=>{
        this.logs=logs;
        this.estadoElectrovalvula=logs[0].apertura;
        if (this.estadoElectrovalvula==0){
          this.btnOnOff="ABRIR";
        }else{
          this.btnOnOff="CERRAR";
        }    
      })
      .catch((err)=>{
        this.logs=[];
        this.estadoElectrovalvula=0;
        this.btnOnOff="ABRIR";
      });
  }

  ionViewDidEnter() {
    this.generarChart();
  }

  generarChart() {
    this.chartOptions={
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        },
      title: {
          text: "Sensor"
        },
      credits:{enabled:false},
      pane: {
            startAngle: -150,
            endAngle: 150
        },
      // the value axis
      yAxis: {
        min: 0,
        max: 100,
        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',
        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'kPA'
        },
        plotBands: [{
            from: 0,
            to: 10,
            color: '#55BF3B' // green
        }, {
            from: 10,
            to: 30,
            color: '#DDDF0D' // yellow
        }, {
            from: 30,
            to: 60,
            color: '#DF5353' // red
        }, {
            from: 60,
            to: 100,
            color: '#9B9B9B' // grey
        }]
      },
      series: [{
          name: 'kPA',
          data: [this.medicion],
          tooltip: {
              valueSuffix: ' kPA'
          }
      }]
    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions );
  }

  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async presentModalMed() {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      componentProps: {
        'esLog': false,
        'datos': this.mediciones,
      },
    });
    return await modal.present();;
  }
  async presentModalLog() {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      componentProps: {
        'esLog': true,
        'datos': this.logs,
      },
    });
    return await modal.present();;
  }

}

