/**
 * Created by vajoy on 2016/8/1.
 */

var init = function(jQuery){
    jQuery.fn.init = function (selector, context, root) {
        if (!selector) {
            return this;
        } else {
            var elemList = jQuery.find(selector);
            if (elemList.length) {
                jQuery.merge( this, elemList );  //this是JQ实例，默认实例属性 .length 为0
            }
            return this;
        }
    };

    jQuery.fn.init.prototype = jQuery.fn;
};



export default init;