module.exports ={
    lintOnSave:false,
}

// module.exports = {
//     devServer: {
//         overlay: {
//             warnings: true,
//             errors: true
//         }
//     },
//     lintOnSave: 'error',
//     chainWebpack: config => {
//         config.module.rule('eslint').use('eslint-loader').loader('eslint-loader').tap(opt => {
//             opt.emitWarning = opt.emitError = opt.failOnWarning = opt.failOnError = true;
//             return opt;
//         });
//     }
// };