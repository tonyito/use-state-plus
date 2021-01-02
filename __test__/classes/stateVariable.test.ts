import { StateVariable } from '../../src/classes/stateVariable';

describe('StateVariable tests', () => {
  const setNextHistoryMock = jest.fn();
  const setTempMock = jest.fn();
  const testState = { test: true };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Returns the state variable when getter function is called', () => {
    const TestClass = new StateVariable<any>('test', testState, false, true, setNextHistoryMock, setTempMock);
    expect(TestClass.get()).toBe(true);
  });
});
