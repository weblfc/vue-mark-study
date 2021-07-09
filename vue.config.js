// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#1DA57A',
          'link-color': '#1DA57A',
          'border-radius-base': '2px',
        },
        javascriptEnabled: true,
      },
    },
  },
  // devServer: {
  //   proxy: 'http://localhost:8081/api/dictionarydetail/getAll'
  // }
  devServer: {
    proxy:{
      '/api' :{
        target :'http://localhost:8081',
        changeOrigin :true,
        ws:true
        // pathRewrite:{
        //   '/api':''
        // }
        // pathRewrite:false
      },
      '/uploadpath' :{
        target :'http://localhost:8081/',
        changeOrigin :true,
        ws:true
      }
    }
  }
};