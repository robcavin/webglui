/**
 * Created by robcavin on 10/10/13.
 */
function WIWebGLUI() {
    this.gl = null;
    return this;
}

WIWebGLUI.prototype = {

    init: function (canvas) {
        this.gl = this.initGL(canvas);

        this.defaultShaderProgram = this.initDefaultShaders();

        return this;
    },

    initGL: function (canvas) {
        try {
            var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;

            gl.enable(gl.DEPTH_TEST);
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
        }
        catch (e) {
        }

        if (!gl) {
            alert("Could not initialise WebGL.  Please try the latest version of Chrome, Firefox, or Safari.");
        }

        return gl;
    },


    getShader: function (id) {

        var gl = this.gl;

        var shaderScript = document.getElementById(id);
        if (!shaderScript) {
            return null;
        }

        var str = "";
        var k = shaderScript.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        var shader;
        if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }

        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    },


    initDefaultShaders: function () {

        var gl = this.gl;

        var fragmentShader = this.getShader("shader-fs");
        var vertexShader = this.getShader("shader-vs");

        var shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        gl.useProgram(shaderProgram);

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");

        return shaderProgram;
    }
}
