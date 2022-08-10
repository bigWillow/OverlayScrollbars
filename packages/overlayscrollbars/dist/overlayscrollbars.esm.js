/*!
 * OverlayScrollbars
 * Version: 2.0.0-beta.0
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */

function each(t, n) {
  if (isArrayLike(t)) {
    for (let o = 0; o < t.length; o++) {
      if (false === n(t[o], o, t)) {
        break;
      }
    }
  } else if (t) {
    each(Object.keys(t), (o => n(t[o], o, t)));
  }
  return t;
}

function style(t, n) {
  const o = isString(n);
  const s = isArray(n) || o;
  if (s) {
    let s = o ? "" : {};
    if (t) {
      const e = window.getComputedStyle(t, null);
      s = o ? getCSSVal(t, e, n) : n.reduce(((n, o) => {
        n[o] = getCSSVal(t, e, o);
        return n;
      }), s);
    }
    return s;
  }
  t && each(keys(n), (o => setCSSVal(t, o, n[o])));
}

const createCache = (t, n) => {
  const {o: o, u: s, _: e} = t;
  let c = o;
  let r;
  const cacheUpdateContextual = (t, n) => {
    const o = c;
    const l = t;
    const i = n || (s ? !s(o, l) : o !== l);
    if (i || e) {
      c = l;
      r = o;
    }
    return [ c, i, r ];
  };
  const cacheUpdateIsolated = t => cacheUpdateContextual(n(c, r), t);
  const getCurrentCache = t => [ c, !!t, r ];
  return [ n ? cacheUpdateIsolated : cacheUpdateContextual, getCurrentCache ];
};

const t = Node.ELEMENT_NODE;

const {toString: n, hasOwnProperty: o} = Object.prototype;

const isUndefined = t => void 0 === t;

const isNull = t => null === t;

const type = t => isUndefined(t) || isNull(t) ? `${t}` : n.call(t).replace(/^\[object (.+)\]$/, "$1").toLowerCase();

const isNumber = t => "number" === typeof t;

const isString = t => "string" === typeof t;

const isBoolean = t => "boolean" === typeof t;

const isFunction = t => "function" === typeof t;

const isArray = t => Array.isArray(t);

const isObject = t => "object" === typeof t && !isArray(t) && !isNull(t);

const isArrayLike = t => {
  const n = !!t && t.length;
  const o = isNumber(n) && n > -1 && n % 1 == 0;
  return isArray(t) || !isFunction(t) && o ? n > 0 && isObject(t) ? n - 1 in t : true : false;
};

const isPlainObject = t => {
  if (!t || !isObject(t) || "object" !== type(t)) {
    return false;
  }
  let n;
  const s = "constructor";
  const e = t[s];
  const c = e && e.prototype;
  const r = o.call(t, s);
  const l = c && o.call(c, "isPrototypeOf");
  if (e && !r && !l) {
    return false;
  }
  for (n in t) {}
  return isUndefined(n) || o.call(t, n);
};

const isHTMLElement = n => {
  const o = HTMLElement;
  return n ? o ? n instanceof o : n.nodeType === t : false;
};

const isElement = n => {
  const o = Element;
  return n ? o ? n instanceof o : n.nodeType === t : false;
};

const indexOf = (t, n, o) => t.indexOf(n, o);

const push = (t, n, o) => {
  !o && !isString(n) && isArrayLike(n) ? Array.prototype.push.apply(t, n) : t.push(n);
  return t;
};

const from = t => {
  const n = Array.from;
  const o = [];
  if (n && t) {
    return n(t);
  }
  if (t instanceof Set) {
    t.forEach((t => {
      push(o, t);
    }));
  } else {
    each(t, (t => {
      push(o, t);
    }));
  }
  return o;
};

const isEmptyArray = t => !!t && 0 === t.length;

const runEachAndClear = (t, n, o) => {
  const runFn = t => t && t.apply(void 0, n || []);
  each(t, runFn);
  !o && (t.length = 0);
};

const hasOwnProperty = (t, n) => Object.prototype.hasOwnProperty.call(t, n);

const keys = t => t ? Object.keys(t) : [];

const assignDeep = (t, n, o, s, e, c, r) => {
  const l = [ n, o, s, e, c, r ];
  if (("object" !== typeof t || isNull(t)) && !isFunction(t)) {
    t = {};
  }
  each(l, (n => {
    each(keys(n), (o => {
      const s = n[o];
      if (t === s) {
        return true;
      }
      const e = isArray(s);
      if (s && (isPlainObject(s) || e)) {
        const n = t[o];
        let c = n;
        if (e && !isArray(n)) {
          c = [];
        } else if (!e && !isPlainObject(n)) {
          c = {};
        }
        t[o] = assignDeep(c, s);
      } else {
        t[o] = s;
      }
    }));
  }));
  return t;
};

const isEmptyObject = t => {
  for (const n in t) {
    return false;
  }
  return true;
};

const getSetProp = (t, n, o, s) => {
  if (isUndefined(s)) {
    return o ? o[t] : n;
  }
  o && (isString(s) || isNumber(s)) && (o[t] = s);
};

const attr = (t, n, o) => {
  if (isUndefined(o)) {
    return t ? t.getAttribute(n) : null;
  }
  t && t.setAttribute(n, o);
};

const attrClass = (t, n, o, s) => {
  if (o) {
    const e = attr(t, n) || "";
    const c = new Set(e.split(" "));
    c[s ? "add" : "delete"](o);
    attr(t, n, from(c).join(" ").trim());
  }
};

const hasAttrClass = (t, n, o) => {
  const s = attr(t, n) || "";
  const e = new Set(s.split(" "));
  return e.has(o);
};

const removeAttr = (t, n) => {
  t && t.removeAttribute(n);
};

const scrollLeft = (t, n) => getSetProp("scrollLeft", 0, t, n);

const scrollTop = (t, n) => getSetProp("scrollTop", 0, t, n);

const s = Element.prototype;

const find = (t, n) => {
  const o = [];
  const s = n ? isElement(n) ? n : null : document;
  return s ? push(o, s.querySelectorAll(t)) : o;
};

const findFirst = (t, n) => {
  const o = n ? isElement(n) ? n : null : document;
  return o ? o.querySelector(t) : null;
};

const is = (t, n) => {
  if (isElement(t)) {
    const o = s.matches || s.msMatchesSelector;
    return o.call(t, n);
  }
  return false;
};

const contents = t => t ? from(t.childNodes) : [];

const parent = t => t ? t.parentElement : null;

const closest = (t, n) => {
  if (isElement(t)) {
    const o = s.closest;
    if (o) {
      return o.call(t, n);
    }
    do {
      if (is(t, n)) {
        return t;
      }
      t = parent(t);
    } while (t);
  }
  return null;
};

const liesBetween = (t, n, o) => {
  const s = t && closest(t, n);
  const e = t && findFirst(o, s);
  const c = closest(e, n) === s;
  return s && e ? s === t || e === t || c && closest(closest(t, o), n) !== s : false;
};

const before = (t, n, o) => {
  if (o && t) {
    let s = n;
    let e;
    if (isArrayLike(o)) {
      e = document.createDocumentFragment();
      each(o, (t => {
        if (t === s) {
          s = t.previousSibling;
        }
        e.appendChild(t);
      }));
    } else {
      e = o;
    }
    if (n) {
      if (!s) {
        s = t.firstChild;
      } else if (s !== n) {
        s = s.nextSibling;
      }
    }
    t.insertBefore(e, s || null);
  }
};

const appendChildren = (t, n) => {
  before(t, null, n);
};

const insertBefore = (t, n) => {
  before(parent(t), t, n);
};

const insertAfter = (t, n) => {
  before(parent(t), t && t.nextSibling, n);
};

const removeElements = t => {
  if (isArrayLike(t)) {
    each(from(t), (t => removeElements(t)));
  } else if (t) {
    const n = parent(t);
    if (n) {
      n.removeChild(t);
    }
  }
};

const createDiv = t => {
  const n = document.createElement("div");
  if (t) {
    attr(n, "class", t);
  }
  return n;
};

const createDOM = t => {
  const n = createDiv();
  n.innerHTML = t.trim();
  return each(contents(n), (t => removeElements(t)));
};

const firstLetterToUpper = t => t.charAt(0).toUpperCase() + t.slice(1);

const getDummyStyle = () => createDiv().style;

const e = [ "-webkit-", "-moz-", "-o-", "-ms-" ];

const c = [ "WebKit", "Moz", "O", "MS", "webkit", "moz", "o", "ms" ];

const r = {};

const l = {};

const cssProperty = t => {
  let n = l[t];
  if (hasOwnProperty(l, t)) {
    return n;
  }
  const o = firstLetterToUpper(t);
  const s = getDummyStyle();
  each(e, (e => {
    const c = e.replace(/-/g, "");
    const r = [ t, e + t, c + o, firstLetterToUpper(c) + o ];
    return !(n = r.find((t => void 0 !== s[t])));
  }));
  return l[t] = n || "";
};

const jsAPI = t => {
  let n = r[t] || window[t];
  if (hasOwnProperty(r, t)) {
    return n;
  }
  each(c, (o => {
    n = n || window[o + firstLetterToUpper(t)];
    return !n;
  }));
  r[t] = n;
  return n;
};

const i = jsAPI("MutationObserver");

const a = jsAPI("IntersectionObserver");

const u = jsAPI("ResizeObserver");

const d = jsAPI("cancelAnimationFrame");

const f = jsAPI("requestAnimationFrame");

const _ = window.setTimeout;

const h = window.clearTimeout;

