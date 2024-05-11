import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form.sucursal',
  templateUrl: './form.sucursal.component.html',
  styleUrl: './form.sucursal.component.css',
})
export class FormSucursalComponent {
  private http: HttpClient;
  private url: string;
  public modenasList: any[] = [];
  public textInput: string = '';
  public errorMessage: string = '';

  public codigoUpdate: number = 0;
  public descripcionText: string = '';
  public direccionText: string = '';
  public identificacionText: string = '';
  public fechaCreacionPicker: string = '';
  public monedaSelect: number = 0;

  constructor(
    http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FormSucursalComponent>
  ) {
    this.http = http;
    this.url = 'https://localhost:44338/api/';

    if (data) {
      this.codigoUpdate = data.codigo;
      this.descripcionText = data.descripcion;
      this.direccionText = data.direccion;
      this.identificacionText = data.identificacion;
      this.fechaCreacionPicker = data.fechaCreacion;
      this.monedaSelect = data.moneda;
    }

    this.GetTipoMonedas();
  }

  GetTipoMonedas() {
    this.errorMessage = '';
    this.http.get<any>(this.url + 'Sucursal/GetAllMonedas').subscribe(
      (result) => {
        this.modenasList = result.data;
      },
      (error) => {
        this.modenasList = [];
        console.error(error.message);
        window.alert(error.message);
        //this.errorMessage = error.error;
      }
    );
  }

  SaveSucursal() {
    if (this.descripcionText === '') {
      return;
    }
    let request = {
      data: {
        codigo: this.codigoUpdate,
        descripcion: this.descripcionText,
        direccion: this.direccionText,
        identificacion: this.identificacionText,
        fechaCreacion: this.fechaCreacionPicker,
        moneda: this.monedaSelect,
      },
    };

    if (request.data.codigo > 0) {
      this.http
        .post<any>(this.url + 'Sucursal/UpdateSucursal', request)
        .subscribe(
          (response) => {
            console.log('Respuesta:', response);
            window.alert(response.message);
            // Manejar la respuesta según sea necesario
          },
          (error) => {
            console.error('Error al enviar la solicitud:', error);
            window.alert(error.message);
            // Manejar el error según sea necesario
          }
        );
    } else {
      this.http
        .post<any>(this.url + 'Sucursal/CreateSucursal', request)
        .subscribe(
          (response) => {
            console.log('Respuesta:', response);
            window.alert(response.message);
            // Manejar la respuesta según sea necesario
          },
          (error) => {
            console.error('Error al enviar la solicitud:', error);
            window.alert(error.message);
            // Manejar el error según sea necesario
          }
        );
    }

    this.CloseWindow();
  }

  CloseWindow(): void {
    this.dialogRef.close();
  }
}
