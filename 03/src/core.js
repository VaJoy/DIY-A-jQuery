/**
 * Created by vajoy on 2016/8/1.
 */
import { slice, class2type, toString, getProto, hasOwn, fnToString, ObjectFunctionString } from './var.js';

var version = "0.0.1",
    jQuery = function (selector, context) {

        return new jQuery.fn.init(selector, context);
    };



jQuery.fn = jQuery.prototype = {
    jquery: version,
    length: 0,  // JQ实例.length 默认为0
    constructor: jQuery,
    /**
     * 入栈操作
     * @param elems {Array}
     * @returns {*}
     */
    pushStack: function( elems ) {  //elems是数组

        // 将检索到的DOM集合转换为JQ类数组对象
        var ret = jQuery.merge( this.constructor(), elems );  //this.constructor() 返回了一个 length 为0的JQ对象

        // 添加关系链，新JQ对象的prevObject属性指向旧JQ对象
        ret.prevObject = this;

        return ret;
    },
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

    if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
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

                if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
                    ( copyIsArray = jQuery.isArray( copy ) ) ) ) {

                    if ( copyIsArray ) {
                        copyIsArray = false;
                        clone = src && jQuery.isArray( src ) ? src : [];

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


"Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ").forEach(function(name){
    class2type[ "[object " + name + "]" ] = name.toLowerCase();
});


jQuery.extend( {
    merge: function( first, second ) {
        var len = +second.length,
            j = 0,
            i = first.length;

        for ( ; j < len; j++ ) {
            first[ i++ ] = second[ j ];
        }

        first.length = i;

        return first;
    },
    isArray: Array.isArray,
    isPlainObject: function( obj ) {
        var proto, Ctor;

        if ( !obj || toString.call( obj ) !== "[object Object]" ) {
            return false;
        }

        proto = getProto( obj );
        if ( !proto ) {
            return true;
        }

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

jQuery.fn.extend({
    find: function( selector ) {  //链式支持find
        var i, ret,
            len = this.length,
            self = this;

        ret = this.pushStack( [] ); //转为JQ对象

        for ( i = 0; i < len; i++ ) {  //遍历
            jQuery.find( selector, self[ i ], ret );  //直接利用 Sizzle 接口，把结果注入到 ret 数组中去
        }

        return ret
    },
    end: function() {
        return this.prevObject || this.constructor();
    },
    eq: function( i ) {
        var len = this.length,
            j = +i + ( i < 0 ? len : 0 );  //支持倒序搜索，i可以是负数
        return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] ); //容错处理，若i过大或过小，返回空数组
    },
    get: function( num ) {
        return num != null ?

            // 支持倒序搜索，num可以是负数
            ( num < 0 ? this[ num + this.length ] : this[ num ] ) :

            // 克隆一个新数组，避免指向相同
            slice.call( this );  // slice 即 [].slice，封装在 var.js 中
    },
    first: function() {
        return this.eq( 0 );
    },
    last: function() {
        return this.eq( -1 );
    }
});

export default jQuery;