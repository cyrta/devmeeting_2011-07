app.core.Object.define("app.controller.Game", {
    extend: app.core.Object,
    constructor: function (model, view) {
        arguments.callee.prototype.uper.apply(this, arguments); //call parent constructor

    },
    statics: {},
    members: {
        __space: null,
        __collisins: null,
        __end: false,

        __time: null,
        __objects: null,
        __fireDelay: null,

        __keyboard: null,

        __quadTree: null,
        __pointQuad: null,

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
		                	this.__rand(minX + 20,maxX - 20),
		                	this.__rand(minY + 20, maxY - 20),
		                	0]),
										vec3.create([this.__rand(0, 0.08), this.__rand(0, 0.08), 0]),
		                this.__rand()
                );

                objects.push(object);
                this.__quadTree.insert({
                  x: object.getPosition()[0],
                  y: object.getPosition()[1],
                  o: object
                })
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
            this.__quadTree.insert({
              x: rocketModel.getPosition()[0],
              y: rocketModel.getPosition()[1],
              o: rocketModel
            })
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

            this.__quadTree = new QuadTree({
              x: 0,
              y: 0,
              width: 500,
              height: 500
            }, true);

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
                time = this.__time || +new Date(),
                retrieved = null;

            this.__quadTree.clear();
            objects.forEach(function(itm, idx) {
              this.__quadTree.insert({
                x: itm.getPosition()[0],
                y: itm.getPosition()[1],
                o: itm
              })
            }, this);
            //handle keyboard input
            this.__keyboard.loop();

            this.__time = +new Date();
            var count = 0;
						//TODO Iterate over all objects and for each perform move and collision test
            var obj = null;
            for(var i = 0, len = objects.length; i < len; i++) {
                obj = objects[i];

								if(obj.type !== 3) {
									obj.rotate(2);
								}
								obj.integrate(this.__time - time);

                retrieved = this.__quadTree.retrieve({
                  x: obj.getPosition()[0],
                  y: obj.getPosition()[1]
                });
                
                retrieved.forEach(function(itm, idx, array) {
                  var diff = [], sub = [];
                  itm = itm.o;
                  if(itm !== obj) {
                    for(var j = 0, len = obj.getVertices().length; j < len; j++) {
                      count++;
                      vec3.subtract(obj.getPosition(), itm.getPosition(), diff);
                      vec3.add(obj.getVertices()[j], diff, sub);
                      if(crossingsMultiplyTest(itm.getVertices(), sub)) {
                        this.__collisins++;
                        if(itm.type === 3 || obj.type === 3)
                          console.log('collision '+this.__collisins);
                      }
                    }
                    //this.fireDataEvent("collision", [itm, objects[i]]);
                    //console.log('collid:', itm, objects[i]);
                    //if(itm.type == 3 || objects[i].type == 3)
                    //console.log('clollid with ship', itm, objects[i])
                  }
                }, this);
                
            // move one
            // collision test
            //    * broad phase early out
            //    * narrow phase
            //        * bounding box test
            //        * polygon test
          	}

            // move escaping objects back to the stage
            this.__fixBoundaries();

            // view part
            this.__space.render(count, objects.length);
            count = 0;
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
                //console.log('END OF GAME')
                this.__end = true;
            }
            else if ((objectA.type === 2 && objectB.type === 1) ||
                (objectA.type === 1 && objectB.type === 2)) {
                // bullet hit asteroid
                space.increaseScore(1);
                //TODO

            } else if (objectA.type === 1 && objectB.type === 1) {
               // asteroid hit asteroid change direction
               //TODO

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
