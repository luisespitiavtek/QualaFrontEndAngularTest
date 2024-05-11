import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormSucursalComponent } from './form.sucursal/form.sucursal.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'QualaFrontEndAngularTest';

  private http: HttpClient;
  private url: string;
  public sucursalesList: any[] = [];
  public textInput: string = '';
  public errorMessage: string = '';
  displayedColumns: string[] = [
    'codigo',
    'descripcion',
    'direccion',
    'identificacion',
    'fechaCreacion',
    'descripcionMoneda',
    'acciones',
  ];
  constructor(private _dialog: MatDialog, http: HttpClient) {
    this.http = http;
    this.url = 'https://localhost:44338/api/';
    this.GetSucursales();
  }

  OpenFormSucursal() {
    const _dialogRef = this._dialog.open(FormSucursalComponent);
    _dialogRef.afterClosed().subscribe((result) => {
      this.RefreshPage();
    });
  }

  GetSucursales() {
    this.errorMessage = '';
    this.http.get<any>(this.url + 'Sucursal/GetAllSucursales').subscribe(
      (result) => {
        this.sucursalesList = result.data;
      },
      (error) => {
        this.sucursalesList = [];
        console.error(error.message);
      }
    );
  }

  UpdateSucursal(sucursal: any) {
    const dialogRef = this._dialog.open(FormSucursalComponent, {
      data: sucursal,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.RefreshPage();
    });
  }

  DeleteSucursal(idSucursal: any) {
    let request = {
      data: idSucursal,
    };
    this.http
      .post<any>(this.url + 'Sucursal/DeleteSucursal', request)
      .subscribe(
        (response) => {
          console.log('Respuesta:', response);
          window.alert(response.message);
          this.RefreshPage();
          // Manejar la respuesta según sea necesario
        },
        (error) => {
          console.error('Error al enviar la solicitud:', error);
          window.alert(error.message);
          // Manejar el error según sea necesario
        }
      );
  }

  RefreshPage() {
    window.location.reload();
  }
}
