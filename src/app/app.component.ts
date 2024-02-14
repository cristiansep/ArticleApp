import { Component, OnInit } from '@angular/core';
import { Movie } from './interfaces/movie.interface';
import { MoviesService } from './services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'MyTestApp';


  public movies:Movie[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(({ Search }) => this.movies = Search);
  }
}
