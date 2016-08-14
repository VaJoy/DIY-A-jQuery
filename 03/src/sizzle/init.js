/**
 * Created by vajoy on 2016/8/9.
 */
import Sizzle from './sizzle.js';

var selectorInit = function(jQuery){
    jQuery.find = Sizzle;
};



export default selectorInit;