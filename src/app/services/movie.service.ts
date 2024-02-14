import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie, SearchMovies } from '../interfaces/movie.interface';
import { environmets } from '../environments/environments';

@Injectable({providedIn: 'root'})
export class MoviesService {


    private baseUrl: string = environmets.baseUrl;

    constructor(private httpClient: HttpClient) { }


    getMovies():Observable<SearchMovies> {

        const headers = new HttpHeaders({
            'X-RapidAPI-Key': '2c2bfbd28fmsheccac1977e1a965p182914jsn45ccc650998d',
            'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'  // Ejemplo de encabezado de autorización
        });
        const queryParams = {
            s: 'Avengers Endgame',
            r: 'json',
            page: '1'
        };
        const urlWithParams = `${this.baseUrl}/`;
        return this.httpClient.get<SearchMovies>(urlWithParams, { params: queryParams, headers: headers });
    }
    
}