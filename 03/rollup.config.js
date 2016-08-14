var rollup = require( 'rollup' );
var babel = require('rollup-plugin-babel');

rollup.rollup({
    entry: 'src/jquery.js',
    plugins: [ babel() ]
}).then( function ( bundle ) {
    bundle.write({
        format: 'umd',
        moduleName: 'jQuery',
        dest: 'rel/jquery.js'
    });
});