import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../models/team';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  @Input() public team: Team;
  @Input() public index: number;
  
  constructor() { }

  ngOnInit(): void {
    this.team.rank = (this.index + 1);
  }

}
