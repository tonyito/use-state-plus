import { StateVariable } from '../../src/classes/stateVariable';

describe('StateVariable tests', () => {
  const setNextHistoryMock = jest.fn();
  const setTempMock = jest.fn();
  const testState = { test: true };

  afterEach(() => {
    jest.clearAllMocks();
  });

  interface T {
    test: boolean;
  }

  it('Returns the state variable when getter function is called', () => {
    const TestClass = new StateVariable<T>('test', testState, false, true, setNextHistoryMock, setTempMock);
    expect(TestClass.get()).toBe(true);
  });

  it('Calls the state setting and history tracking functions when setter function is called', () => {
    const TestClass = new StateVariable<T>('test', testState, false, true, setNextHistoryMock, setTempMock);
    expect(TestClass.set(false)).toBe(undefined);
    expect(setTempMock).toBeCalledTimes(1);
    expect(setNextHistoryMock).toBeCalledTimes(1);
  });

  it('If the lite version is used, calling the setter doesn\'t store current state in memory', () => {
    const TestClass = new StateVariable<T>('test', testState, true, true, setNextHistoryMock, setTempMock);
    TestClass.set(false)
    expect(setNextHistoryMock).not.toBeCalled();
  });

  it('If setWithoutHistory is called, setNextHistory is not called', () => {
    const TestClass = new StateVariable<T>('test', testState, false, true, setNextHistoryMock, setTempMock);
    expect(TestClass.setWithoutHistory(false)).toBe(undefined);
    expect(setTempMock).toBeCalledTimes(1);
    expect(setNextHistoryMock).not.toBeCalled();
  });

  it('If reset is called, set state hook is called with initial values of the variable', () => {
    const TestClass = new StateVariable<T>('test', testState, false, true, setNextHistoryMock, setTempMock);
    const thisSetSpy = jest.spyOn(TestClass, 'set');
    expect(TestClass.reset()).toBe(undefined);
    expect(thisSetSpy).toBeCalledWith(true);
  });
});
