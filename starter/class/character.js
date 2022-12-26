
class Character {

  constructor(name, description, currentRoom) {
    // Fill this in
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    this.items = [];
    this.health = 100;
    this.strength = 10;

  }



  applyDamage(amount) {
    // Fill this in
    this.health -= amount;
    console.log(`${this.name} health is now ${this.health}`);
    if (this.health <= 0) this.die()
  }

  die() {
    // Fill this in
    this.currentRoom.items.push(...this.items);
    this.items = [];
    this.currentRoom = null;
    console.log(`${this.name} died`);
  }



}

module.exports = {
  Character,
};
