import { query } from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsReponse, gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

      private ApiKey    : string = 'AlvsGI8kxMz6YVtr9SYmjYAY15fk7e38';
      private url       : string = 'https://api.giphy.com/v1/gifs';
      private _historial: string []=[];
      public resultados :gif []=[];

      get historial(){
        return [...this._historial];

      }

      constructor(private http: HttpClient){

        this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
        this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
      }

      buscarGifs(query:string=''){

        query = query.toLocaleLowerCase();
        if (!this._historial.includes(query)) {
          this._historial.unshift(query);
          this._historial = this._historial.splice(0,10);
          localStorage.setItem('historial', JSON.stringify(this._historial));
          
        }
        const params = new HttpParams()
        .set('api_key', this.ApiKey)
        .set('limit','10')
        .set('q',query);

        this.http.get<SearchGifsReponse>(`${this.url}/search`,{params})
        .subscribe((resp)=>{
          this.resultados = resp.data;
          localStorage.setItem('resultados',JSON.stringify(this.resultados));
        });
        
      }
}
