app.core.Object.define("app.model.Asteroid", {
    extend: app.model.Shape,
    constructor: function (position, velocity, rotation, size) {
    	var size = size || 1;
    	this.__size = size;
        this.__vertices =  [
            vec3.create([-30*size, -20*size, 0]),
            vec3.create([-35*size, 0, 0]),
            vec3.create([-30*size, 20*size, 0]),
            vec3.create([-20*size, 20*size, 0]),
            vec3.create([-10*size, 30*size, 0]),
            vec3.create([20*size, 20*size, 0]),
            vec3.create([25*size, 5*size, 0]),
            vec3.create([20*size, -20*size, 0]),
            vec3.create([10*size, -15*size, 0]),
            vec3.create([0, -30*size, 0])];


        arguments.callee.prototype.uper.apply(this, arguments); //call parent constructor
    },
    statics: {},
    members: {
        __vertices: null,
        __position: null,
        __velocity: null,
        __rotation: null,

        type: 1

    }
});
