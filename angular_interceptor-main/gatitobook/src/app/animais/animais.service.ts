import { TokenService } from './../autenticacao/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Animais, Animal } from './animais';
import { environment } from 'src/environments/environment';
import { catchError, mapTo } from 'rxjs/operators';
//essa constante de API deve ser criada fora do decorator e da classe
const API = environment.apiURL;

const NOT_MODIFIED = '304'; // para comparação com o retorno da api

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(private http: HttpClient, private TokenService:TokenService) { }

  listaDoUsuario(nomeDoUsuario:string): Observable<Animais>{
    /*
    Com o interceptor isso já vai acontecer sem ter que declarar nada
    const token = this.TokenService.retornaToken();
    const headers = new HttpHeaders().append('x-access-token',token);

    fazendo get passando o token que o backend exige no headers*/
    return this.http.get<Animais>(`${API}/${nomeDoUsuario}/photos`);
  }


  buscaPorID(id:number):Observable<Animal>{
    /*
    Substituido pelo interceptor

    const token = this.TokenService.retornaToken();
    const headers = new HttpHeaders().append('x-access-token', token);*/

    return this.http.get<Animal> (`${API}/photos/${id}`);
  }

  excluiAnimal(id:number):Observable<Animal>{
    return this.http.delete<Animal>(`${API}/photos/${id}`);
  }

  /*Curtir: a requisição retorna 200 se curtiu com sucesso e
  304 caso o curtir já tenha sido feito naquele token, precisamos tratar esses códigos
  porque eles significam true ou false
  */

  curtir (id: number):Observable<boolean>{
    return this.http
    .post(`${API}/photos/${id}/like`, {}, {observe:'response'})
    .pipe(
      mapTo(true), catchError((error => {
        return error.status=== NOT_MODIFIED ? of(false) : throwError(error);
      }))
    )

  }
}

