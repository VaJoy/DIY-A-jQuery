/**
 * Created by vajoy on 2016/8/1.
 */

var init = function(jQuery){
    jQuery.fn.init = function (selector, context, root) {
        if (!selector) {
            return this;
        } else {
            var elem = document.querySelector(selector);
            if (elem) {
                this[0] = elem;
                this.length = 1;
            }
            return this;
        }
    };

    jQuery.fn.init.prototype = jQuery.fn;
};



export default init;