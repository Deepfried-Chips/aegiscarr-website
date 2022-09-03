parcelRequire = function(e, r, t, n) {
    var i, o = "function" == typeof parcelRequire && parcelRequire,
        u = "function" == typeof require && require;

    function f(t, n) {
        if (!r[t]) {
            if (!e[t]) {
                var i = "function" == typeof parcelRequire && parcelRequire;
                if (!n && i) return i(t, !0);
                if (o) return o(t, !0);
                if (u && "string" == typeof t) return u(t);
                var c = new Error("Cannot find module '" + t + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            p.resolve = function(r) {
                return e[t][1][r] || r
            }, p.cache = {};
            var l = r[t] = new f.Module(t);
            e[t][0].call(l.exports, p, l, l.exports, this)
        }
        return r[t].exports;

        function p(e) {
            return f(p.resolve(e))
        }
    }
    f.isParcelRequire = !0, f.Module = function(e) {
        this.id = e, this.bundle = f, this.exports = {}
    }, f.modules = e, f.cache = r, f.parent = o, f.register = function(r, t) {
        e[r] = [function(e, r) {
            r.exports = t
        }, {}]
    };
    for (var c = 0; c < t.length; c++) try {
        f(t[c])
    } catch (e) {
        i || (i = e)
    }
    if (t.length) {
        var l = f(t[t.length - 1]);
        "object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function() {
            return l
        }) : n && (this[n] = l)
    }
    if (parcelRequire = f, i) throw i;
    return f
}({
    "f6pS": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.getTTFB = exports.getLCP = exports.getFID = exports.getFCP = exports.getCLS = void 0;
        var e, t, n, i, r = function(e, t) {
                return {
                    name: e,
                    value: void 0 === t ? -1 : t,
                    delta: 0,
                    entries: [],
                    id: "v2-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12)
                }
            },
            a = function(e, t) {
                try {
                    if (PerformanceObserver.supportedEntryTypes.includes(e)) {
                        if ("first-input" === e && !("PerformanceEventTiming" in self)) return;
                        var n = new PerformanceObserver(function(e) {
                            return e.getEntries().map(t)
                        });
                        return n.observe({
                            type: e,
                            buffered: !0
                        }), n
                    }
                } catch (e) {}
            },
            o = function(e, t) {
                var n = function n(i) {
                    "pagehide" !== i.type && "hidden" !== document.visibilityState || (e(i), t && (removeEventListener("visibilitychange", n, !0), removeEventListener("pagehide", n, !0)))
                };
                addEventListener("visibilitychange", n, !0), addEventListener("pagehide", n, !0)
            },
            u = function(e) {
                addEventListener("pageshow", function(t) {
                    t.persisted && e(t)
                }, !0)
            },
            c = function(e, t, n) {
                var i;
                return function(r) {
                    t.value >= 0 && (r || n) && (t.delta = t.value - (i || 0), (t.delta || void 0 === i) && (i = t.value, e(t)))
                }
            },
            s = -1,
            f = function() {
                return "hidden" === document.visibilityState ? 0 : 1 / 0
            },
            p = function() {
                o(function(e) {
                    var t = e.timeStamp;
                    s = t
                }, !0)
            },
            m = function() {
                return s < 0 && (s = f(), p(), u(function() {
                    setTimeout(function() {
                        s = f(), p()
                    }, 0)
                })), {
                    get firstHiddenTime() {
                        return s
                    }
                }
            },
            v = function(e, t) {
                var n, i = m(),
                    o = r("FCP"),
                    s = function(e) {
                        "first-contentful-paint" === e.name && (p && p.disconnect(), e.startTime < i.firstHiddenTime && (o.value = e.startTime, o.entries.push(e), n(!0)))
                    },
                    f = window.performance && performance.getEntriesByName && performance.getEntriesByName("first-contentful-paint")[0],
                    p = f ? null : a("paint", s);
                (f || p) && (n = c(e, o, t), f && s(f), u(function(i) {
                    o = r("FCP"), n = c(e, o, t), requestAnimationFrame(function() {
                        requestAnimationFrame(function() {
                            o.value = performance.now() - i.timeStamp, n(!0)
                        })
                    })
                }))
            },
            d = !1,
            l = -1,
            g = function(e, t) {
                d || (v(function(e) {
                    l = e.value
                }), d = !0);
                var n, i = function(t) {
                        l > -1 && e(t)
                    },
                    s = r("CLS", 0),
                    f = 0,
                    p = [],
                    m = function(e) {
                        if (!e.hadRecentInput) {
                            var t = p[0],
                                i = p[p.length - 1];
                            f && e.startTime - i.startTime < 1e3 && e.startTime - t.startTime < 5e3 ? (f += e.value, p.push(e)) : (f = e.value, p = [e]), f > s.value && (s.value = f, s.entries = p, n())
                        }
                    },
                    g = a("layout-shift", m);
                g && (n = c(i, s, t), o(function() {
                    g.takeRecords().map(m), n(!0)
                }), u(function() {
                    f = 0, l = -1, s = r("CLS", 0), n = c(i, s, t)
                }))
            },
            T = {
                passive: !0,
                capture: !0
            },
            h = new Date,
            y = function(i, r) {
                e || (e = r, t = i, n = new Date, S(removeEventListener), E())
            },
            E = function() {
                if (t >= 0 && t < n - h) {
                    var r = {
                        entryType: "first-input",
                        name: e.type,
                        target: e.target,
                        cancelable: e.cancelable,
                        startTime: e.timeStamp,
                        processingStart: e.timeStamp + t
                    };
                    i.forEach(function(e) {
                        e(r)
                    }), i = []
                }
            },
            L = function(e) {
                if (e.cancelable) {
                    var t = (e.timeStamp > 1e12 ? new Date : performance.now()) - e.timeStamp;
                    "pointerdown" == e.type ? function(e, t) {
                        var n = function() {
                                y(e, t), r()
                            },
                            i = function() {
                                r()
                            },
                            r = function() {
                                removeEventListener("pointerup", n, T), removeEventListener("pointercancel", i, T)
                            };
                        addEventListener("pointerup", n, T), addEventListener("pointercancel", i, T)
                    }(t, e) : y(t, e)
                }
            },
            S = function(e) {
                ["mousedown", "keydown", "touchstart", "pointerdown"].forEach(function(t) {
                    return e(t, L, T)
                })
            },
            w = function(n, s) {
                var f, p = m(),
                    v = r("FID"),
                    d = function(e) {
                        e.startTime < p.firstHiddenTime && (v.value = e.processingStart - e.startTime, v.entries.push(e), f(!0))
                    },
                    l = a("first-input", d);
                f = c(n, v, s), l && o(function() {
                    l.takeRecords().map(d), l.disconnect()
                }, !0), l && u(function() {
                    var a;
                    v = r("FID"), f = c(n, v, s), i = [], t = -1, e = null, S(addEventListener), a = d, i.push(a), E()
                })
            },
            F = {},
            b = function(e, t) {
                var n, i = m(),
                    s = r("LCP"),
                    f = function(e) {
                        var t = e.startTime;
                        t < i.firstHiddenTime && (s.value = t, s.entries.push(e)), n()
                    },
                    p = a("largest-contentful-paint", f);
                if (p) {
                    n = c(e, s, t);
                    var v = function() {
                        F[s.id] || (p.takeRecords().map(f), p.disconnect(), F[s.id] = !0, n(!0))
                    };
                    ["keydown", "click"].forEach(function(e) {
                        addEventListener(e, v, {
                            once: !0,
                            capture: !0
                        })
                    }), o(v, !0), u(function(i) {
                        s = r("LCP"), n = c(e, s, t), requestAnimationFrame(function() {
                            requestAnimationFrame(function() {
                                s.value = performance.now() - i.timeStamp, F[s.id] = !0, n(!0)
                            })
                        })
                    })
                }
            },
            x = function(e) {
                var t, n = r("TTFB");
                t = function() {
                    try {
                        var t = performance.getEntriesByType("navigation")[0] || function() {
                            var e = performance.timing,
                                t = {
                                    entryType: "navigation",
                                    startTime: 0
                                };
                            for (var n in e) "navigationStart" !== n && "toJSON" !== n && (t[n] = Math.max(e[n] - e.navigationStart, 0));
                            return t
                        }();
                        if (n.value = n.delta = t.responseStart, n.value < 0 || n.value > performance.now()) return;
                        n.entries = [t], e(n)
                    } catch (e) {}
                }, "complete" === document.readyState ? setTimeout(t, 0) : addEventListener("pageshow", t)
            };
        exports.getTTFB = x, exports.getLCP = b, exports.getFID = w, exports.getCLS = g, exports.getFCP = v;
    }, {}],
    "VGVH": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.initWebVitals = void 0;
        var e = require("web-vitals"),
            t = "/platform/webvitals",
            i = window.location.pathname,
            n = "/" === i,
            o = "products" === i.split("/")[1],
            a = function(e) {
                var n = Object.assign(e, {
                        label: i
                    }),
                    o = JSON.stringify(n);
                navigator.sendBeacon && navigator.sendBeacon(t, o) || fetch(t, {
                    body: o,
                    method: "POST",
                    keepalive: !0
                })
            },
            s = function() {
                (0, e.getCLS)(a), (0, e.getFID)(a), (0, e.getLCP)(a), (0, e.getFCP)(a), (0, e.getTTFB)(a)
            },
            r = function() {
                addEventListener("DOMContentLoaded", function() {
                    (n || o) && s()
                })
            };
        exports.initWebVitals = r;
    }, {
        "web-vitals": "f6pS"
    }],
    "Focm": [function(require, module, exports) {
        "use strict";
        var i = require("./web-vitals");
        (0, i.initWebVitals)();
    }, {
        "./web-vitals": "VGVH"
    }]
}, {}, ["Focm"], null)
//# sourceMappingURL=/web-performance.js.map