import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Residuo } from './services/residuo';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [
    CommonModule,
    RouterOutlet
  ]
})
export class App {

  resultado: any = null;

  // tipo seleccionado por el usuario
  tipoSeleccionado: string = "";

  // IA
  resultadoIA: string = "";

  // imagen subida
  imagen: File | null = null;
  previewUrl: string | null = null;

  constructor(
    private residuo: Residuo,
    private http: HttpClient
  ) { }

  // BOTONES DE RESIDUOS
  buscar(tipo: string) {

    this.tipoSeleccionado = tipo;

    this.residuo.obtenerResiduoAleatorio(tipo)
      .subscribe(data => {

        console.log("Respuesta API:", data);

        this.resultado = data;

      });

  }

  // SELECCIONAR IMAGEN
  seleccionarImagen(event: any) {

    const archivo = event.target.files[0];

    if (!archivo) return;

    const tiposPermitidos = [
      "image/png",
      "image/jpeg",
      "image/jpg"
    ];

    if (!tiposPermitidos.includes(archivo.type)) {
      alert("Solo se permiten imágenes PNG o JPG");
      return;
    }

    this.imagen = archivo;

    // preview inmediata
    this.previewUrl = URL.createObjectURL(archivo);
  }

  // ENVIAR IMAGEN A SPRING BOOT
  enviarImagen() {

    if (!this.imagen) {
      alert("Selecciona una imagen primero");
      return;
    }

    const formData = new FormData();
    formData.append("imagen", this.imagen);

    this.http.post<any>("http://localhost:8080/ia/clasificar", formData)
      .subscribe(res => {

        this.resultadoIA = res.resultado;

        // consultar base de datos según resultado IA
        this.buscar(this.resultadoIA);
        

      }, error => {

        console.error("Error al clasificar imagen", error);

      });

  }

}