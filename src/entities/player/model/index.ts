import { IUserModel } from '#entities/player/interfaces'

export class PlayerModel implements IUserModel {
  private _health: number = 30

  getDamage(damage: number): void {
    throw new Error('Method not implemented.')
  }

  getHealth = () => {
    return this._health
  }

  minusHealth = (amount: number) => {
    this._health = this._health - amount
  }

  plusHealth = (amount: number) => {
    this._health = this._health + amount
  }
}
