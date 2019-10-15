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
    console.log(this.palavraSorteada);
  }
  aleatorio() {
    return Math.floor(Math.random() * (this.palavras.length - 0) + 0);
  }
  validar(letra: string) {
    let existe = false;
    this.usadas = this.usadas + letra;

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
    }
    this.letra = "";
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
  async alertaVitoria() {
    const alert = await this.alertController.create({
      header: 'Parabéns!',
      subHeader: 'Fim de Jogo',
      message: "você acertou a palavra",
      buttons: ['OK']
    });

    await alert.present();
  }
}
