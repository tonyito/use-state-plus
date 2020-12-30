import { useState } from 'react';
import _ from 'lodash';
import { StateHistory } from './history';

const restrictedValues = new Set(['getAll', 'multiSet', 'resetAll', 'multiReset', 'goBack', 'initialValues'])

export class MainConstructor<T>{

    private initialValues: T;
    private setNextHistory: (values: { [key: string]: any; }) => void;
    private goBackMethod: (quantity: number) => T;
    private goForwardMethod: (quantity: number) => T;

    constructor(initialValues: T) {

        this.initialValues = initialValues;

        const { setNextHistory, goBack, goForward } = new StateHistory(initialValues);

        this.setNextHistory = setNextHistory;
        this.goBackMethod = goBack;
        this.goForwardMethod = goForward;

        Object.keys(initialValues).map((value) => {
            if (restrictedValues.has(value)) {
                console.error('Restricted Keyword Error', `The value '${value}' is reserved for use as a method keyword.`)
            }
            const [temp, setTemp] = useState(initialValues[value]);
            this[value] = {};
            this[value].get = () => {
                return temp;
            }
            this[value].set = (arg: keyof T, multi?: boolean) => {
                setTemp(arg);
                if (!multi) this.setNextHistory({ [value]: arg })
                return;
            }
            this[value].reset = () => {
                setTemp(initialValues[value]);
                return;
            }
            return this[value];
        })
    }

    getAll = () => {
        const output: { [P in keyof T]: T[P] } = {} as any;
        Object.keys(this.initialValues).map((value) => {
            output[value] = this[value].get();
            return null;
        })
        return output;
    }

    multiSet = (newValues: { [P in keyof T]?: T[P] }) => {
        Object.keys(newValues).map((value) => {
            if (!(this.initialValues as Object).hasOwnProperty(value)) {
                console.warn('Warning: Assigning new property that does not exist to state object. This will probably cause unwanted behavior.')
            }
            this[value].set(newValues[value], true);
            return null;
        })
        this.setNextHistory(newValues);
        return;
    }

    multiReset = (newValues: Array<keyof T>) => {
        const newState = {};
        newValues.map((value) => {
            if (!(this.initialValues as Object).hasOwnProperty(value)) {
                console.warn('Warning: Resetting a property that does not exist to state object. This will probably cause unwanted behavior.')
            }
            this[value as string].set(this.initialValues[value], true);
            newState[value as string] = this.initialValues[value];
            return null;
        })
        this.setNextHistory(newState);
        return;
    }

    resetAll = () => {
        const newState = {};
        Object.keys(this.initialValues).map((value) => {
            this[value].set(this.initialValues[value], true);
            newState[value] = this.initialValues[value];
            return null;
        })
        this.setNextHistory(newState);
        return;
    }

    goBack = (quantity: number = 1) => {
        if (quantity < 1) return null;
        const newState = this.goBackMethod(quantity);
        Object.keys(newState).map((value) => {
            this[value].set(newState[value], true);
            return null;
        })
        return null;
    }

    goForward = (quantity: number = 1) => {
        if (quantity < 1) return null;
        const newState = this.goForwardMethod(quantity);
        Object.keys(newState).map((value) => {
            this[value].set(newState[value], true);
            return null;
        })
        return null;
    }
}