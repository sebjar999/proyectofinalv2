import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/api_http_registrar';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})

export class RegistrarPage implements OnInit {
  formRegister: FormGroup;

  // e slint-disable-next-line @typescript-eslint/member-ordering
  constructor(
    private alertCtrl: AlertController,
    private fb: FormBuilder,
    private authService: AuthService
  ) {

    this.formRegister = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }


  iniciar(form): void {

    this.authService.GuardarInformacionUsuario(form).subscribe((response) => {
      if ((response.status === true)) {
        this.registroexitoso();
        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
        setTimeout(function() { window.location.href = '/definir'; }, 1500);
      }else{
        this.registrofallido();
        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
        setTimeout(function() { window.location.href = '/inicio'; }, 1500);
      }

    }, (error) => {
      console.log(error);
    }); 

    //
  }

  async registroexitoso() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Bienvenido a bike interaction',
      subHeader: 'Aqui podras crear o iniciar rutas'
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async registrofallido() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Fallo al entrar bike interaction',
      subHeader: 'Intentalo de nuevo'
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  onSubmit() {
    const body = {
      name: this.formRegister.get('name').value,
      lastname: this.formRegister.get('lastname').value,
      email: this.formRegister.get('email').value,
      password: this.formRegister.get('password').value,
    };

    this.iniciar(body);

  }
}
