app.core.Object.define("app.model.Shape", {
    extend: app.core.Object,
    constructor: function (position, velocity, angularVelocity, orientation) {
        arguments.callee.prototype.uper.apply(this, arguments); //call parent constructor

        this.__position = position || vec3.create();
        this.__velocity = velocity || vec3.create();
        this.__angularVelocity = angularVelocity || 0;

        this.__orientation = orientation || 0;

        this.__init();
    },
    statics: {},
    members: {
        __angularVelocity: null,
        __vertices: null,

        __boundingBox: null,

        __position: null,
        __velocity: null,
        // __rotation: null,


        __init: function () {
            this.__createBoundingBox();
        },

        __createBoundingBox: function () {
            this.__boundingBox = ritterSphere(this.__vertices)
            this.__boundingBox.c = this.__position
        },

        __rotateVertex: function(angle, vertex) {
            var sin = Math.sin(angle * Math.PI / 180)
            var cos = Math.cos(angle * Math.PI / 180)

            vec3.set([
                vertex[0] * cos - vertex[1] * sin,
                vertex[0] * sin + vertex[1] * cos,
                0
            ], vertex)
        },

        rotate: function (angle) {
            this.__orientation += angle;
            for each (var vertex in this.__vertices) {
                this.__rotateVertex(angle, vertex)
            }
        },



        changeOrientation: function (angle) {
            this.rotate(angle)
        },

        increaseVelocity: function () {
            var accel = vec3.create([0.01, 0, 0])
            this.__rotateVertex(this.__orientation, accel)
            vec3.add(this.__velocity, accel)

        },

        integrate: function (duration) {
            vec3.add(this.__position, vec3.scale(this.__velocity, duration, vec3.create()))
            this.changeOrientation(this.__angularVelocity)
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
            this.__position[1] = value;
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

        getBoundingBox: function () {
            return this.__boundingBox;
        },

        createBullet: function () {
            var vertex = this.__vertices[0],
                direction = vec3.create([
                    Math.cos(this.__orientation * Math.PI / 180),
                    Math.sin(this.__orientation * Math.PI / 180),
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
