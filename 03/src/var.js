/**
 * Created by vajoy on 2016/8/2.
 */
var arr = [];

export const slice = arr.slice;

export var class2type = {};  //在core.js中会被赋予各类型属性值

export const toString = class2type.toString; //等同于 Object.prototype.toString

export const getProto = Object.getPrototypeOf;

export const hasOwn = class2type.hasOwnProperty;

export const fnToString = hasOwn.toString; //等同于 Object.toString/Function.toString

export const ObjectFunctionString = fnToString.call( Object ); //顶层Object构造函数字符串"function Object() { [native code] }"，用于判断 plainObj