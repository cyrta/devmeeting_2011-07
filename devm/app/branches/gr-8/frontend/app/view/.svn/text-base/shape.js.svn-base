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

            ctx.beginPath();
            ctx.strokeStyle = '#00FF00';


            for (var i = 0, len = vertices.length; i < len; i++) {
                current = vertices[i];
                next    = (i === len - 1) ? vertices[0] : vertices[i + 1];

                var trans_x = model.getX();
                var trans_y = model.getY();
                var ori = (model.__orientation + 90) * Math.PI/180;
                
                ctx.moveTo(
                    current[0]*Math.cos(ori) - current[1]*Math.sin(ori) + trans_x,
                    current[0]*Math.sin(ori) + current[1]*Math.cos(ori) + trans_y
                );
                ctx.lineTo(
                    next[0]*Math.cos(ori) - next[1]*Math.sin(ori) + trans_x,
                    next[0]*Math.sin(ori) + next[1]*Math.cos(ori) + trans_y
                );
            }

            ctx.stroke();
            
// Show boundingBox
//            ctx.beginPath();
//            ctx.strokeStyle = 'red';
//            ctx.arc(model.getX(), model.getY(), model.__boundingBox.r, 0, Math.PI*2, true);
//
//            ctx.stroke();
//            ctx.closePath();
        }
    }
});
