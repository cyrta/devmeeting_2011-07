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
        	this.__boundingBox = ritterSphere(this.__vertices);
        },

        /*rotate: function (angle) {
            //TODO
        },*/

        /*changeOrientation: function (angle) {
        	this.__orientation -= angle * ANGULAR_ACCELERATION;
        },*/

        /*increaseVelocity: function (x) {
        	this.__velocity[0] += x * Math.cos(this.__orientation * Math.PI/180) * ACCELERATION;
        	this.__velocity[1] += x * Math.sin(this.__orientation * Math.PI/180) * ACCELERATION;
        },*/

        integrate: function (duration) { // poruszanie obiektu
        	vec3.add(this.__position, this.__velocity);
        	this.__orientation += this.__angularVelocity;
        	
        	while (this.__orientation < 0)
        		this.__orientation += 360;
        	while (this.__orientation >= 360)
        		this.__orientation -= 360;
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
            velocity = vec3.create();
            vec3.scale(direction, 2, velocity);

            var ori = (this.__orientation + 90) * Math.PI/180;
            var x = vertex[0]*Math.cos(ori) - vertex[1]*Math.sin(ori);
            var y = vertex[0]*Math.sin(ori) + vertex[1]*Math.cos(ori);
            
            vec3.add(velocity, this.__velocity);

            var out = new app.model.Bullet(
                vec3.create([
                    x + this.getX(),
                    y + this.getY(), 0]),
                velocity,
                0);
            out.__orientation = this.__orientation-180;
            return out;
        },

        destroy: function () {
            //TODO destroy asteroid
        }
    }
});
