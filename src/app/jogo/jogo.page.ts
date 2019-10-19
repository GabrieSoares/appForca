import { Component, OnInit } from '@angular/core';
import { ForcaService, Palavras } from '../forca.service';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.page.html',
  styleUrls: ['./jogo.page.scss'],
})

export class JogoPage {

  palavras = [];
  alfabeto = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T","U", "V", "W", "X", "Y", "Z"];
  palavraSorteada: string;
  tamanho: number;
  resposta = [];
  usadas = "";
  letra: string;
  erros = 0;

  constructor(public alertController: AlertController,
    private forcaService: ForcaService, ) { }


  ionViewWillEnter() {
    this.listarPalavra();
  }

  listarPalavra() {
    this.forcaService.listar().subscribe(elemento => { this.palavras = elemento, console.log(elemento), this.sortear()});
  }

  sortear() {
    this.palavraSorteada = this.palavras[this.aleatorio()].palavra;
    this.tamanho = this.palavraSorteada.length;
    this.resposta = new Array(this.tamanho);
  }

  aleatorio() {
    return Math.floor(Math.random() * (this.palavras.length - 0) + 0);
  }

  validar(letra: string) {
    letra = letra.toUpperCase();
    if (!this.validaUsadas(letra)) {
      if (this.erros < 4) {
        let existe = false;
        this.usadas = this.usadas + letra + "-";
        for (let i = 0; i < this.palavraSorteada.length; i++) {
          if (this.palavraSorteada[i].toUpperCase() === letra) {
            this.resposta[i] = letra;
            existe = true;
          }
        }
        if (!existe) {
          this.erros++;
        }
        if (this.fimjogo()) {
          this.alertaVitoria();
          this.resetar();
          this.sortear();
        }
      } else {
        this.alertaDerota();
        this.resetar();
      }
      this.letra = "";
    }
  }

  resetar() {
    this.palavraSorteada;
    this.resposta = [];
    this.usadas = "";
    this.erros = 0;
  }

  fimjogo() {
    console.log("teste");
    let fim = 0;
    for (let i = 0; i < this.resposta.length; i++) {
      if (this.palavraSorteada[i].toUpperCase() === this.resposta[i]) {
        fim++;
      }
      if (fim === this.resposta.length) {
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