const g = /[^\x20\t\r\n\f]+/g;

const classListAction = (t, n, o) => {
  const s = t && t.classList;
  let e;
  let c = 0;
  let r = false;
  if (s && n && isString(n)) {
    const t = n.match(g) || [];
    r = t.length > 0;
    while (e = t[c++]) {
      r = !!o(s, e) && r;
    }
  }
  return r;
};

const hasClass = (t, n) => classListAction(t, n, ((t, n) => t.contains(n)));

const removeClass = (t, n) => {
  classListAction(t, n, ((t, n) => t.remove(n)));
};

const addClass = (t, n) => {
  classListAction(t, n, ((t, n) => t.add(n)));
  return removeClass.bind(0, t, n);
};

const equal = (t, n, o, s) => {
  if (t && n) {
    let e = true;
    each(o, (o => {
      const c = s ? s(t[o]) : t[o];
      const r = s ? s(n[o]) : n[o];
      if (c !== r) {
        e = false;
      }
    }));
    return e;
  }
  return false;
};

const equalWH = (t, n) => equal(t, n, [ "w", "h" ]);

const equalXY = (t, n) => equal(t, n, [ "x", "y" ]);

const equalTRBL = (t, n) => equal(t, n, [ "t", "r", "b", "l" ]);

const equalBCRWH = (t, n, o) => equal(t, n, [ "width", "height" ], o && (t => Math.round(t)));

const noop = () => {};

const selfCancelTimeout = t => {
  let n;
  const o = t ? _ : f;
  const s = t ? h : d;
  return [ e => {
    s(n);
    n = o(e, isFunction(t) ? t() : t);
  }, () => s(n) ];
};

const debounce = (t, n) => {
  let o;
  let s;
  let e;
  let c = noop;
  const {g: r, v: l, p: i} = n || {};
  const a = function invokeFunctionToDebounce(n) {
    c();
    h(o);
    o = s = void 0;
    c = noop;
    t.apply(this, n);
  };
  const mergeParms = t => i && s ? i(s, t) : t;
  const flush = () => {
    if (c !== noop) {
      a(mergeParms(e) || e);
    }
  };
  const u = function debouncedFn() {
    const t = from(arguments);
    const n = isFunction(r) ? r() : r;
    const i = isNumber(n) && n >= 0;
    if (i) {
      const r = isFunction(l) ? l() : l;
      const i = isNumber(r) && r >= 0;
      const u = n > 0 ? _ : f;
      const g = n > 0 ? h : d;
      const v = mergeParms(t);
      const w = v || t;
      const p = a.bind(0, w);
      c();
      const b = u(p, n);
      c = () => g(b);
      if (i && !o) {
        o = _(flush, r);
      }
      s = e = w;
    } else {
      a(t);
    }
  };
  u.m = flush;
  return u;
};

const v = {
  opacity: 1,
  zindex: 1
};

const parseToZeroOrNumber = (t, n) => {
  const o = n ? parseFloat(t) : parseInt(t, 10);
  return o === o ? o : 0;
};

const adaptCSSVal = (t, n) => !v[t.toLowerCase()] && isNumber(n) ? `${n}px` : n;

const getCSSVal = (t, n, o) => null != n ? n[o] || n.getPropertyValue(o) : t.style[o];

const setCSSVal = (t, n, o) => {
  try {
    const {style: s} = t;
    if (!isUndefined(s[n])) {
      s[n] = adaptCSSVal(n, o);
    } else {
      s.setProperty(n, o);
    }
  } catch (s) {}
};

const directionIsRTL = t => "rtl" === style(t, "direction");

const topRightBottomLeft = (t, n, o) => {
  const s = n ? `${n}-` : "";
  const e = o ? `-${o}` : "";
  const c = `${s}top${e}`;
  const r = `${s}right${e}`;
  const l = `${s}bottom${e}`;
  const i = `${s}left${e}`;
  const a = style(t, [ c, r, l, i ]);
  return {
    t: parseToZeroOrNumber(a[c]),
    r: parseToZeroOrNumber(a[r]),
    b: parseToZeroOrNumber(a[l]),
    l: parseToZeroOrNumber(a[i])
  };
};

const {round: w} = Math;

const p = {
  w: 0,
  h: 0
};

const windowSize = () => ({
  w: window.innerWidth,
  h: window.innerHeight
});

const offsetSize = t => t ? {
  w: t.offsetWidth,
  h: t.offsetHeight
} : p;

const clientSize = t => t ? {
  w: t.clientWidth,
  h: t.clientHeight
} : p;

const scrollSize = t => t ? {
  w: t.scrollWidth,
  h: t.scrollHeight
} : p;

const fractionalSize = t => {
  const n = parseFloat(style(t, "height")) || 0;
  const o = parseFloat(style(t, "width")) || 0;
  return {
    w: o - w(o),
    h: n - w(n)
  };
};

const getBoundingClientRect = t => t.getBoundingClientRect();

let b;

const supportPassiveEvents = () => {
  if (isUndefined(b)) {
    b = false;
    try {
      window.addEventListener("test", null, Object.defineProperty({}, "passive", {
        get() {
          b = true;
        }
      }));
    } catch (t) {}
  }
  return b;
};

const splitEventNames = t => t.split(" ");

const off = (t, n, o, s) => {
  each(splitEventNames(n), (n => {
    t.removeEventListener(n, o, s);
  }));
};

const on = (t, n, o, s) => {
  var e;
  const c = supportPassiveEvents();
  const r = null != (e = c && s && s.S) ? e : c;
  const l = s && s.$ || false;
  const i = s && s.C || false;
  const a = [];
  const u = c ? {
    passive: r,
    capture: l
  } : l;
  each(splitEventNames(n), (n => {
    const s = i ? e => {
      t.removeEventListener(n, s, l);
      o && o(e);
    } : o;
    push(a, off.bind(null, t, n, s, l));
    t.addEventListener(n, s, u);
  }));
  return runEachAndClear.bind(0, a);
};

const stopPropagation = t => t.stopPropagation();

const preventDefault = t => t.preventDefault();

const m = {
  x: 0,
  y: 0
};

const absoluteCoordinates = t => {
  const n = t ? getBoundingClientRect(t) : 0;
  return n ? {
    x: n.left + window.pageYOffset,
    y: n.top + window.pageXOffset
  } : m;
};

const manageListener = (t, n) => {
  each(isArray(n) ? n : [ n ], t);
};

const createEventListenerHub = t => {
  const n = new Map;
  const removeEvent = (t, o) => {
    if (t) {
      const s = n.get(t);
      manageListener((t => {
        if (s) {
          s[t ? "delete" : "clear"](t);
        }
      }), o);
    } else {
      n.forEach((t => {
        t.clear();
      }));
      n.clear();
    }
  };
  const addEvent = (t, o) => {
    const s = n.get(t) || new Set;
    n.set(t, s);
    manageListener((t => {
      t && s.add(t);
    }), o);
    return removeEvent.bind(0, t, o);
  };
  const triggerEvent = (t, o) => {
    const s = n.get(t);
    each(from(s), (t => {
      if (o && !isEmptyArray(o)) {
        t.apply(0, o);
      } else {
        t();
      }
    }));
  };
  const o = keys(t);
  each(o, (n => {
    addEvent(n, t[n]);
  }));
  return [ addEvent, removeEvent, triggerEvent ];
};

const opsStringify = t => JSON.stringify(t, ((t, n) => {
  if (isFunction(n)) {
    throw new Error;
  }
  return n;
}));

const y = {
  paddingAbsolute: false,
  showNativeOverlaidScrollbars: false,
  update: {
    elementEvents: [ [ "img", "load" ] ],
    debounce: [ 0, 33 ],
    attributes: null,
    ignoreMutation: null
  },
  overflow: {
    x: "scroll",
    y: "scroll"
  },
  scrollbars: {
    theme: "os-theme-dark",
    visibility: "auto",
    autoHide: "never",
    autoHideDelay: 1300,
    dragScroll: true,
    clickScroll: false,
    pointers: [ "mouse", "touch", "pen" ]
  }
};

const getOptionsDiff = (t, n) => {
  const o = {};
  const s = keys(n).concat(keys(t));
  each(s, (s => {
    const e = t[s];
    const c = n[s];
    if (isObject(e) && isObject(c)) {
      assignDeep(o[s] = {}, getOptionsDiff(e, c));
    } else if (hasOwnProperty(n, s) && c !== e) {
      let t = true;
      if (isArray(e) || isArray(c)) {
        try {
          if (opsStringify(e) === opsStringify(c)) {
            t = false;
          }
        } catch (r) {}
      }
      if (t) {
        o[s] = c;
      }
    }
  }));
  return o;
};

const S = "os-environment";

const x = `${S}-flexbox-glue`;

const $ = `${x}-max`;

const C = "data-overlayscrollbars";

const O = `${C}-overflow-x`;

const T = `${C}-overflow-y`;

const E = "overflowVisible";

const A = "scrollbarHidden";

const z = "updating";

const I = "os-padding";

const L = "os-viewport";

const H = `${L}-arrange`;

const P = "os-content";

const D = `${L}-scrollbar-hidden`;

const M = `os-overflow-visible`;

const R = "os-size-observer";

const k = `${R}-appear`;

const B = `${R}-listener`;

const V = `${B}-scroll`;

const Y = `${B}-item`;

const j = `${Y}-final`;

const q = "os-trinsic-observer";

const F = "os-scrollbar";

const G = `${F}-rtl`;

const N = `${F}-horizontal`;

const X = `${F}-vertical`;

const U = `${F}-track`;

const W = `${F}-handle`;

const J = `${F}-visible`;

