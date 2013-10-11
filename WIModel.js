/**
 * Created by robcavin on 10/10/13.
 */
function WIModel(webGLUI) {

    this.webGLUI = webGLUI;
    this.gl = webGLUI.gl;
    this.vertexPositionBuffer = null;
    this.shaderProgram = null;
    this.drawMode = null;

    return this;
}

WIModel.prototype = {
    init: function (vertices, itemSize, numItems, drawMode) {
        var gl = this.gl;

        var vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        vertexPositionBuffer.itemSize = itemSize;
        vertexPositionBuffer.numItems = numItems;

        this.vertexPositionBuffer = vertexPositionBuffer;
        this.drawMode = drawMode;
        return this;
    },

    draw: function (pMatrix, mvMatrix) {

        var gl = this.gl;
        var vertexPositionBuffer = this.vertexPositionBuffer;
        var shaderProgram = this.shaderProgram || this.webGLUI.defaultShaderProgram;
        var drawMode = this.drawMode || gl.TRIANGLES;

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
        gl.drawArrays(drawMode, 0, vertexPositionBuffer.numItems);
    }
}