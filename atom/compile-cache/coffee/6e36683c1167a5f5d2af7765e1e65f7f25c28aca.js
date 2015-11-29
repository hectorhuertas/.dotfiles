(function() {
  var $, CompositeDisposable, View, ZentabsController, _, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CompositeDisposable = require('atom').CompositeDisposable;

  _ref = require('atom-space-pen-views'), $ = _ref.$, View = _ref.View;

  _ = require('underscore-plus');

  module.exports = ZentabsController = (function(_super) {
    __extends(ZentabsController, _super);

    function ZentabsController() {
      this.unpinTab = __bind(this.unpinTab, this);
      this.pinTab = __bind(this.pinTab, this);
      this.destroy = __bind(this.destroy, this);
      return ZentabsController.__super__.constructor.apply(this, arguments);
    }

    ZentabsController.content = function() {
      return this.span('');
    };

    ZentabsController.prototype.initialize = function(pane) {
      var item, _i, _len, _ref1;
      this.pane = pane;
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.commands.add('atom-workspace', 'zentabs:cleanup', (function(_this) {
        return function() {
          return _this.closeOverflowingTabs();
        };
      })(this)));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'zentabs:pintab', this.pinTab));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'zentabs:unpintab', this.unpinTab));
      this.items = [];
      this.pinnedItems = [];
      _ref1 = this.pane.getItems();
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        item = _ref1[_i];
        this.pushItem(item);
      }
      this.subscriptions.add(this.pane.onDidDestroy((function(_this) {
        return function(pane) {
          if (pane === _this.pane) {
            return _this.unsubscribe();
          }
        };
      })(this)));
      this.subscriptions.add(this.pane.onDidAddItem((function(_this) {
        return function(_arg) {
          var item;
          item = _arg.item;
          _this.pushItem(item);
          if (!atom.config.get('zentabs.manualMode')) {
            setTimeout((function() {
              return _this.closeOverflowingTabs(item);
            }), 0);
          }
          return true;
        };
      })(this)));
      this.subscriptions.add(this.pane.onDidRemoveItem((function(_this) {
        return function(_arg) {
          var item;
          item = _arg.item;
          _.remove(_this.pinnedItems, item);
          _.remove(_this.items, item);
          return true;
        };
      })(this)));
      this.subscriptions.add(this.pane.onDidChangeActiveItem((function(_this) {
        return function() {
          _this.updateActiveTab();
          return true;
        };
      })(this)));
      this.updateActiveTab();
      if (!atom.config.get('zentabs.manualMode')) {
        return this.closeOverflowingTabs();
      }
    };

    ZentabsController.prototype.destroy = function() {
      return this.subscriptions.dispose();
    };

    ZentabsController.prototype.pushItem = function(item) {
      if (!(this.pinnedItems.indexOf(item) > -1)) {
        return this.items.push(item);
      }
    };

    ZentabsController.prototype.updateActiveTab = function() {
      var item;
      item = this.pane.getActiveItem();
      if (!item) {
        return;
      }
      if (this.pinnedItems.indexOf(item) > -1) {
        return;
      }
      _.remove(this.items, item);
      return this.items.push(item);
    };

    ZentabsController.prototype.getRepositories = function() {
      return atom.project.getRepositories();
    };

    ZentabsController.prototype.closeOverflowingTabs = function(newItem) {
      var maxTabs, neverCloseDirty, neverCloseNew, neverCloseUnsaved, tmpItems;
      maxTabs = atom.config.get('zentabs.maximumOpenedTabs');
      neverCloseUnsaved = atom.config.get('zentabs.neverCloseUnsaved');
      neverCloseDirty = atom.config.get('zentabs.neverCloseDirty');
      neverCloseNew = atom.config.get('zentabs.neverCloseNew');
      tmpItems = this.items.slice(0);
      return tmpItems.forEach((function(_this) {
        return function(olderItem) {
          var itemPath, preventBecauseDirty, preventBecauseNew, preventBecauseUnsaved, _ref1, _ref2, _ref3;
          if (_this.items.length > maxTabs) {
            preventBecauseUnsaved = ((_ref1 = olderItem.buffer) != null ? _ref1.isModified() : void 0) && neverCloseUnsaved;
            preventBecauseDirty = false;
            preventBecauseNew = false;
            if (itemPath = (_ref2 = olderItem.buffer) != null ? (_ref3 = _ref2.file) != null ? _ref3.path : void 0 : void 0) {
              _this.getRepositories().forEach(function(repo) {
                if (!repo) {
                  return;
                }
                preventBecauseDirty = preventBecauseDirty || repo.isPathModified(itemPath) && neverCloseDirty;
                return preventBecauseNew = preventBecauseNew || repo.isPathNew(itemPath) && neverCloseNew;
              });
            }
            if (!(preventBecauseUnsaved || preventBecauseDirty || preventBecauseNew || newItem === olderItem)) {
              return _this.pane.destroyItem(olderItem);
            }
          }
        };
      })(this));
    };

    ZentabsController.prototype.pinTab = function() {
      var item, tab, view;
      tab = $('.tab.right-clicked');
      if (!tab) {
        return;
      }
      view = atom.views.getView(tab);
      item = view.item;
      _.remove(this.items, item);
      if (!(this.pinnedItems.indexOf(item) > -1)) {
        this.pinnedItems.push(item);
      }
      return tab.addClass('pinned');
    };

    ZentabsController.prototype.unpinTab = function(event) {
      var item, tab, view;
      tab = $('.tab.right-clicked');
      if (!tab) {
        return;
      }
      view = atom.views.getView(tab);
      item = view.item;
      _.remove(this.pinnedItems, item);
      this.pushItem(item);
      tab.removeClass('pinned');
      return this.closeOverflowingTabs();
    };

    return ZentabsController;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2hlY3Rvcmh1ZXJ0YXMvLmF0b20vcGFja2FnZXMvemVudGFicy9saWIvemVudGFicy1jb250cm9sbGVyLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSx3REFBQTtJQUFBOzttU0FBQTs7QUFBQSxFQUFDLHNCQUF1QixPQUFBLENBQVEsTUFBUixFQUF2QixtQkFBRCxDQUFBOztBQUFBLEVBQ0EsT0FBWSxPQUFBLENBQVEsc0JBQVIsQ0FBWixFQUFDLFNBQUEsQ0FBRCxFQUFJLFlBQUEsSUFESixDQUFBOztBQUFBLEVBRUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUixDQUZKLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBRUosd0NBQUEsQ0FBQTs7Ozs7OztLQUFBOztBQUFBLElBQUEsaUJBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsZ0NBR0EsVUFBQSxHQUFZLFNBQUUsSUFBRixHQUFBO0FBQ1YsVUFBQSxxQkFBQTtBQUFBLE1BRFcsSUFBQyxDQUFBLE9BQUEsSUFDWixDQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsYUFBRCxHQUFpQixHQUFBLENBQUEsbUJBQWpCLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0IsZ0JBQWxCLEVBQW9DLGlCQUFwQyxFQUF1RCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFHLEtBQUMsQ0FBQSxvQkFBRCxDQUFBLEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF2RCxDQUFuQixDQUZBLENBQUE7QUFB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

//# sourceURL=/Users/hectorhuertas/.atom/packages/zentabs/lib/zentabs-controller.coffee
