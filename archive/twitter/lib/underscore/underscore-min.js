//     Underscore.js 1.4.2
//     http://underscorejs.org
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.
(function() {
    var e = this,
        t = e._,
        n = {},
        r = Array.prototype,
        i = Object.prototype,
        s = Function.prototype,
        o = r.push,
        u = r.slice,
        a = r.concat,
        f = r.unshift,
        l = i.toString,
        c = i.hasOwnProperty,
        h = r.forEach,
        p = r.map,
        d = r.reduce,
        v = r.reduceRight,
        m = r.filter,
        g = r.every,
        y = r.some,
        b = r.indexOf,
        w = r.lastIndexOf,
        E = Array.isArray,
        S = Object.keys,
        x = s.bind,
        T = function(e) {
            if (e instanceof T) return e;
            if (!(this instanceof T)) return new T(e);
            this._wrapped = e;
        };
    typeof exports != "undefined"
        ? (typeof module != "undefined" &&
              module.exports &&
              (exports = module.exports = T),
          (exports._ = T))
        : (e._ = T),
        (T.VERSION = "1.4.2");
    var N = (T.each = T.forEach = function(e, t, r) {
        if (e == null) return;
        if (h && e.forEach === h) e.forEach(t, r);
        else if (e.length === +e.length) {
            for (var i = 0, s = e.length; i < s; i++)
                if (t.call(r, e[i], i, e) === n) return;
        } else
            for (var o in e)
                if (T.has(e, o) && t.call(r, e[o], o, e) === n) return;
    });
    (T.map = T.collect = function(e, t, n) {
        var r = [];
        return e == null
            ? r
            : p && e.map === p
            ? e.map(t, n)
            : (N(e, function(e, i, s) {
                  r[r.length] = t.call(n, e, i, s);
              }),
              r);
    }),
        (T.reduce = T.foldl = T.inject = function(e, t, n, r) {
            var i = arguments.length > 2;
            e == null && (e = []);
            if (d && e.reduce === d)
                return (
                    r && (t = T.bind(t, r)), i ? e.reduce(t, n) : e.reduce(t)
                );
            N(e, function(e, s, o) {
                i ? (n = t.call(r, n, e, s, o)) : ((n = e), (i = !0));
            });
            if (!i)
                throw new TypeError(
                    "Reduce of empty array with no initial value"
                );
            return n;
        }),
        (T.reduceRight = T.foldr = function(e, t, n, r) {
            var i = arguments.length > 2;
            e == null && (e = []);
            if (v && e.reduceRight === v)
                return (
                    r && (t = T.bind(t, r)),
                    arguments.length > 2
                        ? e.reduceRight(t, n)
                        : e.reduceRight(t)
                );
            var s = e.length;
            if (s !== +s) {
                var o = T.keys(e);
                s = o.length;
            }
            N(e, function(u, a, f) {
                (a = o ? o[--s] : --s),
                    i ? (n = t.call(r, n, e[a], a, f)) : ((n = e[a]), (i = !0));
            });
            if (!i)
                throw new TypeError(
                    "Reduce of empty array with no initial value"
                );
            return n;
        }),
        (T.find = T.detect = function(e, t, n) {
            var r;
            return (
                C(e, function(e, i, s) {
                    if (t.call(n, e, i, s)) return (r = e), !0;
                }),
                r
            );
        }),
        (T.filter = T.select = function(e, t, n) {
            var r = [];
            return e == null
                ? r
                : m && e.filter === m
                ? e.filter(t, n)
                : (N(e, function(e, i, s) {
                      t.call(n, e, i, s) && (r[r.length] = e);
                  }),
                  r);
        }),
        (T.reject = function(e, t, n) {
            var r = [];
            return e == null
                ? r
                : (N(e, function(e, i, s) {
                      t.call(n, e, i, s) || (r[r.length] = e);
                  }),
                  r);
        }),
        (T.every = T.all = function(e, t, r) {
            t || (t = T.identity);
            var i = !0;
            return e == null
                ? i
                : g && e.every === g
                ? e.every(t, r)
                : (N(e, function(e, s, o) {
                      if (!(i = i && t.call(r, e, s, o))) return n;
                  }),
                  !!i);
        });
    var C = (T.some = T.any = function(e, t, r) {
        t || (t = T.identity);
        var i = !1;
        return e == null
            ? i
            : y && e.some === y
            ? e.some(t, r)
            : (N(e, function(e, s, o) {
                  if (i || (i = t.call(r, e, s, o))) return n;
              }),
              !!i);
    });
    (T.contains = T.include = function(e, t) {
        var n = !1;
        return e == null
            ? n
            : b && e.indexOf === b
            ? e.indexOf(t) != -1
            : ((n = C(e, function(e) {
                  return e === t;
              })),
              n);
    }),
        (T.invoke = function(e, t) {
            var n = u.call(arguments, 2);
            return T.map(e, function(e) {
                return (T.isFunction(t) ? t : e[t]).apply(e, n);
            });
        }),
        (T.pluck = function(e, t) {
            return T.map(e, function(e) {
                return e[t];
            });
        }),
        (T.where = function(e, t) {
            return T.isEmpty(t)
                ? []
                : T.filter(e, function(e) {
                      for (var n in t) if (t[n] !== e[n]) return !1;
                      return !0;
                  });
        }),
        (T.max = function(e, t, n) {
            if (!t && T.isArray(e) && e[0] === +e[0] && e.length < 65535)
                return Math.max.apply(Math, e);
            if (!t && T.isEmpty(e)) return -Infinity;
            var r = { computed: -Infinity };
            return (
                N(e, function(e, i, s) {
                    var o = t ? t.call(n, e, i, s) : e;
                    o >= r.computed && (r = { value: e, computed: o });
                }),
                r.value
            );
        }),
        (T.min = function(e, t, n) {
            if (!t && T.isArray(e) && e[0] === +e[0] && e.length < 65535)
                return Math.min.apply(Math, e);
            if (!t && T.isEmpty(e)) return Infinity;
            var r = { computed: Infinity };
            return (
                N(e, function(e, i, s) {
                    var o = t ? t.call(n, e, i, s) : e;
                    o < r.computed && (r = { value: e, computed: o });
                }),
                r.value
            );
        }),
        (T.shuffle = function(e) {
            var t,
                n = 0,
                r = [];
            return (
                N(e, function(e) {
                    (t = T.random(n++)), (r[n - 1] = r[t]), (r[t] = e);
                }),
                r
            );
        });
    var k = function(e) {
        return T.isFunction(e)
            ? e
            : function(t) {
                  return t[e];
              };
    };
    T.sortBy = function(e, t, n) {
        var r = k(t);
        return T.pluck(
            T.map(e, function(e, t, i) {
                return { value: e, index: t, criteria: r.call(n, e, t, i) };
            }).sort(function(e, t) {
                var n = e.criteria,
                    r = t.criteria;
                if (n !== r) {
                    if (n > r || n === void 0) return 1;
                    if (n < r || r === void 0) return -1;
                }
                return e.index < t.index ? -1 : 1;
            }),
            "value"
        );
    };
    var L = function(e, t, n, r) {
        var i = {},
            s = k(t);
        return (
            N(e, function(t, o) {
                var u = s.call(n, t, o, e);
                r(i, u, t);
            }),
            i
        );
    };
    (T.groupBy = function(e, t, n) {
        return L(e, t, n, function(e, t, n) {
            (T.has(e, t) ? e[t] : (e[t] = [])).push(n);
        });
    }),
        (T.countBy = function(e, t, n) {
            return L(e, t, n, function(e, t, n) {
                T.has(e, t) || (e[t] = 0), e[t]++;
            });
        }),
        (T.sortedIndex = function(e, t, n, r) {
            n = n == null ? T.identity : k(n);
            var i = n.call(r, t),
                s = 0,
                o = e.length;
            while (s < o) {
                var u = (s + o) >>> 1;
                n.call(r, e[u]) < i ? (s = u + 1) : (o = u);
            }
            return s;
        }),
        (T.toArray = function(e) {
            return e ? (e.length === +e.length ? u.call(e) : T.values(e)) : [];
        }),
        (T.size = function(e) {
            return e.length === +e.length ? e.length : T.keys(e).length;
        }),
        (T.first = T.head = T.take = function(e, t, n) {
            return t != null && !n ? u.call(e, 0, t) : e[0];
        }),
        (T.initial = function(e, t, n) {
            return u.call(e, 0, e.length - (t == null || n ? 1 : t));
        }),
        (T.last = function(e, t, n) {
            return t != null && !n
                ? u.call(e, Math.max(e.length - t, 0))
                : e[e.length - 1];
        }),
        (T.rest = T.tail = T.drop = function(e, t, n) {
            return u.call(e, t == null || n ? 1 : t);
        }),
        (T.compact = function(e) {
            return T.filter(e, function(e) {
                return !!e;
            });
        });
    var A = function(e, t, n) {
        return (
            N(e, function(e) {
                T.isArray(e) ? (t ? o.apply(n, e) : A(e, t, n)) : n.push(e);
            }),
            n
        );
    };
    (T.flatten = function(e, t) {
        return A(e, t, []);
    }),
        (T.without = function(e) {
            return T.difference(e, u.call(arguments, 1));
        }),
        (T.uniq = T.unique = function(e, t, n, r) {
            var i = n ? T.map(e, n, r) : e,
                s = [],
                o = [];
            return (
                N(i, function(n, r) {
                    if (t ? !r || o[o.length - 1] !== n : !T.contains(o, n))
                        o.push(n), s.push(e[r]);
                }),
                s
            );
        }),
        (T.union = function() {
            return T.uniq(a.apply(r, arguments));
        }),
        (T.intersection = function(e) {
            var t = u.call(arguments, 1);
            return T.filter(T.uniq(e), function(e) {
                return T.every(t, function(t) {
                    return T.indexOf(t, e) >= 0;
                });
            });
        }),
        (T.difference = function(e) {
            var t = a.apply(r, u.call(arguments, 1));
            return T.filter(e, function(e) {
                return !T.contains(t, e);
            });
        }),
        (T.zip = function() {
            var e = u.call(arguments),
                t = T.max(T.pluck(e, "length")),
                n = new Array(t);
            for (var r = 0; r < t; r++) n[r] = T.pluck(e, "" + r);
            return n;
        }),
        (T.object = function(e, t) {
            var n = {};
            for (var r = 0, i = e.length; r < i; r++)
                t ? (n[e[r]] = t[r]) : (n[e[r][0]] = e[r][1]);
            return n;
        }),
        (T.indexOf = function(e, t, n) {
            if (e == null) return -1;
            var r = 0,
                i = e.length;
            if (n) {
                if (typeof n != "number")
                    return (r = T.sortedIndex(e, t)), e[r] === t ? r : -1;
                r = n < 0 ? Math.max(0, i + n) : n;
            }
            if (b && e.indexOf === b) return e.indexOf(t, n);
            for (; r < i; r++) if (e[r] === t) return r;
            return -1;
        }),
        (T.lastIndexOf = function(e, t, n) {
            if (e == null) return -1;
            var r = n != null;
            if (w && e.lastIndexOf === w)
                return r ? e.lastIndexOf(t, n) : e.lastIndexOf(t);
            var i = r ? n : e.length;
            while (i--) if (e[i] === t) return i;
            return -1;
        }),
        (T.range = function(e, t, n) {
            arguments.length <= 1 && ((t = e || 0), (e = 0)),
                (n = arguments[2] || 1);
            var r = Math.max(Math.ceil((t - e) / n), 0),
                i = 0,
                s = new Array(r);
            while (i < r) (s[i++] = e), (e += n);
            return s;
        });
    var O = function() {};
    (T.bind = function(t, n) {
        var r, i;
        if (t.bind === x && x) return x.apply(t, u.call(arguments, 1));
        if (!T.isFunction(t)) throw new TypeError();
        return (
            (i = u.call(arguments, 2)),
            (r = function() {
                if (this instanceof r) {
                    O.prototype = t.prototype;
                    var e = new O(),
                        s = t.apply(e, i.concat(u.call(arguments)));
                    return Object(s) === s ? s : e;
                }
                return t.apply(n, i.concat(u.call(arguments)));
            })
        );
    }),
        (T.bindAll = function(e) {
            var t = u.call(arguments, 1);
            return (
                t.length == 0 && (t = T.functions(e)),
                N(t, function(t) {
                    e[t] = T.bind(e[t], e);
                }),
                e
            );
        }),
        (T.memoize = function(e, t) {
            var n = {};
            return (
                t || (t = T.identity),
                function() {
                    var r = t.apply(this, arguments);
                    return T.has(n, r)
                        ? n[r]
                        : (n[r] = e.apply(this, arguments));
                }
            );
        }),
        (T.delay = function(e, t) {
            var n = u.call(arguments, 2);
            return setTimeout(function() {
                return e.apply(null, n);
            }, t);
        }),
        (T.defer = function(e) {
            return T.delay.apply(T, [e, 1].concat(u.call(arguments, 1)));
        }),
        (T.throttle = function(e, t) {
            var n,
                r,
                i,
                s,
                o,
                u,
                a = T.debounce(function() {
                    o = s = !1;
                }, t);
            return function() {
                (n = this), (r = arguments);
                var f = function() {
                    (i = null), o && (u = e.apply(n, r)), a();
                };
                return (
                    i || (i = setTimeout(f, t)),
                    s ? (o = !0) : ((s = !0), (u = e.apply(n, r))),
                    a(),
                    u
                );
            };
        }),
        (T.debounce = function(e, t, n) {
            var r, i;
            return function() {
                var s = this,
                    o = arguments,
                    u = function() {
                        (r = null), n || (i = e.apply(s, o));
                    },
                    a = n && !r;
                return (
                    clearTimeout(r),
                    (r = setTimeout(u, t)),
                    a && (i = e.apply(s, o)),
                    i
                );
            };
        }),
        (T.once = function(e) {
            var t = !1,
                n;
            return function() {
                return t
                    ? n
                    : ((t = !0), (n = e.apply(this, arguments)), (e = null), n);
            };
        }),
        (T.wrap = function(e, t) {
            return function() {
                var n = [e];
                return o.apply(n, arguments), t.apply(this, n);
            };
        }),
        (T.compose = function() {
            var e = arguments;
            return function() {
                var t = arguments;
                for (var n = e.length - 1; n >= 0; n--)
                    t = [e[n].apply(this, t)];
                return t[0];
            };
        }),
        (T.after = function(e, t) {
            return e <= 0
                ? t()
                : function() {
                      if (--e < 1) return t.apply(this, arguments);
                  };
        }),
        (T.keys =
            S ||
            function(e) {
                if (e !== Object(e)) throw new TypeError("Invalid object");
                var t = [];
                for (var n in e) T.has(e, n) && (t[t.length] = n);
                return t;
            }),
        (T.values = function(e) {
            var t = [];
            for (var n in e) T.has(e, n) && t.push(e[n]);
            return t;
        }),
        (T.pairs = function(e) {
            var t = [];
            for (var n in e) T.has(e, n) && t.push([n, e[n]]);
            return t;
        }),
        (T.invert = function(e) {
            var t = {};
            for (var n in e) T.has(e, n) && (t[e[n]] = n);
            return t;
        }),
        (T.functions = T.methods = function(e) {
            var t = [];
            for (var n in e) T.isFunction(e[n]) && t.push(n);
            return t.sort();
        }),
        (T.extend = function(e) {
            return (
                N(u.call(arguments, 1), function(t) {
                    for (var n in t) e[n] = t[n];
                }),
                e
            );
        }),
        (T.pick = function(e) {
            var t = {},
                n = a.apply(r, u.call(arguments, 1));
            return (
                N(n, function(n) {
                    n in e && (t[n] = e[n]);
                }),
                t
            );
        }),
        (T.omit = function(e) {
            var t = {},
                n = a.apply(r, u.call(arguments, 1));
            for (var i in e) T.contains(n, i) || (t[i] = e[i]);
            return t;
        }),
        (T.defaults = function(e) {
            return (
                N(u.call(arguments, 1), function(t) {
                    for (var n in t) e[n] == null && (e[n] = t[n]);
                }),
                e
            );
        }),
        (T.clone = function(e) {
            return T.isObject(e)
                ? T.isArray(e)
                    ? e.slice()
                    : T.extend({}, e)
                : e;
        }),
        (T.tap = function(e, t) {
            return t(e), e;
        });
    var M = function(e, t, n, r) {
        if (e === t) return e !== 0 || 1 / e == 1 / t;
        if (e == null || t == null) return e === t;
        e instanceof T && (e = e._wrapped), t instanceof T && (t = t._wrapped);
        var i = l.call(e);
        if (i != l.call(t)) return !1;
        switch (i) {
            case "[object String]":
                return e == String(t);
            case "[object Number]":
                return e != +e ? t != +t : e == 0 ? 1 / e == 1 / t : e == +t;
            case "[object Date]":
            case "[object Boolean]":
                return +e == +t;
            case "[object RegExp]":
                return (
                    e.source == t.source &&
                    e.global == t.global &&
                    e.multiline == t.multiline &&
                    e.ignoreCase == t.ignoreCase
                );
        }
        if (typeof e != "object" || typeof t != "object") return !1;
        var s = n.length;
        while (s--) if (n[s] == e) return r[s] == t;
        n.push(e), r.push(t);
        var o = 0,
            u = !0;
        if (i == "[object Array]") {
            (o = e.length), (u = o == t.length);
            if (u) while (o--) if (!(u = M(e[o], t[o], n, r))) break;
        } else {
            var a = e.constructor,
                f = t.constructor;
            if (
                a !== f &&
                !(
                    T.isFunction(a) &&
                    a instanceof a &&
                    T.isFunction(f) &&
                    f instanceof f
                )
            )
                return !1;
            for (var c in e)
                if (T.has(e, c)) {
                    o++;
                    if (!(u = T.has(t, c) && M(e[c], t[c], n, r))) break;
                }
            if (u) {
                for (c in t) if (T.has(t, c) && !o--) break;
                u = !o;
            }
        }
        return n.pop(), r.pop(), u;
    };
    (T.isEqual = function(e, t) {
        return M(e, t, [], []);
    }),
        (T.isEmpty = function(e) {
            if (e == null) return !0;
            if (T.isArray(e) || T.isString(e)) return e.length === 0;
            for (var t in e) if (T.has(e, t)) return !1;
            return !0;
        }),
        (T.isElement = function(e) {
            return !!e && e.nodeType === 1;
        }),
        (T.isArray =
            E ||
            function(e) {
                return l.call(e) == "[object Array]";
            }),
        (T.isObject = function(e) {
            return e === Object(e);
        }),
        N(
            ["Arguments", "Function", "String", "Number", "Date", "RegExp"],
            function(e) {
                T["is" + e] = function(t) {
                    return l.call(t) == "[object " + e + "]";
                };
            }
        ),
        T.isArguments(arguments) ||
            (T.isArguments = function(e) {
                return !!e && !!T.has(e, "callee");
            }),
        typeof /./ != "function" &&
            (T.isFunction = function(e) {
                return typeof e == "function";
            }),
        (T.isFinite = function(e) {
            return T.isNumber(e) && isFinite(e);
        }),
        (T.isNaN = function(e) {
            return T.isNumber(e) && e != +e;
        }),
        (T.isBoolean = function(e) {
            return e === !0 || e === !1 || l.call(e) == "[object Boolean]";
        }),
        (T.isNull = function(e) {
            return e === null;
        }),
        (T.isUndefined = function(e) {
            return e === void 0;
        }),
        (T.has = function(e, t) {
            return c.call(e, t);
        }),
        (T.noConflict = function() {
            return (e._ = t), this;
        }),
        (T.identity = function(e) {
            return e;
        }),
        (T.times = function(e, t, n) {
            for (var r = 0; r < e; r++) t.call(n, r);
        }),
        (T.random = function(e, t) {
            return (
                t == null && ((t = e), (e = 0)),
                e + (0 | (Math.random() * (t - e + 1)))
            );
        });
    var _ = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;"
        }
    };
    _.unescape = T.invert(_.escape);
    var D = {
        escape: new RegExp("[" + T.keys(_.escape).join("") + "]", "g"),
        unescape: new RegExp("(" + T.keys(_.unescape).join("|") + ")", "g")
    };
    T.each(["escape", "unescape"], function(e) {
        T[e] = function(t) {
            return t == null
                ? ""
                : ("" + t).replace(D[e], function(t) {
                      return _[e][t];
                  });
        };
    }),
        (T.result = function(e, t) {
            if (e == null) return null;
            var n = e[t];
            return T.isFunction(n) ? n.call(e) : n;
        }),
        (T.mixin = function(e) {
            N(T.functions(e), function(t) {
                var n = (T[t] = e[t]);
                T.prototype[t] = function() {
                    var e = [this._wrapped];
                    return o.apply(e, arguments), F.call(this, n.apply(T, e));
                };
            });
        });
    var P = 0;
    (T.uniqueId = function(e) {
        var t = P++;
        return e ? e + t : t;
    }),
        (T.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        });
    var H = /(.)^/,
        B = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "	": "t",
            "\u2028": "u2028",
            "\u2029": "u2029"
        },
        j = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    (T.template = function(e, t, n) {
        n = T.defaults({}, n, T.templateSettings);
        var r = new RegExp(
                [
                    (n.escape || H).source,
                    (n.interpolate || H).source,
                    (n.evaluate || H).source
                ].join("|") + "|$",
                "g"
            ),
            i = 0,
            s = "__p+='";
        e.replace(r, function(t, n, r, o, u) {
            (s += e.slice(i, u).replace(j, function(e) {
                return "\\" + B[e];
            })),
                (s += n
                    ? "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"
                    : r
                    ? "'+\n((__t=(" + r + "))==null?'':__t)+\n'"
                    : o
                    ? "';\n" + o + "\n__p+='"
                    : ""),
                (i = u + t.length);
        }),
            (s += "';\n"),
            n.variable || (s = "with(obj||{}){\n" + s + "}\n"),
            (s =
                "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" +
                s +
                "return __p;\n");
        try {
            var o = new Function(n.variable || "obj", "_", s);
        } catch (u) {
            throw ((u.source = s), u);
        }
        if (t) return o(t, T);
        var a = function(e) {
            return o.call(this, e, T);
        };
        return (
            (a.source = "function(" + (n.variable || "obj") + "){\n" + s + "}"),
            a
        );
    }),
        (T.chain = function(e) {
            return T(e).chain();
        });
    var F = function(e) {
        return this._chain ? T(e).chain() : e;
    };
    T.mixin(T),
        N(
            ["pop", "push", "reverse", "shift", "sort", "splice", "unshift"],
            function(e) {
                var t = r[e];
                T.prototype[e] = function() {
                    var n = this._wrapped;
                    return (
                        t.apply(n, arguments),
                        (e == "shift" || e == "splice") &&
                            n.length === 0 &&
                            delete n[0],
                        F.call(this, n)
                    );
                };
            }
        ),
        N(["concat", "join", "slice"], function(e) {
            var t = r[e];
            T.prototype[e] = function() {
                return F.call(this, t.apply(this._wrapped, arguments));
            };
        }),
        T.extend(T.prototype, {
            chain: function() {
                return (this._chain = !0), this;
            },
            value: function() {
                return this._wrapped;
            }
        });
}.call(this));
