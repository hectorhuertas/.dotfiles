(function() {
  var CompositeDisposable, Point, RubyBlock, RubyBlockView, _, _ref;

  _ref = require('atom'), CompositeDisposable = _ref.CompositeDisposable, Point = _ref.Point;

  _ = null;

  RubyBlockView = null;

  module.exports = RubyBlock = {
    config: {
      showBottomPanel: {
        type: 'boolean',
        "default": true
      },
      highlightLine: {
        type: 'boolean',
        "default": true
      },
      highlightLineNumber: {
        type: 'boolean',
        "default": false
      }
    },
    rubyBlockView: null,
    modalPanel: null,
    rubyRootScope: 'source.ruby',
    rubyStartBlockNames: ['for', 'if', 'unless', 'until', 'while', 'class', 'module', 'case', 'def', 'begin', 'describe', 'context'],
    rubyStartBlockScopes: ['keyword.control.ruby', 'keyword.control.start-block.ruby', 'keyword.control.class.ruby', 'keyword.control.module.ruby', 'keyword.control.def.ruby', 'meta.rspec.behaviour'],
    rubyWhileBlockName: 'while',
    rubyDoBlockName: 'do',
    rubyEndBlockName: 'end',
    rubyKeywordControlScope: 'keyword.control.ruby',
    rubyKeywordControlNames: ['end', 'elsif', 'else', 'when', 'rescue', 'ensure'],
    rubyDoScope: 'keyword.control.start-block.ruby',
    endBlockStack: [],
    activate: function() {
      return this.activeItemSubscription = atom.workspace.observeActivePaneItem((function(_this) {
        return function() {
          return _this.subscribeToActiveTextEditor();
        };
      })(this));
    },
    deactivate: function() {
      var _ref1, _ref2, _ref3, _ref4, _ref5;
      if ((_ref1 = this.marker) != null) {
        _ref1.destroy();
      }
      this.marker = null;
      if ((_ref2 = this.modalPanel) != null) {
        _ref2.destroy();
      }
      this.modalPanel = null;
      if ((_ref3 = this.activeItemSubscription) != null) {
        _ref3.dispose();
      }
      this.activeItemSubscription = null;
      if ((_ref4 = this.editorSubscriptions) != null) {
        _ref4.dispose();
      }
      this.editorSubscriptions = null;
      if ((_ref5 = this.rubyBlockView) != null) {
        _ref5.destroy();
      }
      return this.rubyBlockView = null;
    },
    init: function() {
      if (!(RubyBlockView && _)) {
        this.loadClasses();
      }
      this.rubyBlockView = new RubyBlockView;
      return this.modalPanel = atom.workspace.addBottomPanel({
        item: this.rubyBlockView.getElement(),
        visible: false,
        priority: 500
      });
    },
    getActiveTextEditor: function() {
      return atom.workspace.getActiveTextEditor();
    },
    goToMatchingLine: function() {
      var editor, firstCharPoint, row;
      if (this.blockStartedRowNumber == null) {
        return atom.beep();
      }
      editor = this.getActiveTextEditor();
      row = editor.lineTextForBufferRow(this.blockStartedRowNumber);
      firstCharPoint = row.search(/\S/);
      return editor.setCursorBufferPosition([this.blockStartedRowNumber, firstCharPoint]);
    },
    subscribeToActiveTextEditor: function() {
      var editor, editorElement, _ref1, _ref2, _ref3;
      if ((_ref1 = this.marker) != null) {
        _ref1.destroy();
      }
      if ((_ref2 = this.modalPanel) != null ? _ref2.isVisible() : void 0) {
        this.modalPanel.hide();
      }
      if ((_ref3 = this.editorSubscriptions) != null) {
        _ref3.dispose();
      }
      editor = this.getActiveTextEditor();
      if (editor == null) {
        return;
      }
      if (editor.getRootScopeDescriptor().scopes[0].indexOf(this.rubyRootScope) === -1) {
        return;
      }
      if (this.rubyBlockView == null) {
        this.init();
      }
      editorElement = atom.views.getView(editor);
      this.editorSubscriptions = new CompositeDisposable;
      this.editorSubscriptions.add(atom.commands.add(editorElement, {
        'ruby-block:go-to-matching-line': (function(_this) {
          return function() {
            return _this.goToMatchingLine();
          };
        })(this)
      }));
      this.editorSubscriptions.add(editor.onDidChangeCursorPosition(_.debounce((function(_this) {
        return function() {
          var _ref4;
          if (_this.getActiveTextEditor() !== editor) {
            return;
          }
          _this.blockStartedRowNumber = null;
          if (_this.modalPanel.isVisible()) {
            _this.modalPanel.hide();
          }
          if ((_ref4 = _this.marker) != null) {
            _ref4.destroy();
          }
          return _this.searchForBlock();
        };
      })(this), 100)));
      return this.searchForBlock();
    },
    searchForBlock: function() {
      var currentRowNumber, cursor, editor, filteredTokens, firstTokenScope, grammar, i, prevWordBoundaryPos, row, rowNumber, scope, startBlock, token, tokens, _i, _j, _k, _l, _len, _len1, _ref1, _ref2, _ref3;
      editor = this.getActiveTextEditor();
      grammar = editor.getGrammar();
      cursor = editor.getLastCursor();
      currentRowNumber = cursor.getBufferRow();
      if (cursor.getScopeDescriptor().scopes.indexOf(this.rubyKeywordControlScope) === -1 || this.rubyKeywordControlNames.indexOf(editor.getWordUnderCursor()) === -1) {
        return;
      }
      this.endBlockStack.push(editor.getWordUnderCursor);
      for (rowNumber = _i = _ref1 = cursor.getBufferRow(); _ref1 <= 0 ? _i <= 0 : _i >= 0; rowNumber = _ref1 <= 0 ? ++_i : --_i) {
        if (editor.isBufferRowCommented(rowNumber)) {
          continue;
        }
        if (rowNumber === currentRowNumber) {
          prevWordBoundaryPos = cursor.getPreviousWordBoundaryBufferPosition();
          row = editor.getTextInBufferRange([[rowNumber, 0], prevWordBoundaryPos]);
        } else {
          row = editor.lineTextForBufferRow(rowNumber);
        }
        tokens = grammar.tokenizeLine(row).tokens;
        filteredTokens = (function() {
          var _j, _len, _results;
          _results = [];
          for (i = _j = 0, _len = tokens.length; _j < _len; i = ++_j) {
            token = tokens[i];
            if (!token.value.match(/^\s*$/)) {
              _results.push(token);
            }
          }
          return _results;
        })();
        startBlock = (function() {
          var _j, _len, _results;
          _results = [];
          for (_j = 0, _len = filteredTokens.length; _j < _len; _j++) {
            token = filteredTokens[_j];
            if (token.scopes.indexOf(this.rubyDoScope) >= 0) {
              _results.push(token);
            }
          }
          return _results;
        }).call(this);
        if (startBlock.length > 0) {
          if (token.value !== this.rubyDoBlockName || filteredTokens[0].value !== this.rubyWhileBlockName) {
            this.endBlockStack.pop();
          }
          if (this.endBlockStack.length === 0) {
            return this.highlightBlock(rowNumber);
          }
        }
        for (_j = filteredTokens.length - 1; _j >= 0; _j += -1) {
          token = filteredTokens[_j];
          _ref2 = token.scopes;
          for (_k = 0, _len = _ref2.length; _k < _len; _k++) {
            scope = _ref2[_k];
            if (scope === this.rubyKeywordControlScope && token.value === this.rubyEndBlockName) {
              this.endBlockStack.push(scope.value);
            } else if (this.rubyStartBlockScopes.indexOf(scope) >= 0 && this.rubyStartBlockNames.indexOf(token.value) >= 0) {
              if (token.value === 'case') {
                this.endBlockStack.pop();
              } else {
                _ref3 = filteredTokens[0].scopes;
                for (_l = 0, _len1 = _ref3.length; _l < _len1; _l++) {
                  firstTokenScope = _ref3[_l];
                  if (this.rubyStartBlockScopes.indexOf(firstTokenScope) >= 0 && this.rubyStartBlockNames.indexOf(filteredTokens[0].value) >= 0) {
                    this.endBlockStack.pop();
                    break;
                  }
                }
              }
              if (this.endBlockStack.length === 0) {
                return this.highlightBlock(rowNumber);
              }
            }
          }
        }
      }
    },
    highlightBlock: function(rowNumber) {
      var editor, firstCharPoint, row;
      editor = this.getActiveTextEditor();
      row = editor.lineTextForBufferRow(rowNumber);
      firstCharPoint = row.search(/\S/);
      this.marker = editor.markBufferRange([[rowNumber, firstCharPoint], [rowNumber, row.length]]);
      this.blockStartedRowNumber = rowNumber;
      if (atom.config.get('ruby-block.highlightLine')) {
        editor.decorateMarker(this.marker, {
          type: 'highlight',
          "class": 'ruby-block-highlight'
        });
      }
      if (atom.config.get('ruby-block.highlightLineNumber')) {
        editor.decorateMarker(this.marker, {
          type: 'line-number',
          "class": 'ruby-block-highlight'
        });
      }
      if (atom.config.get('ruby-block.showBottomPanel')) {
        this.rubyBlockView.updateMessage(rowNumber);
        return this.modalPanel.show();
      }
    },
    loadClasses: function() {
      _ = require('underscore-plus');
      return RubyBlockView = require('./ruby-block-view');
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2hlY3Rvcmh1ZXJ0YXMvLmF0b20vcGFja2FnZXMvcnVieS1ibG9jay9saWIvcnVieS1ibG9jay5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsNkRBQUE7O0FBQUEsRUFBQSxPQUErQixPQUFBLENBQVEsTUFBUixDQUEvQixFQUFDLDJCQUFBLG1CQUFELEVBQXNCLGFBQUEsS0FBdEIsQ0FBQTs7QUFBQSxFQUNBLENBQUEsR0FBSSxJQURKLENBQUE7O0FBQUEsRUFFQSxhQUFBLEdBQWdCLElBRmhCLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUFpQixTQUFBLEdBQ2Y7QUFBQSxJQUFBLE1BQUEsRUFDRTtBQUFBLE1BQUEsZUFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLElBRFQ7T0FERjtBQUFBLE1BR0EsYUFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLElBRFQ7T0FKRjtBQUFBLE1BTUEsbUJBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxLQURUO09BUEY7S0FERjtBQUFBLElBWUEsYUFBQSxFQUFlLElBWmY7QUFBQSxJQWFBLFVBQUEsRUFBWSxJQWJaO0FBQUEsSUFjQSxhQUFBLEVBQWUsYUFkZjtBQUFBLElBZ0JBLG1CQUFBLEVBQXFCLENBQ25CLEtBRG1CLEVBRW5CLElBRm1CLEVBR25CLFFBSG1CLEVBSW5CLE9BSm1CLEVBS25CLE9BTG1CLEVBTW5CLE9BTm1CLEVBT25CLFFBUG1CLEVBUW5CLE1BUm1CLEVBU25CLEtBVG1CLEVBVW5CLE9BVm1CLEVBV25CLFVBWG1CLEVBWW5CLFNBWm1CLENBaEJyQjtBQUFBLElBOEJBLG9CQUFBLEVB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

//# sourceURL=/Users/hectorhuertas/.atom/packages/ruby-block/lib/ruby-block.coffee
