/**
 * Created by vajoy on 2016/5/19.
 */
(function(){
    var _jQuery = window.jQuery,
        _$ = window.$;

    var version = "0.0.1",
        jQuery = function (selector, context) {

            return new jQuery.fn.init(selector, context);
        };


    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        setBackground: function(){
            this[0].style.background = 'yellow';
            return this
        },
        setColor: function(){
            this[0].style.color = 'blue';
            return this
        }
    };

    jQuery.extend = jQuery.fn.extend = function(){
        console.log(this)
    };

    var init = jQuery.fn.init = function( selector, context, root ) {
        if ( !selector ) {
            return this;
        } else {
            var elem = document.querySelector( selector );
            if ( elem ) {
                this[0] = elem;
                this.length = 1;
            }
            return this;
        }
    };

    init.prototype = jQuery.fn;


    jQuery.noConflict = function( deep ) {
        //确保window.$没有再次被改写
        if ( window.$ === jQuery ) {
            window.$ = _$;
        }

        //确保window.jQuery没有再次被改写
        if ( deep && window.jQuery === jQuery ) {
            window.jQuery = _jQuery;
        }

        return jQuery;  //返回 jQuery 接口引用
    };

    window.jQuery = window.$ = jQuery;
})();