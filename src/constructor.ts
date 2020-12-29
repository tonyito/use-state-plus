import { useState } from 'react';

const restrictedValues = new Set(['getAll', 'multiSet', 'resetAll', 'initialValues'])

export class MainConstructor<T>{

    private initialValues: T;

    constructor(initialValues: T) {
        this.initialValues = initialValues;
        Object.keys(initialValues).map((value) => {
            if(restrictedValues.has(value)) {
                console.error('Restricted Keyword Error', `The value '${value}' is reserved for use as a method keyword.`)
            }
            const [temp, setTemp] = useState(initialValues[value]);
            this[value] = {};
            this[value].get = () => {
                return temp;
            }
            this[value].set = (arg: keyof T) => {
                setTemp(arg);
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
        const output: {[P in keyof T]: T[P]} = {} as any;
        Object.keys(this).map((value) => {
            if(restrictedValues.has(value)) return; 
            output[value] = this[value].get();
        })
        return output;
    }

    multiSet = (newValues: {[P in keyof T]?: T[P]}) => {
        Object.keys(newValues).map((value) => {
            this[value].set(newValues[value]);
            return;
        })
        return;
    }

    resetAll = () => {
        Object.keys(this).map((value) => {
            if(restrictedValues.has(value)) return; 
            this[value].set(this.initialValues[value])
        })
        return;
    }
}

