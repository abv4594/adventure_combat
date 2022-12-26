const {Character} = require('./character');


class Enemy extends Character {
  constructor(name, description, currentRoom) {
    // Fill this in
    super(name, description, currentRoom);
    this.cooldown = 3000;
    this.attackTarget = null;
  }

  setAttackTarget() {
    this.attackTarget = this.player;
    console.log(`Attack target set to ${this.player.name}`);
  }

  resetAttackTarget(){
    this.attackTarget = null;
  }

  setPlayer(player) {
    this.player = player;
  }


  randomMove() {
    // Fill this in
    
    const exits = this.currentRoom.getExits();  
    const nextRoomDir = exits[Math.floor(Math.random()*exits.length)];
    const nextRoom = this.currentRoom.getRoomInDirection(nextRoomDir);
    this.currentRoom = nextRoom;
    this.cooldown += 3000;
    
  }

  takeSandwich() {
    // Fill this in
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    // *** by me: this inside the cb function of the timeout refers to the timeout
    // *** by me: so we need to somehow take note of the this referring to enemy

    const thisEnemy = this;

    const resetCooldown = function() {
      thisEnemy.cooldown = 0;
      thisEnemy.act();
      
    };
    setTimeout(resetCooldown, this.cooldown);
  }



  attack() {
    // Fill this in
    this.cooldown += 3000;
    this.attackTarget.applyDamage(10);
    this.resetAttackTarget();
    
  }

  // by me:
  // will comment below because this method is already in Character
  //applyDamage(amount) {
    // Fill this in
  //}

  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else { //
      // logic to act:
      // will 1) Attack if attacked
      // 2) Move if the player is not in the same room
      // 3) If 1 and 2 fail, will scratch nose
      if (this.attackTarget) {
        this.attack();
      }
      else if (this.player && this.player.currentRoom === this.currentRoom) this.scratchNose()
      else this.randomMove();
      this.rest();
    }

    // Fill this in
  }


  scratchNose() {
    this.cooldown += 3000;

    this.alert(`${this.name} in ${this.currentRoom.name} scratches its nose`);

  }


}

module.exports = {
  Enemy,
};
