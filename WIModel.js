/**
 * Created by robcavin on 10/10/13.
 */
function WIModel(webGLUI) {

    this.gl = webGLUI.gl;
    this.vertexPositionBuffer = null;
    this.shaderProgram = null;
    this.drawMode = null;

    return this;
}

WIModel.prototype.configure = function (vertices, itemSize, numItems) {
    var gl = this.gl;
    var vertexPositionBuffer = this.vertexPositionBuffer;
    
    vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    vertexPositionBuffer.itemSize = itemSize;
    vertexPositionBuffer.numItems = numItems;
}

WIModel.prototype.draw = function () {
    var gl = this.gl;
    var vertexPositionBuffer = this.vertexPositionBuffer;
    var shaderProgram = this.shaderProgram;
    var drawMode = this.drawMode;

    if (!drawMode || !shaderProgram) {
        alert('The shader program and draw mode for the model must be set before calling draw.')
        return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    gl.drawArrays(this.drawMode, 0, vertexPositionBuffer.numItems);
}