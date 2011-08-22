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

            if (model.type == 2) {
            	ctx.strokeStyle = '#F00';
            } else {
            	ctx.strokeStyle = '#333';
            	
            }
            ctx.fillStyle = 'black';
            ctx.beginPath();


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
            ctx.fill();
            ctx.closePath();
            
            ctx.beginPath();
            ctx.strokeStyle = '#CCF';
            ctx.arc(model.__position[0], model.__position[1], model.__boundingBox.r, 0, Math.PI*2, true); 
            ctx.stroke();

//            ctx.beginPath();
//            ctx.arc(model.getX(), model.getY(), model.__boundingBox.r, 0, Math.PI*2, true);
//
//            ctx.stroke();
//            ctx.closePath();
        }
    }
});
