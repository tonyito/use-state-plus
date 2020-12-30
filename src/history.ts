
import { Dispatch, SetStateAction, useState } from 'react';
import _ from 'lodash';

export class StateHistory<T> {

    public history: T[];
    private setHistory: Dispatch<SetStateAction<T[]>>
    private position: number;
    private setPosition: Dispatch<SetStateAction<number>>

    constructor(initialValues: T) {
        (() => {
            const [history, setHistory] = useState([initialValues]);
            const [position, setPosition] = useState(1);
            this.history = history;
            this.setHistory = setHistory;
            this.position = position;
            this.setPosition = setPosition;
        })()

    }

    setNextHistory = (values: { [key: string]: any }) => {
        const lastState = _.cloneDeep(this.history[this.position - 1]);
        Object.keys(values).map((key: string) => {
            lastState[key] = _.isObject(values[key]) ? _.cloneDeep(values[key]) : values[key];
        })
        if (this.position === this.history.length) {
            this.history.push(lastState);
            this.setHistory(this.history);
            this.setPosition(this.position + 1);
        } else {
            const newHistory = this.history.slice(0, this.position);
            newHistory.push(lastState);
            this.setHistory(newHistory);
            this.setPosition(newHistory.length);
        }
    }

    goBack = (quantity: number) => {
        const idx = this.position - quantity;
        if (idx < 1) return this.history[0];
        this.setPosition(idx);
        return this.history[idx - 1];
    }

    goForward = (quantity: number) => {
        const idx = this.position + quantity;
        if (idx > this.history.length) return this.history[this.history.length - 1];
        this.setPosition(idx);
        return this.history[idx - 1];
    }

}