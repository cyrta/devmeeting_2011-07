app.core.Object.define("app.model.Shape", {
    extend: app.core.Object,
    constructor: function (position, velocity, angularVelocity, orientation) {
        arguments.callee.prototype.uper.apply(this, arguments); //call parent constructor

        this.__position = position || vec3.create();
        this.__velocity = velocity || vec3.create();
        this.__angularVelocity = angularVelocity || 0;

        this.__orientation =  orientation || 0;

        this.__init();
    },
    statics: {},
    members: {
        __angularVelocity: null,
        __vertices: null,

        __boundingBox: null,

        __position: null,
        __velocity: null,
        __rotation: null,


        __init: function () {
            this.__createBoundingBox();
        },

        __createBoundingBox: function () {
            var sphere = ritterSphere(this.__vertices);

            this.__boundingBox = {
                centerDelta: sphere.c,
                radius: sphere.r
            };
        },

        rotate: function (angle) {
            //TODO
        },

        changeOrientation: function (angle) {
            var v, x, y, i, len,
                rad, cosa, sina,
                dx, dy;

            this.__orientation += angle;

            rad = -angle * Math.PI / 180;
            cosa = Math.cos(rad);
            sina = Math.sin(rad);

            dx = -this.__boundingBox.centerDelta[0];
            dy = -this.__boundingBox.centerDelta[1];

            for (i = 0, len = this.__vertices.length; i < len; i++) {
                v = this.__vertices[i];
                x = v[0] + dx;
                y = v[1] + dy;

                this.__vertices[i] = vec3.create([
                    (x * cosa - y * sina) - dx,
                    (x * sina + y * cosa) - dy,
                    0
                ]);
            }
        },

        increaseVelocity: function (sgn) {
            var rad, cosa, sina, scale;

            rad = this.__orientation * Math.PI / 180;
            cosa = Math.cos(rad);
            sina = Math.sin(rad);

            sgn = sgn || 1;
            scale = 0.5;

            vec3.add(this.__velocity,
                     vec3.create([
                        sgn * (cosa - sina) * scale,
                        -sgn * (sina + cosa) * scale,
                        0
                     ]));
        },

        decreseVelocity: function () {
            this.increaseVelocity(-1);
        },

        integrate: function (duration) {
            vec3.add(this.__position,
                     vec3.scale(this.__velocity, duration, vec3.create()));
        },

        getPosition: function () {
            return this.__position;
        },

        getInverseMass: function () {
          return 1;
        },

        setVelocity: function (value) {
            this.__velocity = value;
        },

        getVelocity: function (value) {
            return this.__velocity;
        },

        setX: function (value) {
            this.__position[0] = value;
        },

        setY: function (value) {
            this.__position[1]= value;
        },

        getX: function () {
            return this.__position[0];
        },

        getY: function () {
            return this.__position[1];
        },

        getVertices: function () {
            return this.__vertices;
        },

        getCorrectVertices: function () {
            var v0 = this.getVertices(),
                v = [],
                i, k, p;
            for (i = 0, k = v0.length; i < k; i++) {
                p = vec3.create();
                vec3.add(v0[i], this.__position, p);
                v.push(p);
            }

            return v;
        },

        getBoundingBox: function () {
            var c = vec3.create();
            vec3.add(this.__boundingBox.centerDelta, this.__position, c);

            return {
                c: c,
                r: this.__boundingBox.radius
            };
        },

        createBullet: function () {
            var vertex = this.__vertices[0],
            direction = vec3.create([
                Math.cos(this.__orientation * Math.PI/180),
                Math.sin(this.__orientation * Math.PI/180),
                0
            ]),
            velocity = vec3.scale(direction, 0.25);

            vec3.add(velocity, this.__velocity);

            return new app.model.Bullet(
                vec3.create([
                    vertex[0] + this.getX(),
                    vertex[1] + this.getY(), 0]),
                velocity,
                0);
        },

        destroy: function () {
            //TODO destroy asteroid
        }
    }
});
