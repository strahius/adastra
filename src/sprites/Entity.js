import Phaser from 'phaser';

export default class extends Phaser.Sprite {

  constructor(game, x, y, asset) {
    super(game, x, y, asset);

    this.behaviours = [];
    this.events.onDestroy.addOnce(this.removeAllBehaviours, this);
  }

  removeAllBehaviours() {
    this.behaviours = [];
  }

  update() {
    if (this.exists) {
      this.behaviours.forEach((behaviour) => {
        behaviour.update();
      });
      super.update();
    }
  }

  addBehaviour(behaviour) {
    this.behaviours.push(behaviour);
  }

  removeBehaviour(behaviour) {
    const index = this.behaviours.indexOf(behaviour);
    if (index === -1) {
      return;
    }
    this.behaviours.splice(index, 1);
  }
}
