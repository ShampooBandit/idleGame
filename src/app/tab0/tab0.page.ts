import { Component, OnInit } from '@angular/core';
import { Room, Player, Item, Connection } from 'src/app/interfaces/game';
import { GameDataService } from '../api/game-data.service';
 
@Component({
  selector: 'app-tab0',
  templateUrl: 'tab0.page.html',
  styleUrls: ['tab0.page.scss']
})
export class Tab0Page implements OnInit {
  data: any;

  textLog: String;
  command: any;
  moveHistory: String[];
  startRoom: Room;

  constructor(private gameData: GameDataService) { }

  ngOnInit() {
    this.data = {};
    this.data.rooms = [];
    this.data.player = {};

    this.data.rooms[0] = {
      name: 'Library',
      description: 'Cheek pressed against the cold, hard stone tiles beneath you, your eyes slowly blink open\
 to the sunlight streaming onto your face. As you push yourself up from the floor, your gaze passes over the\
 strange sight of seemingly endless high-arched stone doorways one after another, shelves stocked to the brim\
 in every room you can see with an assortment of colored and sized spines; a never ending sea of books.@ A red\
 and black checkerboard of tiles stretches out into the horizon. Along each wall between the endless archways\
 are completely filled bookshelves. Despite your best efforts, the shelves seem to remain just as full no matter\
 how many books you remove. The shelves reach a couple feet above your head, aligning with the top of the archways.\
 Above those is another section of wall, with a window cut into the face of it, doubling the height of the room.\
 Each window gives you a view of either another room\'s interior, or, a view of a bright blue sky.',
      items: [],
      connections: null,
      visited: false
    }

    this.data.rooms[0].connections = {
      'east': this.data.rooms[0],
      'west': this.data.rooms[0],
      'north': this.data.rooms[0],
      'south': this.data.rooms[0]
    }

    this.data.player.location = this.data.rooms[0];

    this.moveHistory = []

    this.textLog = this.parseDescription(this.data.player.location.description)
  }

  parseCommand(event) {
    if(event.key === "Enter" && this.command) {
      var t = document.getElementById('command')
      var words = this.command.split(' ')

      this.textLog += '\n'
      this.textLog += '\n'
      this.textLog += '> ' + this.command
      this.textLog += '\n'
      this.textLog += '\n'

      switch(words[0]) {
        case 'go':
          if(this.data.player.location.connections[words[1]]) {
            if(!this.moveHistory) {
              this.startRoom = this.data.player.location
            }
            this.moveHistory.push(words[1])
            if(!this.checkPlayerMoves()) {
              this.data.player.location = this.data.player.location.connections[words[1]]
              this.textLog += this.parseDescription(this.data.player.location.description)
            }
          }
          else {
            this.textLog += `You cannot reach a path ${words[1]}.`
          }
        break;
        case 'look':
          this.textLog += this.parseDescription(this.data.player.location.description)
        break;
        default:
          this.textLog += `${words[0]} is not a command I recognize.`
        break;
      }

      this.command = ''
    }
  }

  checkPlayerMoves() {
    if(this.moveHistory.length == 8) {
      //Check for finding a new unique room

      this.resetPlayerMoves()
    }
    return false
  }

  resetPlayerMoves() {
    this.moveHistory = []
    this.startRoom = null
  }

  parseDescription(desc: String) {
    var first = desc.split('@', 1)[0]
    var after = desc.split('@', 2)[1]

    if(this.data.player.location.visited) {
      return after
    }
    else {
      this.data.player.location.visited = true
      return first
    }
  }
}
