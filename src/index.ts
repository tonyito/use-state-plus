import { MainConstructor } from "./constructor";
import { ExtendedProperties } from "./types";

export const useStatePlus = <T>(arg: T): MainConstructor<T> & ExtendedProperties<T> => {
    return new MainConstructor(arg) as unknown as MainConstructor<T> & ExtendedProperties<T>;
}

export default useStatePlus;