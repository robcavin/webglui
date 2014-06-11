/**
 * Created by robcavin on 10/12/13.
 */
function WIColor(red, green, blue, alpha) {
    this.red = red || 0.0;
    this.green = green || 0.0;
    this.blue = blue || 0.0;
    this.alpha = alpha || 1.0;

    return this;
}

WIColor.prototype = {
    v : function() {
        return [this.red, this.green, this.blue, this.alpha];
    },

    whiteColor : function () {
        this.red = 1.0;
        this.green = 1.0;
        this.blue = 1.0;
        return this;
    },

    greenColor : function () {
        this.red = 0.0;
        this.green = 1.0;
        this.blue = 0.0;
        return this;
    }

}