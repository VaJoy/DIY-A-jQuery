/**
 * Created by vajoy on 2016/8/2.
 */
var global = function(jQuery){
    //走模块化形式的直接绕过
    if(typeof exports === 'object' && typeof module !== 'undefined') return;

    var _jQuery = window.jQuery,
        _$ = window.$;

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
};

export default global;