"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function preloadimages(arr) {

    var newimages = [];
    var loadedimages = 0;
    var postaction = function postaction() {};
    var arr = (typeof arr === "undefined" ? "undefined" : _typeof(arr)) != "object" ? [arr] : arr;

    function imageloadpost() {
        loadedimages++;
        if (loadedimages == arr.length) {
            postaction(newimages);
        }
    }
    for (var i = 0; i < arr.length; i++) {
        newimages[i] = new Image();
        newimages[i].src = arr[i];
        newimages[i].onload = function () {
            imageloadpost();
        };
        newimages[i].onerror = function () {
            imageloadpost();
        };
    }
    return {
        done: function done(f) {
            postaction = f || postaction;
        }
    };
}

function iOSversion() {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
        var v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
    }
}
