import { Component,  ViewChild, ElementRef, OnInit } from '@angular/core';

declare const google;

@Component({
  selector: 'app-editar-ruta',
  templateUrl: './editar-ruta.page.html',
  styleUrls: ['./editar-ruta.page.scss'],
})
export class EditarRutaPage implements OnInit {

  maps: any;
  start = '';
  end = '';
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  ngOnInit(): void {
    this.initMap();
  }

  initMap() {
    this.maps = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: { lat: 4.81333, lng: -75.69611 },
    });

    this.directionsDisplay.setMap(this.maps);
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
    console.log(inicio + ' ' + fin);
  }

}
