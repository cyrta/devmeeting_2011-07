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
                var pX = Math.floor((Math.random()) * this.__space.getBoundaries()[2])
                var pY = Math.floor((Math.random()) * this.__space.getBoundaries()[3])
                var vX = (Math.random() - 0.5) * 0.2;
                var vY = (Math.random() - 0.5) * 0.2;
                var angVel = (Math.random() - 0.5) * 5;
                object = new app.model.Asteroid(
                    vec3.create([pX,pY,0]),
                    vec3.create([vX,vY,0]),
                    angVel
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
            var boundaries = this.__space.getBoundaries(),
                minX = boundaries[0],
                minY = boundaries[1],
                maxX = boundaries[2],
                maxY = boundaries[3];

            var rocketModel = new app.model.Rocket(vec3.create([
                this.__rand(minX + 20, maxX - 20),
                this.__rand(minY + 20, maxY - 20),
                0]),
                vec3.create(),
                0,
                -90
            );

            var rocketController = new app.controller.Rocket(rocketModel);
            var space = this.__space;

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
                duration = +new Date() - time;


            //handle keyboard input
            this.__keyboard.loop();

            var count = 0;
            for each (var obj in this.__objects) {
                // move
                obj.integrate(duration)
            }

            function testPolygons(obj1, obj2) {
                var diff = vec3.subtract(obj1.getPosition(), obj2.getPosition(), vec3.create())
                var tempVert2 = []
                for each (var vert2 in obj2.getVertices()) {
                    tempVert2.push(vec3.create(vec3.subtract(vert2, diff, vec3.create())))
                }

                for each (var vert1 in obj1.getVertices()) {
                    if (crossingsMultiplyTest(tempVert2, vert1)) {
                        return true
                    }
                }

                return false;
            }

            // bounding box test
            for each (var obj1 in this.__objects) {
                for each (var obj2 in this.__objects) {
                    if (obj1 != obj2) {
                        if (testSphereSphere(obj1.getBoundingBox(), obj2.getBoundingBox())) {
                            count++;

                            if (testPolygons(obj1, obj2) || testPolygons(obj2, obj1)) {
                                this.fireDataEvent("collision", [obj1, obj2])
                            }

                        }
                    }
                }
            }

            //TODO Iterate over all objects and for each perform move and collision test
            //for () {
            // move one
            // collision test
            //    * broad phase early out
            //    * narrow phase
            //        * bounding box test
            //        * polygon test
            //}


            this.__time = +new Date();

            // move escaping objects back to the stage
            this.__fixBoundaries();

            // view part

            var leni = 1;
            this.__space.render(count, leni);


            if (!this.__end) {
                this.__requestAnimationFrame();
            }
        },
        removeFromArray: function(arr, elem) {
            arr.splice(arr.indexOf(elem), 1);
        },
        __onCollision: function (data) {
            var objectA = data[0],
                objectB = data[1],
                space = this.__space,
                objects = this.__objects,
                result = [];

            if (objectA.type === 3 || objectB.type === 3) {
                // end of the game collision with rocket
                //TODO
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
                this.removeFromArray(this.__objects, objectA)
                this.removeFromArray(this.__objects, objectB)
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
                space = this.__space,
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