const K = `${F}-cornerless`;

const Z = `${F}-transitionless`;

const Q = `${F}-interaction`;

const tt = `${F}-unusable`;

const nt = `${F}-auto-hidden`;

const ot = `${F}-wheel`;

const st = `${U}-interactive`;

const et = `${W}-interactive`;

const ct = {};

const getPlugins = () => ct;

const addPlugin = t => {
  each(isArray(t) ? t : [ t ], (t => {
    const n = keys(t)[0];
    ct[n] = t[n];
  }));
};

const rt = {
  boolean: "__TPL_boolean_TYPE__",
  number: "__TPL_number_TYPE__",
  string: "__TPL_string_TYPE__",
  array: "__TPL_array_TYPE__",
  object: "__TPL_object_TYPE__",
  function: "__TPL_function_TYPE__",
  null: "__TPL_null_TYPE__"
};

const lt = rt.number;

const it = rt.boolean;

const at = [ rt.array, rt.null ];

const ut = "hidden scroll visible visible-hidden";

const dt = "visible hidden auto";

const ft = "never scroll leavemove";

({
  paddingAbsolute: it,
  showNativeOverlaidScrollbars: it,
  update: {
    elementEvents: at,
    attributes: at,
    debounce: [ rt.number, rt.array, rt.null ],
    ignoreMutation: [ rt.function, rt.null ]
  },
  overflow: {
    x: ut,
    y: ut
  },
  scrollbars: {
    theme: [ rt.string, rt.null ],
    visibility: dt,
    autoHide: ft,
    autoHideDelay: lt,
    dragScroll: it,
    clickScroll: it,
    pointers: [ rt.array, rt.null ]
  }
});

const _t = "__osOptionsValidationPlugin";

const ht = 3333333;

const gt = "scroll";

const vt = "__osSizeObserverPlugin";

const wt = /* @__PURE__ */ (() => ({
  [vt]: {
    O: (t, n, o) => {
      const s = createDOM(`<div class="${Y}" dir="ltr"><div class="${Y}"><div class="${j}"></div></div><div class="${Y}"><div class="${j}" style="width: 200%; height: 200%"></div></div></div>`);
      appendChildren(t, s);
      addClass(t, V);
      const e = s[0];
      const c = e.lastChild;
      const r = e.firstChild;
      const l = null == r ? void 0 : r.firstChild;
      let i = offsetSize(e);
      let a = i;
      let u = false;
      let _;
      const reset = () => {
        scrollLeft(r, ht);
        scrollTop(r, ht);
        scrollLeft(c, ht);
        scrollTop(c, ht);
      };
      const onResized = t => {
        _ = 0;
        if (u) {
          i = a;
          n(true === t);
        }
      };
      const onScroll = t => {
        a = offsetSize(e);
        u = !t || !equalWH(a, i);
        if (t) {
          stopPropagation(t);
          if (u && !_) {
            d(_);
            _ = f(onResized);
          }
        } else {
          onResized(false === t);
        }
        reset();
      };
      const h = push([], [ on(r, gt, onScroll), on(c, gt, onScroll) ]);
      style(l, {
        width: ht,
        height: ht
      });
      f(reset);
      return [ o ? onScroll.bind(0, false) : reset, h ];
    }
  }
}))();

let pt = 0;

const {round: bt, abs: mt} = Math;

const getWindowDPR = () => {
  const t = window.screen.deviceXDPI || 0;
  const n = window.screen.logicalXDPI || 1;
  return window.devicePixelRatio || t / n;
};

const diffBiggerThanOne = (t, n) => {
  const o = mt(t);
  const s = mt(n);
  return !(o === s || o + 1 === s || o - 1 === s);
};

const yt = "__osScrollbarsHidingPlugin";

const St = /* @__PURE__ */ (() => ({
  [yt]: {
    T: t => {
      const {A: n, I: o, L: s} = t;
      const e = !s && !n && (o.x || o.y);
      const c = e ? document.createElement("style") : false;
      if (c) {
        attr(c, "id", `${H}-${pt}`);
        pt++;
      }
      return c;
    },
    H: (t, n, o, s, e, c, r) => {
      const arrangeViewport = (n, c, r, l) => {
        if (t) {
          const {P: t} = e();
          const {D: i, M: a} = n;
          const {x: u, y: d} = a;
          const {x: f, y: _} = i;
          const h = l ? "paddingRight" : "paddingLeft";
          const g = t[h];
          const v = t.paddingTop;
          const w = c.w + r.w;
          const p = c.h + r.h;
          const b = {
            w: _ && d ? `${_ + w - g}px` : "",
            h: f && u ? `${f + p - v}px` : ""
          };
          if (s) {
            const {sheet: t} = s;
            if (t) {
              const {cssRules: n} = t;
              if (n) {
                if (!n.length) {
                  t.insertRule(`#${attr(s, "id")} + .${H}::before {}`, 0);
                }
                const o = n[0].style;
                o.width = b.w;
                o.height = b.h;
              }
            }
          } else {
            style(o, {
              "--os-vaw": b.w,
              "--os-vah": b.h
            });
          }
        }
        return t;
      };
      const undoViewportArrange = (s, l, i) => {
        if (t) {
          const a = i || c(s);
          const {P: u} = e();
          const {M: d} = a;
          const {x: f, y: _} = d;
          const h = {};
          const assignProps = t => each(t.split(" "), (t => {
            h[t] = u[t];
          }));
          if (f) {
            assignProps("marginBottom paddingTop paddingBottom");
          }
          if (_) {
            assignProps("marginLeft marginRight paddingLeft paddingRight");
          }
          const g = style(o, keys(h));
          removeClass(o, H);
          if (!n) {
            h.height = "";
          }
          style(o, h);
          return [ () => {
            r(a, l, t, g);
            style(o, g);
            addClass(o, H);
          }, a ];
        }
        return [ noop ];
      };
      return [ arrangeViewport, undoViewportArrange ];
    },
    R: () => {
      let t = {
        w: 0,
        h: 0
      };
      let n = 0;
      return (o, s, e) => {
        const c = windowSize();
        const r = {
          w: c.w - t.w,
          h: c.h - t.h
        };
        if (0 === r.w && 0 === r.h) {
          return;
        }
        const l = {
          w: mt(r.w),
          h: mt(r.h)
        };
        const i = {
          w: mt(bt(c.w / (t.w / 100))),
          h: mt(bt(c.h / (t.h / 100)))
        };
        const a = getWindowDPR();
        const u = l.w > 2 && l.h > 2;
        const d = !diffBiggerThanOne(i.w, i.h);
        const f = a !== n && a > 0;
        const _ = u && d && f;
        if (_) {
          const [t, n] = s();
          assignDeep(o.k, t);
          if (n) {
            e();
          }
        }
        t = c;
        n = a;
      };
    }
  }
}))();

let xt;

const getNativeScrollbarSize = (t, n, o, s) => {
  appendChildren(t, n);
  const e = clientSize(n);
  const c = offsetSize(n);
  const r = fractionalSize(o);
  s && removeElements(n);
  return {
    x: c.h - e.h + r.h,
    y: c.w - e.w + r.w
  };
};

const getNativeScrollbarsHiding = t => {
  let n = false;
  const o = addClass(t, D);
  try {
    n = "none" === style(t, cssProperty("scrollbar-width")) || "none" === window.getComputedStyle(t, "::-webkit-scrollbar").getPropertyValue("display");
  } catch (s) {}
  o();
  return n;
};

const getRtlScrollBehavior = (t, n) => {
  const o = "hidden";
  style(t, {
    overflowX: o,
    overflowY: o,
    direction: "rtl"
  });
  scrollLeft(t, 0);
  const s = absoluteCoordinates(t);
  const e = absoluteCoordinates(n);
  scrollLeft(t, -999);
  const c = absoluteCoordinates(n);
  return {
    i: s.x === e.x,
    n: e.x !== c.x
  };
};

const getFlexboxGlue = (t, n) => {
  const o = addClass(t, x);
  const s = getBoundingClientRect(t);
  const e = getBoundingClientRect(n);
  const c = equalBCRWH(e, s, true);
  const r = addClass(t, $);
  const l = getBoundingClientRect(t);
  const i = getBoundingClientRect(n);
  const a = equalBCRWH(i, l, true);
  o();
  r();
  return c && a;
};

const createEnvironment = () => {
  const {body: t} = document;
  const n = createDOM(`<div class="${S}"><div></div></div>`);
  const o = n[0];
  const s = o.firstChild;
  const [e, , c] = createEventListenerHub();
  const [r, l] = createCache({
    o: getNativeScrollbarSize(t, o, s),
    u: equalXY
  }, getNativeScrollbarSize.bind(0, t, o, s, true));
  const [i] = l();
  const a = getNativeScrollbarsHiding(o);
  const u = {
    x: 0 === i.x,
    y: 0 === i.y
  };
  const d = {
    elements: {
      host: null,
      padding: !a,
      viewport: t => a && t === t.ownerDocument.body && t,
      content: false
    },
    scrollbars: {
      slot: true
    },
    cancel: {
      nativeScrollbarsOverlaid: false,
      body: null
    }
  };
  const f = assignDeep({}, y);
  const _ = {
    k: i,
    I: u,
    A: a,
    L: "-1" === style(o, "zIndex"),
    B: getRtlScrollBehavior(o, s),
    V: getFlexboxGlue(o, s),
    Y: t => e("_", t),
    j: assignDeep.bind(0, {}, d),
    q(t) {
      assignDeep(d, t);
    },
    F: assignDeep.bind(0, {}, f),
    G(t) {
      assignDeep(f, t);
    },
    N: assignDeep({}, d),
    X: assignDeep({}, f)
  };
  removeAttr(o, "style");
  removeElements(o);
  if (!a && (!u.x || !u.y)) {
    let t;
    window.addEventListener("resize", (() => {
      const n = getPlugins()[yt];
      t = t || n && n.R();
      t && t(_, r, c.bind(0, "_"));
    }));
  }
  return _;
};

