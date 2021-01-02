import { Dispatch, SetStateAction } from 'react';

export class StateVariable<T> {
  private value: string;
  private initialValues: T;
  private lite: boolean;
  private temp: any;
  private setNextHistory: (values: { [key: string]: any }) => void;
  private setTemp: Dispatch<SetStateAction<any>>;

  constructor(
    value: string,
    initialValues: T,
    lite: boolean,
    temp: any,
    setNextHistory: (values: { [key: string]: any }) => void,
    setTemp: Dispatch<SetStateAction<any>>,
  ) {
    this.value = value;
    this.initialValues = initialValues;
    this.lite = lite;
    this.temp = temp;
    this.setNextHistory = setNextHistory;
    this.setTemp = setTemp;
  }

  public get = () => {
    return this.temp;
  };

  public set = (arg: keyof T) => {
    this.setTemp(arg);
    if (!this.lite) this.setNextHistory({ [this.value]: arg });
    return;
  };

  public setWithoutHistory = (arg: keyof T) => {
    this.setTemp(arg);
    return;
  };

  public reset = () => {
    this.setTemp(this.initialValues[this.value]);
    return;
  };
}
