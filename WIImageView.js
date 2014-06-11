function WIImageView(webGLUI) {
    this.webGLUI = webGLUI;
    this.image = null;
}

WIImageView.prototype = {

    WIImageView: apply(WIView.constructor,this.webGLUI),

    setImage: function (src) {
        var texture = new WITexture(webGLUI);
        texture.setImage(src);

        var tex_coords = [
            1.0, 1.0,
            0.0, 1.0,
            1.0, 0.0,
            0.0, 0.0
        ];
        this.model.applyTexture(texture, tex_coords, 2, 4);
    }

};