const getEnvironment = () => {
  if (!xt) {
    xt = createEnvironment();
  }
  return xt;
};

const resolveInitialization = (t, n) => isFunction(t) ? t.apply(0, n) : t;

const staticInitializationElement = (t, n, o, s) => {
  const e = isUndefined(s) ? o : s;
  const c = resolveInitialization(e, t);
  return c || n();
};

const dynamicInitializationElement = (t, n, o, s) => {
  const e = isUndefined(s) ? o : s;
  const c = resolveInitialization(e, t);
  return !!c && (isHTMLElement(c) ? c : n());
};

const cancelInitialization = (t, n) => {
  const {nativeScrollbarsOverlaid: o, body: s} = t || {};
  const {U: e} = n;
  const {j: c, I: r, A: l} = getEnvironment();
  const {nativeScrollbarsOverlaid: i, body: a} = c().cancel;
  const u = null != o ? o : i;
  const d = isUndefined(s) ? a : s;
  const f = (r.x || r.y) && u;
  const _ = e && (isNull(d) ? !l : d);
  return !!f || !!_;
};

const $t = new WeakMap;

const addInstance = (t, n) => {
  $t.set(t, n);
};

const removeInstance = t => {
  $t.delete(t);
};

const getInstance = t => $t.get(t);

const getPropByPath = (t, n) => t ? n.split(".").reduce(((t, n) => t && hasOwnProperty(t, n) ? t[n] : void 0), t) : void 0;

const createOptionCheck = (t, n, o) => s => [ getPropByPath(t, s), o || void 0 !== getPropByPath(n, s) ];

const createState = t => {
  let n = t;
  return [ () => n, t => {
    n = assignDeep({}, n, t);
  } ];
};

const Ct = "tabindex";

const Ot = createDiv.bind(0, "");

const unwrap = t => {
  appendChildren(parent(t), contents(t));
  removeElements(t);
};

const addDataAttrHost = (t, n) => {
  attr(t, C, n);
  return removeAttr.bind(0, t, C);
};

const createStructureSetupElements = t => {
  const n = getEnvironment();
  const {j: o, A: s} = n;
  const e = getPlugins()[yt];
  const c = e && e.T;
  const {elements: r} = o();
  const {host: l, viewport: i, padding: a, content: u} = r;
  const d = isHTMLElement(t);
  const f = d ? {} : t;
  const {elements: _} = f;
  const {host: h, padding: g, viewport: v, content: w} = _ || {};
  const p = d ? t : f.target;
  const b = is(p, "textarea");
  const m = p.ownerDocument;
  const y = p === m.body;
  const S = m.defaultView;
  const x = staticInitializationElement.bind(0, [ p ]);
  const $ = dynamicInitializationElement.bind(0, [ p ]);
  const E = x(Ot, i, v);
  const A = E === p;
  const z = A && y;
  const H = m.activeElement;
  const M = !A && S.top === S && H === p;
  const R = {
    W: p,
    J: b ? x(Ot, l, h) : p,
    K: E,
    Z: !A && $(Ot, a, g),
    tt: !A && $(Ot, u, w),
    nt: !A && !s && c && c(n),
    ot: z ? m.documentElement : E,
    st: z ? m : E,
    et: S,
    ct: m,
    rt: b,
    U: y,
    lt: d,
    it: A,
    ut: (t, n) => A ? hasAttrClass(E, C, n) : hasClass(E, t),
    dt: (t, n, o) => A ? attrClass(E, C, n, o) : (o ? addClass : removeClass)(E, t)
  };
  const k = keys(R).reduce(((t, n) => {
    const o = R[n];
    return push(t, o && !parent(o) ? o : false);
  }), []);
  const elementIsGenerated = t => t ? indexOf(k, t) > -1 : null;
  const {W: B, J: V, Z: Y, K: j, tt: q, nt: F} = R;
  const G = [];
  const N = b && elementIsGenerated(V);
  let X = b ? B : contents([ q, j, Y, V, B ].find((t => false === elementIsGenerated(t))));
  const U = q || j;
  const appendElements = () => {
    const t = addDataAttrHost(V, A ? "viewport" : "host");
    const n = addClass(Y, I);
    const o = addClass(j, !A && L);
    const e = addClass(q, P);
    const c = y ? addClass(parent(p), D) : noop;
    if (N) {
      insertAfter(B, V);
      push(G, (() => {
        insertAfter(V, B);
        removeElements(V);
      }));
    }
    appendChildren(U, X);
    appendChildren(V, Y);
    appendChildren(Y || V, !A && j);
    appendChildren(j, q);
    push(G, (() => {
      c();
      t();
      removeAttr(j, O);
      removeAttr(j, T);
      if (elementIsGenerated(q)) {
        unwrap(q);
      }
      if (elementIsGenerated(j)) {
        unwrap(j);
      }
      if (elementIsGenerated(Y)) {
        unwrap(Y);
      }
      n();
      o();
      e();
    }));
    if (s && !A) {
      push(G, removeClass.bind(0, j, D));
    }
    if (F) {
      insertBefore(j, F);
      push(G, removeElements.bind(0, F));
    }
    if (M) {
      const t = attr(j, Ct);
      attr(j, Ct, "-1");
      j.focus();
      const n = on(m, "pointerdown keydown", (() => {
        t ? attr(j, Ct, t) : removeAttr(j, Ct);
        n();
      }));
    } else if (H && H.focus) {
      H.focus();
    }
    X = 0;
  };
  return [ R, appendElements, runEachAndClear.bind(0, G) ];
};

const createTrinsicUpdateSegment = (t, n) => {
  const {tt: o} = t;
  const [s] = n;
  return t => {
    const {V: n} = getEnvironment();
    const {ft: e} = s();
    const {_t: c} = t;
    const r = (o || !n) && c;
    if (r) {
      style(o, {
        height: e ? "" : "100%"
      });
    }
    return {
      ht: r,
      gt: r
    };
  };
};

const createPaddingUpdateSegment = (t, n) => {
  const [o, s] = n;
  const {J: e, Z: c, K: r, it: l} = t;
  const [i, a] = createCache({
    u: equalTRBL,
    o: topRightBottomLeft()
  }, topRightBottomLeft.bind(0, e, "padding", ""));
  return (t, n, e) => {
    let [u, d] = a(e);
    const {A: f, V: _} = getEnvironment();
    const {vt: h} = o();
    const {ht: g, gt: v, wt: w} = t;
    const [p, b] = n("paddingAbsolute");
    const m = !_ && v;
    if (g || d || m) {
      [u, d] = i(e);
    }
    const y = !l && (b || w || d);
    if (y) {
      const t = !p || !c && !f;
      const n = u.r + u.l;
      const o = u.t + u.b;
      const e = {
        marginRight: t && !h ? -n : 0,
        marginBottom: t ? -o : 0,
        marginLeft: t && h ? -n : 0,
        top: t ? -u.t : 0,
        right: t ? h ? -u.r : "auto" : 0,
        left: t ? h ? "auto" : -u.l : 0,
        width: t ? `calc(100% + ${n}px)` : ""
      };
      const l = {
        paddingTop: t ? u.t : 0,
        paddingRight: t ? u.r : 0,
        paddingBottom: t ? u.b : 0,
        paddingLeft: t ? u.l : 0
      };
      style(c || r, e);
      style(r, l);
      s({
        Z: u,
        bt: !t,
        P: c ? l : assignDeep({}, e, l)
      });
    }
    return {
      yt: y
    };
  };
};

const {max: Tt} = Math;

const Et = Tt.bind(0, 0);

const At = "visible";

const zt = "hidden";

const It = 42;

const Lt = {
  u: equalWH,
  o: {
    w: 0,
    h: 0
  }
};

const Ht = {
  u: equalXY,
  o: {
    x: zt,
    y: zt
  }
};

const getOverflowAmount = (t, n) => {
  const o = window.devicePixelRatio % 1 !== 0 ? 1 : 0;
  const s = {
    w: Et(t.w - n.w),
    h: Et(t.h - n.h)
  };
  return {
    w: s.w > o ? s.w : 0,
    h: s.h > o ? s.h : 0
  };
};

const conditionalClass = (t, n, o) => o ? addClass(t, n) : removeClass(t, n);

const overflowIsVisible = t => 0 === t.indexOf(At);

