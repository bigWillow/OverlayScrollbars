import { createEventListenerHub } from '~/support/eventListeners';

type EventMap = {
  onBoolean: [a: boolean, b: string];
  onString: [a: string];
  onUndefined: [];
};

describe('eventListeners', () => {
  describe('createEventListenerHub', () => {
    test('initialization', () => {
      const onBooleanA = jest.fn((a: boolean, b: string) => a + b);
      const onBooleanB = jest.fn();
      const onString = jest.fn();
      const onUndefined = jest.fn();
      const [, , triggerEvent] = createEventListenerHub<EventMap>({
        onBoolean: [onBooleanA, onBooleanB],
        onString: [onString, onString], // multiple equal listeners are treated as one
        onUndefined,
      });
      triggerEvent('onBoolean', [true, 'hi']);
      triggerEvent('onString', ['hi']);
      triggerEvent('onUndefined');

      expect(onBooleanA).toHaveBeenCalledTimes(1);
      expect(onBooleanA).toHaveBeenLastCalledWith(true, 'hi');

      expect(onBooleanB).toHaveBeenCalledTimes(1);
      expect(onBooleanB).toHaveBeenLastCalledWith(true, 'hi');

      // even though onString was registered twice, its only called once
      expect(onString).toHaveBeenCalledTimes(1);
      expect(onString).toHaveBeenLastCalledWith('hi');

      expect(onUndefined).toHaveBeenCalledTimes(1);
      expect(onUndefined).toHaveBeenLastCalledWith();
    });

    test('addEvent', () => {
      const onBooleanA = jest.fn((a: boolean, b: string) => a + b);
      const onBooleanB = jest.fn();
      const onString = jest.fn();
      const onUndefinedA = jest.fn();
      const onUndefinedB = jest.fn();
      const [addEvent, , triggerEvent] = createEventListenerHub<EventMap>();
      triggerEvent('onBoolean', [true, 'hi']);
      triggerEvent('onUndefined');

      addEvent('onBoolean', onBooleanA);
      addEvent('onUndefined', [onUndefinedA, onUndefinedB]);

      triggerEvent('onBoolean', [true, 'hi']);

      expect(onBooleanA).toHaveBeenCalledTimes(1);
      expect(onBooleanA).toHaveBeenLastCalledWith(true, 'hi');
      expect(onUndefinedA).not.toHaveBeenCalled();
      expect(onUndefinedB).not.toHaveBeenCalled();

      triggerEvent('onUndefined');

      expect(onUndefinedA).toHaveBeenCalledTimes(1);
      expect(onUndefinedA).toHaveBeenLastCalledWith();
      expect(onUndefinedB).toHaveBeenCalledTimes(1);
      expect(onUndefinedB).toHaveBeenLastCalledWith();

      addEvent('onBoolean', onBooleanB);

      triggerEvent('onBoolean', [false, 'hi2']);
      triggerEvent('onUndefined');

      expect(onBooleanA).toHaveBeenCalledTimes(2);
      expect(onBooleanA).toHaveBeenLastCalledWith(false, 'hi2');
      expect(onBooleanB).toHaveBeenCalledTimes(1);
      expect(onBooleanB).toHaveBeenLastCalledWith(false, 'hi2');

      expect(onUndefinedA).toHaveBeenCalledTimes(2);
      expect(onUndefinedA).toHaveBeenLastCalledWith();
      expect(onUndefinedB).toHaveBeenCalledTimes(2);
      expect(onUndefinedB).toHaveBeenLastCalledWith();

      // multiple equal listeners are treated as one
      addEvent('onString', [onString, onString]);
      triggerEvent('onString', ['hi']);

      // even though onString was registered twice, its only called once
      expect(onString).toHaveBeenCalledTimes(1);
      expect(onString).toHaveBeenLastCalledWith('hi');

      const something = jest.fn();
      // @ts-ignore
      addEvent('something', something);
      // @ts-ignore
      triggerEvent('something');
      expect(something).toHaveBeenCalledTimes(1);
    });

    test('removeEvent', () => {
      const onBooleanA = jest.fn();
      const onBooleanB = jest.fn();
      const onString = jest.fn();
      const onUndefinedA = jest.fn();
      const onUndefinedB = jest.fn();
      const [addEvent, removeEvent, triggerEvent] = createEventListenerHub<EventMap>({
        onBoolean: [onBooleanA, onBooleanB],
      });
      const removeUndefined = addEvent('onUndefined', [onUndefinedA, onUndefinedB]);

      triggerEvent('onBoolean', [true, 'hi']);
      triggerEvent('onUndefined');
      expect(onBooleanA).toHaveBeenCalledTimes(1);
      expect(onBooleanB).toHaveBeenCalledTimes(1);
      expect(onUndefinedA).toHaveBeenCalledTimes(1);
      expect(onUndefinedB).toHaveBeenCalledTimes(1);

      removeUndefined();

      triggerEvent('onBoolean', [true, 'hi']);
      triggerEvent('onUndefined');
      expect(onBooleanA).toHaveBeenCalledTimes(2);
      expect(onBooleanB).toHaveBeenCalledTimes(2);
      expect(onUndefinedA).toHaveBeenCalledTimes(1);
      expect(onUndefinedB).toHaveBeenCalledTimes(1);

      removeEvent('onBoolean', onBooleanA);
      triggerEvent('onBoolean', [true, 'hi']);
      expect(onBooleanA).toHaveBeenCalledTimes(2);
      expect(onBooleanB).toHaveBeenCalledTimes(3);

      removeEvent('onBoolean', onBooleanB);
      triggerEvent('onBoolean', [true, 'hi']);
      expect(onBooleanA).toHaveBeenCalledTimes(2);
      expect(onBooleanB).toHaveBeenCalledTimes(3);

      addEvent('onBoolean', [onBooleanA, onBooleanB]);
      addEvent('onUndefined', [onUndefinedA, onUndefinedB]);
      triggerEvent('onBoolean', [true, 'hi']);
      triggerEvent('onUndefined');

      expect(onBooleanA).toHaveBeenCalledTimes(3);
      expect(onBooleanB).toHaveBeenCalledTimes(4);
      expect(onUndefinedA).toHaveBeenCalledTimes(2);
      expect(onUndefinedB).toHaveBeenCalledTimes(2);

      removeEvent('onBoolean');
      triggerEvent('onBoolean', [true, 'hi']);
      triggerEvent('onUndefined');

      expect(onBooleanA).toHaveBeenCalledTimes(3);
      expect(onBooleanB).toHaveBeenCalledTimes(4);
      expect(onUndefinedA).toHaveBeenCalledTimes(3);
      expect(onUndefinedB).toHaveBeenCalledTimes(3);

      addEvent('onBoolean', [onBooleanA, onBooleanB]);
      triggerEvent('onBoolean', [true, 'hi']);
      triggerEvent('onUndefined');

      expect(onBooleanA).toHaveBeenCalledTimes(4);
      expect(onBooleanB).toHaveBeenCalledTimes(5);
      expect(onUndefinedA).toHaveBeenCalledTimes(4);
      expect(onUndefinedB).toHaveBeenCalledTimes(4);

      removeEvent();
      triggerEvent('onBoolean', [true, 'hi']);
      triggerEvent('onUndefined');

      expect(onBooleanA).toHaveBeenCalledTimes(4);
      expect(onBooleanB).toHaveBeenCalledTimes(5);
      expect(onUndefinedA).toHaveBeenCalledTimes(4);
      expect(onUndefinedB).toHaveBeenCalledTimes(4);

      addEvent('onString', [onString, onString]);
      triggerEvent('onString', ['hi']);

      expect(onString).toHaveBeenCalledTimes(1);

      // even though onString was registered twice, its treated as a single listener because multiple equal listeners are treated as one
      removeEvent('onString', onString);
      triggerEvent('onString', ['hi']);

      expect(onString).toHaveBeenCalledTimes(1);

      // @ts-ignore
      const something = jest.fn();
      // @ts-ignore
      addEvent('something', something);
      // @ts-ignore
      removeEvent('something');
      // @ts-ignore
      triggerEvent('something');
      expect(something).not.toHaveBeenCalled();

      // @ts-ignore
      removeEvent('not previously added');
    });
  });
});
