/**
 * Created by vajoy on 2016/8/1.
 */
import { class2type, toString, getProto, hasOwn, fnToString, ObjectFunctionString } from './var.js';

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

jQuery.extend = jQuery.fn.extend = function() {
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[ 0 ] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    if ( typeof target === "boolean" ) {
        deep = target;

        target = arguments[ i ] || {};
        i++;
    }

    if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {  //修改点1
        target = {};
    }

    if ( i === length ) {
        target = this;
        i--;
    }

    for ( ; i < length; i++ ) {

        if ( ( options = arguments[ i ] ) != null ) {

            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];

                if ( target === copy ) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if ( deep && copy && ( jQuery.isPlainObject( copy ) ||  //修改点2
                    ( copyIsArray = jQuery.isArray( copy ) ) ) ) {

                    if ( copyIsArray ) {
                        copyIsArray = false;
                        clone = src && jQuery.isArray( src ) ? src : [];  //修改点3

                    } else {
                        clone = src && jQuery.isPlainObject( src ) ? src : {};
                    }

                    target[ name ] = jQuery.extend( deep, clone, copy );

                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }

    return target;
};

//新增修改点1
"Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ").forEach(function(name){
    class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

//新增修改点2
jQuery.extend( {
    isArray: Array.isArray,
    isPlainObject: function( obj ) {
        var proto, Ctor;

        // 明显的非对象判断，直接返回false
        if ( !obj || toString.call( obj ) !== "[object Object]" ) {
            return false;
        }

        proto = getProto( obj );  //获取 prototype

        // 通过 Object.create( null ) 形式创建的 {} 是没有prototype的
        if ( !proto ) {
            return true;
        }

        // 简单对象的构造函数等于最顶层 Object 构造函数
        Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
        return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
    },
    isFunction: function( obj ) {
        return jQuery.type( obj ) === "function";
    },
    type: function( obj ) {
        if ( obj == null ) {
            return obj + ""; //'undefined' 或 'null'
        }

        return typeof obj === "object" || typeof obj === "function" ?
        class2type[ toString.call( obj ) ] || "object" :
            typeof obj;
    }

});


export default jQuery;