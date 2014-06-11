/**
 * Created by robcavin on 10/10/13.
 */
function WIModel(webGLUI) {

    this.webGLUI = webGLUI;
    this.gl = webGLUI.gl;
    this.vertexPositionBuffer = null;
    this.textureCoordBuffer = null;
    this.shaderProgram = null;
    this.drawMode = null;
    this.textures = [];
    this.backgroundColor = new WIColor().whiteColor();

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

    applyTexture: function(texture, texCoords, itemSize, numItems) {
        this.textures.push(texture);

        var gl = this.gl;

        var textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);
        textureCoordBuffer.itemSize = itemSize;
        textureCoordBuffer.numItems = numItems;

        this.textureCoordBuffer = textureCoordBuffer;
    },

    draw: function (pMatrix, mvMatrix) {

        var gl = this.gl;
        var vertexPositionBuffer = this.vertexPositionBuffer;
        var textureCoordBuffer = this.textureCoordBuffer;
        var shaderProgram = this.shaderProgram || this.webGLUI.defaultShaderProgram;
        var drawMode = this.drawMode || gl.TRIANGLES;
        var mvMatrix = this.mvMatrix || mvMatrix;

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, textureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

        if (this.textures.length > 0) {
            var texture = this.textures[0].texture
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.uniform1i(shaderProgram.samplerUniform, 0);
        }

        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
        gl.uniform4f(shaderProgram.backgroundColorUniform,
            this.backgroundColor.red, this.backgroundColor.green, this.backgroundColor.blue, this.backgroundColor.alpha)
        gl.drawArrays(drawMode, 0, vertexPositionBuffer.numItems);
    }
}