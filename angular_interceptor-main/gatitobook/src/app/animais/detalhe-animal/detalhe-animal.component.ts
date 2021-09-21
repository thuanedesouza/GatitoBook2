import { Observable } from 'rxjs';
import { Animal } from './../animais';
import { Component, OnInit } from '@angular/core';
import { AnimaisService } from '../animais.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhe-animal',
  templateUrl: './detalhe-animal.component.html',
  styleUrls: ['./detalhe-animal.component.css'],
})
export class DetalheAnimalComponent implements OnInit {
  animalId!: number;
  animal$!: Observable<Animal>;

  constructor(
    private animaisService: AnimaisService,
    private activatedRoute: ActivatedRoute
  ) {}
  //activatedRoute é um serviço do framework para pegar o id que vem da rota, já que esse componente é dinamico

  ngOnInit(): void {
    this.animalId = this.activatedRoute.snapshot.params.animalId;
    this.animal$ = this.animaisService.buscaPorID(this.animalId);
  }
}
