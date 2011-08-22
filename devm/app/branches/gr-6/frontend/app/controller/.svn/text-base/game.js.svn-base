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
                object = new app.model.Asteroid(vec3.create([
                        this.__rand(minX, minX + 100),
                        this.__rand(minY, minY + 100),
                        0]
                    ), vec3.create([
                        this.__rand(-3, 3),
                        this.__rand(-3, 3),
                        0
                    ]),
                    vec3.create([
                        1, 
                        1, 
                        0
                    ])
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
                this.__rand(minX + 100, maxX - 100),
                this.__rand(minY + 100, maxY - 100),
                0]),
                vec3.create(),
                0,
                45
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
                count = 0,
                leni = 60,
                collison = false, 
                i, len, object, x, y, r, object2, n, m, v1, v2;

            //handle keyboard input
            this.__keyboard.loop();
            
            // polygon test
            var b = this.__space.getBoundaries(), 
                quad = new QuadTree({
                    x : b[0], 
                    y : b[1], 
                    width : b[2], 
                    height: b[3]
                }, true, 4, 2);
            
            for (i = 0, len = objects.length; i < len; i++) {
                object = objects[i];
                
                x = object.getX();
                y = object.getY(); 
                r = object.getBoundingBox().r;
                
                quad.insert({
                    x : x-r, 
                    y : y-r,
                    width : 2 * r, 
                    height: 2 * r,
                    obj   : object
                });
            }/**/

            //TODO Iterate over all objects and for each perform move and collision test
            for (i = 0, len = objects.length; i < len; i++) {
                object = objects[i];
                
                object.integrate(1);

                // collision test
                //    * broad phase early out
                //    * narrow phase
                //        * bounding box test
                //        * polygon test
                
                
                // polygon test
                /*x = object.getX();
                y = object.getY(); 
                r = object.getBoundingBox().r;
                    
                var items = quad.retrieve({
                    x : x-r, 
                    y : y-r,
                    width : 2 * r, 
                    height: 2 * r
                });
                
                for (x = 0, y = items.length; x < y; x++) {
                    object2 = items[x].obj;
                    
                    if (testSphereSphere(object.getBoundingBox(), object2.getBoundingBox())) {
                        
                        v1 = object.getCorrectVertices(), 
                        v2 = object2.getCorrectVertices(); 
                        
                        for (n = 0, m = v1.length; n < m; n++) {
                            if (crossingsMultiplyTest(v2, v1[n])) {
                                collison = true;
                                break;
                            }
                        }
                        
                        for (n = 0, m = v2.length; !collison && n < m; n++) {
                            if (crossingsMultiplyTest(v1, v2[n])) {
                                collison = true;
                                break;
                            }
                        }
                        
                        if (collison) {
                            this.__onCollision([object, object2]);
                        }
                    }
                }/**/
                
                // bounding box test
                for (x = i; x > 0; x--) {
                    object2 = objects[x-1];
                    if (testSphereSphere(object.getBoundingBox(), object2.getBoundingBox())) {
                        
                        v1 = object.getCorrectVertices(), 
                        v2 = object2.getCorrectVertices(); 
                        
                        for (n = 0, m = v1.length; n < m; n++) {
                            if (crossingsMultiplyTest(v2, v1[n])) {
                                collison = true;
                                break;
                            }
                        }
                        
                        for (n = 0, m = v2.length; !collison && n < m; n++) {
                            if (crossingsMultiplyTest(v1, v2[n])) {
                                collison = true;
                                break;
                            }
                        }
                        
                        if (collison) {
                            this.__onCollision([object, object2]);
                        }
                    }
                }/**/
            }


            this.__time = +new Date();

            // move escaping objects back to the stage
            this.__fixBoundaries();

            // view part
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
                this.__end = true;
                document.title = 'game over!';
            }
            else if ((objectA.type === 2 && objectB.type === 1) ||
                (objectA.type === 1 && objectB.type === 2)) {
                // bullet hit asteroid
                space.increaseScore(1);
                //TODO

            } else if (objectA.type === 1 && objectB.type === 1) {
               // asteroid hit asteroid change direction
               //TODO
               objectA.changeOrientation(90);
               objectA.changeOrientation(-90);

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
