import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  palavras = ['gremio', 'flamengo', 'inter', 'palmeiras', 'paralelepipedo'];
  palavraSorteada = [];
  resposta = [];
  usadas = "";
  letra: string;
  erros = 0;


  constructor() { }
  sortear() {
    this.palavraSorteada = this.palavras[this.aleatorio()].split("");
    this.resposta = new Array(this.palavraSorteada.length);
    console.log(this.palavraSorteada);
    console.log(this.resposta);
  }
  aleatorio() {
    return Math.floor(Math.random() * (this.palavras.length - 0) + 0);
  }
  validar(letra: string) {
    let existe = false;
    this.usadas = this.usadas + letra;
    
    for (let i = 0; i < this.palavraSorteada.length; i++) {
      console.log(letra);
      if (this.palavraSorteada[i] === letra) {
        this.resposta[i] = letra;
        existe = true;
      }
    }
    this.resposta.filter(elemento => {
      if (elemento == this.palavraSorteada[elemento]) {
        console.log(elemento);
      }
    });
    if (!existe) {
      this.erros++;
    }
    this.letra = "";
  }
}
