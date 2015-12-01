var path = require('path');
module.exports = function(sails) {

  return {

    /**
     * Default configuration
     *
     * We do this in a function since the configuration key for
     * the hook is itself configurable, so we can't just return
     * an object.
     */
    defaults: {

      __configKey__: {
        presets: ['es2015', 'stage-3'],
        //can be false or a regex. Defaults to node_modules in babel
        ignore: null,
        //can be any regex. Only these files will be transpiled
        only: null,
        //an array of plugins
        plugins: null
      }
    },

    /**
     * Initialize the hook
     * @param  {Function} cb Callback for when we're done initializing
     */
    configure: function() {

      // If the hook has been deactivated, just return
      if (!sails.config[this.configKey].compile) {
        sails.log.verbose("Babel hook deactivated.");
      } else {

        //Load babel and override the default require; with experimental features,
        //such as async/await.

        var options = {
          presets: sails.config[this.configKey].presets
        };

        if (sails.config[this.configKey].ignore !== null) {
          options.ignore = sails.config[this.configKey].ignore;
        }

        if (sails.config[this.configKey].only) {
          options.only = sails.config[this.configKey].only;
        }

        if (sails.config[this.configKey].plugins) {
          options.plugins = sails.config[this.configKey].plugins;
        }

        require("babel-register")(options);


        sails.log.verbose("Babel hook activated. Enjoy ES6/7 power in your Sails app.");
      }
    },

  };

};
