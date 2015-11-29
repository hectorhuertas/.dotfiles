(function() {
  var _;

  _ = require('underscore-plus');

  describe("RubyBlock", function() {
    var bottomPanels, editor, editorElement, lineNumbers, markers, rubyBlockElement, workspaceElement, _ref;
    _ref = [], workspaceElement = _ref[0], editor = _ref[1], editorElement = _ref[2], markers = _ref[3], lineNumbers = _ref[4], rubyBlockElement = _ref[5], bottomPanels = _ref[6];
    beforeEach(function() {
      workspaceElement = atom.views.getView(atom.workspace);
      jasmine.attachToDOM(workspaceElement);
      waitsForPromise(function() {
        return atom.packages.activatePackage('language-ruby');
      });
      waitsForPromise(function() {
        return atom.workspace.open('test.rb');
      });
      waitsForPromise(function() {
        return atom.packages.activatePackage('ruby-block').then(function(pkg) {
          var rubyBlock;
          rubyBlock = pkg.mainModule;
          return atom.config.set('ruby-block.highlightLineNumber', true);
        });
      });
      return runs(function() {
        editor = atom.workspace.getActiveTextEditor();
        return editorElement = atom.views.getView(editor);
      });
    });
    describe("when cursor is on the 'end'", function() {
      beforeEach(function() {
        spyOn(_._, "now").andCallFake(function() {
          return window.now;
        });
        editor.setCursorBufferPosition([3, 0]);
        advanceClock(100);
        markers = editorElement.shadowRoot.querySelectorAll('.region');
        lineNumbers = editorElement.shadowRoot.querySelectorAll('.line-number.ruby-block-highlight');
        rubyBlockElement = workspaceElement.querySelector('.panel-bottom .ruby-block');
        return bottomPanels = atom.workspace.getBottomPanels();
      });
      it('highlights line', function() {
        return expect(markers.length).toBe(1);
      });
      it('highlights gutter', function() {
        return expect(lineNumbers.length).toBe(1);
      });
      return it('shows view in bottom panel', function() {
        expect(rubyBlockElement).toExist;
        return expect(bottomPanels[0].isVisible()).toBe(true);
      });
    });
    return describe("when cursor is not on the 'end'", function() {
      beforeEach(function() {
        editor.setCursorBufferPosition([4, 0]);
        advanceClock(100);
        markers = editorElement.shadowRoot.querySelectorAll('.region');
        lineNumbers = editorElement.shadowRoot.querySelectorAll('.line-number.ruby-block-highlight');
        rubyBlockElement = workspaceElement.querySelector('.panel-bottom .ruby-block');
        return bottomPanels = atom.workspace.getBottomPanels();
      });
      it("doesn't highlight line", function() {
        return expect(markers.length).toBe(0);
      });
      it("doesn't highlight gutter", function() {
        return expect(lineNumbers.length).toBe(0);
      });
      return it('shows view in bottom panel', function() {
        expect(rubyBlockElement).toExist;
        return expect(bottomPanels[0].isVisible()).toBe(false);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2hlY3Rvcmh1ZXJ0YXMvLmF0b20vcGFja2FnZXMvcnVieS1ibG9jay9zcGVjL3J1YnktYmxvY2stc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsQ0FBQTs7QUFBQSxFQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsaUJBQVIsQ0FBSixDQUFBOztBQUFBLEVBRUEsUUFBQSxDQUFTLFdBQVQsRUFBc0IsU0FBQSxHQUFBO0FBQ3BCLFFBQUEsbUdBQUE7QUFBQSxJQUFBLE9BQW1HLEVBQW5HLEVBQUMsMEJBQUQsRUFBbUIsZ0JBQW5CLEVBQTJCLHVCQUEzQixFQUEwQyxpQkFBMUMsRUFBbUQscUJBQW5ELEVBQWdFLDBCQUFoRSxFQUFrRixzQkFBbEYsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZ0JBQUEsR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUF4QixDQUFuQixDQUFBO0FBQUEsTUFDQSxPQUFPLENBQUMsV0FBUixDQUFvQixnQkFBcEIsQ0FEQSxDQUFBO0FBQUEsTUFHQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixlQUE5QixFQUFIO01BQUEsQ0FBaEIsQ0FIQSxDQUFBO0FBQUEsTUFJQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBZixDQUFvQixTQUFwQixFQUFIO01BQUEsQ0FBaEIsQ0FKQSxDQUFBO0FBQUEsTUFLQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixZQUE5QixDQUEyQyxDQUFDLElBQTVDLENBQWlELFNBQUMsR0FBRCxHQUFBO0FBQy9DLGNB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

//# sourceURL=/Users/hectorhuertas/.atom/packages/ruby-block/spec/ruby-block-spec.coffee
