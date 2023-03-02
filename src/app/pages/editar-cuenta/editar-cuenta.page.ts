import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BicycleService } from '../../services/bicycle.service';
import { EditarUService } from './editar-u.service';
import axios from 'axios';

import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/api_http_registrar';

import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpXsrfTokenExtractor
} from '@angular/common/http';
@Component({
  selector: 'app-editar-cuenta',
  templateUrl: './editar-cuenta.page.html',
  styleUrls: ['./editar-cuenta.page.scss'],
})
export class EditarCuentaPage implements OnInit {
  formActualizar: FormGroup;

  get actualizarF() { return this.formActualizar.controls; }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(
    private alertCtrl: AlertController,
    private bicycleService: BicycleService,
    private editarUService: EditarUService,
    //private fb: FormBuilder,
    private tokenService: HttpXsrfTokenExtractor,
    private router: Router, private authService: AuthService
  ) {
    /* this.formActualizar = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]],
    }); */
   }

  ngOnInit() {
  }
  enviar(form): void {

    this.authService.GuardarInformacionUsuario(form).subscribe((response) => {
      if ((response.status === true)) {
        this.presentAlert();
        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
        setTimeout(function() { window.location.href = '/definir'; }, 1500);
      }
    }, (error) => {
      console.log(error);
    });

    //
  }
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Bienvenido a bike interaction',
      subHeader: 'Aqui podras crear o iniciar rutas',
      buttons: ['OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  async presentAlertfalse() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Bienvenido a bike interaction',
      subHeader: 'Aqui podras crear o iniciar rutas',
      buttons: ['OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  onSubmit() {
    /* const body = {
      name: this.formActualizar.get('name').value,
      lastname: this.formActualizar.get('lastname').value,
      email: this.formActualizar.get('email').value,
      password: this.formActualizar.get('password').value,
    };

    this.enviar(body);
 */
  }
}
