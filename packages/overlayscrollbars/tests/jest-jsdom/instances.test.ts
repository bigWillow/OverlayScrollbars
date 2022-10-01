import { addInstance, removeInstance, getInstance } from '~/instances';
import { OverlayScrollbars } from '~/overlayscrollbars';

const testElm = document.body;
const testInstance = OverlayScrollbars(document.body, {});

describe('instances', () => {
  afterEach(() => {
    removeInstance(testElm);
  });

  test('add instance', () => {
    addInstance(testElm, testInstance);

    expect(getInstance(testElm)).toBe(testInstance);
  });

  test('remove instance', () => {
    addInstance(testElm, testInstance);
    removeInstance(testElm);

    expect(getInstance(testElm)).toBe(undefined);
  });

  test('get instance', () => {
    addInstance(testElm, testInstance);

    expect(getInstance(testElm)).toBe(testInstance);
  });
});