const createOverflowUpdateSegment = (t, n) => {
  const [o, s] = n;
  const {J: e, Z: c, K: r, nt: l, it: i, dt: a, U: u, et: d} = t;
  const {k: f, V: _, A: h, I: g} = getEnvironment();
  const v = getPlugins()[yt];
  const w = !i && !h && (g.x || g.y);
  const p = u && i;
  const [b, m] = createCache(Lt, fractionalSize.bind(0, r));
  const [y, S] = createCache(Lt, scrollSize.bind(0, r));
  const [x, $] = createCache(Lt);
  const [z, I] = createCache(Lt);
  const [L] = createCache(Ht);
  const fixFlexboxGlue = (t, n) => {
    style(r, {
      height: ""
    });
    if (n) {
      const {bt: n, Z: s} = o();
      const {St: c, D: l} = t;
      const i = fractionalSize(e);
      const a = clientSize(e);
      const u = "content-box" === style(r, "boxSizing");
      const d = n || u ? s.b + s.t : 0;
      const f = !(g.x && u);
      style(r, {
        height: a.h + i.h + (c.x && f ? l.x : 0) - d
      });
    }
  };
  const getViewportOverflowState = (t, n) => {
    const o = !h && !t ? It : 0;
    const getStatePerAxis = (t, s, e) => {
      const c = style(r, t);
      const l = n ? n[t] : c;
      const i = "scroll" === l;
      const a = s ? o : e;
      const u = i && !h ? a : 0;
      const d = s && !!o;
      return [ c, i, u, d ];
    };
    const [s, e, c, l] = getStatePerAxis("overflowX", g.x, f.x);
    const [i, a, u, d] = getStatePerAxis("overflowY", g.y, f.y);
    return {
      xt: {
        x: s,
        y: i
      },
      St: {
        x: e,
        y: a
      },
      D: {
        x: c,
        y: u
      },
      M: {
        x: l,
        y: d
      }
    };
  };
  const setViewportOverflowState = (t, n, o, s) => {
    const setAxisOverflowStyle = (t, n) => {
      const o = overflowIsVisible(t);
      const s = n && o && t.replace(`${At}-`, "") || "";
      return [ n && !o ? t : "", overflowIsVisible(s) ? "hidden" : s ];
    };
    const [e, c] = setAxisOverflowStyle(o.x, n.x);
    const [r, l] = setAxisOverflowStyle(o.y, n.y);
    s.overflowX = c && r ? c : e;
    s.overflowY = l && e ? l : r;
    return getViewportOverflowState(t, s);
  };
  const hideNativeScrollbars = (t, n, s, e) => {
    const {D: c, M: r} = t;
    const {x: l, y: i} = r;
    const {x: a, y: u} = c;
    const {P: d} = o();
    const f = n ? "marginLeft" : "marginRight";
    const _ = n ? "paddingLeft" : "paddingRight";
    const h = d[f];
    const g = d.marginBottom;
    const v = d[_];
    const w = d.paddingBottom;
    e.width = `calc(100% + ${u + -1 * h}px)`;
    e[f] = -u + h;
    e.marginBottom = -a + g;
    if (s) {
      e[_] = v + (i ? u : 0);
      e.paddingBottom = w + (l ? a : 0);
    }
  };
  const [H, P] = v ? v.H(w, _, r, l, o, getViewportOverflowState, hideNativeScrollbars) : [ () => w, () => [ noop ] ];
  return (t, n, l) => {
    const {ht: u, $t: f, gt: v, yt: w, _t: R, wt: k} = t;
    const {ft: B, vt: V} = o();
    const [Y, j] = n("showNativeOverlaidScrollbars");
    const [q, F] = n("overflow");
    const G = Y && g.x && g.y;
    const N = !i && !_ && (u || v || f || j || R);
    const X = overflowIsVisible(q.x);
    const U = overflowIsVisible(q.y);
    const W = X || U;
    let J = m(l);
    let K = S(l);
    let Z = $(l);
    let Q = I(l);
    let tt;
    if (j && h) {
      a(D, A, !G);
    }
    if (N) {
      tt = getViewportOverflowState(G);
      fixFlexboxGlue(tt, B);
    }
    if (u || w || v || k || j) {
      if (W) {
        a(M, E, false);
      }
      const [t, n] = P(G, V, tt);
      const [o, s] = J = b(l);
      const [e, c] = K = y(l);
      const i = clientSize(r);
      let u = e;
      let f = i;
      t();
      if ((c || s || j) && n && !G && H(n, e, o, V)) {
        f = clientSize(r);
        u = scrollSize(r);
      }
      const _ = {
        w: Et(Tt(e.w, u.w) + o.w),
        h: Et(Tt(e.h, u.h) + o.h)
      };
      const h = {
        w: Et(p ? d.innerWidth : f.w + Et(i.w - e.w) + o.w),
        h: Et(p ? d.innerHeight : f.h + Et(i.h - e.h) + o.h)
      };
      Q = z(h);
      Z = x(getOverflowAmount(_, h), l);
    }
    const [nt, ot] = Q;
    const [st, et] = Z;
    const [ct, rt] = K;
    const [lt, it] = J;
    const at = {
      x: st.w > 0,
      y: st.h > 0
    };
    const ut = X && U && (at.x || at.y) || X && at.x && !at.y || U && at.y && !at.x;
    if (w || k || it || rt || ot || et || F || j || N) {
      const t = {
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        width: "",
        overflowY: "",
        overflowX: ""
      };
      const n = setViewportOverflowState(G, at, q, t);
      const o = H(n, ct, lt, V);
      if (!i) {
        hideNativeScrollbars(n, V, o, t);
      }
      if (N) {
        fixFlexboxGlue(n, B);
      }
      if (i) {
        attr(e, O, t.overflowX);
        attr(e, T, t.overflowY);
      } else {
        style(r, t);
      }
    }
    attrClass(e, C, E, ut);
    conditionalClass(c, M, ut);
    !i && conditionalClass(r, M, W);
    const [dt, ft] = L(getViewportOverflowState(G).xt);
    s({
      xt: dt,
      Ct: {
        x: nt.w,
        y: nt.h
      },
      Ot: {
        x: st.w,
        y: st.h
      },
      Tt: at
    });
    return {
      Et: ft,
      At: ot,
      zt: et
    };
  };
};

const prepareUpdateHints = (t, n, o) => {
  const s = {};
  const e = n || {};
  const c = keys(t).concat(keys(e));
  each(c, (n => {
    const c = t[n];
    const r = e[n];
    s[n] = !!(o || c || r);
  }));
  return s;
};

const createStructureSetupUpdate = (t, n) => {
  const {W: o, K: s, dt: e, it: c} = t;
  const {A: r, I: l, V: i} = getEnvironment();
  const a = !r && (l.x || l.y);
  const u = [ createTrinsicUpdateSegment(t, n), createPaddingUpdateSegment(t, n), createOverflowUpdateSegment(t, n) ];
  return (t, n, r) => {
    const l = prepareUpdateHints(assignDeep({
      ht: false,
      yt: false,
      wt: false,
      _t: false,
      At: false,
      zt: false,
      Et: false,
      $t: false,
      gt: false
    }, n), {}, r);
    const d = a || !i;
    const f = d && scrollLeft(s);
    const _ = d && scrollTop(s);
    e("", z, true);
    let h = l;
    each(u, (n => {
      h = prepareUpdateHints(h, n(h, t, !!r) || {}, r);
    }));
    scrollLeft(s, f);
    scrollTop(s, _);
    e("", z);
    if (!c) {
      scrollLeft(o, 0);
      scrollTop(o, 0);
    }
    return h;
  };
};

const Pt = 3333333;

const domRectHasDimensions = t => t && (t.height || t.width);

const createSizeObserver = (t, n, o) => {
  const {It: s = false, Lt: e = false} = o || {};
  const c = getPlugins()[vt];
  const {B: r} = getEnvironment();
  const l = createDOM(`<div class="${R}"><div class="${B}"></div></div>`);
  const i = l[0];
  const a = i.firstChild;
  const d = directionIsRTL.bind(0, t);
  const [f] = createCache({
    o: void 0,
    _: true,
    u: (t, n) => !(!t || !domRectHasDimensions(t) && domRectHasDimensions(n))
  });
  const onSizeChangedCallbackProxy = t => {
    const o = isArray(t) && t.length > 0 && isObject(t[0]);
    const e = !o && isBoolean(t[0]);
    let c = false;
    let l = false;
    let a = true;
    if (o) {
      const [n, , o] = f(t.pop().contentRect);
      const s = domRectHasDimensions(n);
      const e = domRectHasDimensions(o);
      c = !o || !s;
      l = !e && s;
      a = !c;
    } else if (e) {
      [, a] = t;
    } else {
      l = true === t;
    }
    if (s && a) {
      const n = e ? t[0] : directionIsRTL(i);
      scrollLeft(i, n ? r.n ? -Pt : r.i ? 0 : Pt : Pt);
      scrollTop(i, Pt);
    }
    if (!c) {
      n({
        ht: !e,
        Ht: e ? t : void 0,
        Lt: !!l
      });
    }
  };
  const _ = [];
  let h = e ? onSizeChangedCallbackProxy : false;
  return [ () => {
    runEachAndClear(_);
    removeElements(i);
  }, () => {
    if (u) {
      const t = new u(onSizeChangedCallbackProxy);
      t.observe(a);
      push(_, (() => {
        t.disconnect();
      }));
    } else if (c) {
      const [t, n] = c.O(a, onSizeChangedCallbackProxy, e);
      h = t;
      push(_, n);
    }
    if (s) {
      const [t] = createCache({
        o: !d()
      }, d);
      push(_, on(i, "scroll", (n => {
        const o = t();
        const [s, e] = o;
        if (e) {
          removeClass(a, "ltr rtl");
          if (s) {
            addClass(a, "rtl");
          } else {
            addClass(a, "ltr");
          }
          onSizeChangedCallbackProxy(o);
        }
        stopPropagation(n);
      })));
    }
    if (h) {
      addClass(i, k);
      push(_, on(i, "animationstart", h, {
        C: !!u
      }));
    }
    appendChildren(t, i);
  } ];
};

const isHeightIntrinsic = t => 0 === t.h || t.isIntersecting || t.intersectionRatio > 0;

