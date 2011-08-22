app.core.Object.define("app.model.Asteroid", {
    extend: app.model.Shape,
    constructor: function (position, velocity, rotation) {

        // helper creating "random" `vec3([x, y, 0])` with `x` and `y` based
        // on initial arguments
        var createFuzzyVec = function (x, y) {
            var rand = 5 * Math.random(),
                size = 0.3 + 0.7 * Math.random();
            if (Math.random() > 0.5) {
                rand *= -1;
            }

            return vec3.create([size * (x + rand), size * (y + rand), 0]);
        };

        this.__vertices =  [
            createFuzzyVec(-30, -20),
            createFuzzyVec(-35, 0),
            createFuzzyVec(-30, 20),
            createFuzzyVec(-20, 20),
            createFuzzyVec(-10, 30),
            createFuzzyVec(20, 20),
            createFuzzyVec(25, 5),
            createFuzzyVec(20, -20),
            createFuzzyVec(10, -15),
            createFuzzyVec(0, -30)];


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
