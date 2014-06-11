/**
 * Created by robcavin on 10/12/13.
 */
function WITexture(webGLUI) {

    this.gl = webGLUI.gl;
    this.texture = this.gl.createTexture();
    this.image = null;
    return this;
};

WITexture.prototype = {

    configure : function() {
        var gl = this.gl;

        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.bindTexture(gl.TEXTURE_2D, null);
    },

    setImage : function(source) {
        this.image = new Image();

        var that = this;
        this.image.onload = function () {
            that.configure();
        }

        this.image.src = source;
    }
}