const createTrinsicObserver = (t, n) => {
  let o;
  const s = createDiv(q);
  const e = [];
  const [c] = createCache({
    o: false
  });
  const triggerOnTrinsicChangedCallback = (t, o) => {
    if (t) {
      const s = c(isHeightIntrinsic(t));
      const [, e] = s;
      if (e) {
        !o && n(s);
        return [ s ];
      }
    }
  };
  const intersectionObserverCallback = (t, n) => {
    if (t && t.length > 0) {
      return triggerOnTrinsicChangedCallback(t.pop(), n);
    }
  };
  return [ () => {
    runEachAndClear(e);
    removeElements(s);
  }, () => {
    if (a) {
      o = new a((t => intersectionObserverCallback(t)), {
        root: t
      });
      o.observe(s);
      push(e, (() => {
        o.disconnect();
      }));
    } else {
      const onSizeChanged = () => {
        const t = offsetSize(s);
        triggerOnTrinsicChangedCallback(t);
      };
      const [t, n] = createSizeObserver(s, onSizeChanged);
      push(e, t);
      n();
      onSizeChanged();
    }
    appendChildren(t, s);
  }, () => {
    if (o) {
      return intersectionObserverCallback(o.takeRecords(), true);
    }
  } ];
};

const createEventContentChange = (t, n, o) => {
  let s;
  let e = false;
  const destroy = () => {
    e = true;
  };
  const updateElements = c => {
    if (o) {
      const r = o.reduce(((n, o) => {
        if (o) {
          const s = o[0];
          const e = o[1];
          const r = e && s && (c ? c(s) : find(s, t));
          if (r && r.length && e && isString(e)) {
            push(n, [ r, e.trim() ], true);
          }
        }
        return n;
      }), []);
      each(r, (t => each(t[0], (o => {
        const c = t[1];
        const r = s.get(o);
        if (r) {
          const t = r[0];
          const n = r[1];
          if (t === c) {
            n();
          }
        }
        const l = on(o, c, (t => {
          if (e) {
            l();
            s.delete(o);
          } else {
            n(t);
          }
        }));
        s.set(o, [ c, l ]);
      }))));
    }
  };
  if (o) {
    s = new WeakMap;
    updateElements();
  }
  return [ destroy, updateElements ];
};

const createDOMObserver = (t, n, o, s) => {
  let e = false;
  const {Pt: c, Dt: r, Mt: l, Rt: a, kt: u, Bt: d} = s || {};
  const f = debounce((() => {
    if (e) {
      o(true);
    }
  }), {
    g: 33,
    v: 99
  });
  const [_, h] = createEventContentChange(t, f, l);
  const g = c || [];
  const v = r || [];
  const w = g.concat(v);
  const observerCallback = (e, c) => {
    const r = u || noop;
    const l = d || noop;
    const i = [];
    const f = [];
    let _ = false;
    let g = false;
    let w = false;
    each(e, (o => {
      const {attributeName: e, target: c, type: u, oldValue: d, addedNodes: h} = o;
      const p = "attributes" === u;
      const b = "childList" === u;
      const m = t === c;
      const y = p && isString(e) ? attr(c, e) : 0;
      const S = 0 !== y && d !== y;
      const x = indexOf(v, e) > -1 && S;
      if (n && !m) {
        const n = !p;
        const i = p && x;
        const u = i && a && is(c, a);
        const _ = u ? !r(c, e, d, y) : n || i;
        const v = _ && !l(o, !!u, t, s);
        push(f, h);
        g = g || v;
        w = w || b;
      }
      if (!n && m && S && !r(c, e, d, y)) {
        push(i, e);
        _ = _ || x;
      }
    }));
    if (w && !isEmptyArray(f)) {
      h((t => f.reduce(((n, o) => {
        push(n, find(t, o));
        return is(o, t) ? push(n, o) : n;
      }), [])));
    }
    if (n) {
      !c && g && o(false);
      return [ false ];
    }
    if (!isEmptyArray(i) || _) {
      !c && o(i, _);
      return [ i, _ ];
    }
  };
  const p = new i((t => observerCallback(t)));
  p.observe(t, {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: w,
    subtree: n,
    childList: n,
    characterData: n
  });
  e = true;
  return [ () => {
    if (e) {
      _();
      p.disconnect();
      e = false;
    }
  }, () => {
    if (e) {
      f.m();
      const t = p.takeRecords();
      return !isEmptyArray(t) && observerCallback(t, true);
    }
  } ];
};

const Dt = `[${C}]`;

const Mt = `.${L}`;

const Rt = [ "tabindex" ];

const kt = [ "wrap", "cols", "rows" ];

const Bt = [ "id", "class", "style", "open" ];

const createStructureSetupObservers = (t, n, o) => {
  let s;
  let e;
  let c;
  const [, r] = n;
  const {J: l, K: i, tt: a, rt: d, it: f, ut: _, dt: h} = t;
  const {V: g} = getEnvironment();
  const [v] = createCache({
    u: equalWH,
    o: {
      w: 0,
      h: 0
    }
  }, (() => {
    const t = _(M, E);
    const n = _(H, "");
    const o = n && scrollLeft(i);
    const s = n && scrollTop(i);
    h(M, E);
    h(H, "");
    h("", z, true);
    const e = scrollSize(a);
    const c = scrollSize(i);
    const r = fractionalSize(i);
    h(M, E, t);
    h(H, "", n);
    h("", z);
    scrollLeft(i, o);
    scrollTop(i, s);
    return {
      w: c.w + e.w + r.w,
      h: c.h + e.h + r.h
    };
  }));
  const w = d ? kt : Bt.concat(kt);
  const p = debounce(o, {
    g: () => s,
    v: () => e,
    p(t, n) {
      const [o] = t;
      const [s] = n;
      return [ keys(o).concat(keys(s)).reduce(((t, n) => {
        t[n] = o[n] || s[n];
        return t;
      }), {}) ];
    }
  });
  const updateViewportAttrsFromHost = t => {
    each(t || Rt, (t => {
      if (indexOf(Rt, t) > -1) {
        const n = attr(l, t);
        if (isString(n)) {
          attr(i, t, n);
        } else {
          removeAttr(i, t);
        }
      }
    }));
  };
  const onTrinsicChanged = (t, n) => {
    const [s, e] = t;
    const c = {
      _t: e
    };
    r({
      ft: s
    });
    !n && o(c);
    return c;
  };
  const onSizeChanged = ({ht: t, Ht: n, Lt: s}) => {
    const e = !t || s ? o : p;
    let c = false;
    if (n) {
      const [t, o] = n;
      c = o;
      r({
        vt: t
      });
    }
    e({
      ht: t,
      wt: c
    });
  };
  const onContentMutation = (t, n) => {
    const [, s] = v();
    const e = {
      gt: s
    };
    const c = t ? o : p;
    if (s) {
      !n && c(e);
    }
    return e;
  };
  const onHostMutation = (t, n, o) => {
    const s = {
      $t: n
    };
    if (n) {
      !o && p(s);
    } else if (!f) {
      updateViewportAttrsFromHost(t);
    }
    return s;
  };
  const [b, m, y] = a || !g ? createTrinsicObserver(l, onTrinsicChanged) : [ noop, noop, noop ];
  const [S, x] = !f ? createSizeObserver(l, onSizeChanged, {
    Lt: true,
    It: true
  }) : [ noop, noop ];
  const [$, C] = createDOMObserver(l, false, onHostMutation, {
    Dt: Bt,
    Pt: Bt.concat(Rt)
  });
  const O = f && u && new u(onSizeChanged.bind(0, {
    ht: true
  }));
  O && O.observe(l);
  updateViewportAttrsFromHost();
  return [ () => {
    b();
    S();
    c && c[0]();
    O && O.disconnect();
    $();
  }, () => {
    x();
    m();
  }, () => {
    const t = {};
    const n = C();
    const o = y();
    const s = c && c[1]();
    if (n) {
      assignDeep(t, onHostMutation.apply(0, push(n, true)));
    }
    if (o) {
      assignDeep(t, onTrinsicChanged.apply(0, push(o, true)));
    }
    if (s) {
      assignDeep(t, onContentMutation.apply(0, push(s, true)));
    }
    return t;
  }, t => {
    const [n] = t("update.ignoreMutation");
    const [o, r] = t("update.attributes");
    const [l, u] = t("update.elementEvents");
    const [d, _] = t("update.debounce");
    const h = u || r;
    const ignoreMutationFromOptions = t => isFunction(n) && n(t);
    if (h) {
      if (c) {
        c[1]();
        c[0]();
      }
      c = createDOMObserver(a || i, true, onContentMutation, {
        Dt: w.concat(o || []),
        Pt: w.concat(o || []),
        Mt: l,
        Rt: Dt,
        Bt: (t, n) => {
          const {target: o, attributeName: s} = t;
          const e = !n && s && !f ? liesBetween(o, Dt, Mt) : false;
          return e || !!closest(o, `.${F}`) || !!ignoreMutationFromOptions(t);
        }
      });
    }
    if (_) {
      p.m();
      if (isArray(d)) {
        const t = d[0];
        const n = d[1];
        s = isNumber(t) && t;
        e = isNumber(n) && n;
      } else if (isNumber(d)) {
        s = d;
        e = false;
      } else {
        s = false;
        e = false;
      }
    }
  } ];
};

const Vt = {
  x: 0,
  y: 0
};

const Yt = {
  Z: {
    t: 0,
    r: 0,
    b: 0,
    l: 0
  },
  bt: false,
  P: {
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0
  },
  Ct: Vt,
  Ot: Vt,
  xt: {
    x: "hidden",
    y: "hidden"
  },
  Tt: {
    x: false,
    y: false
  },
  ft: false,
  vt: false
};

