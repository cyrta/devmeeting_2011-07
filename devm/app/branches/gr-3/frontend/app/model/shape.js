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
            //TODO
            this.__boundingBox = ritterSphere(this.__vertices);
            this.__boundingBox.c = this.__position;
        },

        rotate: function (angle) {
            //TODO
			this.__orientation += angle;
        	
           var sin = Math.sin(angle * Math.PI/180); 
           var cos = Math.cos(angle * Math.PI/180);
        	
           for(var o = 0, len = this.__vertices.length; o < len; o++ )
           {
        	   var xx = this.__vertices[o][0];
        	   var yy = this.__vertices[o][1];
        	   /**/
        	   x = (cos * xx) - (sin * yy); 
        	   y = (sin * xx) + (cos * yy);
        	   /**/
        	   
        	   this.__vertices[o][0]=x;
        	   this.__vertices[o][1]=y;
        	   
           }
        },

        changeOrientation: function (angle) {
            //TODO
            this.rotate(-angle);
        },

        increaseVelocity: function () {
            //TODO
            vec3.add(this.__velocity, vec3.create( [ 0.5* Math.cos(Math.PI*this.__orientation/180), 
             0.5* Math.sin(Math.PI*this.__orientation/180), 0]), this.__velocity);
        },

        integrate: function (duration) {
            //TODO
        	if(this.type==3){
        		vec3.scale(this.__velocity, 0.95);
        	}
        	duration = 1;
        	vec3.add( this.__position, vec3.scale(this.__velocity, duration) );
			//console.log(this.__velocity);
			//console.log("calc new position");
			this.rotate( this.__angularVelocity * duration);
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
            velocity = vec3.scale(direction, 3);

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
            this.__position = null;
            
        }
    }
});
