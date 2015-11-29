(function() {
  var RubocopAutoCorrect;

  RubocopAutoCorrect = require('./rubocop-auto-correct');

  module.exports = {
    config: {
      rubocopCommandPath: {
        description: 'If the command does not work, please input rubocop full path here. Example: /Users/<username>/.rbenv/shims/rubocop)',
        type: 'string',
        "default": 'rubocop'
      },
      autoRun: {
        description: 'When you save the buffer, automatically it runs Rubocop auto correct. You need to run manually once at window before you use the option.',
        type: 'boolean',
        "default": false
      },
      notification: {
        description: 'When this option is disabled, you do not receive any notifications even thought a file is corrected.',
        type: 'boolean',
        "default": true
      },
      correctFile: {
        description: 'You can correct a file directly if you enable this option. You do not need to save file after correcting it.',
        type: 'boolean',
        "default": false
      }
    },
    activate: function() {
      return this.rubocopAutoCorrect = new RubocopAutoCorrect();
    },
    deactivate: function() {
      var _ref;
      if ((_ref = this.rubocopAutoCorrect) != null) {
        _ref.destroy();
      }
      return this.rubocopAutoCorrect = null;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2hlY3Rvcmh1ZXJ0YXMvLmF0b20vcGFja2FnZXMvcnVib2NvcC1hdXRvLWNvcnJlY3QvbGliL21haW4uY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtCQUFBOztBQUFBLEVBQUEsa0JBQUEsR0FBcUIsT0FBQSxDQUFRLHdCQUFSLENBQXJCLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLGtCQUFBLEVBQ0U7QUFBQSxRQUFBLFdBQUEsRUFBYSxxSEFBYjtBQUFBLFFBQ0EsSUFBQSxFQUFNLFFBRE47QUFBQSxRQUVBLFNBQUEsRUFBUyxTQUZUO09BREY7QUFBQSxNQUlBLE9BQUEsRUFDRTtBQUFBLFFBQUEsV0FBQSxFQUFhLDBJQUFiO0FBQUEsUUFDQSxJQUFBLEVBQU0sU0FETjtBQUFBLFFBRUEsU0FBQSxFQUFTLEtBRlQ7T0FMRjtBQUFBLE1BUUEsWUFBQSxFQUNFO0FBQUEsUUFBQSxXQUFBLEVBQWEsc0dBQWI7QUFBQSxRQUNBLElBQUEsRUFBTSxTQUROO0FBQUEsUUFFQSxTQUFBLEVBQVMsSUFGVDtPQVRGO0FBQUEsTUFZQSxXQUFBLEVBQ0U7QUFBQSxRQUFBLFdBQUEsRUFBYSw4R0FBYjtBQUFBLFFBQ0EsSUFBQSxFQUFNLFNBRE47QUFBQSxRQUVBLFNBQUEsRUFBUyxLQUZUO09BYkY7S0FERjtBQUFBLElBa0JBLFFBQUEsRUFBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsa0JBQUQsR0FBMEIsSUFBQSxrQkFBQSxDQUFBLEVBRGxCO0lBQUEsQ0FsQlY7QUFBQSxJQXFCQSxVQUFBLEVBQVksU0FBQSxHQUFBO0FBQ1YsVUFBQSxJQUFBOztZQUFtQixDQUFFLE9BQXJCLENBQUE7T0FBQTthQUNBLElBQUMsQ0FBQSxrQkFBRCxHQUFzQixLQUZaO0lBQUEsQ0FyQlo7R0FIRixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/hectorhuertas/.atom/packages/rubocop-auto-correct/lib/main.coffee
