import { useState } from 'react';
import { RESTRICTED_VALUES } from '../constants';
import { StateHistory } from './history';
import { StateVariable } from './stateVariable';
import { ProhibitedProperties } from '../types';

export class MainClass<T> {
  private initialValues: T;
  private lite: boolean;
  private setNextHistory: (values: { [key: string]: any }) => void;
  protected goBackMethod: (quantity: number) => T;
  protected goForwardMethod: (quantity: number) => ProhibitedProperties<T>;

  constructor(initialValues: T, lite: boolean) {
    this.initialValues = initialValues;
    this.lite = lite;

    const { setNextHistory, goBack, goForward } = new StateHistory(initialValues);

    this.setNextHistory = setNextHistory;
    this.goBackMethod = goBack;
    this.goForwardMethod = goForward;

    Object.keys(initialValues).map((value) => {
      if (RESTRICTED_VALUES.has(value)) return null;
      const [temp, setTemp] = useState(initialValues[value]);
      this[value] = new StateVariable<T>(value, initialValues, lite, temp, setNextHistory, setTemp);
      return this[value];
    });
  }
  /**
   * @returns The current state of the component as an object.
   */
  getAll = () => {
    const output: { [P in keyof T]: T[P] } = {} as any;
    Object.keys(this.initialValues).map((value) => {
      output[value] = this[value].get();
      return null;
    });
    return output;
  };

  /**
   * Allows multiple state variables to be set in one call like in class components.
   *
   * @param newValues - Key/value pairs of state variables as a single object.
   * @returns void
   */
  multiSet = (newValues: { [P in keyof T]?: T[P] }) => {
    Object.keys(newValues).map((value) => {
      if (!(this.initialValues as Object).hasOwnProperty(value)) {
        console.warn(
          'Warning: Assigning new property that does not exist to state object. This will probably cause unwanted behavior.',
        );
      }
      this[value].setWithoutHistory(newValues[value]);
      return null;
    });
    if (!this.lite) this.setNextHistory(newValues);
    return;
  };

  /**
   * Allows multiple state variables to be reset in one call.
   *
   * @param newValues - Array of strings for each variable to be reset.
   * @returns void
   */
  multiReset = (newValues: Array<keyof T>) => {
    const newState = {};
    newValues.map((value) => {
      if (!(this.initialValues as Object).hasOwnProperty(value)) {
        console.warn(
          'Warning: Resetting a property that does not exist to state object. This will probably cause unwanted behavior.',
        );
      }
      this[value as string].setWithoutHistory(this.initialValues[value]);
      newState[value as string] = this.initialValues[value];
      return null;
    });
    if (!this.lite) this.setNextHistory(newState);
    return;
  };

  /**
   * Resets the component's state to it's initial values.
   *
   * @returns void
   */
  resetAll = () => {
    const newState = {};
    Object.keys(this.initialValues).map((value) => {
      this[value].setWithoutHistory(this.initialValues[value]);
      newState[value] = this.initialValues[value];
      return null;
    });
    if (!this.lite) this.setNextHistory(newState);
    return;
  };
}
