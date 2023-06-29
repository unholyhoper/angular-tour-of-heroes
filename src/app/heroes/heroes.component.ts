import {Component, OnInit} from '@angular/core';
import {Hero} from "../Hero";
import {HEROES} from "../mock-heroes";
import {HeroService} from "../hero.service";
import {MessageService} from "../message.service";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  hero: Hero = {
    id: 1,
    name: 'WindStorm'
  }

  heroes = HEROES;


  constructor(private heroService: HeroService,
              private messageService: MessageService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({name} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero) {
    this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();

  }

}
