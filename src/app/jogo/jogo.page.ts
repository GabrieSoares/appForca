import { Component, OnInit } from '@angular/core';
import { ForcaService, Palavras, Ranking } from '../forca.service';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.page.html',
  styleUrls: ['./jogo.page.scss'],
})

export class JogoPage {

  palavras = [];
  alfabeto = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Ç"];
  palavraSorteada: string;
  dica: string;
  categoria: string;
  pontos = 0;
  ranking: Ranking;
  tamanho: number;
  resposta = [];
  usadas = "";
  letra: string;
  erros = 0;

  constructor(public alertController: AlertController,
    private forcaService: ForcaService,
    public router: Router, ) { }


  ionViewWillEnter() {
    this.listarPalavra();
    this.ranking = new Ranking();
  }

  listarPalavra() {
    this.forcaService.listar().subscribe(elemento => { this.palavras = elemento, console.log(elemento), this.sortear() });
  }

  sortear() {
    let posicao = this.aleatorio();
    this.palavraSorteada = this.palavras[posicao].palavra;
    this.dica = this.palavras[posicao].dica;
    this.categoria = this.palavras[posicao].categoria;
    this.tamanho = this.palavraSorteada.length;
    this.resposta = new Array(this.tamanho);
  }

  aleatorio() {
    return Math.floor(Math.random() * (this.palavras.length - 0) + 0);
  }

  validar(letra: string) {
    if (!this.validaUsadas(letra)) {
      if (this.erros <= 5) {
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
        }
      } else {
        this.alertaDerota();
      }
      this.letra = "";
    }
  }

  resetar() {
    this.palavraSorteada = "";
    this.resposta = [];
    this.usadas = "";
    this.erros = 0;
  }

  fimjogo() {
    console.log("Valida Resposta Final");
    let fim = 0;
    for (let i = 0; i < this.resposta.length; i++) {
      if (this.palavraSorteada[i].toUpperCase() === this.resposta[i]) {
        fim++;
      }
      if (fim === this.resposta.length) {
        this.pontos = (this.pontos) + 5;
        console.log(this.pontos);
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
      message: "você acertou a palavra Sorteda, siga em frente para somar mais pontos!",
      buttons: [{
        text: 'Proxima',
        handler: (alertData) => {
          this.resetar();
          this.sortear();
        }
      }]
    });

    await alert.present();
  }
  async alertaDerota() {
    const alert = await this.alertController.create({
      header: 'Game Over!',
      subHeader: 'Você atingiu o Limite maxímo de Erros',
      message: `A palavra correta era <strong>${this.palavraSorteada}</strong>`,
      inputs: [{
        name: 'input1',
        type: 'text',
        placeholder: 'Adicine seu Nome'
      }],
      buttons: [{
        text: 'Ok',
        handler: (alertData) => {
          this.ranking.jogador = alertData.input1;
          this.ranking.pontos = this.pontos;
          this.forcaService.inserir(this.ranking);
          this.router.navigate(['home']);
        }
      }]
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
