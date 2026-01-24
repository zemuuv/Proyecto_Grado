import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

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

  resultado: any;

  constructor(private residuo: Residuo) {}

  buscar(tipo: string) {
    this.residuo.obtenerResiduoAleatorio(tipo)
      .subscribe(data => {
        this.resultado = data;
      });
  }
}
