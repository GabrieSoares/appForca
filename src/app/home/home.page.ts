import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  palavras = ['gremio', 'flamengo', 'inter', 'bahia', 'flu'];
  palavraSorteada = [];
  tamanho: number;
  resposta = [];
  usadas = "";
  letra: string;
  erros = 0;


  constructor(public alertController: AlertController, ) { }
  
  sortear() {
    this.palavraSorteada = this.palavras[this.aleatorio()].split("");
    this.tamanho = this.palavraSorteada.length;
    this.resposta = new Array(this.tamanho);
  }
  aleatorio() {
    return Math.floor(Math.random() * (this.palavras.length - 0) + 0);
  }
  validar(letra: string) {
    if (!this.validaUsadas(letra)) {
      if (this.erros < 4) {
        let existe = false;
        this.usadas = this.usadas + letra + "-";
        for (let i = 0; i < this.palavraSorteada.length; i++) {
          if (this.palavraSorteada[i] === letra) {
            this.resposta[i] = letra;
            existe = true;
          }
        }
        if (!existe) {
          this.erros++;
        }
        if (this.fimjogo(this.palavraSorteada, this.resposta)) {
          this.alertaVitoria();
          this.resetar();
        }
      } else {
        this.alertaDerota();
        this.resetar();
      }
      this.letra = "";
    }
  }
  
  resetar() {
    this.palavraSorteada = [];
    this.resposta = [];
    this.usadas = "";
    this.erros = 0;
  }

  fimjogo(palavraSorteada, resposta) {
    let fim = 0;
    for (let i = 0; i < resposta.length; i++) {
      if (palavraSorteada[i] === resposta[i]) {
        fim++;
      }
      if (fim === resposta.length) {
        return true;
      }
    }

    return false;
  }
  validaUsadas(letra) {
    for (let l = 0; l < this.usadas.length; l++) {
      if (letra === this.usadas.charAt(l)) {
        this.alertaUsado();
        return true;
      }
    }
    return false;
  }
  async alertaVitoria() {
    const alert = await this.alertController.create({
      header: 'Parabéns!',
      message: "você acertou a palavra Sorteda",
      buttons: ['OK']
    });

    await alert.present();
  }
  async alertaDerota() {
    const alert = await this.alertController.create({
      header: 'Game Over!',
      subHeader: 'Você atingiu o Limite maxímo de Erros',
      message: `A palavra correta era <strong>${this.palavraSorteada}</strong>`,
      buttons: ['OK']
    });

    await alert.present();
  }
  async alertaUsado() {
    const alert = await this.alertController.create({
      header: 'Aviso!',
      message: `A letra <strong>${this.letra}</strong> já foi utilizada, tente novamente com outra`,
      buttons: ['OK']
    });

    await alert.present();
  }
}
