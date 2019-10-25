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
  lista = [];
  palavraSorteada: string;
  tamanho: number;

  constructor(private afs: AngularFirestore) {
    this.palvraCollection = afs.collection<Palavras>('Palavra');
    this.palavras = this.palvraCollection.valueChanges();
  }
  //Palavra
  public listar() {
    return this.palavras;
  }

  public inserirPalavra(Palavra) {
    const id = this.afs.createId();
    return this.palvraCollection.doc(id).set({...Palavra,id});
  }

  //Ranking
  public listarRanking(): Observable<Ranking[]>{
    this.rankingCollection = this.afs.collection<Ranking>('Ranking', ref => ref.orderBy("pontos", "desc").limit(10));
    return this.rankingCollection.valueChanges();
  }

  public inserir(ranking: Ranking) {
    const id = this.afs.createId();
    return this.rankingCollection.doc(id).set({ ...ranking, id });
  }
}
export class Palavras {
  palavra: string;
  categoria: string;
  dica: string;
}
export class Ranking {
  jogador: string;
  pontos: number;
}