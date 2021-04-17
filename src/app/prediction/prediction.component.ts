import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { League } from '../models/league';
import { Team } from '../models/team.js';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit {

  league: League = {};
  predictions: Team[] = [];
  teams: Team[] = [];
  
  constructor() {
    this.league = {
      name: 'eredivisie',
      teams: [
      {
        name: 'ADO Den Haag',
        logo: 'Ado-Den-Haag-Logo.png'
      },
      {
        name: 'Ajax',
        logo: 'AFC-Ajax-Logo.png'
      },
      {
        name: 'AZ',
        logo: 'AZ-Alkmaar-Logo.png'
      },
      {
        name: 'FC Emmen',
        logo: 'FC-Emmen-Logo.png'
      },
      {
        name: 'FC Groningen',
        logo: 'FC-Groningen-Logo.png'
      },
      {
        name: 'FC Twente',
        logo: 'fc-twente-logo.png'
      },
      {
        name: 'FC Utrecht',
        logo: 'FC-Utrecht-Logo.png'
      },
      {
        name: 'Feyenoord',
        logo: 'Feyenoord-Rotterdam-Logo.png'
      },
      {
        name: 'Fortuna Sittard',
        logo: 'Fortuna-Sittard-Logo.png'
      },
      {
        name: 'Heracles',
        logo: 'Heracles-Almelo-Logo.png'
      },
      {
        name: 'PEC Zwolle',
        logo: 'PEC-Zwolle-Logo.png'
      },
      {
        name: 'PSV',
        logo: 'PSV-Eindhoven-Logo.png'
      },
      {
        name: 'RKC Waalwijk',
        logo: 'rkc-waalwijk.png'
      },
      {
        name: 'SC Heerenveen',
        logo: 'SC-Heerenveen-Logo.png'
      },
      {
        name: 'Sparta Rotterdam',
        logo: 'Sparta_Rotterdam_logo.png'
      },
      {
        name: 'Vitesse',
        logo: 'Vitesse-Arnhem-Logo.png'
      },
      {
        name: 'VVV Venlo',
        logo: 'VVV-Venlo-Logo.png'
      },
      {
        name: 'Willem II',
        logo: 'Willem-II-Logo.png'
      },
    ]
    };
  }

  ngOnInit(): void {
    console.log(this.league.name);
    this.teams = this.getTeams();
    this.predictions = this.getPrediction()
  }

  getPrediction(): Team[] {
    let localStorageItem = JSON.parse(localStorage.getItem(this.league.name));
    return localStorageItem == null ? this.getTeams().map(t => ({})) : localStorageItem.standings;
  }

  getTeams(): Team[] {
    let localStorageItem = JSON.parse(localStorage.getItem(this.league.name));
    return localStorageItem == null ? this.league.teams : localStorageItem.teams;
  }

  savePrediction() {
    localStorage.setItem(this.league.name, JSON.stringify({ teams: this.teams, standings: this.predictions } ));
  }

  drop(event: CdkDragDrop<Team[]>, droppedOn: 'teams' | 'predictions') {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (droppedOn === 'teams') {
        // moved back to teams, need to re add placeholder
        this.predictions.push({})
      } else {
        // moved to predictions, need to remove the placeholder
        const prediction = this.predictions[event.currentIndex]
        if (!prediction.name) {
          // dropped on blank, remove it
          this.predictions.splice(event.currentIndex, 1)
        } else {
          // dropped on a team, remove the first blank
          const firstBlank = this.predictions.findIndex(t => !t.name);
          this.predictions.splice(firstBlank, 1)
        }
      }
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.updateIndex();
  }

  updateIndex() {
    let index = 1
    this.predictions.forEach((team: Team) => {
      team.rank = index;
      index++;
    })
  }

}