const createStructureSetup = (t, n) => {
  const o = createOptionCheck(n, {});
  const s = createState(Yt);
  const [e, c, r] = createEventListenerHub();
  const [l] = s;
  const [i, a, u] = createStructureSetupElements(t);
  const d = createStructureSetupUpdate(i, s);
  const triggerUpdateEvent = (t, n, o) => {
    const s = keys(t).some((n => t[n]));
    if (s || !isEmptyObject(n) || o) {
      r("u", [ t, n, o ]);
    }
  };
  const [f, _, h, g] = createStructureSetupObservers(i, s, (t => {
    triggerUpdateEvent(d(o, t), {}, false);
  }));
  const v = l.bind(0);
  v.Vt = t => {
    e("u", t);
  };
  v.Yt = () => {
    const {W: t, K: n} = i;
    const o = scrollLeft(t);
    const s = scrollTop(t);
    _();
    a();
    scrollLeft(n, o);
    scrollTop(n, s);
  };
  v.jt = i;
  return [ (t, o) => {
    const s = createOptionCheck(n, t, o);
    g(s);
    triggerUpdateEvent(d(s, h(), o), t, !!o);
  }, v, () => {
    c();
    f();
    u();
  } ];
};

const {round: jt, max: qt, sign: Ft} = Math;

const animationCurrentTime = () => performance.now();

const animateNumber = (t, n, o, s) => {
  let e = 0;
  const c = animationCurrentTime();
  const frame = () => {
    const r = animationCurrentTime();
    const l = r - c;
    const i = l >= o;
    const a = 1 - (qt(0, c + o - r) / o || 0);
    const u = (n - t) * a + t;
    const d = i || 1 === a;
    s(u, d);
    e = d ? 0 : f(frame);
  };
  frame();
  return () => d(e);
};

const getScale = t => {
  const {width: n, height: o} = getBoundingClientRect(t);
  const {w: s, h: e} = offsetSize(t);
  return {
    x: jt(n) / s || 1,
    y: jt(o) / e || 1
  };
};

const continuePointerDown = (t, n, o) => {
  const s = n.scrollbars;
  const {button: e, isPrimary: c, pointerType: r} = t;
  const {pointers: l} = s;
  return 0 === e && c && s[o ? "dragScroll" : "clickScroll"] && (l || []).includes(r);
};

const createRootClickStopPropagationEvents = (t, n) => on(t, "mousedown", on.bind(0, n, "click", stopPropagation, {
  C: true,
  $: true
}), {
  $: true
});

const createInteractiveScrollEvents = (t, n, o, s, e, c) => {
  const {B: r} = getEnvironment();
  const {qt: l, Ft: i, Gt: a} = o;
  const u = `scroll${c ? "Left" : "Top"}`;
  const d = c ? "width" : "height";
  const f = c ? "w" : "h";
  const _ = c ? "x" : "y";
  const getHandleOffset = (t, n) => t[_] - n[_];
  const createRelativeHandleMove = (t, n) => o => {
    const {Ot: d} = e();
    const h = offsetSize(i)[f] - offsetSize(l)[f];
    const g = n * o / h;
    const v = g * d[_];
    const w = directionIsRTL(a);
    const p = w && c ? r.n || r.i ? 1 : -1 : 1;
    s[u] = t + v * p;
  };
  return on(i, "pointerdown", (o => {
    const e = closest(o.target, `.${W}`) === l;
    if (continuePointerDown(o, t, e)) {
      const t = !e && o.shiftKey;
      const c = createRelativeHandleMove(s[u] || 0, 1 / getScale(s)[_]);
      const r = o[_];
      const a = getBoundingClientRect(l);
      const f = getBoundingClientRect(i);
      const h = a[d];
      const g = getHandleOffset(a, f) + h / 2;
      const v = r - f[_];
      const w = e ? 0 : v - g;
      const p = [ on(n, "selectstart", (t => preventDefault(t)), {
        S: false
      }), on(i, "pointermove", (n => {
        const o = n[_] - r;
        if (e || t) {
          c(w + o);
        }
      })) ];
      if (t) {
        c(w);
      } else if (!e) {
        let t = 0;
        let n = noop;
        const animateClickScroll = o => {
          n = animateNumber(o, o + h * Ft(w), 133, ((o, s) => {
            c(o);
            const e = getHandleOffset(getBoundingClientRect(l), f);
            const r = e + h;
            const i = v >= e && v <= r;
            if (s && !i) {
              if (t) {
                animateClickScroll(o);
              } else {
                const t = setTimeout((() => {
                  animateClickScroll(o);
                }), 222);
                n = () => {
                  clearTimeout(t);
                };
              }
              t++;
            }
          }));
        };
        animateClickScroll(0);
        push(p, (() => n()));
      }
      on(i, "pointerup", (t => {
        runEachAndClear(p);
        i.releasePointerCapture(t.pointerId);
      }), {
        C: true
      });
      i.setPointerCapture(o.pointerId);
    }
  }));
};

const createScrollbarsSetupEvents = (t, n) => (o, s, e, c, r, l) => {
  const {Gt: i} = o;
  const [a, u] = selfCancelTimeout(333);
  const d = !!r.scrollBy;
  let f = true;
  return runEachAndClear.bind(0, [ on(i, "pointerenter", (() => {
    s(Q, true);
  })), on(i, "pointerleave pointercancel", (() => {
    s(Q);
  })), on(i, "wheel", (t => {
    const {deltaX: n, deltaY: o, deltaMode: e} = t;
    if (d && f && 0 === e && parent(i) === c) {
      r.scrollBy({
        left: n,
        top: o,
        behavior: "smooth"
      });
    }
    f = false;
    s(ot, true);
    a((() => {
      f = true;
      s(ot);
    }));
    preventDefault(t);
  }), {
    S: false,
    $: true
  }), createRootClickStopPropagationEvents(i, e), createInteractiveScrollEvents(t, e, o, r, n, l), u ]);
};

const {min: Gt, max: Nt, abs: Xt, round: Ut} = Math;

const getScrollbarHandleLengthRatio = (t, n, o, s) => {
  if (s) {
    const t = o ? "x" : "y";
    const {Ot: n, Ct: e} = s;
    const c = e[t];
    const r = n[t];
    return Nt(0, Gt(1, c / (c + r)));
  }
  const e = o ? "w" : "h";
  const c = offsetSize(t)[e];
  const r = offsetSize(n)[e];
  return Nt(0, Gt(1, c / r));
};

const getScrollbarHandleOffsetRatio = (t, n, o, s, e, c) => {
  const {B: r} = getEnvironment();
  const l = c ? "x" : "y";
  const i = c ? "Left" : "Top";
  const {Ot: a} = s;
  const u = Ut(a[l]);
  const d = Xt(o[`scroll${i}`]);
  const f = c && e;
  const _ = r.i ? d : u - d;
  const h = f ? _ : d;
  const g = Gt(1, h / u);
  const v = getScrollbarHandleLengthRatio(t, n, c);
  return 1 / v * (1 - v) * g;
};

const createScrollbarsSetupElements = (t, n, o) => {
  const {j: s} = getEnvironment();
  const {scrollbars: e} = s();
  const {slot: c} = e;
  const {ct: r, W: l, J: i, K: a, lt: u, ot: d} = n;
  const {scrollbars: f} = u ? {} : t;
  const {slot: h} = f || {};
  const g = dynamicInitializationElement([ l, i, a ], (() => i), c, h);
  const scrollbarStructureAddRemoveClass = (t, n, o) => {
    const s = o ? addClass : removeClass;
    each(t, (t => {
      s(t.Gt, n);
    }));
  };
  const scrollbarsHandleStyle = (t, n) => {
    each(t, (t => {
      const [o, s] = n(t);
      style(o, s);
    }));
  };
  const scrollbarStructureRefreshHandleLength = (t, n, o) => {
    scrollbarsHandleStyle(t, (t => {
      const {qt: s, Ft: e} = t;
      return [ s, {
        [o ? "width" : "height"]: `${(100 * getScrollbarHandleLengthRatio(s, e, o, n)).toFixed(3)}%`
      } ];
    }));
  };
  const scrollbarStructureRefreshHandleOffset = (t, n, o) => {
    const s = o ? "X" : "Y";
    scrollbarsHandleStyle(t, (t => {
      const {qt: e, Ft: c, Gt: r} = t;
      const l = getScrollbarHandleOffsetRatio(e, c, d, n, directionIsRTL(r), o);
      const i = l === l;
      return [ e, {
        transform: i ? `translate${s}(${(100 * l).toFixed(3)}%)` : ""
      } ];
    }));
  };
  const v = [];
  const w = [];
  const p = [];
  const scrollbarsAddRemoveClass = (t, n, o) => {
    const s = isBoolean(o);
    const e = s ? o : true;
    const c = s ? !o : true;
    e && scrollbarStructureAddRemoveClass(w, t, n);
    c && scrollbarStructureAddRemoveClass(p, t, n);
  };
  const refreshScrollbarsHandleLength = t => {
    scrollbarStructureRefreshHandleLength(w, t, true);
    scrollbarStructureRefreshHandleLength(p, t);
  };
  const refreshScrollbarsHandleOffset = t => {
    scrollbarStructureRefreshHandleOffset(w, t, true);
    scrollbarStructureRefreshHandleOffset(p, t);
  };
  const generateScrollbarDOM = t => {
    const n = t ? N : X;
    const s = t ? w : p;
    const e = isEmptyArray(s) ? Z : "";
    const c = createDiv(`${F} ${n} ${e}`);
    const l = createDiv(U);
    const a = createDiv(W);
    const u = {
      Gt: c,
      Ft: l,
      qt: a
    };
    appendChildren(c, l);
    appendChildren(l, a);
    push(s, u);
    push(v, [ removeElements.bind(0, c), o(u, scrollbarsAddRemoveClass, r, i, d, t) ]);
    return u;
  };
  const b = generateScrollbarDOM.bind(0, true);
  const m = generateScrollbarDOM.bind(0, false);
  const appendElements = () => {
    appendChildren(g, w[0].Gt);
    appendChildren(g, p[0].Gt);
    _((() => {
      scrollbarsAddRemoveClass(Z);
    }), 300);
  };
  b();
  m();
  return [ {
    Nt: refreshScrollbarsHandleLength,
    Xt: refreshScrollbarsHandleOffset,
    Ut: scrollbarsAddRemoveClass,
    Wt: {
      Jt: w,
      Kt: b,
      Zt: scrollbarsHandleStyle.bind(0, w)
    },
    Qt: {
      Jt: p,
      Kt: m,
      Zt: scrollbarsHandleStyle.bind(0, p)
    }
  }, appendElements, runEachAndClear.bind(0, v) ];
};

