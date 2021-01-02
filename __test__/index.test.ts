import react from 'react';
import defaultImport, { useStatePlus, useStatePlusLite } from '../src/index';
import { MainClass } from '../src/classes';
import { HeavyVersion } from '../src/classes/heavy';

describe('Hook initialization tests', () => {
  const useStateMock = jest.spyOn(react, 'useState');
  const mockState = { test: true };

  beforeEach(() => {
    useStateMock.mockReturnValue([true, () => true]);
  });

  it('useStatePlus instantiates heavy version', () => {
    expect(JSON.stringify(useStatePlus(mockState))).toBe(JSON.stringify(new HeavyVersion(mockState, false)));
  });

  it('useStatePlusLite instantiates lite version', () => {
    expect(JSON.stringify(useStatePlusLite(mockState))).toBe(JSON.stringify(new MainClass(mockState, true)));
  });

  it('Default import instantiates heavy version', () => {
    expect(JSON.stringify(defaultImport(mockState))).toBe(JSON.stringify(new HeavyVersion(mockState, false)));
  });
});
