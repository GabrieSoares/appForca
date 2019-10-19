import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ForcaService, Palavras, Ranking } from '../forca.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  ranking: Observable<Ranking[]>;

  constructor(public alertController: AlertController,
    private forcaService: ForcaService,
    public router: Router, ) { }

    ionViewWillEnter() {
      this.listarRanking();
    }

    listarRanking(){
      this.ranking = this.forcaService.listarRanking();
    }

    jogar(){
      this.router.navigate(['jogo']);
    }

}
