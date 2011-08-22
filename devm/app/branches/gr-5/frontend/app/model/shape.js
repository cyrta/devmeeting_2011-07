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
        __inCollision: false,
        __cachedVertices: null,


        __init: function () {
            this.__createBoundingBox();
        },

        __createBoundingBox: function () {
            var p=this.__position;
            
            this.__boundingBox=ritterSphere(
                this.getVertices()
            );
                
            vec3.add(this.__boundingBox.c, this.__position);
            
            this.__boundingBox.c[2]=0;

                
            
//            
//            minX=+inf;
//            maxX=-inf;
//            minY=+inf;
//            maxY=-inf;
//            
//            var bb=Object.create(AABBmm);
//            for(var i=0; i<vecs.length; v++) {
//                var v=vecs[i];
//                vec3.add(v, this.__position);
//                minX=Math.min(minX, v[0]);
//                maxX=Math.max(maxX, v[0]);
//                minY=Math.min(minY, v[1]);
//                maxY=Math.max(maxY, v[1]);
//            }
//            
//            bb.min=vec3.create([minX, minY]);
//            bb.max=vec3.create([maxX, maxY]);
//            
//            console.log(bb);
//            //TODO
//            
//            return bb;
        },

        changeOrientation: function (angle) {
			  this.__rotation+=angle;
        },

        increaseVelocity: function () {
                var SPEED=0.03;
				vec3.add(
					this.__velocity, 
					vec3.create(
						[Math.sin(this.__rotation/180*Math.PI)*SPEED, 
						Math.cos(this.__rotation/180*Math.PI)*SPEED]
					)
				)
        },

        integrate: function (duration) {
            this.__cachedVertices=null;
			vec3.add(
				this.__position,
				vec3.scale(this.__velocity, duration, vec3.create())
			);
            this.__createBoundingBox();
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

        getVerticesAddPos: function() {
            var xadd=this.__position[0];
            var yadd=this.__position[1];
            
            return this.getVertices().map(function(v) {                
                return vec3.create([
                    v[0]+xadd,
                    v[1]+yadd,
                    v[2]
                ]);
            });
            
        },

        getVertices: function () {
            
            if(this.__cachedVertices)
                return this.__cachedVertices;
            
            var v=[];
           
            var cos=Math.cos(-this.__rotation*Math.PI/180);
            var sin=Math.sin(-this.__rotation*Math.PI/180);
            
            
            for(var i=0; i<this.__vertices.length; i++) {
                var vec=this.__vertices[i];
                v.push(vec3.create([
                   vec[0]*cos-vec[1]*sin,
                   vec[0]*sin+vec[1]*cos,
                   0
                ]));
            }
        
            this.__cachedVertices=v;
            return v;
        },

        getBoundingBox: function () {
            return this.__boundingBox;
        },
        
        getRealBB: function() {
//            return {
//                x: this.__position[0],
//                y: this.__position[1],
//                width: 1,
//                height: 1,
//                obj: this
//            }
//            
            
            var v=this.getVerticesAddPos();
            var xl=v[0][0],
                xh=v[0][0],
                yl=v[0][1],
                yh=v[0][1];
            
            
            for(var j=0; j<v.length; j++) {
                xl=Math.min(xl, v[j][0]);
                yl=Math.min(yl, v[j][1]);

                xh=Math.max(xh, v[j][0]);
                yh=Math.max(yh, v[j][1]);
            }
            
            return {
                x: xl, y: yl,
                width: xh-xl, height: yh-yl,
                obj: this
            };
        },

        createBullet: function () {
            var vertex = this.__vertices[0],
            direction = vec3.create([
                Math.sin(this.__rotation * Math.PI/180),
                Math.cos(this.__rotation * Math.PI/180),
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
