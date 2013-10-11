/**
 * Created by robcavin on 10/10/13.
 */
function WIScene(webGLUI) {
    this.gl = webGLUI.gl;
    this.models = [];
    this.mvMatrix = mat4.create();
    this.pMatrix = mat4.create();

    return this;
}

WIScene.prototype = {

    addModel: function (model) {
        this.models.push(model)
    },

    update: function () {
        var gl = this.gl;

        var pMatrix = this.pMatrix;
        mat4.perspective(pMatrix, 45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);

        var mvMatrix = this.mvMatrix;
        mat4.identity(mvMatrix);
        mat4.translate(mvMatrix, mvMatrix, [-1.5, 0.0, -7.0]);

    },

    draw: function () {
        var pMatrix = this.pMatrix;
        var mvMatrix = this.mvMatrix;
        var gl = this.gl;

        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        this.models.forEach(function (model) {
            model.draw(pMatrix, mvMatrix)
        })
    }
}
