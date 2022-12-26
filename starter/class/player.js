const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');
const {World} = require('./world');


class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {

    
    // Fill this in
    
    const item = this.currentRoom.getItemByName(itemName);
    
    if (item) {
      this.currentRoom.items.splice(this.items.indexOf(item),1);
      this.items.push(item);
    }

  }

  dropItem(itemName) {

    const item = this.getItemByName(itemName);

    if (item) {
      this.items.splice(this.items.indexOf(item),1);
      this.currentRoom.items.push(item);
    }

  }

  eatItem(itemName) {

    const item = this.getItemByName(itemName);
    if (item instanceof Food) {
      this.items.splice(this.items.indexOf(item),1);
    }

  }

  getItemByName(name) {

    return this.items.filter(item => item.name === name)[0]

  }

  hit(name) {
    const enemiesInRomm = World.getEnemiesInRoom(this.currentRoom);
    const enemyToHit = enemiesInRomm.filter(enemy => enemy.name === name)[0];
    enemyToHit.applyDamage(10);  
    enemyToHit.setAttackTarget();
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};