const createScrollbarsSetup = (t, n, o) => {
  let s;
  let e;
  let c;
  let r;
  let l;
  let i = 0;
  const a = createState({});
  const [u] = a;
  const [d, f] = selfCancelTimeout();
  const [_, h] = selfCancelTimeout();
  const [g, v] = selfCancelTimeout(100);
  const [w, p] = selfCancelTimeout(100);
  const [b, m] = selfCancelTimeout((() => i));
  const [y, S, x] = createScrollbarsSetupElements(t, o.jt, createScrollbarsSetupEvents(n, o));
  const {J: $, K: C, ot: O, st: T, it: E, U: A} = o.jt;
  const {Wt: z, Qt: I, Ut: L, Nt: H, Xt: P} = y;
  const {Zt: D} = z;
  const {Zt: M} = I;
  const styleScrollbarPosition = t => {
    const {Gt: n} = t;
    const o = E && !A && parent(n) === C && n;
    return [ o, {
      transform: o ? `translate(${scrollLeft(O)}px, ${scrollTop(O)}px)` : ""
    } ];
  };
  const manageScrollbarsAutoHide = (t, n) => {
    m();
    if (t) {
      L(nt);
    } else {
      const hide = () => L(nt, true);
      if (i > 0 && !n) {
        b(hide);
      } else {
        hide();
      }
    }
  };
  const onHostMouseEnter = () => {
    r = e;
    r && manageScrollbarsAutoHide(true);
  };
  const R = [ v, m, p, h, f, x, on($, "pointerover", onHostMouseEnter, {
    C: true
  }), on($, "pointerenter", onHostMouseEnter), on($, "pointerleave", (() => {
    r = false;
    e && manageScrollbarsAutoHide(false);
  })), on($, "pointermove", (() => {
    s && d((() => {
      v();
      manageScrollbarsAutoHide(true);
      w((() => {
        s && manageScrollbarsAutoHide(false);
      }));
    }));
  })), on(T, "scroll", (() => {
    _((() => {
      P(o());
      c && manageScrollbarsAutoHide(true);
      g((() => {
        c && !r && manageScrollbarsAutoHide(false);
      }));
    }));
    E && D(styleScrollbarPosition);
    E && M(styleScrollbarPosition);
  })) ];
  const k = u.bind(0);
  k.jt = y;
  k.Yt = S;
  return [ (t, r, a) => {
    const {At: u, zt: d, Et: f, wt: _} = a;
    const h = createOptionCheck(n, t, r);
    const g = o();
    const {Ot: v, xt: w, vt: p} = g;
    const [b, m] = h("scrollbars.theme");
    const [y, S] = h("scrollbars.visibility");
    const [x, $] = h("scrollbars.autoHide");
    const [C] = h("scrollbars.autoHideDelay");
    const [O, T] = h("scrollbars.dragScroll");
    const [E, z] = h("scrollbars.clickScroll");
    const I = u || d || _ || r;
    const D = f || S || r;
    const setScrollbarVisibility = (t, n) => {
      const o = "visible" === y || "auto" === y && "scroll" === t;
      L(J, o, n);
      return o;
    };
    i = C;
    if (m) {
      L(l);
      L(b, true);
      l = b;
    }
    if ($) {
      s = "move" === x;
      e = "leave" === x;
      c = "never" !== x;
      manageScrollbarsAutoHide(!c, true);
    }
    if (T) {
      L(et, O);
    }
    if (z) {
      L(st, E);
    }
    if (D) {
      const t = setScrollbarVisibility(w.x, true);
      const n = setScrollbarVisibility(w.y, false);
      const o = t && n;
      L(K, !o);
    }
    if (I) {
      H(g);
      P(g);
      L(tt, !v.x, true);
      L(tt, !v.y, false);
      L(G, p && !A);
    }
  }, k, runEachAndClear.bind(0, R) ];
};

const OverlayScrollbars = (t, n, o) => {
  const {F: s, Y: e} = getEnvironment();
  const c = getPlugins();
  const r = isHTMLElement(t);
  const l = r ? t : t.target;
  const i = getInstance(l);
  if (n && !i) {
    let i = false;
    const a = c[_t];
    const validateOptions = t => {
      const n = t || {};
      const o = a && a.O;
      return o ? o(n, true) : n;
    };
    const u = assignDeep({}, s(), validateOptions(n));
    const [d, f, _] = createEventListenerHub(o);
    const [h, g, v] = createStructureSetup(t, u);
    const [w, p, b] = createScrollbarsSetup(t, u, g);
    const update = (t, n) => {
      h(t, !!n);
    };
    const m = e(update.bind(0, {}, true));
    const destroy = t => {
      removeInstance(l);
      m();
      b();
      v();
      i = true;
      _("destroyed", [ y, !!t ]);
      f();
    };
    const y = {
      options(t) {
        if (t) {
          const n = getOptionsDiff(u, validateOptions(t));
          if (!isEmptyObject(n)) {
            assignDeep(u, n);
            update(n);
          }
        }
        return assignDeep({}, u);
      },
      on: d,
      off: (t, n) => {
        t && n && f(t, n);
      },
      state() {
        const {Ct: t, Ot: n, xt: o, Tt: s, Z: e, bt: c, vt: r} = g();
        return assignDeep({}, {
          overflowEdge: t,
          overflowAmount: n,
          overflowStyle: o,
          hasOverflow: s,
          padding: e,
          paddingAbsolute: c,
          directionRTL: r,
          destroyed: i
        });
      },
      elements() {
        const {W: t, J: n, Z: o, K: s, tt: e, ot: c, st: r} = g.jt;
        const {Wt: l, Qt: i} = p.jt;
        const translateScrollbarStructure = t => {
          const {qt: n, Ft: o, Gt: s} = t;
          return {
            scrollbar: s,
            track: o,
            handle: n
          };
        };
        const translateScrollbarsSetupElement = t => {
          const {Jt: n, Kt: o} = t;
          const s = translateScrollbarStructure(n[0]);
          return assignDeep({}, s, {
            clone: () => {
              const t = translateScrollbarStructure(o());
              w({}, true, {});
              return t;
            }
          });
        };
        return assignDeep({}, {
          target: t,
          host: n,
          padding: o || s,
          viewport: s,
          content: e || s,
          scrollOffsetElement: c,
          scrollEventElement: r,
          scrollbarHorizontal: translateScrollbarsSetupElement(l),
          scrollbarVertical: translateScrollbarsSetupElement(i)
        });
      },
      update(t) {
        update({}, t);
        return y;
      },
      destroy: destroy.bind(0)
    };
    g.Vt(((t, n, o) => {
      w(n, o, t);
    }));
    each(keys(c), (t => {
      const n = c[t];
      if (isFunction(n)) {
        n(OverlayScrollbars, y);
      }
    }));
    if (cancelInitialization(!r && t.cancel, g.jt)) {
      destroy(true);
      return y;
    }
    g.Yt();
    p.Yt();
    addInstance(l, y);
    _("initialized", [ y ]);
    g.Vt(((t, n, o) => {
      const {ht: s, wt: e, _t: c, At: r, zt: l, Et: i, gt: a, $t: u} = t;
      _("updated", [ y, {
        updateHints: {
          sizeChanged: s,
          directionChanged: e,
          heightIntrinsicChanged: c,
          overflowEdgeChanged: r,
          overflowAmountChanged: l,
          overflowStyleChanged: i,
          contentMutation: a,
          hostMutation: u
        },
        changedOptions: n,
        force: o
      } ]);
    }));
    return y.update(true);
  }
  return i;
};

OverlayScrollbars.plugin = addPlugin;

OverlayScrollbars.valid = t => {
  const n = t && t.elements;
  const o = isFunction(n) && n();
  return isPlainObject(o) && !!getInstance(o.target);
};

OverlayScrollbars.env = () => {
  const {k: t, I: n, A: o, B: s, V: e, L: c, N: r, X: l, j: i, q: a, F: u, G: d} = getEnvironment();
  return assignDeep({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: n,
    scrollbarsHiding: o,
    rtlScrollBehavior: s,
    flexboxGlue: e,
    cssCustomProperties: c,
    staticDefaultInitialization: r,
    staticDefaultOptions: l,
    getDefaultInitialization: i,
    setDefaultInitialization: a,
    getDefaultOptions: u,
    setDefaultOptions: d
  });
};

export { OverlayScrollbars, St as scrollbarsHidingPlugin, wt as sizeObserverPlugin };
//# sourceMappingURL=overlayscrollbars.esm.js.map
