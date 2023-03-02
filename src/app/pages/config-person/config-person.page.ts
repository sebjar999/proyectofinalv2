import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BicycleService } from '../../services/bicycle.service';

//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/api_http_registrar';

@Component({
  selector: 'app-config-person',
  templateUrl: './config-person.page.html',
  styleUrls: ['./config-person.page.scss'],
})
export class ConfigPersonPage implements OnInit {

  constructor(
    private alertCtrl: AlertController,
    private bicycleService: BicycleService,
    private authService: AuthService
  ) { }

  ngOnInit() {

  }

  eliminar(): void {
    const id = +localStorage.getItem('id'); //Id almacenado en el localStorage
    this.authService.eliminarUsuario(id).subscribe((response) => {
      console.log(response);
      if ((response.status === true)) {
        this.eliminartrue();
        console.log('hola');
        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
        setTimeout(function () { window.location.href = '/inicio'; }, 1500);
        localStorage.removeItem('id');
      } else {
        this.eliminarfalse();
        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
        setTimeout(function () { window.location.href = '/config-person'; }, 1500);
      }
    });
  }

  async eliminartrue() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Usuario eliminado',
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async eliminarfalse() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Fallo al eliminar el usuario',
      subHeader: 'Intenta de nuevo'

    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
