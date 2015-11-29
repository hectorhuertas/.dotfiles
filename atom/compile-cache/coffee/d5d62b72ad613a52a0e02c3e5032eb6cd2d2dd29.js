(function() {
  var CompositeDisposable, ZentabsController, _;

  CompositeDisposable = require('atom').CompositeDisposable;

  _ = require('underscore-plus');

  ZentabsController = require('./zentabs-controller');

  module.exports = {
    config: {
      maximumOpenedTabs: {
        type: 'integer',
        "default": 5
      },
      manualMode: {
        type: 'boolean',
        "default": false
      },
      showPinnedIcon: {
        type: 'boolean',
        "default": true
      },
      neverCloseUnsaved: {
        type: 'boolean',
        "default": false
      },
      neverCloseNew: {
        type: 'boolean',
        "default": false
      },
      neverCloseDirty: {
        type: 'boolean',
        "default": false
      }
    },
    activate: function() {
      this.subscriptions = new CompositeDisposable;
      return this.subscriptions.add(atom.workspace.observePanes((function(_this) {
        return function(pane) {
          var zentabController;
          zentabController = new ZentabsController(pane);
          if (_this.zentabsControllers == null) {
            _this.zentabsControllers = [];
          }
          _this.zentabsControllers.push(zentabController);
          _this.subscriptions.add(pane.onDidDestroy(function() {
            return _.remove(_this.zentabsControllers, zentabController);
          }));
          return zentabController;
        };
      })(this)));
    },
    deactivate: function() {
      var zentabController, _i, _len, _ref, _ref1, _results;
      this.subscriptions.dispose();
      _ref1 = (_ref = this.zentabsControllers) != null ? _ref : [];
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        zentabController = _ref1[_i];
        _results.push(zentabController.remove() && zentabController.destroy());
      }
      return _results;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2hlY3Rvcmh1ZXJ0YXMvLmF0b20vcGFja2FnZXMvemVudGFicy9saWIvemVudGFicy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEseUNBQUE7O0FBQUEsRUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBQUQsQ0FBQTs7QUFBQSxFQUNBLENBQUEsR0FBSSxPQUFBLENBQVEsaUJBQVIsQ0FESixDQUFBOztBQUFBLEVBRUEsaUJBQUEsR0FBb0IsT0FBQSxDQUFRLHNCQUFSLENBRnBCLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUVFO0FBQUEsSUFBQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLGlCQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsQ0FEVDtPQURGO0FBQUEsTUFHQSxVQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsS0FEVDtPQUpGO0FBQUEsTUFNQSxjQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsSUFEVDtPQVBGO0FBQUEsTUFTQSxpQkFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLEtBRFQ7T0FWRjtBQUFBLE1BWUEsYUFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLEtBRFQ7T0FiRjtBQUFBLE1BZUEsZUFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLEtBRFQ7T0FoQkY7S0FERjtBQUFBLElBb0JBLFFBQUEsRUFBVSxTQUFBLEdBQUE7QUFDUixNQUFBLElBQUMsQ0FBQSxhQUFELEdBQWlCLEdBQUEsQ0FBQSxtQkFBakIsQ0FBQTthQUNBLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQWYsQ0FBNEIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsSUFBRCxHQUFBO0FBQzdDLGNBQUEsZ0JBQUE7QUFBQSxVQUFBLGdCQUFBLEdBQXVCLElBQUEsaUJBQUEsQ0FBa0IsSUFBbEIsQ0FBdkIsQ0FBQTs7WUFDQSxLQUFDLENBQUEscUJBQXNCO1dBRHZCO0FBQUEsVUFFQSxLQUFDLENBQUEsa0JBQWtCLENBQUMsSUFBcEIsQ0FBeUIsZ0JBQXpCLENBRkEsQ0FBQTtBQUFBLFVBR0EsS0FBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUksQ0FBQyxZQUFMLENBQWtCLFNBQUEsR0FBQTttQkFDbkMsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxLQUFDLENBQUEsa0JBQVYsRUFBOEIsZ0JBQTlCLEVBRG1DO1VBQUEsQ0FBbEIsQ0FBbkIsQ0FIQSxDQUFBO2lCQUtBLGlCQU42QztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTVCLENBQW5CLEVBRlE7SUFBQSxDQXBCVjtBQUFBLElBOEJBLFVBQUEsRUFBWSxTQUFBLEdBQUE7QUFDVixVQUFBLGlEQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsYUFBYSxDQUFDLE9BQWYsQ0FBQSxDQUFBLENBQUE7QUFDQTtBQUFBO1dBQUEsNENBQUE7cUNBQUE7QUFBQSxzQkFBQSxnQkFBZ0IsQ0FBQyxNQUFqQixDQUFBLENBQUEsSUFBNkIsZ0JBQWdCLENBQUMsT0FBakIsQ0FBQSxFQUE3QixDQUFBO0FBQUE7c0JBRlU7SUFBQSxDQTlCWjtHQU5GLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/hectorhuertas/.atom/packages/zentabs/lib/zentabs.coffee
