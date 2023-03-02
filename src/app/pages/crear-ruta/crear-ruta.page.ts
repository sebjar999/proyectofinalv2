import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BicycleService } from '../../services/bicycle.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/api_http_registrar';

declare const google;

@Component({
  selector: 'app-crear-ruta',
  templateUrl: './crear-ruta.page.html',
  styleUrls: ['./crear-ruta.page.scss'],
})

export class CrearRutaPage implements OnInit {
  formRutas: FormGroup;
  map: any;
  start = '';
  end = '';
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    constructor( private alertCtrl: AlertController,
      private bicycleService: BicycleService,
      private fb: FormBuilder,
      private authService: AuthService
      ) {

      this.formRutas = this.fb.group({
        start: ['', [Validators.required]],
        end: ['', [Validators.required]],
        fecha: ['', [Validators.required]],
        hora: ['', [Validators.required]],
        nivel: ['', [Validators.required]],
        });
    }

  ngOnInit(): void {
    this.initMap();
  }

  iniciar(form): void {

    this.authService.guardarInformacionRuta(form).subscribe((response) => {
      if ((response.status === true)) {
        this.rutaExitosa();
        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
        setTimeout(function() { window.location.href = '/definir'; }, 1500);
      }else{
        this.rutafallo();
         // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
         setTimeout(function() { window.location.href = '/inicio'; }, 1500);
      }
        }, (error) => {
      console.log(error);
    });
    //
  }
  async rutaExitosa() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Bienvenido de nuevo bike interaction',
      subHeader: 'Es bueno volverte a ver'
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  async rutafallo() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Error al ingresar a bike interaction',
      subHeader: 'Intenta de nuevo'
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  onSubmit() {
    const body = {
      start: this.formRutas.get('start').value,
      end: this.formRutas.get('end').value,
      fecha: this.formRutas.get('fecha').value,
      hora: this.formRutas.get('hora').value,
      nivel: this.formRutas.get('nivel').value,
    };

    this.iniciar(body);

  }
  initMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: { lat: 4.81333, lng: -75.69611 },
    });

    this.directionsDisplay.setMap(this.map);
  }

  calculateAndDisplayRoute() {

    const inicioruta = this.start + ', co';
    const finruta = this.end + ', co';
    const travel = 'DRIVING';
    this.obtenerValuesRutaMaps(inicioruta, finruta);
    this.directionsService.route({
      origin: inicioruta,
      destination: finruta,
      travelMode: travel
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  obtenerValuesRutaMaps(inicio: any, fin: any) {
    /* console.log(inicio );
    console.log(fin ); */
    console.log(this.start+'comienzo');
  }
}
