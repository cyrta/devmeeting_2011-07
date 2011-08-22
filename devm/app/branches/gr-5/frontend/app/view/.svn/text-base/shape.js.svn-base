app.core.Object.define("app.view.Shape", {
    extend: app.core.Object,
    constructor: function (model) {
        arguments.callee.prototype.uper.apply(this, arguments); //call parent constructor

        this.__model = model;
    },
    statics: {},
    members: {
        __model: null,

        render: function (ctx) {
            var current, next,
                model = this.__model,
                vertices = model.getVertices();

            if(model.dead)
                return;

            ctx.beginPath();
            ctx.strokeStyle = 'white';


            for (var i = 0, len = vertices.length; i < len; i++) {
                current = vertices[i];
                next    = (i === len - 1) ? vertices[0] : vertices[i + 1];

                
                ctx.moveTo(
                    current[0] + model.getX(),
                    current[1] + model.getY()
                );
                ctx.lineTo(
                    next[0] + model.getX(),
                    next[1] + model.getY()
                );
            }

            ctx.stroke();

            ctx.save();

            if(model.__inCollision)
                ctx.strokeStyle="#0f0";


            ctx.beginPath();
            ctx.arc(model.__boundingBox.c[0], model.__boundingBox.c[1], model.__boundingBox.r, 0, Math.PI*2, true);

            ctx.stroke();
            ctx.closePath();
            
            ctx.restore();
        }
    }
});
