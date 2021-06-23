module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "@/styles/setup/_mixins.scss";
        @import "@/styles/setup/_typography.scss";
        @import "@/styles/setup/_variables.scss";
          @import "@/styles/_board.scss";
        `
      }
    }
  }
};