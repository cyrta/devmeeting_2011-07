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
		//__box: null,
		
        __angularVelocity: null,
        __vertices: null,

        __boundingBox: null,

        __position: null,
        __velocity: null,
        __rotation: null,
		
		__scalarVelocity: 0,


        __init: function () {
            this.__createBoundingBox();
			
        },

        __createBoundingBox: function () {
            //TODO
			this.__boundingBox=ritterSphere(this.__vertices);
        },

        rotate: function (angle) {
            //TODO
			
			var x=0;
			var y=0;
			var a=this.__rotation;
			for( i in this.__vertices){
				x=	this.__vertices[i][0]*Math.cos(a* Math.PI/180)- this.__vertices[i][1]*Math.sin(a* Math.PI/180);
				y=	this.__vertices[i][0]*Math.sin(a* Math.PI/180)+ this.__vertices[i][1]*Math.cos(a* Math.PI/180);
				this.__vertices[i][0]=x;
				this.__vertices[i][1]=y;
			}
        },

        changeOrientation: function (angle) {
            //TODO
			
			 //this.__orientation+=angle;
			 this.__rotation=angle;
			 
			 //this.__orientation+=angle* Math.PI/180;
			// this.__orientation=200;
        },
		fire: function () {
            //TODO
			console.log('fire')
        },

        increaseVelocity: function () {
            //TODO
			var x=0;
			var y=0;
			var a=this.__orientation* Math.PI/180;
			this.__position[0]+=3*Math.cos(a);
			this.__position[1]+=3*Math.sin(a);
			
        },

        integrate: function (duration) {
            //TODO
			if(duration==0) return;
			 this.rotate(this.__rotation);
			 this.__orientation+=this.__rotation;

			 
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

        getBoundingBox: function () {
			this.__boundingBox.c=this.__position;
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
