import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../api/game-data.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  data: any;

  constructor(private gameData: GameDataService) { }

  ngOnInit() {
    this.data = this.gameData;
  }

}
