import { MainClass } from './index';
.
export class HeavyVersion extends MainClass<any> {
  /**
   * Rewinds state by x amount of steps.
   *
   * @param quantity - (Optional) The amount of steps to rewind. Defaults to 1.
   * @returns null
   *
   */
   public goBack = (quantity: number = 1) => {
    if (quantity < 1) return null;
    const newState = this.goBackMethod(quantity);
    Object.keys(newState).map((value) => {
      this[value].setWithoutHistory(newState[value]);
      return null;
    });
    return null;
  };

  /**
   * Fast forwards state by x amount of steps.
   *
   * @param quantity - (Optional) The amount of steps to fast forward. Defaults to 1.
   * @returns null
   *
   */
  public goForward = (quantity: number = 1) => {
    if (quantity < 1) return null;
    const newState = this.goForwardMethod(quantity);
    Object.keys(newState).map((value) => {
      this[value].setWithoutHistory(newState[value]);
      return null;
    });
    return null;
  };
}
