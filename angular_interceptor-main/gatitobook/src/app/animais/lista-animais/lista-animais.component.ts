import { AnimaisService } from './../animais.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';
import { Animais } from '../animais';

@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.css'],
})
export class ListaAnimaisComponent implements OnInit {
  animais!: Animais;

  constructor(
    private usuarioService: UsuarioService,
    private AnimaisService: AnimaisService
  ) {}

  ngOnInit(): void {
    this.usuarioService.retornaUsuario().subscribe((usuario)=> {
      const userName = usuario.name ?? '';// caso usuario seja nulo atribuir aspas simples
      this.AnimaisService.listaDoUsuario(userName).subscribe((animais)=>{
        this.animais= animais;
      })
    })
  }
}
