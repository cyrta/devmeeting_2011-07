app.core.Object.define("app.model.Asteroid", {
    extend: app.model.Shape,
    constructor: function (position, velocity, rotation, size) {
    	var size = size || 1;
    	this.__size = size;
        this.__vertices =  [
              vec3.create([0*size, 35*size, 0]),
              vec3.create([-10*size, 40*size, 0]),
              vec3.create([-20*size, 43*size, 0]),
              vec3.create([-30*size, 43*size, 0]),
              vec3.create([-40*size, 41*size, 0]),
              vec3.create([-50*size, 35*size, 0]),
              vec3.create([-38*size, 30*size, 0]),
              vec3.create([-27*size, 15*size, 0]),
              vec3.create([-27*size, 0*size, 0]),
              vec3.create([-35*size, -12*size, 0]),
              vec3.create([-50*size, -15*size, 0]),
              vec3.create([-40*size, -30*size, 0]),
              vec3.create([-30*size, -34*size, 0]),
              vec3.create([-15*size, -37*size, 0]),
              
              vec3.create([0*size, -33*size, 0]),
              vec3.create([15*size, -40*size, 0]),
              vec3.create([30*size, -35*size, 0]),
              vec3.create([45*size, -25*size, 0]),
              vec3.create([55*size, -10*size, 0]),
              vec3.create([57*size, 5*size, 0]),
              vec3.create([54*size, 15*size, 0]),
              vec3.create([45*size, 30*size, 0]),
              vec3.create([25*size, 40*size, 0]),
              vec3.create([10*size, 39*size, 0]),
              vec3.create([0*size, 35*size, 0]),
              vec3.create([5*size, 50*size, 0]),
              vec3.create([-3*size, 65*size, 0]),
              vec3.create([-11*size, 70*size, 0]),
              vec3.create([-13*size, 60*size, 0]),
              vec3.create([-7*size, 45*size, 0]),
                            ];
            /*vec3.create([-30*size, -20*size, 0]),
            vec3.create([-35*size, 0, 0]),
            vec3.create([-30*size, 20*size, 0]),
            vec3.create([-20*size, 20*size, 0]),
            vec3.create([-10*size, 30*size, 0]),
            vec3.create([20*size, 20*size, 0]),
            vec3.create([25*size, 5*size, 0]),
            vec3.create([20*size, -20*size, 0]),
            vec3.create([10*size, -15*size, 0]),
            vec3.create([0, -30*size, 0])];*/


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
