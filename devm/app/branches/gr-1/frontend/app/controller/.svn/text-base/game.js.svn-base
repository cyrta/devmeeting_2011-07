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
		
		__bounds: null,

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

            space.addShape(new app.view.Shape(rocketModel));
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
//          this.__createBullets(1000);

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
			
			this.__bounds = {
				x:this.__space.getBoundaries()[0],
				y:this.__space.getBoundaries()[1],
				width:this.__space.getBoundaries()[2]-this.__space.getBoundaries()[0],
				height:this.__space.getBoundaries()[3]-this.__space.getBoundaries()[1]
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


            //TODO Iterate over all objects and for each perform move and collision test
            //for () {
            // move one
            // collision test
            //    * broad phase early out
            //    * narrow phase
            //        * bounding box test
            //        * polygon test
            //}
			
			//console.log(objects)
			var myTime=+new Date() -time;
			var quad = new QuadTree(this.__bounds);
			
			var r;
			for(var i=0, L=objects.length; i<L;i++){
					r=objects[i].getBoundingBox().r;
					quad.insert({
								x:objects[i].getPosition()[0]-r,
								y:objects[i].getPosition()[1]-r,
								height:2*r,
								width:2*r,
								index:i
					});
			}

			var items;
			for(var i=0, L=objects.length; i<L;i++){
				//console.log(time)
				var found;
				objects[i].integrate(myTime)
				
				items=quad.retrieve({
								x:objects[i].getPosition()[0]-r,
								y:objects[i].getPosition()[1]-r,
								height:2*r,
								width:2*r,
				});
				
				//console.log(items.length);
				
				//for( var j=i+1; j<5;j++){
				for (var jj=0, jjL=items.length; jj<jjL; ++jj) {
					j=items[jj].index;
					if (j!==i){
						//console.log(j+'   '+i);
						if(testSphereSphere(objects[i].getBoundingBox(),objects[j].getBoundingBox())){
							
							found=false;
							for(var k=0, kL=objects[j].getVertices().length; k<kL;k++){
								var c=[]; 
								c[0]=objects[j].getPosition()[0]-objects[i].getPosition()[0] + objects[j].getVertices()[k][0];
								c[1]=objects[j].getPosition()[1]-objects[i].getPosition()[1] + objects[j].getVertices()[k][1];
								c[2]=0;
								
								if (crossingsMultiplyTest(objects[i].getVertices(),c)) {
									found=true;
									break;
								}
							}
							
							if (found) {
								//objects[j].setX(objects[j].getPosition()[0]+5);
								//objects[j].setY(objects[j].getPosition()[1]+5);
								//objects[i].setX(objects[i].getPosition()[0]-5);
								//objects[i].setY(objects[i].getPosition()[1]-5);
								this.fireDataEvent('collision',[objects[i],objects[j]])
							}
						}
					}//end if
				}
			}
			


            this.__time = +new Date();

            // move escaping objects back to the stage
            this.__fixBoundaries();

            // view part
			
			var count=0, leni=0;
            this.__space.render(count, leni);

            if (!this.__end) {
                this.__requestAnimationFrame();
            }
        },

        __onCollision: function (data) {
            var objectA = data[0],
            objectB = data[1],
            space   = this.__space,
            objects = this.__objects,
            result  = [];
            if (objectA.type === 3 || objectB.type === 3) {
                // end of the game collision with rocket
                //TODO
				if(objectA.type === 1 || objectB.type === 1)
                this.__end = true;
            }
            else if ((objectA.type === 2 && objectB.type === 1) ||
                (objectA.type === 1 && objectB.type === 2)) {
                // bullet hit asteroid
				//
				//objectA.
				var ll=this.__objects.length;
				function remove(kk){
					for(var t=0; t<ll;t++){
							var temp1;
							var temp2;
							if(this.__objects[t]==kk){
								this.__objects.splice(t,1);
								break;
							}
						}	
				}
				//if(objectA.type === 1)remove(objectA);
				//remove(objectB);
                space.increaseScore(1);
                //TODO

            } else if (objectA.type === 1 && objectB.type === 1) {
               // asteroid hit asteroid change direction
               //TODO
			   objectA.setX(objectB.getPosition()[0]+3);
								//objects[j].setY(objects[j].getPosition()[1]+5);
								//objects[i].setX(objects[i].getPosition()[0]-5);
								//objects[i].setY(objects[i].getPosition()[1]-5);

            } else if (objectA.type === 2 && objectB.type === 2) {
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
