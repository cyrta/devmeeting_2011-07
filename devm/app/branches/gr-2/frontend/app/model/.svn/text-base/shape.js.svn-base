app.core.Object.define("app.model.Shape", {
    extend: app.core.Object,
    constructor: function (position, velocity, angularVelocity, orientation) {
        arguments.callee.prototype.uper.apply(this, arguments); //call parent constructor

        this.__position = position || vec3.create();
        this.__velocity = velocity || vec3.create();
        this.__angularVelocity = angularVelocity || 0;

        this.__orientation =  orientation || 0;
        this.__isColliding = false;
        this.__hitCount = 0;

        this.__init();
    },
    statics: {},
    members: {
        __angularVelocity: null,
        __vertices: null,

        __boundingBox: null,

        __position: null,
        __velocity: null,
        __orientation: null,
        __isColliding: false,
        __hitCount: 0,



        __init: function () {
            this.__createBoundingBox();
        },

        __createBoundingBox: function () {
            this.__boundingBox = ritterSphere(this.__vertices); 
            this.__boundingBox.c = this.__position;
        },
        getHits : function(){
            return this.__hitCount;
        },
        addHit: function(){
            this.__hitCount++;
        },

        rotate: function (angle) {
            var v,i,vertices = this.__vertices || [];
            var x,y, sin, cos;
            sin = Math.sin(angle * Math.PI/180);
            cos = Math.cos(angle * Math.PI/180);
            
            for(i=0;i<vertices.length;++i){
                x = vertices[i][0];
                y = vertices[i][1];
                vertices[i][0] = (cos*x) - (sin*y);
                vertices[i][1] =(sin*x)+(cos*y);
            }
            
        },

        changeOrientation: function (angle) {
            angle = -angle;
            this.__orientation = (this.__orientation + angle)%360;
            this.rotate(angle);
        },

        increaseVelocity: function () {
            var delta = vec3.create(
                   [Math.cos(this.__orientation * Math.PI/180), 
                    Math.sin(this.__orientation * Math.PI/180),
                     0]
                );
            vec3.scale(delta,0.01);
                
            vec3.add(this.__velocity,delta);
        },

        integrate: function (duration) {
            var posDelta = vec3.scale(this.__velocity, duration, vec3.create());
            vec3.add(this.__position, posDelta);

            if (this.__angularVelocity) {
                this.changeOrientation(this.__angularVelocity);
            }
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
        
        getIsColliding: function() {
            return this.__isColliding;
        },
        
        setColliding: function(val) {
            this.__isColliding = val?true:false;
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
