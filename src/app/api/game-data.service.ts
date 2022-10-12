import { Injectable } from '@angular/core';
import { Room, Player, House } from 'src/app/interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  rooms: Room[];
  player: Player;
  house: House;

  constructor() {
    this.rooms = [];
    this.player = null;
    this.house = null;

    this.player = {
      name: 'You :)',
      description: 'You are the player!',
      location: this.rooms[0],
      inventory: [],
      gear: null,
      resources: null,
      discoveredResources: null,
      level: 1,
      experience: 0,
      nextExperience: 100,
      maxResource: 30,
      health: 30,
      power: 10,
      defence: 5,
      maxHealth: 30
    }

    this.player.resources = {
      'Build': 20,
      'Amethyst': 0,
      'Cobalt': 0,
      'Copper': 0,
      'Garnet': 0,
      'Jet': 0,
      'Rock Candy': 0,
      'Ruby': 0,
      'Shale': 0,
      'Sunstone': 0,
      'Uranium': 0,
      'Amber': 0,
      'Blood': 0,
      'Caulk': 0,
      'Frosting': 0,
      'Rainbow': 0,
      'Tar': 0,
      'Iodine': 0,
      'Mercury': 0,
      'Chalk': 0,
      'Gold': 0,
      'Malachite': 0,
      'Marble': 0,
      'Obsidian': 0,
      'Polychromite': 0,
      'Redstone': 0,
      'Rust': 0,
      'Sulfur': 0,
      'Titanium': 0,
      'Diamond': 0,
      'Emerald': 0,
      'Opal': 0,
      'Quartz': 0,
      'Rose Quartz': 0,
      'Star Sapphire': 0,
      'Topaz': 0,
    }

    this.player.discoveredResources = {
      'Amber': false,
      'Amethyst': false,
      'Blood': false,
      'Build': true,
      'Caulk': false,
      'Chalk': false,
      'Cobalt': false,
      'Copper': false,
      'Diamond': false,
      'Emerald': false,
      'Frosting': false,
      'Garnet': false,
      'Gold': false,
      'Iodine': false,
      'Jet': false,
      'Malachite': false,
      'Marble': false,
      'Mercury': false,
      'Obsidian': false,
      'Opal': false,
      'Polychromite': false,
      'Quartz': false,
      'Rainbow': false,
      'Redstone': false,
      'Rock Candy': false,
      'Rose Quartz': false,
      'Ruby': false,
      'Rust': false,
      'Shale': false,
      'Star Sapphire': false,
      'Sulfur': false,
      'Sunstone': false,
      'Tar': false,
      'Titanium': false,
      'Topaz': false,
      'Uranium': false,
    }

    this.house = {
      height: 1,
      floors: [
        {
          safe: true,
          machines: null,
          groups: [],
          enemies: []
        }
      ],
    }
  }

  public getPlayer() {
    return this.player;
  }

  public getRooms() {
    return this.rooms;
  }

  public getHouse() {
    return this.house;
  }

  public setPlayer(p) {
    this.player = p;
  }

  public setHouse(h) {
    this.house = h;
  }
}
