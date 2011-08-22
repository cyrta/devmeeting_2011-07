app.core.Object.define("app.controller.Game", {
    extend: app.core.Object,
    constructor: function (model, view) {
        arguments.callee.prototype.uper.apply(this, arguments); //call parent constructor

    },
    statics: {},
    members: {
        __space: null,

        __end: false,

        __time: null,
        __objects: null,
        __fireDelay: null,

        __keyboard: null,
        rocket: null,

        __rand: function (min, max) {
            if (min < 0) {
                max -= min;
            }

            return min + Math.random() * max;
        },

        __createAsteroid: function (number) {
            var object, objects = this.__objects,
                boundaries = this.__space.getBoundaries(),
                minX = boundaries[0],
                minY = boundaries[1],
                maxX = boundaries[2],
                maxY = boundaries[3],
                space = this.__space;

            for (var i = 0; i < number; i++) {
            	object = new app.model.Asteroid(
                   vec3.create([Math.random()*boundaries[2], Math.random()*boundaries[3], 0]),
                   vec3.create([Math.random(), Math.random(), 0])
                );
            	object.__orientation = Math.random()*360;
            	object.__angularVelocity = Math.random()*10 - 5; 

                objects.push(object);
                space.addShape(new app.view.Shape(object));
            }

        },

        __createBullets: function (number) {
            var object, objects = this.__objects,
                boundaries = this.__space.getBoundaries(),
                minX = boundaries[0],
                minY = boundaries[1],
                maxX = boundaries[2],
                maxY = boundaries[3],
                space = this.__space;

            for (var i = 0; i < number; i++) {
                object = new app.model.Bullet(
                    vec3.create([
                        this.__rand(minX + 20, maxX - 20),
                        this.__rand(minY + 20, maxY - 20),
                        0]),
                    vec3.create([
                        this.__rand(0, 0.25),
                        this.__rand(0, 0.25),
                        0]),
                    this.__rand(0, 360)
                );

                objects.push(object);
                space.addShape(new app.view.Shape(object));
            }

        },

        __createSpace: function () {
            this.__space = new app.view.Space();
        },

        __createRocket: function (mine) {
            var  boundaries = this.__space.getBoundaries(),
                minX = boundaries[0],
                minY = boundaries[1],
                maxX = boundaries[2],
                maxY = boundaries[3];

            var rocketModel      = new app.model.Rocket(vec3.create([
                this.__rand(minX + 20,maxX - 20),
                this.__rand(minY + 20, maxY - 20),
                0]),
                vec3.create(),
                0,
                -90
            );

            var rocketController = new app.controller.Rocket(rocketModel);
            var space            = this.__space;

            mine = mine || true;

            this.__objects.push(rocketModel);
            this.__rocketController = rocketController;

            this.rocket = new app.view.Shape(rocketModel);
            space.addShape(this.rocket);
        },

        __registerEvent: function () {
            var keyboard = new app.event.Keyboard();
            keyboard.addListener("press", this.__rocketController.dispatch, this.__rocketController);
            keyboard.addListener("press", this.__dispatch, this);

            this.__keyboard = keyboard;
        },

        run: function () {
            this.__objects = [];

            this.__createSpace();

            this.__createRocket();

            this.__createAsteroid(4);
//            this.__createBullets(1000);

            this.__registerEvent();

            this.addListener("collision", this.__onCollision, this);

            var win = window;

            //Override __requestAnimationFrame if exists *prefix*RequestAnimationFrame
            if (win.webkitRequestAnimationFrame) {
                console.log("Use webkitRequestAnimationFrame");
                this.__requestAnimationFrame = this.__webkitRequestAnimationFrame;
            } else if (win.mozRequestAnimationFrame) {
                console.log("Use mozRequestAnimationFrame");
                this.__requestAnimationFrame = this.__mozRequestAnimationFrame;
            } else {
                console.log("Use setTimeout");
            }


            this.__requestAnimationFrame();
        },

        __webkitRequestAnimationFrame: function () {
            window.webkitRequestAnimationFrame(this.__onRequestAnimationFrame.bind(this));
        },

        __mozRequestAnimationFrame: function () {
            window.mozRequestAnimationFrame(this.__onRequestAnimationFrame.bind(this));
        },

        __requestAnimationFrame: function () {
            setTimeout(this.__onRequestAnimationFrame.bind(this), 16);
        },

        __onRequestAnimationFrame: function () {

            var objects = this.__objects,
                time = this.__time || +new Date();

            //handle keyboard input
            this.__keyboard.loop();
            
            this.rocket.__model.processInput(this.__keyboard.state);

            var timestamp = new Date().getTime();

            var count =0;
            var leni = 0;
            
            /*var tree = new QuadTree( {x:0, y:0, width:800, height:800}, false, 4, 10 );
            for (var i in this.__objects) {
            	var obj = this.__objects[i];
            	var treeObj = {
            		obj: obj,
					x: obj.__position[0] - obj.__boundingBox.r,
					y: obj.__position[1] - obj.__boundingBox.r,
					width:  2 * obj.__boundingBox.r,
					height: 2 * obj.__boundingBox.r
            	};
            	tree.insert(treeObj);
            }*/
            
            //TODO Iterate over all objects and for each perform move and collision test
            for (var i in this.__objects) {
            	var obj = this.__objects[i];
            	if ((obj.__endtime) && (obj.__endtime < timestamp)) {
            		this.remove(i);
            	} else {
            		obj.integrate();
            		var objBounds = {
            			x: obj.__position[0] - obj.__boundingBox.r,
            			y: obj.__position[1] - obj.__boundingBox.r,
            			width:  2 * obj.__boundingBox.r,
            			height: 2 * obj.__boundingBox.r
            		};
            		
            		for (var j = 0; j < i; j++) {
            			var obj2 = this.__objects[j];
            			if (obj2 !== undefined) {
	            			var v = testSphereSphere2(
	            				obj.getX(), obj.getY(), obj.__boundingBox.r,
	            				obj2.getX(), obj2.getY(), obj2.__boundingBox.r);
	                		if (v) {
	                			var objVerts = [];
	                			var ori = (obj.__orientation + 90) * Math.PI/180;
	                			for (var k = 0; k < obj.__vertices.length; k++) {
	                				objVerts[k] = vec3.create([
	                				    obj.__vertices[k][0]*Math.cos(ori) - obj.__vertices[k][1]*Math.sin(ori) + obj.__position[0],
										obj.__vertices[k][0]*Math.sin(ori) + obj.__vertices[k][1]*Math.cos(ori) + obj.__position[1],
										0
									]);
	                			}

	                			ori = (obj2.__orientation + 90) * Math.PI/180;
	                			var obj2Verts = [];
	                			for (var k = 0; k < obj2.__vertices.length; k++) {
	                				obj2Verts[k] = vec3.create([
	                				    obj2.__vertices[k][0]*Math.cos(ori) - obj2.__vertices[k][1]*Math.sin(ori) + obj2.__position[0],
										obj2.__vertices[k][0]*Math.sin(ori) + obj2.__vertices[k][1]*Math.cos(ori) + obj2.__position[1],
										0
	                				]);
	                			}
	                			
	                			var hit = false;
	                			for (var k = 0; !hit && k < objVerts.length; k++) {
	                				hit = crossingsMultiplyTest(obj2Verts, objVerts[k]);	                				
	                			}
	                			for (var k = 0; !hit && k < obj2Verts.length; k++) {
	                				hit = crossingsMultiplyTest(objVerts, obj2Verts[k]);	                				
	                			}
	                			
	                			if (hit) {
	                				this.__onCollision([obj, obj2, i, j]);
	                			}
	                		}
            			}
                	}
            	}
                // move one
                // collision test
                //    * broad phase early out
                //    * narrow phase
                //        * bounding box test
                //        * polygon test

            }

            this.__time = +new Date();

            // move escaping objects back to the stage
            this.__fixBoundaries();

            // view part
            var count = 0, leni = 0;
            this.__space.render(count, leni);

            if (!this.__end) {
                this.__requestAnimationFrame();
            }
        },
        
        remove : function(i) {
        	this.__space.removeShape(this.__objects[i]);
    		this.__objects.splice(i, 1);
        },

        __onCollision: function (data) {
            var objectA = data[0],
            objectB = data[1],
            space   = this.__space,
            objects = this.__objects,
            result  = [];
            
            // type 3 = rocket
            // type 2 = bullet
            // type 1 = asteroid

            if ((objectA.type === 3 || objectB.type === 3) && 
            (objectA.type != 2 && objectB.type != 2)) {
                // end of the game collision with rocket
                //TODO
            	this.__end = true;
            }
            else if ((objectA.type === 2 && objectB.type === 1) ||
                (objectA.type === 1 && objectB.type === 2)) {
                // bullet hit asteroid
                space.increaseScore(1);
                this.remove(data[2]);
                this.remove(data[3]);
                
                var asteroid = (objectA.type == 1) ? objectA : objectB;
                var bullet   = (objectA.type == 2) ? objectA : objectB;
                var bnds = asteroid.__position;
                
                var diff = vec3.create(bullet.__position);
                vec3.subtract(diff, asteroid.__position);
                var separation = vec3.create([-diff[1], diff[0], 0]);
                vec3.normalize(separation);
                
                if (asteroid.__boundingBox.r > 16) {
                	var asteroidVelocity = asteroid.__velocity;
                	var asteroidVelocityLen = vec3.length(asteroidVelocity);
                	for (var i = 0; i < 2; i++) {
						var separation_i = vec3.create(separation);
						vec3.scale(separation_i, asteroid.__boundingBox.r/2);
						if (i) vec3.negate(separation_i);
						var pos = vec3.create([bnds[0], bnds[1], 0]);
						vec3.add(pos, separation_i);
						
						var dir = vec3.create(separation);
						if (i) vec3.negate(dir);
						vec3.scale(dir, asteroidVelocityLen);
						vec3.add(dir, asteroidVelocity);
                        
						object = new app.model.Asteroid(
                                pos,
                                dir,
                                undefined,
                                asteroid.__size / 2
                             );
                         	object.__orientation = Math.random()*360;
                         	object.__angularVelocity = Math.random()*10 - 5; 

                             objects.push(object);
                             space.addShape(new app.view.Shape(object));
                        }
                }

            }
            else if (objectA.type === 1 && objectB.type === 1) {
               vec3.negate(objectA.__velocity);
               vec3.negate(objectB.__velocity);
               
               
               /*objectA.__velocity[0] = -objectA.__velocity[0];
               objectA.__velocity[1] = -objectA.__velocity[1];
               objectB.__velocity[0] = -objectB.__velocity[0];
               objectB.__velocity[1] = -objectB.__velocity[1];*/
            }
            else if (objectA.type === 2 && objectB.type === 2) {
                // bullet hit bulled just destroy both
                //TODO
            }

            if (result && result.length) {
                for (var k = 0, len = result.length, object; k < len; k++) {
                    object = result[k];

                    objects.push(object);
                    space.addShape(new app.view.Shape(object));
                }
            }
        },

        __reflection: function (a, b) {
            //TODO
//            var contactNormal = vec3.normalize(vec3.subtract(a.getPosition(), b.getPosition(),vec3.create()));
//
//            this.__resolveInterpenetration(a, b, contactNormal);
//            this.__resolveVelocity(a, b, contactNormal);
        },

        __fixBoundaries: function () {
            var objects = this.__objects,
                boundaries = this.__space.getBoundaries(),
                minX = boundaries[0],
                minY = boundaries[1],
                maxX = boundaries[2],
                maxY = boundaries[3];

            for (var i = 0, object, x, y, len = objects.length; i < len; i++) {
                object = objects[i];

                x = object.getX();
                y = object.getY();

                if (x <= minX) {
                    object.setX(maxX - 1);
                }
                else if (x >= maxX) {
                    object.setX(minX + 1);
                }
                else if (y <= minY) {
                    object.setY(maxY - 1);
                }
                else if (y >= maxY) {
                    object.setY(minY + 1);
                }
            }
        },

        __dispatch: function (event) {
            var bullet,
                objects = this.__objects,
                space   = this.__space,
                now = Date.now();

            if (event && event[1] === app.event.Object.FIRE && this.__fireDelay + 250 < now) {
                this.__fireDelay = now;

                bullet = objects[0].createBullet();

                objects.push(bullet);
                space.addShape(new app.view.Shape(bullet));
            }
        }
    }
});
