var KEY_LEFT  = 0;
var KEY_RIGHT = 1;
var KEY_UP    = 2;
var KEY_DOWN  = 3;
var KEY_SHOOT = 4;

app.core.Object.define("app.event.Keyboard", {
    extend: app.event.Object,
    constructor: function () {
        arguments.callee.prototype.uper.apply(this, arguments); //call parent constructor

        this.__queue = [];

        this.__init();
    },
    statics: {},
    members: {
        __interval: null,
        __queue: null,
        __last: null,
        state: [false, false, false, false, false],

        __init: function () {
            var window = this.getWindow();
            window.addEventListener("keydown", this.__onKeyDown.bind(this), false);
            window.addEventListener("keyup", this.__onKeyUp.bind(this), false);

        },

        __onKeyDown: function (event) {
            this.__push(this.__map(event));
            switch (event.keyCode)
            {
            case 37: this.state[KEY_LEFT]  = true; break;
            case 39: this.state[KEY_RIGHT] = true; break;
            case 38: this.state[KEY_UP]    = true; break;
            case 40: this.state[KEY_DOWN]  = true; break;
            case 32: this.state[KEY_SHOOT] = true; break;
            }
            event.stopPropagation();
        },

        __onKeyUp: function(event)
        {
            switch (event.keyCode)
            {
            case 37: this.state[KEY_LEFT]  = false; break;
            case 39: this.state[KEY_RIGHT] = false; break;
            case 38: this.state[KEY_UP]    = false; break;
            case 40: this.state[KEY_DOWN]  = false; break;
            case 32: this.state[KEY_SHOOT] = false; break;
            }
            event.stopPropagation();
        },

        loop: function () {
            var queue  = this.__queue;
            var time   = +new Date();
            var last   = queue[queue.length - 1];

            if (last && last[2] && (time - last[2] < 25)) {
                if (last != this.__last) {
                    this._last = last;
                    this.fireDataEvent("press", last);
                }
            }
            else {
                this.__queue = [];
            }

        },

        __push: function (item) {
            var queue  = this.__queue;

            queue.push(item);

            if (queue.length > 10) {
                queue.shift();
            }
        },

        __map: function (keyboardEvent) {
            var eventCode;
            switch (keyboardEvent.keyCode) {
                case 37:
                    eventCode = app.event.Object.LEFT;
                    break;
                case 38:
                    eventCode = app.event.Object.UP;
                    break;
                case 39:
                    eventCode = app.event.Object.RIGHT;
                    break;
                case 40:
                    eventCode = app.event.Object.DOWN;
                    break;
                case 87:
                case 83:
                case 81:
                case 32:
                case 65:
                    eventCode = app.event.Object.FIRE;
                    break;

            }

            return [keyboardEvent.type, eventCode, +new Date()];
        }
    }
});
