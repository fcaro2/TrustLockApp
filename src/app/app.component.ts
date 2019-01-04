import { Component } from '@angular/core';
import { ServiceService } from './service/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'remote-block';
  private bodySend: any = {};
  private date =  new Date();
  private fechaCorta;
  private devices  = []
  private estado: any =
    {
      state: "Desbloqueado.",
      color: "green",
    };
  constructor(private _service: ServiceService) {
    this.fechaCorta = this.date.toLocaleDateString();
    this.fechaCorta = this.fechaCorta.replace("/","-").replace("/","-");
    this.bodySend = {
      to: "",
      priority: "high",
      data: {
        body: "",
        title: "",
        key: "0",
        state: "",
        date: "",
        data : ""
      }
    }
  }
  ngOnInit() {
    this.getAllDevicesJson();
  }
  getAllDevicesJson(){
    this._service.getAllDevices().subscribe(
      result=>{
        console.log("Data from json web: ", result);
        this.devices = result;
      },
      error =>{
        console.log(error);
      }
    );
  }
  blockDevice(device) {
    console.log("token: ",device.token_firebase);
    this.bodySend = {
      to: device.token_firebase,
      priority: "high",
      data: {
        title: "'This device was bloqued'",
        date: "'"+ this.fechaCorta + "'",
        key: "'12345'",
        state: "block",
        data: "'no data'"
      }
    }
      this._service.blockDevice(this.bodySend).subscribe(
      data => {
        if (data.success == 1) {
          this.estado.state = "Bloqueado.";
          this.estado.color = "red";
          device.state = "Bloqueado";
          device.class = "table-danger"
        }else{

        }
        //this.dataRecived = data;

        console.log(data);
      },
      error => {
        console.log(error);

      }
    );
  }
  unBlockDevice(device) {

    console.log("token: ",device.token_firebase);
    this.bodySend = {
      to: device.token_firebase,
      priority: "high",
      data: {
        title: "unbloqued",
        key: "0",
        date: "'"+ this.fechaCorta + "'",
        state: "unblock",
        data: "'no data'"

      }
    }
        this._service.unBlockDevice(this.bodySend).subscribe(
      data => {
        if (data.success == 1) {
          this.estado.state = "Desbloqueado.";
          this.estado.color = "green";
          device.state = "Desbloqueado";
          device.class = "table-success"
        }
        //this.dataRecived = data;
        console.log(data);
      },
      error => {
        console.log(error);

      }
    );
  }
}


