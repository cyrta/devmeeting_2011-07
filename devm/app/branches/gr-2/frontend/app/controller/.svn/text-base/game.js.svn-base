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
                
            var x,y,vx,vy;

            for (var i = 0; i < number; i++) {
                
                x = ~~(Math.random()*maxX);
                y = ~~(Math.random()*maxY);
                vx = (Math.random()*0.1);
                vy = (Math.random()*0.1);
                
                object = new app.model.Asteroid(
                    vec3.create([x,y,0]), vec3.create([vx,vy,0]), this.__rand(-3, 3), this.__rand(0, 360)
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

            this.__createAsteroid(6);
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
                 count = 0,
                leni = 0,
                time = this.__time || +new Date();
            var i, j, shape, shapeB, shapeBoundingBox, shapeBBoundingoBox, 
                space = this.__space,
                items = null,
                tests = 0,
                boundaries = this.__space.getBoundaries();

            //handle keyboard input
            this.__keyboard.loop();

            var newTime = +new Date();
            var hasCollided=false;

            var quad = new QuadTree({
                x: boundaries[0],
                y: boundaries[1],
                width: boundaries[2] - boundaries[0],
                height: boundaries[3] - boundaries[1]
            }, true, 4, 4);

            for (i=0; i<objects.length;++i) {
                shape = objects[i];
                shapeBoundingBox = shape.getBoundingBox();
                quad.insert({
                    x: shapeBoundingBox.c[0],
                    y: shapeBoundingBox.c[1],
                    width: shapeBoundingBox.r * 2,
                    height: shapeBoundingBox.r * 2,
                    shape: shape
                  });
            }

            //TODO Iterate over all objects and for each perform move and collision test
            for(i=0;i<objects.length;++i){
                leni++;
                shape = objects[i];
                shapeBoundingBox = shape.getBoundingBox();

                items = quad.retrieve({
                    x: shapeBoundingBox.c[0],
                    y: shapeBoundingBox.c[1],
                    width: shapeBoundingBox.r * 2,
                    height: shapeBoundingBox.r * 2
                });

                shape.integrate(newTime-time);
                hasCollided = false;
                for (j = 0; j < items.length; ++j) {
                    shapeB = items[j].shape;
                    shapeBBoundingBox = shapeB.getBoundingBox();
                    if(shape===shapeB) {continue;}
                    
                    count++;
                    if (testSphereSphere(shapeBoundingBox, shapeBBoundingBox) ) {
                        // we have rough collision now.
                        
                        if(detailedTest(shape,shapeB)){
                            hasCollided = true;
                            shapeB.setColliding(true);
                            this.fireDataEvent('collision', [shape, shapeB]);
                        }
                    }
                }
                shape.setColliding(hasCollided);
            }

            this.__time = newTime;

            // move escaping objects back to the stage
            this.__fixBoundaries();

            // view part
            this.__space.render(count, leni);

            if (!this.__end) {
                this.__requestAnimationFrame();
            }
        },

        __removeObject: function(obj){
            var objects = this.__objects;
            this.__space.removeShape(obj);
            for (i = 0; i < objects.length; i++) {
                        if(obj === objects[i]){
                            objects.splice(i,1);
                            return;
                        }
              }
        },
        __onCollision: function (data) {
            var objectA = data[0],
            objectB = data[1],
            space   = this.__space,
            objects = this.__objects,
            result  = [];
            var i;

            if (objectA.type === 3 || objectB.type === 3) {
                // end of the game collision with rocket
                //TODO
                //this.__end = true;
            }
            else if ((objectA.type === 2 && objectB.type === 1) ||
                (objectA.type === 1 && objectB.type === 2)) {
                // bullet hit asteroid
                space.increaseScore(1);
                //TODO
                if(objectA.type===2){
                    this.__removeObject(objectA);
                    if(objectB.getHits() > 1){
                        this.__removeObject(objectB);
                    }else {
                        objectB.addHit();
                    }
//                    space.removeShape(objectA);

                }
                
                if(objectB.type===2){
                    this.__removeObject(objectB);
                    if(objectA.getHits() >1){
                        this.__removeObject(objectA);
                    }else{
                        objectA.addHit()
                    }
//                    space.removeShape(objectB);
                 }                    
                

            } else if (objectA.type === 1 && objectB.type === 1) {
               // asteroid hit asteroid change direction
               //
               //TODO
               calculateSeparatingVelocity(objectA, objectB);

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
