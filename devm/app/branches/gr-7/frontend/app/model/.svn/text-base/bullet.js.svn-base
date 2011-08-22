app.core.Object.define("app.model.Bullet", {
    extend: app.model.Shape,
    constructor: function (position, velocity, rotation) {
    	var size = 5;
        this.__vertices =  [
            vec3.create([0*size,0,0]),
            vec3.create([-1*size,0,0]),
            vec3.create([0*size,0,0]),
            vec3.create([0*size,-1*size,0]),
            vec3.create([-1*size,-2*size,0]),
            vec3.create([0,-1*size,0]),
            vec3.create([1*size,-2*size,0]),
            vec3.create([0,-1*size,0]),
            vec3.create([0,0,0]),
            vec3.create([1*size,0,0]),
            vec3.create([0,0,0]),
            vec3.create([1*size,1*size,0]),
            vec3.create([0,2*size,0]),
            vec3.create([-1*size,1*size,0]),
            /*vec3.create([-1, -1, 0]),
            vec3.create([-1, 1, 0]),
            vec3.create([1, 1, 0]),
            vec3.create([1, -1, 0])*/
            ];

        this.__endtime = new Date().getTime() + 5000;
        arguments.callee.prototype.uper.apply(this, arguments); //call parent constructor
    },
    statics: {},
    members: {
        __vertices: null,
        __position: null,
        __velocity: null,
        __rotation: null,

        type: 2
    }
});
