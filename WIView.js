/**
 * Created by robcavin on 10/12/13.
 */
function WIView(webGLUI) {

    this.origin = new Point(0, 0);
    this.size = new Size(100, 100);

    this.color = new WIColor().greenColor();

    this.subviews = [];

    // PRIVATE
    var square_verts = [
        1.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        1.0, 0.0, 0.0,
        0.0, 0.0, 0.0
    ];

    this.model = new WIModel(webGLUI).init(square_verts, 3, 4, webGLUI.gl.TRIANGLE_STRIP);

    this.model.backgroundColor = this.color;

    var transform = mat4.create();
    mat4.translate(transform,transform,[this.origin.x,this.origin.y,0]);
    mat4.scale(transform,transform,[this.size.width,this.size.height,0]);
    this.model.mvMatrix = transform;

    return this;
}

WIView.prototype = {

    setFrame: function (origin, size) {
        this.origin = origin;
        this.size = size;
    }
}
