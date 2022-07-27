import {
  Cache,
  CacheValues,
  createCache,
  createDOM,
  style,
  scrollLeft,
  scrollTop,
  runEachAndClear,
  prependChildren,
  removeElements,
  on,
  addClass,
  push,
  ResizeObserverConstructor,
  isArray,
  isBoolean,
  removeClass,
  isObject,
  stopPropagation,
} from 'support';
import { getEnvironment } from 'environment';
import {
  classNameSizeObserver,
  classNameSizeObserverAppear,
  classNameSizeObserverListener,
} from 'classnames';
import { getPlugins, SizeObserverPluginInstance, sizeObserverPluginName } from 'plugins';

export interface SizeObserverOptions {
  _direction?: boolean;
  _appear?: boolean;
}

export interface SizeObserverCallbackParams {
  _sizeChanged: boolean;
  _directionIsRTLCache?: CacheValues<boolean>;
  _appear?: boolean;
}

export type SizeObserver = [destroy: () => void, append: () => void];

const scrollAmount = 3333333;
const getElmDirectionIsRTL = (elm: HTMLElement): boolean => style(elm, 'direction') === 'rtl';
const domRectHasDimensions = (rect?: DOMRectReadOnly) => rect && (rect.height || rect.width);

/**
 * Creates a size observer which observes any size, padding, border, margin and box-sizing changes of the target element. Depending on the options also direction and appear can be observed.
 * @param target The target element which shall be observed.
 * @param onSizeChangedCallback The callback which gets called after a size change was detected.
 * @param options The options for size detection, whether to observe also direction and appear.
 * @returns A object which represents the instance of the size observer.
 */
export const createSizeObserver = (
  target: HTMLElement,
  onSizeChangedCallback: (params: SizeObserverCallbackParams) => any,
  options?: SizeObserverOptions
): SizeObserver => {
  const { _direction: observeDirectionChange = false, _appear: observeAppearChange = false } =
    options || {};
  const sizeObserverPlugin = getPlugins()[sizeObserverPluginName] as
    | SizeObserverPluginInstance
    | undefined;
  const { _rtlScrollBehavior: rtlScrollBehavior } = getEnvironment();
  const baseElements = createDOM(
    `<div class="${classNameSizeObserver}"><div class="${classNameSizeObserverListener}"></div></div>`
  );
  const sizeObserver = baseElements[0] as HTMLElement;
  const listenerElement = sizeObserver.firstChild as HTMLElement;
  const getIsDirectionRTL = getElmDirectionIsRTL.bind(0, sizeObserver);
  const [updateResizeObserverContentRectCache] = createCache<DOMRectReadOnly | undefined>({
    _initialValue: undefined,
    _alwaysUpdateValues: true,
    _equal: (currVal, newVal) =>
      !(
        !currVal || // if no initial value
        // if from display: none to display: block
        (!domRectHasDimensions(currVal) && domRectHasDimensions(newVal))
      ),
  });
  const onSizeChangedCallbackProxy = (
    sizeChangedContext?: CacheValues<boolean> | ResizeObserverEntry[] | Event | boolean
  ) => {
    const isResizeObserverCall =
      isArray(sizeChangedContext) &&
      sizeChangedContext.length > 0 &&
      isObject(sizeChangedContext[0]);

    const hasDirectionCache =
      !isResizeObserverCall && isBoolean((sizeChangedContext as CacheValues<boolean>)[0]);

    let skip = false;
    let appear: boolean | number | undefined = false;
    let doDirectionScroll = true; // always true if sizeChangedContext is Event (appear callback or RO. Polyfill)

    // if triggered from RO.
    if (isResizeObserverCall) {
      const [currRContentRect, , prevContentRect] = updateResizeObserverContentRectCache(
        (sizeChangedContext as ResizeObserverEntry[]).pop()!.contentRect
      );
      const hasDimensions = domRectHasDimensions(currRContentRect);
      const hadDimensions = domRectHasDimensions(prevContentRect);
      skip = !prevContentRect || !hasDimensions; // skip on initial RO. call or if display is none
      appear = !hadDimensions && hasDimensions;

      doDirectionScroll = !skip; // direction scroll when not skipping
    }
    // else if its triggered with DirectionCache
    else if (hasDirectionCache) {
      [, doDirectionScroll] = sizeChangedContext as CacheValues<boolean>; // direction scroll when DirectionCache changed, false otherwise
    }
    // else if it triggered with appear from polyfill
    else {
      appear = sizeChangedContext === true;
    }

    if (observeDirectionChange && doDirectionScroll) {
      const rtl = hasDirectionCache
        ? (sizeChangedContext as CacheValues<boolean>)[0]
        : getElmDirectionIsRTL(sizeObserver);
      scrollLeft(
        sizeObserver,
        rtl
          ? rtlScrollBehavior.n
            ? -scrollAmount
            : rtlScrollBehavior.i
            ? 0
            : scrollAmount
          : scrollAmount
      );
      scrollTop(sizeObserver, scrollAmount);
    }

    if (!skip) {
      onSizeChangedCallback({
        _sizeChanged: !hasDirectionCache,
        _directionIsRTLCache: hasDirectionCache
          ? (sizeChangedContext as CacheValues<boolean>)
          : undefined,
        _appear: !!appear,
      });
    }
  };
  const offListeners: (() => void)[] = [];
  let appearCallback: ((...args: any) => any) | false = observeAppearChange
    ? onSizeChangedCallbackProxy
    : false;
  let directionIsRTLCache: Cache<boolean> | undefined;

  return [
    () => {
      runEachAndClear(offListeners);
      removeElements(sizeObserver);
    },
    () => {
      if (ResizeObserverConstructor) {
        const resizeObserverInstance = new ResizeObserverConstructor(onSizeChangedCallbackProxy);
        resizeObserverInstance.observe(listenerElement);
        push(offListeners, () => {
          resizeObserverInstance.disconnect();
        });
      } else if (sizeObserverPlugin) {
        const [pluginAppearCallback, pluginOffListeners] = sizeObserverPlugin._(
          listenerElement,
          onSizeChangedCallbackProxy,
          observeAppearChange
        );
        appearCallback = pluginAppearCallback;
        push(offListeners, pluginOffListeners);
      }

      if (observeDirectionChange) {
        directionIsRTLCache = createCache(
          {
            _initialValue: !getIsDirectionRTL(), // invert current value to trigger initial change
          },
          getIsDirectionRTL
        );
        const [updateDirectionIsRTLCache] = directionIsRTLCache;

        push(
          offListeners,
          on(sizeObserver, 'scroll', (event: Event) => {
            const directionIsRTLCacheValues = updateDirectionIsRTLCache();
            const [directionIsRTL, directionIsRTLChanged] = directionIsRTLCacheValues;

            if (directionIsRTLChanged) {
              removeClass(listenerElement, 'ltr rtl');
              if (directionIsRTL) {
                addClass(listenerElement, 'rtl');
              } else {
                addClass(listenerElement, 'ltr');
              }
              onSizeChangedCallbackProxy(directionIsRTLCacheValues);
            }

            stopPropagation(event);
          })
        );
      }

      // appearCallback is always needed on scroll-observer strategy to reset it
      if (appearCallback) {
        addClass(sizeObserver, classNameSizeObserverAppear);
        push(
          offListeners,
          on(sizeObserver, 'animationstart', appearCallback, {
            // Fire only once for "CSS is ready" event if ResizeObserver strategy is used
            _once: !!ResizeObserverConstructor,
          })
        );
      }

      prependChildren(target, sizeObserver);
    },
  ];
};
