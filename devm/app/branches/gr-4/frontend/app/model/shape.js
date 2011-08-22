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
            this.__boundingBox = ritterSphere(this.getVertices());
            this.__boundingBox.c = this.__position;
        },

        rotate: function (angle) {
						var vertices = this.__vertices, sin, cos, x, y;

            this.__orientation += angle;

            if(this.__orientation > 360) {
              this.__orientation = this.__orientation % 360;
            }

            cos = Math.cos(angle*Math.PI/180),
            sin = Math.sin(angle*Math.PI/180);

            for (var i = 0, len = vertices.length; i < len; i++) {
                x = vertices[i][0];
                y = vertices[i][1];
                vertices[i][0] = cos*x - sin*y;
                vertices[i][1] = sin*x + cos*y;
            }
        },

        changeOrientation: function (angle) {
          //this.__orientation += angle;

					this.rotate(angle*(-1));
        },

        increaseVelocity: function () {
            var velocity = this.__velocity;
            var dir = vec3.create([
              0.001*Math.cos(this.__orientation*Math.PI/180),
              0.001*Math.sin(this.__orientation*Math.PI/180),
              0
            ]);
            
            vec3.add(velocity, dir);
        },

        integrate: function (duration) {
            this.__position = vec3.add(this.getPosition(), vec3.scale(this.getVelocity(), duration, vec3.create()));
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

        getBoundingBox: function () {
            return this.__boundingBox;
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