define(function (require, exports, model) {
    !function (e) {
        if ("object" == typeof exports && "undefined" != typeof module)module.exports = e(); else if ("function" == typeof define && define.amd)define([], e); else {
            var n;
            n = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, n.pingpp = e()
        }
    }(function () {
        return function e(n, t, r) {
            function a(o, c) {
                if (!t[o]) {
                    if (!n[o]) {
                        var l = "function" == typeof require && require;
                        if (!c && l)return l(o, !0);
                        if (i)return i(o, !0);
                        var s = new Error("Cannot find module '" + o + "'");
                        throw s.code = "MODULE_NOT_FOUND", s
                    }
                    var u = t[o] = {exports: {}};
                    n[o][0].call(u.exports, function (e) {
                        var t = n[o][1][e];
                        return a(t ? t : e)
                    }, u, u.exports, e, n, t, r)
                }
                return t[o].exports
            }

            for (var i = "function" == typeof require && require, o = 0; o < r.length; o++)a(r[o]);
            return a
        }({
            1: [function (e, n, t) {
                n.exports = {
                    userCallback: void 0, innerCallback: function (e, n) {
                        'function' == typeof this.userCallback && ('undefined' == typeof n && (n = this.error()), this.userCallback(e, n), this.userCallback = void 0)
                    }, error: function (e, n) {
                        return e = 'undefined' == typeof e ? '' : e, n = 'undefined' == typeof n ? '' : n, {
                            msg: e,
                            extra: n
                        }
                    }
                }
            }, {}], 2: [function (e, n, t) {
                var r = e('../utils'), a = {}.hasOwnProperty;
                n.exports = {
                    ALIPAY_PC_DIRECT_URL: 'https://mapi.alipay.com/gateway.do', handleCharge: function (e) {
                        var n = e.channel, t = e.credential[n], i = this.ALIPAY_PC_DIRECT_URL;
                        a.call(t, 'channel_url') && (i = t.channel_url), a.call(t, '_input_charset') || (t._input_charset = 'utf-8');
                        var o = r.stringifyData(t, n, !0);
                        r.redirectTo(i + '?' + o)
                    }
                }
            }, {"../utils": 23}], 3: [function (e, n, t) {
                var r = e('../utils'), a = e('../mods'), i = {}.hasOwnProperty;
                n.exports = {
                    ALIPAY_WAP_URL_OLD: 'https://wappaygw.alipay.com/service/rest.htm',
                    ALIPAY_WAP_URL: 'https://mapi.alipay.com/gateway.do',
                    handleCharge: function (e) {
                        var n = e.channel, t = e.credential[n], o = this.ALIPAY_WAP_URL;
                        i.call(t, 'req_data') ? o = this.ALIPAY_WAP_URL_OLD : i.call(t, 'channel_url') && (o = t.channel_url), i.call(t, '_input_charset') || (t._input_charset = 'utf-8');
                        var c = r.stringifyData(t, n, !0), l = o + '?' + c, s = a.getExtraModule('ap');
                        r.inWeixin() && 'undefined' != typeof s ? s.pay(l) : r.redirectTo(l)
                    }
                }
            }, {"../mods": 20, "../utils": 23}], 4: [function (e, n, t) {
                var r = e('../utils'), a = e('../callbacks'), i = {}.hasOwnProperty;
                n.exports = {
                    handleCharge: function (e) {
                        var n = e.channel, t = e.credential[n];
                        return i.call(t, 'url') ? void r.redirectTo(t.url + '?' + r.stringifyData(t, n)) : void a.innerCallback('fail', a.error('invalid_credential', 'missing_field:url'))
                    }
                }
            }, {"../callbacks": 1, "../utils": 23}], 5: [function (e, n, t) {
                var r = e('../../utils'), a = e('../../callbacks'), i = {}.hasOwnProperty;
                n.exports = {
                    handleCharge: function (e) {
                        var n, t = e.credential[e.channel];
                        if ('string' == typeof t)n = t; else {
                            if (!i.call(t, 'url'))return void a.innerCallback('fail', a.error('invalid_credential', 'credential format is incorrect'));
                            n = t.url
                        }
                        r.redirectTo(n)
                    }
                }
            }, {"../../callbacks": 1, "../../utils": 23}], 6: [function (e, n, t) {
                var r = e('../utils');
                n.exports = {
                    CP_B2B_URL: 'https://payment.chinapay.com/CTITS/service/rest/page/nref/000000000017/0/0/0/0/0',
                    handleCharge: function (e) {
                        var n = e.credential[e.channel];
                        r.formSubmit(this.CP_B2B_URL, 'post', n)
                    }
                }
            }, {"../utils": 23}], 7: [function (e, n, t) {
                var r = e('../../stash'), a = {}.hasOwnProperty;
                !function () {
                    var e = {}, t = {};
                    t.PADCHAR = '=', t.ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', t.makeDOMException = function () {
                        try {
                            return new DOMException(DOMException.INVALID_CHARACTER_ERR)
                        } catch (e) {
                            var n = new Error('DOM Exception 5');
                            return n.code = n.number = 5, n.name = n.description = 'INVALID_CHARACTER_ERR', n.toString = function () {
                                return 'Error: ' + n.name + ': ' + n.message
                            }, n
                        }
                    }, t.getbyte64 = function (e, n) {
                        var r = t.ALPHA.indexOf(e.charAt(n));
                        if (-1 === r)throw t.makeDOMException();
                        return r
                    }, t.decode = function (e) {
                        e = '' + e;
                        var n, r, a, i = t.getbyte64, o = e.length;
                        if (0 === o)return e;
                        if (o % 4 !== 0)throw t.makeDOMException();
                        n = 0, e.charAt(o - 1) === t.PADCHAR && (n = 1, e.charAt(o - 2) === t.PADCHAR && (n = 2), o -= 4);
                        var c = [];
                        for (r = 0; o > r; r += 4)a = i(e, r) << 18 | i(e, r + 1) << 12 | i(e, r + 2) << 6 | i(e, r + 3), c.push(String.fromCharCode(a >> 16, a >> 8 & 255, 255 & a));
                        switch (n) {
                            case 1:
                                a = i(e, r) << 18 | i(e, r + 1) << 12 | i(e, r + 2) << 6, c.push(String.fromCharCode(a >> 16, a >> 8 & 255));
                                break;
                            case 2:
                                a = i(e, r) << 18 | i(e, r + 1) << 12, c.push(String.fromCharCode(a >> 16))
                        }
                        return c.join('')
                    }, t.getbyte = function (e, n) {
                        var r = e.charCodeAt(n);
                        if (r > 255)throw t.makeDOMException();
                        return r
                    }, t.encode = function (e) {
                        if (1 !== arguments.length)throw new SyntaxError('Not enough arguments');
                        var n, r, a = t.PADCHAR, i = t.ALPHA, o = t.getbyte, c = [];
                        e = '' + e;
                        var l = e.length - e.length % 3;
                        if (0 === e.length)return e;
                        for (n = 0; l > n; n += 3)r = o(e, n) << 16 | o(e, n + 1) << 8 | o(e, n + 2), c.push(i.charAt(r >> 18)), c.push(i.charAt(r >> 12 & 63)), c.push(i.charAt(r >> 6 & 63)), c.push(i.charAt(63 & r));
                        switch (e.length - l) {
                            case 1:
                                r = o(e, n) << 16, c.push(i.charAt(r >> 18) + i.charAt(r >> 12 & 63) + a + a);
                                break;
                            case 2:
                                r = o(e, n) << 16 | o(e, n + 1) << 8, c.push(i.charAt(r >> 18) + i.charAt(r >> 12 & 63) + i.charAt(r >> 6 & 63) + a)
                        }
                        return c.join('')
                    }, e.url = 'pay.htm', e.pay = function (n) {
                        var i = encodeURIComponent(t.encode(n));
                        a.call(r, 'APURL') && (e.url = r.APURL), location.href = e.url + '?goto=' + i
                    }, e.decode = function (e) {
                        return t.decode(decodeURIComponent(e))
                    }, n.exports = e
                }()
            }, {"../../stash": 21}], 8: [function (e, n, t) {
                var r = e('./commons/redirect_base');
                n.exports = {
                    handleCharge: function (e) {
                        r.handleCharge(e)
                    }
                }
            }, {"./commons/redirect_base": 5}], 9: [function (e, n, t) {
                arguments[4][8][0].apply(t, arguments)
            }, {"./commons/redirect_base": 5, dup: 8}], 10: [function (e, n, t) {
                var r = e('../utils'), a = {}.hasOwnProperty;
                n.exports = {
                    JDPAY_WAP_URL_OLD: 'https://m.jdpay.com/wepay/web/pay',
                    JDPAY_H5_URL: 'https://h5pay.jd.com/jdpay/saveOrder',
                    JDPAY_PC_URL: 'https://wepay.jd.com/jdpay/saveOrder',
                    handleCharge: function (e) {
                        var n = e.credential[e.channel], t = this.JDPAY_H5_URL;
                        a.call(n, 'channelUrl') ? (t = n.channelUrl, delete n.channelUrl) : a.call(n, 'merchantRemark') && (t = this.JDPAY_WAP_URL_OLD), r.formSubmit(t, 'post', n)
                    }
                }
            }, {"../utils": 23}], 11: [function (e, n, t) {
                var r = e('../utils');
                n.exports = {
                    UPACP_PC_URL: 'https://gateway.95516.com/gateway/api/frontTransReq.do',
                    handleCharge: function (e) {
                        var n = e.credential[e.channel];
                        r.formSubmit(this.UPACP_PC_URL, 'post', n)
                    }
                }
            }, {"../utils": 23}], 12: [function (e, n, t) {
                var r = e('../utils');
                n.exports = {
                    UPACP_WAP_URL: 'https://gateway.95516.com/gateway/api/frontTransReq.do',
                    handleCharge: function (e) {
                        var n = e.credential[e.channel];
                        r.formSubmit(this.UPACP_WAP_URL, 'post', n)
                    }
                }
            }, {"../utils": 23}], 13: [function (e, n, t) {
                var r = e('../callbacks'), a = e('../utils'), i = e('../stash'), o = e('../mods'), c = {}.hasOwnProperty;
                n.exports = {
                    PINGPP_NOTIFY_URL_BASE: 'https://api.pingxx.com/notify/charges/', handleCharge: function (e) {
                        for (var n = e.credential[e.channel], t = ['appId', 'timeStamp', 'nonceStr', 'package', 'signType', 'paySign'], a = 0; a < t.length; a++)if (!c.call(n, t[a]))return void r.innerCallback('fail', r.error('invalid_credential', 'missing_field_' + t[a]));
                        i.jsApiParameters = n, this.callpay()
                    }, callpay: function () {
                        var e = this, n = o.getExtraModule('wx_jssdk');
                        if ('undefined' != typeof n && n.jssdkEnabled())n.callpay(); else if ('undefined' == typeof WeixinJSBridge) {
                            var t = function () {
                                e.jsApiCall()
                            };
                            document.addEventListener ? document.addEventListener('WeixinJSBridgeReady', t, !1) : document.attachEvent && (document.attachEvent('WeixinJSBridgeReady', t), document.attachEvent('onWeixinJSBridgeReady', t))
                        } else this.jsApiCall()
                    }, jsApiCall: function () {
                        c.call(i, 'jsApiParameters') && WeixinJSBridge.invoke('getBrandWCPayRequest', i.jsApiParameters, function (e) {
                            delete i.jsApiParameters, 'get_brand_wcpay_request:ok' == e.err_msg ? r.innerCallback('success') : 'get_brand_wcpay_request:cancel' == e.err_msg ? r.innerCallback('cancel') : r.innerCallback('fail', r.error('wx_result_fail', e.err_msg))
                        })
                    }, runTestMode: function (e) {
                        var n = confirm('模拟付款？');
                        n && a.request(this.PINGPP_NOTIFY_URL_BASE + e.id + '?livemode=false', 'GET', null, function (e, n) {
                            if (n >= 200 && 400 > n && 'success' == e)r.innerCallback('success'); else {
                                var t = 'http_code:' + n + ';response:' + e;
                                r.innerCallback('fail', r.error('testmode_notify_fail', t))
                            }
                        }, function () {
                            r.innerCallback('fail', r.error('network_err'))
                        })
                    }
                }
            }, {"../callbacks": 1, "../mods": 20, "../stash": 21, "../utils": 23}], 14: [function (e, n, t) {
                var r = e('../utils'), a = e('../callbacks'), i = {}.hasOwnProperty;
                n.exports = {
                    handleCharge: function (e) {
                        var n = e.credential[e.channel];
                        'string' == typeof n ? r.redirectTo(n) : 'object' == typeof n && i.call(n, 'url') ? r.redirectTo(n.url) : a.innerCallback('fail', a.error('invalid_credential', 'credential 格式不正确'))
                    }
                }
            }, {"../callbacks": 1, "../utils": 23}], 15: [function (e, n, t) {
                var r = e('../utils'), a = e('../callbacks'), i = {}.hasOwnProperty;
                n.exports = {
                    YEEPAY_WAP_URL: 'https://ok.yeepay.com/paymobile/api/pay/request',
                    YEEPAY_WAP_TEST_URL: 'http://mobiletest.yeepay.com/paymobile/api/pay/request',
                    handleCharge: function (e) {
                        for (var n = e.channel, t = e.credential[n], o = ['merchantaccount', 'encryptkey', 'data'], c = 0; c < o.length; c++)if (!i.call(t, o[c]))return void a.innerCallback('fail', a.error('invalid_credential', 'missing_field_' + o[c]));
                        var l;
                        l = i.call(t, 'mode') && 'test' == t.mode ? this.YEEPAY_WAP_TEST_URL : this.YEEPAY_WAP_URL, r.redirectTo(l + '?' + r.stringifyData(t, n, !0))
                    }
                }
            }, {"../callbacks": 1, "../utils": 23}], 16: [function (e, n, t) {
                var r = e('./utils'), a = e('./stash'), i = e('./libs/md5'), o = {
                    seperator: '###',
                    limit: 1,
                    report_url: 'https://statistics.pingxx.com/one_stats',
                    timeout: 100
                }, c = function (e, n) {
                    var t = new RegExp('(^|&)' + n + '=([^&]*)(&|$)', 'i'), r = e.substr(0).match(t);
                    return null !== r ? unescape(r[2]) : null
                }, l = function () {
                    return navigator.userAgent
                }, s = function () {
                    return window.location.host
                };
                o.store = function (e) {
                    if ('undefined' != typeof localStorage && null !== localStorage) {
                        var n = this, t = {};
                        t.app_id = e.app_id || a.app_id || 'app_not_defined', t.ch_id = e.ch_id || '', t.channel = e.channel || '', t.type = e.type || '', t.user_agent = l(), t.host = s(), t.time = (new Date).getTime(), t.puid = a.puid;
                        var r = 'app_id=' + t.app_id + '&channel=' + t.channel + '&ch_id=' + t.ch_id + '&host=' + t.host + '&time=' + t.time + '&type=' + t.type + '&user_agent=' + t.user_agent + '&puid=' + t.puid, i = r;
                        null !== localStorage.getItem('PPP_ONE_STATS') && 0 !== localStorage.getItem('PPP_ONE_STATS').length && (i = localStorage.getItem('PPP_ONE_STATS') + n.seperator + r);
                        try {
                            localStorage.setItem('PPP_ONE_STATS', i)
                        } catch (o) {
                        }
                    }
                }, o.send = function () {
                    if ('undefined' != typeof localStorage && null !== localStorage) {
                        var e = this, n = localStorage.getItem('PPP_ONE_STATS');
                        if (!(null === n || n.split(e.seperator).length < e.limit))try {
                            for (var t = [], a = n.split(e.seperator), o = i(a.join('&')), l = 0; l < a.length; l++)t.push({
                                app_id: c(a[l], 'app_id'),
                                channel: c(a[l], 'channel'),
                                ch_id: c(a[l], 'ch_id'),
                                host: c(a[l], 'host'),
                                time: c(a[l], 'time'),
                                type: c(a[l], 'type'),
                                user_agent: c(a[l], 'user_agent'),
                                puid: c(a[l], 'puid')
                            });
                            r.request(e.report_url, 'POST', t, function (e, n) {
                                200 == n && localStorage.removeItem('PPP_ONE_STATS')
                            }, void 0, {'X-Pingpp-Report-Token': o})
                        } catch (s) {
                        }
                    }
                }, o.report = function (e) {
                    var n = this;
                    n.store(e), setTimeout(function () {
                        n.send()
                    }, n.timeout)
                }, n.exports = o
            }, {"./libs/md5": 18, "./stash": 21, "./utils": 23}], 17: [function (e, n, t) {
                var r = e('./stash'), a = e('./utils'), i = e('./collection');
                n.exports = {
                    SRC_URL: 'https://cookie.pingxx.com', init: function () {
                        var e = this;
                        a.documentReady(function () {
                            e.initPuid()
                        })
                    }, initPuid: function () {
                        if ('undefined' != typeof window && 'undefined' != typeof localStorage) {
                            var e = localStorage.getItem('pingpp_uid');
                            if (null === e) {
                                e = a.randomString();
                                try {
                                    localStorage.setItem('pingpp_uid', e)
                                } catch (n) {
                                }
                            }
                            if (r.puid = e, !document.getElementById('p_analyse_iframe')) {
                                var t = document.createElement('iframe');
                                t.id = 'p_analyse_iframe', t.src = this.SRC_URL + '/?puid=' + e, t.style.display = 'none', document.body.appendChild(t)
                            }
                            setTimeout(function () {
                                i.send()
                            }, 0)
                        }
                    }
                }
            }, {"./collection": 16, "./stash": 21, "./utils": 23}], 18: [function (e, n, t) {
                !function () {
                    function e(e, n) {
                        var t = (65535 & e) + (65535 & n), r = (e >> 16) + (n >> 16) + (t >> 16);
                        return r << 16 | 65535 & t
                    }

                    function t(e, n) {
                        return e << n | e >>> 32 - n
                    }

                    function r(n, r, a, i, o, c) {
                        return e(t(e(e(r, n), e(i, c)), o), a)
                    }

                    function a(e, n, t, a, i, o, c) {
                        return r(n & t | ~n & a, e, n, i, o, c)
                    }

                    function i(e, n, t, a, i, o, c) {
                        return r(n & a | t & ~a, e, n, i, o, c)
                    }

                    function o(e, n, t, a, i, o, c) {
                        return r(n ^ t ^ a, e, n, i, o, c)
                    }

                    function c(e, n, t, a, i, o, c) {
                        return r(t ^ (n | ~a), e, n, i, o, c)
                    }

                    function l(n, t) {
                        n[t >> 5] |= 128 << t % 32, n[(t + 64 >>> 9 << 4) + 14] = t;
                        var r, l, s, u, d, p = 1732584193, f = -271733879, h = -1732584194, _ = 271733878;
                        for (r = 0; r < n.length; r += 16)l = p, s = f, u = h, d = _, p = a(p, f, h, _, n[r], 7, -680876936), _ = a(_, p, f, h, n[r + 1], 12, -389564586), h = a(h, _, p, f, n[r + 2], 17, 606105819), f = a(f, h, _, p, n[r + 3], 22, -1044525330), p = a(p, f, h, _, n[r + 4], 7, -176418897), _ = a(_, p, f, h, n[r + 5], 12, 1200080426), h = a(h, _, p, f, n[r + 6], 17, -1473231341), f = a(f, h, _, p, n[r + 7], 22, -45705983), p = a(p, f, h, _, n[r + 8], 7, 1770035416), _ = a(_, p, f, h, n[r + 9], 12, -1958414417), h = a(h, _, p, f, n[r + 10], 17, -42063), f = a(f, h, _, p, n[r + 11], 22, -1990404162), p = a(p, f, h, _, n[r + 12], 7, 1804603682), _ = a(_, p, f, h, n[r + 13], 12, -40341101), h = a(h, _, p, f, n[r + 14], 17, -1502002290), f = a(f, h, _, p, n[r + 15], 22, 1236535329), p = i(p, f, h, _, n[r + 1], 5, -165796510), _ = i(_, p, f, h, n[r + 6], 9, -1069501632), h = i(h, _, p, f, n[r + 11], 14, 643717713), f = i(f, h, _, p, n[r], 20, -373897302), p = i(p, f, h, _, n[r + 5], 5, -701558691), _ = i(_, p, f, h, n[r + 10], 9, 38016083), h = i(h, _, p, f, n[r + 15], 14, -660478335), f = i(f, h, _, p, n[r + 4], 20, -405537848), p = i(p, f, h, _, n[r + 9], 5, 568446438), _ = i(_, p, f, h, n[r + 14], 9, -1019803690), h = i(h, _, p, f, n[r + 3], 14, -187363961), f = i(f, h, _, p, n[r + 8], 20, 1163531501), p = i(p, f, h, _, n[r + 13], 5, -1444681467), _ = i(_, p, f, h, n[r + 2], 9, -51403784), h = i(h, _, p, f, n[r + 7], 14, 1735328473), f = i(f, h, _, p, n[r + 12], 20, -1926607734), p = o(p, f, h, _, n[r + 5], 4, -378558), _ = o(_, p, f, h, n[r + 8], 11, -2022574463), h = o(h, _, p, f, n[r + 11], 16, 1839030562), f = o(f, h, _, p, n[r + 14], 23, -35309556), p = o(p, f, h, _, n[r + 1], 4, -1530992060), _ = o(_, p, f, h, n[r + 4], 11, 1272893353), h = o(h, _, p, f, n[r + 7], 16, -155497632), f = o(f, h, _, p, n[r + 10], 23, -1094730640), p = o(p, f, h, _, n[r + 13], 4, 681279174), _ = o(_, p, f, h, n[r], 11, -358537222), h = o(h, _, p, f, n[r + 3], 16, -722521979), f = o(f, h, _, p, n[r + 6], 23, 76029189), p = o(p, f, h, _, n[r + 9], 4, -640364487), _ = o(_, p, f, h, n[r + 12], 11, -421815835), h = o(h, _, p, f, n[r + 15], 16, 530742520), f = o(f, h, _, p, n[r + 2], 23, -995338651), p = c(p, f, h, _, n[r], 6, -198630844), _ = c(_, p, f, h, n[r + 7], 10, 1126891415), h = c(h, _, p, f, n[r + 14], 15, -1416354905), f = c(f, h, _, p, n[r + 5], 21, -57434055), p = c(p, f, h, _, n[r + 12], 6, 1700485571), _ = c(_, p, f, h, n[r + 3], 10, -1894986606), h = c(h, _, p, f, n[r + 10], 15, -1051523), f = c(f, h, _, p, n[r + 1], 21, -2054922799), p = c(p, f, h, _, n[r + 8], 6, 1873313359), _ = c(_, p, f, h, n[r + 15], 10, -30611744), h = c(h, _, p, f, n[r + 6], 15, -1560198380), f = c(f, h, _, p, n[r + 13], 21, 1309151649), p = c(p, f, h, _, n[r + 4], 6, -145523070), _ = c(_, p, f, h, n[r + 11], 10, -1120210379), h = c(h, _, p, f, n[r + 2], 15, 718787259), f = c(f, h, _, p, n[r + 9], 21, -343485551), p = e(p, l), f = e(f, s), h = e(h, u), _ = e(_, d);
                        return [p, f, h, _]
                    }

                    function s(e) {
                        var n, t = '';
                        for (n = 0; n < 32 * e.length; n += 8)t += String.fromCharCode(e[n >> 5] >>> n % 32 & 255);
                        return t
                    }

                    function u(e) {
                        var n, t = [];
                        for (t[(e.length >> 2) - 1] = void 0, n = 0; n < t.length; n += 1)t[n] = 0;
                        for (n = 0; n < 8 * e.length; n += 8)t[n >> 5] |= (255 & e.charCodeAt(n / 8)) << n % 32;
                        return t
                    }

                    function d(e) {
                        return s(l(u(e), 8 * e.length))
                    }

                    function p(e, n) {
                        var t, r, a = u(e), i = [], o = [];
                        for (i[15] = o[15] = void 0, a.length > 16 && (a = l(a, 8 * e.length)), t = 0; 16 > t; t += 1)i[t] = 909522486 ^ a[t], o[t] = 1549556828 ^ a[t];
                        return r = l(i.concat(u(n)), 512 + 8 * n.length), s(l(o.concat(r), 640))
                    }

                    function f(e) {
                        var n, t, r = '0123456789abcdef', a = '';
                        for (t = 0; t < e.length; t += 1)n = e.charCodeAt(t), a += r.charAt(n >>> 4 & 15) + r.charAt(15 & n);
                        return a
                    }

                    function h(e) {
                        return unescape(encodeURIComponent(e))
                    }

                    function _(e) {
                        return d(h(e))
                    }

                    function y(e) {
                        return f(_(e))
                    }

                    function m(e, n) {
                        return p(h(e), h(n))
                    }

                    function g(e, n) {
                        return f(m(e, n))
                    }

                    function v(e, n, t) {
                        return n ? t ? m(n, e) : g(n, e) : t ? _(e) : y(e)
                    }

                    n.exports = v
                }()
            }, {}], 19: [function (e, n, t) {
                var r = e('./version').v, a = e('./testmode'), i = e('./callbacks'), o = e('./mods'), c = e('./stash'), l = e('./collection'), s = {}.hasOwnProperty, PingppSDK = function () {
                    e('./init').init()
                };
                PingppSDK.prototype = {
                    version: r, createPayment: function (e, n, t, r) {
                        'function' == typeof n && (i.userCallback = n);
                        var u;
                        if ('string' == typeof e)try {
                            u = JSON.parse(e)
                        } catch (d) {
                            return void i.innerCallback('fail', i.error('json_decode_fail', d))
                        } else u = e;
                        if ('undefined' == typeof u)return void i.innerCallback('fail', i.error('json_decode_fail'));
                        if (!s.call(u, 'id'))return void i.innerCallback('fail', i.error('invalid_charge', 'no_charge_id'));
                        if (!s.call(u, 'channel'))return void i.innerCallback('fail', i.error('invalid_charge', 'no_channel'));
                        s.call(u, 'app') && ('string' == typeof u.app ? c.app_id = u.app : 'object' == typeof u.app && 'string' == typeof u.app.id && (c.app_id = u.app.id)), l.report({
                            type: 'pure_sdk_click',
                            channel: u.channel,
                            ch_id: u.id
                        });
                        var p = u.channel;
                        if (!s.call(u, 'credential'))return void i.innerCallback('fail', i.error('invalid_charge', 'no_credential'));
                        if (!u.credential)return void i.innerCallback('fail', i.error('invalid_credential', 'credential_is_undefined'));
                        if (!s.call(u.credential, p))return void i.innerCallback('fail', i.error('invalid_credential', 'credential_is_incorrect'));
                        if (!s.call(u, 'livemode'))return void i.innerCallback('fail', i.error('invalid_charge', 'no_livemode_field'));
                        var f = o.getChannelModule(p);
                        return 'undefined' == typeof f ? (console.error('channel module "' + p + '" is undefined'), void i.innerCallback('fail', i.error('invalid_channel', 'channel module "' + p + '" is undefined'))) : u.livemode === !1 ? void(s.call(f, 'runTestMode') ? f.runTestMode(u) : a.runTestMode(u)) : ('undefined' != typeof t && (c.signature = t), 'boolean' == typeof r && (c.debug = r), void f.handleCharge(u))
                    }, setAPURL: function (e) {
                        c.APURL = e
                    }
                }, n.exports = new PingppSDK
            }, {
                "./callbacks": 1,
                "./collection": 16,
                "./init": 17,
                "./mods": 20,
                "./stash": 21,
                "./testmode": 22,
                "./version": 24
            }], 20: [function (e, n, t) {
                var r = {}.hasOwnProperty, a = {};
                n.exports = a, a.channels = {
                    alipay_pc_direct: e('./channels/alipay_pc_direct'),
                    alipay_wap: e('./channels/alipay_wap'),
                    bfb_wap: e('./channels/bfb_wap'),
                    cp_b2b: e('./channels/cp_b2b'),
                    fqlpay_qr: e('./channels/fqlpay_qr'),
                    fqlpay_wap: e('./channels/fqlpay_wap'),
                    jdpay_wap: e('./channels/jdpay_wap'),
                    upacp_pc: e('./channels/upacp_pc'),
                    upacp_wap: e('./channels/upacp_wap'),
                    wx_pub: e('./channels/wx_pub'),
                    wx_wap: e('./channels/wx_wap'),
                    yeepay_wap: e('./channels/yeepay_wap')
                }, a.extras = {ap: e('./channels/extras/ap')}, a.getChannelModule = function (e) {
                    return r.call(a.channels, e) ? a.channels[e] : void 0
                }, a.getExtraModule = function (e) {
                    return r.call(a.extras, e) ? a.extras[e] : void 0
                }
            }, {
                "./channels/alipay_pc_direct": 2,
                "./channels/alipay_wap": 3,
                "./channels/bfb_wap": 4,
                "./channels/cp_b2b": 6,
                "./channels/extras/ap": 7,
                "./channels/fqlpay_qr": 8,
                "./channels/fqlpay_wap": 9,
                "./channels/jdpay_wap": 10,
                "./channels/upacp_pc": 11,
                "./channels/upacp_wap": 12,
                "./channels/wx_pub": 13,
                "./channels/wx_wap": 14,
                "./channels/yeepay_wap": 15
            }], 21: [function (e, n, t) {
                n.exports = {}
            }, {}], 22: [function (e, n, t) {
                var r = e('./utils'), a = {}.hasOwnProperty;
                n.exports = {
                    PINGPP_MOCK_URL: 'http://sissi.pingxx.com/mock.php', runTestMode: function (e) {
                        var n = {ch_id: e.id, scheme: 'http', channel: e.channel};
                        a.call(e, 'order_no') ? n.order_no = e.order_no : a.call(e, 'orderNo') && (n.order_no = e.orderNo), a.call(e, 'time_expire') ? n.time_expire = e.time_expire : a.call(e, 'timeExpire') && (n.time_expire = e.timeExpire), a.call(e, 'extra') && (n.extra = encodeURIComponent(JSON.stringify(e.extra))), r.redirectTo(this.PINGPP_MOCK_URL + '?' + r.stringifyData(n))
                    }
                }
            }, {"./utils": 23}], 23: [function (e, n, t) {
                var r = {}.hasOwnProperty, a = n.exports = {
                    stringifyData: function (e, n, t) {
                        'undefined' == typeof t && (t = !1);
                        var a = [];
                        for (var i in e)r.call(e, i) && 'function' != typeof e[i] && ('bfb_wap' == n && 'url' == i || 'yeepay_wap' == n && 'mode' == i || 'channel_url' != i && a.push(i + '=' + (t ? encodeURIComponent(e[i]) : e[i])));
                        return a.join('&')
                    }, request: function (e, n, t, i, o, c) {
                        if ('undefined' == typeof XMLHttpRequest)return void console.log('Function XMLHttpRequest is undefined.');
                        var l = new XMLHttpRequest;
                        if ('undefined' != typeof l.timeout && (l.timeout = 6e3), n = n.toUpperCase(), 'GET' === n && 'object' == typeof t && t && (e += '?' + a.stringifyData(t, '', !0)), l.open(n, e, !0), 'undefined' != typeof c)for (var s in c)r.call(c, s) && l.setRequestHeader(s, c[s]);
                        'POST' === n ? (l.setRequestHeader('Content-type', 'application/json; charset=utf-8'), l.send(JSON.stringify(t))) : l.send(), 'undefined' == typeof i && (i = function () {
                        }), 'undefined' == typeof o && (o = function () {
                        }), l.onreadystatechange = function () {
                            4 == l.readyState && i(l.responseText, l.status, l)
                        }, l.onerror = function (e) {
                            o(l, 0, e)
                        }
                    }, formSubmit: function (e, n, t) {
                        if ('undefined' == typeof window)return void console.log('Not a browser, form submit url: ' + e);
                        var a = document.createElement('form');
                        a.setAttribute('method', n), a.setAttribute('action', e);
                        for (var i in t)if (r.call(t, i)) {
                            var o = document.createElement('input');
                            o.setAttribute('type', 'hidden'), o.setAttribute('name', i), o.setAttribute('value', t[i]), a.appendChild(o)
                        }
                        document.body.appendChild(a), a.submit()
                    }, randomString: function (e) {
                        'undefined' == typeof e && (e = 32);
                        for (var n = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', t = n.length, r = '', a = 0; e > a; a++)r += n.charAt(Math.floor(Math.random() * t));
                        return r
                    }, redirectTo: function (e) {
                        return 'undefined' == typeof window ? void console.log('Not a browser, redirect url: ' + e) : void(window.location.href = e)
                    }, inWeixin: function () {
                        if ('undefined' == typeof navigator)return !1;
                        var e = navigator.userAgent.toLowerCase();
                        return -1 !== e.indexOf('micromessenger')
                    }, documentReady: function (e) {
                        return 'undefined' == typeof document ? void e() : void('loading' != document.readyState ? e() : document.addEventListener('DOMContentLoaded', e))
                    }
                }
            }, {}], 24: [function (e, n, t) {
                n.exports = {v: '2.1.5'}
            }, {}]
        }, {}, [19])(19)
    });
})