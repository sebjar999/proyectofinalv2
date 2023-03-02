import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BicycleService } from '../../services/bicycle.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/api_http_registrar';

@Component({
  selector: 'app-iniciar-seccion',
  templateUrl: './iniciar-seccion.page.html',
  styleUrls: ['./iniciar-seccion.page.scss'],
})
export class IniciarSeccionPage implements OnInit {
  formlogin: FormGroup;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor( private alertCtrl: AlertController,
    private bicycleService: BicycleService,
    private fbb: FormBuilder,
    private authService: AuthService
    ) {
      this.formlogin = this.fbb.group({
       email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
  }

  ngOnInit() {
  }
  iniciar(form): void {
    this.authService.validarLoginApp(form).subscribe((response) => {
      if ((response.status === true)) {
        this.bienvenidologin();
        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
        setTimeout(function() { window.location.href = '/definir'; }, 1500);
        localStorage.setItem('id', response.data[0].id_usuario);
      }else{
        this.fallologin();
        localStorage.removeItem('id');
         // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
         setTimeout(function() { window.location.href = '/inicio'; }, 1500);
      }
        }, (error) => {
      console.log(error);
    });
    //
  }

  async bienvenidologin() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Bienvenido de nuevo bike interaction',
      subHeader: 'Es bueno volverte a ver'
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  async fallologin() {
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
      email: this.formlogin.get('email').value,
      password: this.formlogin.get('password').value,
    };

    this.iniciar(body);

  }
}
