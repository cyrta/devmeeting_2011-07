var ACCELERATION = 0.1;
var ANGULAR_ACCELERATION = 4.0;
var MAX_VELOCITY = 3;

app.core.Object.define("app.model.Rocket", {
    extend: app.model.Shape,
    constructor: function (position, velocity, rotation) {
        this.__vertices =  [
            vec3.create([0,-10, 0]),
            vec3.create([-8, 10, 0]),
            vec3.create([0, 6, 0]),
            vec3.create([8, 10, 0])];

        arguments.callee.prototype.uper.apply(this, arguments); //call parent constructor
    },
    statics: {},
    members: {
        __vertices: null,
        __position: null,
        __velocity: null,
        __rotation: null,

        type: 3,
        
        processInput: function(state)
        {
        	if (state[KEY_LEFT])
        		this.__orientation -= ANGULAR_ACCELERATION;
        	if (state[KEY_RIGHT])
        		this.__orientation += ANGULAR_ACCELERATION;

        	var forward = state[KEY_UP] ? 1 : 0;
        	if (state[KEY_DOWN]) forward -= 1;
        	if (forward)
        	{
        		this.__velocity[0] += forward * Math.cos(this.__orientation * Math.PI/180) * ACCELERATION;
        		this.__velocity[1] += forward * Math.sin(this.__orientation * Math.PI/180) * ACCELERATION;
        		
        		if (this.__velocity[0] < -MAX_VELOCITY) this.__velocity[0] = -MAX_VELOCITY;
        		if (this.__velocity[1] < -MAX_VELOCITY) this.__velocity[1] = -MAX_VELOCITY;
        		if (this.__velocity[0] >  MAX_VELOCITY) this.__velocity[0] =  MAX_VELOCITY;
        		if (this.__velocity[1] >  MAX_VELOCITY) this.__velocity[1] =  MAX_VELOCITY;
        	}
        }
    }
});
