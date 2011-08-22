var g_ctx = null;

function draw_circle(x, y, radius, color)
{
	g_ctx.fillStyle = color;
	g_ctx.beginPath();
	g_ctx.arc(x, y, radius, 0, Math.PI*2, true);
	g_ctx.fill();
}

function Bubble(x, y) {
	var o = new Object();
	o.x = x;
	o.y = y;
	o.draw = function() {
        	draw_circle(this.x, this.y, 250, "rgba(0, 0, 0, 0.01)");
	}
	return o;
}

app.core.Object.define("app.view.Space", {
    extend: app.core.Object,
    constructor: function () {
        arguments.callee.prototype.uper.apply(this, arguments); //call parent constructor

        this.__append();
        this.__shapes = [];

		bubbles = new Array();
		for (var i = 0; i < 10; ++i) {
			var x = Math.random() * this.__width;
			var y = Math.random() * this.__height;
			bubbles.push(Bubble(x, y));
		}
    },
    statics: {},
    members: {
        __ctx: null,
        __canvas: null,
        __shapes: null,
        __height: null,
        __width: null,
        bubbles: Array(),

        __time: 0,
        __counter: 0,
        __fps: 9999,

        __score: 0,

        increaseScore: function (number) {
           this.__score += number;
        },

        __onResize: function () {
            var win = this.getWindow();

            this.__canvas.width  = this.__width  = win.innerWidth;
            this.__canvas.height = this.__height = win.innerHeight;
        },

        __drawFps: function (count, n) {
            var ctx = this.__ctx;

            if (Date.now() > this.__time + 1000) {

                this.__fps     = this.__counter;
                this.__time    = Date.now();
                this.__counter = 0;

            } else {
                this.__counter += 1;
            }

            ctx.fillStyle = "black";
            ctx.font      = "bold 16px Arial";
            ctx.fillText("Fps: " + this.__fps, 6, 16);
            ctx.fillText("Objs: " + this.__shapes.length, 6, 36);
            ctx.fillText("Score: " + this.__score, 6, 56);
            ctx.fillText("Tests: " + count + "/" + (n*(n-1)), 6, 76);
        },

        __append: function () {
            var win = this.getWindow(),
            doc     = this.getDocument(),
            space   = doc.createElement('canvas'),
            ctx     = space.getContext("2d");

            doc.body.style.cssText += "overflow: hidden;";

            g_ctx = ctx;
            this.__ctx    = ctx;
            this.__canvas = space;

            space.width  = this.__width  = 500;//= win.innerWidth;
            space.height = this.__height = 500;//= win.innerHeight;

            //win.addEventListener("resize", this.__onResize.bind(this), false);

            doc.body.insertBefore(space, doc.body.firstChild);
        },

        getBoundaries: function () {
           return [0, 0, this.__width, this.__height];
        },

        addShape: function (shape) {
            this.__shapes.push(shape);
        },

        removeShape: function (model) {
           var shapes = this.__shapes;

            for (var i = 0, len = shapes.length, shape, index; i < len; i++) {
                shape = shapes[i];

                if (shape && shape.__model == model) {
                    index =  shapes.indexOf(shape);

                    shapes.splice(index, 1);
                }
            }
        },

        render: function (count, n) {
            var shape,
                shapes = this.__shapes,
                ctx    = this.__ctx;

            //ctx.clearRect(0, 0, this.__width, this.__height);
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, this.__width, this.__height);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(0, 0, this.__width -1, this.__height - 1);
            
			$.each(bubbles, function(index, obj) {
				obj.draw();
			});
            
            this.__drawFps(count, n);

            for (var i = 0, len = shapes.length; i < len; i++) {
                shapes[i].render(ctx);
            }

        }
    }
});
