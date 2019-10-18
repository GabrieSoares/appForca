import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForcaService {
  private palvraCollection: AngularFirestoreCollection<Palavras>
  private rankingCollection: AngularFirestoreCollection<Ranking>
  palavras: Observable<Palavras[]>;
  ranking: Observable<Ranking[]>;

  constructor(private afs: AngularFirestore) {
    this.palvraCollection = afs.collection<Palavras>('Palavras');
    this.rankingCollection = afs.collection<Ranking>('Ranking');
    this.palavras = this.palvraCollection.valueChanges();
    this.ranking = this.rankingCollection.valueChanges();
  }

  public listar() {
    return this.palavras;
  }
  public listarRanking() {
    return this.ranking;
  }

}
export class Palavras {
  id: string;
  palavra: string;
  categoria: string;
  dica: string;
}
export class Ranking {
  jogador: string;
  pontos: number;
}