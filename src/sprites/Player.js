import Ship from './Ship';
import Missile from '../behaviours/fire/Missile';
import DamageEmitter from '../behaviours/DamageEmitter';
import ThrustEmitter from '../behaviours/ThrustEmitter';
import EnemyDamage from '../behaviours/EnemyDamage';
import RegenerateHealth from '../behaviours/RegenerateHealth';
import CollectPowerup from '../behaviours/powerup/CollectPowerup';
import Control from '../behaviours/Control';

export default class extends Ship {

  constructor(game, x, y) {
    super(game, x, y, 'ship');

    // Set a 32x32 hitbox
    this.body.setSize(32, 32, 16, 16);

    this.health = 200;
    this.maxHealth = 200;

    this.points = 0;

    this.events.onKilled.add(() => {
      // This is needed otherwise background can be rendered out of place
      // http://www.html5gamedevs.com/topic/3359-camera-not-positioned-correctly-after-changing-start-away-from-scrolling/
      this.game.world.setBounds(0, 0, this.game.width, this.game.height);
      this.game.state.start('GameOver', true, false, this.points);
    });

    this.addBehaviour(new Control(this.game, this));
    this.fireBehaviour = new Missile(game, this);
    this.addBehaviour(this.fireBehaviour);
    this.addBehaviour(new RegenerateHealth(game, this));
    this.addBehaviour(new DamageEmitter(game, this));
    this.addBehaviour(new ThrustEmitter(game, this));
    this.addBehaviour(new EnemyDamage(game, this));
    this.addBehaviour(new CollectPowerup(game, this));
  }

  changeWeapon(behaviour) {
    this.removeBehaviour(this.fireBehaviour);
    this.addBehaviour(behaviour);
    this.fireBehaviour = behaviour
  }
}
