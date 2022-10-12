import { Component, OnInit } from '@angular/core';
import { EnemyBaseStats, ResourceTypes } from 'src/app/interfaces/game';
import { GameDataService } from '../api/game-data.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
 
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  data: any;
  inBattle: boolean;
  transitionBattle: boolean;
  battleTargetGroup: any;
  battleTargetFloor: any;
  battleTarget: any;
  battleRewards: any;

  constructor(private gameData: GameDataService) { }

  ngOnInit() {
    this.data = this.gameData;
    this.battleTargetFloor = 0;
    this.battleTargetGroup = {};
    this.battleTarget = null;
    this.battleRewards = {
      'Resources': [],
      'Experience': 0
    };
    this.inBattle = false;
    this.transitionBattle = false;

    //let box = document.getElementById('battleContainer')
    //box.addEventListener('animationend', () => {
    //  if(this.inBattle) {
    //    box.classList.add('hidden'); 
    //    this.inBattle = false;
    //  } else {
    //    box.classList.add('grown');
    //    this.inBattle = true;
    //  }
      
    //  box.style.animationName = '';
    //  this.transitionBattle = false;
    //})
    setInterval(() => {this.checkForEnemies()}, 5000)
  }

  startBattle(targetGroup, floorNum) {
    let box = document.getElementById('battleContainer')

    this.battleTargetFloor = floorNum
    this.battleTargetGroup = targetGroup
    this.transitionBattle = true

    box.classList.remove('hidden')
    box.style.animationName = 'growFromCenter'    
  }

  doBattleTurn() {
    this.attackEnemy()

    for(var i = 0; i < this.battleTargetGroup.enemies.length; i++) {
      this.attackPlayer(this.battleTargetGroup.enemies[i])

      if(this.data.player.health <= 0) {
        this.closeBattle()
        return
      }
    }

    this.checkForBattleComplete()
  }

  attackEnemy() {
    if(this.battleTarget) {
      this.battleTarget.health -= Math.max(this.data.player.power - this.battleTarget.defence, 1)

      if(this.battleTarget.health <= 0) {
        this.enemyDeath(this.battleTarget)
      }
    }
    else {
      this.battleTargetGroup.enemies[0].health -= (this.data.player.power - this.battleTargetGroup.enemies[0].defence)

      if(this.battleTargetGroup.enemies[0].health <= 0) {
        this.enemyDeath(this.battleTargetGroup.enemies[0])
      }
    }
  }

  enemyDeath(enemy) {
    var index = this.battleTargetGroup.enemies.indexOf(enemy)

    this.data.player.experience += enemy.rewards.experience
    this.checkPlayerLevelup()
    
    for(var i = 0; i < enemy.rewards.resources.length; i++) {
      if(!this.data.player.discoveredResources[enemy.rewards.resources[i].type]) {
        this.data.player.discoveredResources[enemy.rewards.resources[i].type] = true
      }
      this.data.player.resources[enemy.rewards.resources[i].type] += enemy.rewards.resources[i].amount
      if(this.data.player.resources[enemy.rewards.resources[i].type] > this.data.player.maxResource) {
        this.data.player.resources[enemy.rewards.resources[i].type] = this.data.player.maxResource
      }
    }

    this.battleTargetGroup.enemies.splice(index, 1)
  }

  attackPlayer(enemy) {
    this.data.player.health -= Math.max(enemy.power - this.data.player.defence, 1)
  }

  checkForBattleComplete() {
    if(this.battleTargetGroup.enemies.length <= 0) {
      this.winBattle()
    }
  }

  checkPlayerLevelup() {
    if(this.data.player.experience >= this.data.player.nextExperience) {
      this.data.player.experience = 0

      this.data.player.maxHealth += (5 * this.data.player.level)
      this.data.player.maxResource += (10 * this.data.player.level)

      this.data.player.power += 2
      this.data.player.defence += 1

      this.data.player.nextExperience += 50 * this.data.player.level

      this.data.player.level += 1
    }
  }

  winBattle() {
    var index = this.data.house.floors[this.battleTargetFloor].groups.indexOf(this.battleTargetGroup)

    this.data.house.floors[this.battleTargetFloor].groups.splice(index, 1)

    this.closeBattle()
  }

  closeBattle() {
    let box = document.getElementById('battleContainer')
    this.battleTargetGroup = {}
    this.battleTarget = null
    this.transitionBattle = true

    this.data.player.health = this.data.player.maxHealth

    box.classList.remove('grown')
    box.style.animationName = 'shrinkToCenter'
  }

  randomInt(num) {
    return Math.floor(Math.random() * num)
  }

  checkForEnemies() {
    let i = 0

    if(this.data) {
      this.data.house.floors.forEach(floor => {
        if(!floor.safe) {
          let chance = this.randomInt(100)
  
          if(chance < (100 - (floor.enemies.length * 5))) {
            //this.generateEnemyGroup(i)
            this.spawnEnemy(i)
          }
          
          this.moveEnemies(i)
        }
  
        i++
      });
    }
  }

  moveEnemies(floorNum) {
    let i = 0;
    this.data.house.floors[floorNum].enemies.forEach(enemy => {
      let chance = this.randomInt(100)
      if(chance < 25) {
        let v = 'f'+floorNum.toString()+enemy.name+i
        let e = <HTMLElement>document.getElementById('f'+floorNum.toString()+enemy.name+i)
        if(e != null) {
        let destx = this.randomInt(parseInt(getComputedStyle(e.parentElement).width.replace('px','')) - 138)
        let desty = this.randomInt(parseInt(getComputedStyle(e.parentElement).height.replace('px','')) - 138)
        let t1 = this.randomInt(5) + 3
        let t2 = this.randomInt(5) + 3
        let str = 'left ' + t1.toString() + 's, top ' + t2.toString() + 's' 
        e.style.transition = str
        e.style.left = destx.toString()+'px'
        e.style.top = desty.toString()+'px'
        e.style.zIndex = desty.toString()
        i++
        }
      }
    })
  }

  enemyHealthBarWidth(enemy, i, j) {
    var e = <HTMLElement>document.getElementById('f'+j.toString()+(enemy.name + i).toString()).children[1].children[0]

    var percent = enemy.health / enemy.maxHealth
    percent *= 100

    e.style.width = percent.toString() + '%'
  }

  setEnemyPos(enemy, i, j) {
    var e = <HTMLElement>document.getElementById('f'+j.toString()+(enemy.name + i).toString())
    if(e != null && enemy.init == false) {
      let x = parseInt(getComputedStyle(e.parentElement).width.replace('px',''))
      let y = parseInt(getComputedStyle(e.parentElement).height.replace('px',''))
      let str = (this.randomInt(x - 138)).toString() + 'px'
      e.style.left = str
      let str2 = (this.randomInt(y - 138)).toString()
      e.style.top = str2 + 'px'
      e.style.zIndex = str2
      enemy.init = true;
    }
  }

  spawnEnemy(index) {
    let enemyType = ResourceTypes[this.randomInt(ResourceTypes.length)]
    let enemy = this.generateEnemy(index, enemyType)

    this.data.house.floors[index].enemies.push(enemy)
  }

  clickEnemy(enemy, floorIndex) {
    enemy.health -= Math.max(this.data.player.power - enemy.defence, 1)

    if(enemy.health <= 0) {
      this.killEnemy(enemy, floorIndex)
    }
  }

  killEnemy(enemy, floorIndex) {
    let index = this.data.house.floors[floorIndex].enemies.indexOf(enemy)
    this.data.player.experience += enemy.rewards.experience
    this.checkPlayerLevelup()
    
    for(var i = 0; i < enemy.rewards.resources.length; i++) {
      if(!this.data.player.discoveredResources[enemy.rewards.resources[i].type]) {
        this.data.player.discoveredResources[enemy.rewards.resources[i].type] = true
      }
      this.data.player.resources[enemy.rewards.resources[i].type] += enemy.rewards.resources[i].amount
      if(this.data.player.resources[enemy.rewards.resources[i].type] > this.data.player.maxResource) {
        this.data.player.resources[enemy.rewards.resources[i].type] = this.data.player.maxResource
      }
    }

    this.data.house.floors[floorIndex].enemies.splice(index, 1)
  }

  generateEnemyGroup(index) {
    let enemyAmount = this.randomInt(4) + 1
    let enemyType = ResourceTypes[this.randomInt(ResourceTypes.length)]

    let group = {'enemies': []}

    for(var i = 0; i < enemyAmount; i++) {
      let enemy = this.generateEnemy(index, enemyType)
      group.enemies.push(enemy)
    }

    this.data.house.floors[index].groups.push(group)
  }

  generateEnemy(index, type) {
    let mobChance = 20
    
    let impChance = Math.floor(mobChance * (Math.max(0, 15 - index) / 2.6))
    let ogreNum = Math.max(index-10, 0)
    //var ogreChance = Math.floor(mobChance * (Math.max(0, 20 - index) / 2.6))
    let ogreChance = 100 - impChance
    //var impChance = Math.max(5, 100 - (index*2)) // 96% -> floor 48
    let rand = this.randomInt(100), rand2 = (1 + this.randomInt(index))

    if(rand < impChance) {
      let enemy = JSON.parse(JSON.stringify(EnemyBaseStats.Imp))
      enemy.init = false
      enemy.type = type
      enemy.multiplier = rand2
      enemy.health *= enemy.multiplier
      enemy.maxHealth = enemy.health
      enemy.power *= enemy.multiplier
      enemy.defence *= enemy.multiplier
      enemy.rewards.resources[0].amount *= enemy.multiplier
      enemy.rewards.experience *= enemy.multiplier
      let r = 5 * enemy.multiplier
      enemy.rewards.resources.push({
        'type': type,
        'amount': r
      })
      return enemy
    } else {
      let enemy = JSON.parse(JSON.stringify(EnemyBaseStats.Ogre))
      enemy.init = false
      enemy.type = type
      enemy.multiplier = rand2
      enemy.health *= enemy.multiplier
      enemy.maxHealth = enemy.health
      enemy.power *= enemy.multiplier
      enemy.defence *= enemy.multiplier
      enemy.rewards.resources[0].amount *= enemy.multiplier
      enemy.rewards.experience *= enemy.multiplier
      let r = 100 * enemy.multiplier
      enemy.rewards.resources.push({
        'type': type,
        'amount': r
      })
      return enemy
    }
  }

  getNextFloorCost() {
    return (2 ** this.data.house.height) + (10 * this.data.house.height)
  }

  buildNextFloor() {
    var cost = this.getNextFloorCost()
    if(this.data.player.resources['Build'] >= cost) {
      this.data.house.floors.push({
        safe: false,
        machines: null,
        enemies: [],
        groups: []
      })
  
      this.data.house.height++
      this.data.player.resources['Build'] -= cost
    }
    else {
      var elem = document.getElementById('floor-purchase')

      elem.style.animationName = 'shake'
      elem.style.animationDirection = 'both'
      elem.style.animationTimingFunction = 'cubic-bezier(.36,.07,.19,.97)'
      elem.style.backgroundColor = 'rgb(170, 160, 160)'
      elem.addEventListener('animationend', (e) => {
        elem.style.animationName = 'none'
        elem.offsetHeight
        elem.style.animation = null
        elem.style.backgroundColor = '#AAA'
      })
    }
  }
}
