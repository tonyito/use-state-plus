import { HeavyVersion } from './classes/heavy';
import { MainClass } from './classes';
import { ExtendedProperties, ProhibitedProperties } from './types';

/**
 * useStatePlus hook with all functions included. For lite version with no history tracking, use 'useStatePlusLite'.
 *
 * @param state - State of the component in key/value format.
 * @typeParam T - Interface for state. Omits restricted keywords reserved for built-in functions.

 * @returns custom useState hooks for each key in state, and the following functions: 'getAll', 'multiSet', 
 * 'resetAll', 'multiReset', 'goBack', 'goForward'
 *
 */
export const useStatePlus = <T>(state: ProhibitedProperties<T>) => {
  return (new HeavyVersion(state, false) as unknown) as HeavyVersion & ExtendedProperties<T>;
};

/**
 * useStatePlus hook with history tracking disabled and history navigation functions excluded. 
 * Recommended for components saving large data in state (i.e. JSON blobs, graphs, deeply nested objects). 
 * Use this if you notice application slow down. 
 *
 * @param state - State of the component in key/value format.
 * @typeParam T - Interface for state. Omits restricted keywords reserved for built-in functions.

 * @returns custom useState hooks for each key in state, and the following functions: 'getAll', 'multiSet', 
 * 'resetAll', 'multiReset'
 *
 */
export const useStatePlusLite = <T>(state: ProhibitedProperties<T>) => {
  return (new MainClass<T>(state as T, true) as unknown) as MainClass<T> & ExtendedProperties<T>;
};

export default useStatePlus;
