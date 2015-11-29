(function() {
  var $, RubyDefineMethod, TextEditor;

  TextEditor = require('atom').TextEditor;

  $ = require('atom-space-pen-views').$;

  RubyDefineMethod = require('../lib/ruby-define-method');

  describe("RubyDefineMethod", function() {
    var activationPromise, activeEditor, workspaceElement, _ref;
    _ref = [], workspaceElement = _ref[0], activeEditor = _ref[1], activationPromise = _ref[2];
    beforeEach(function() {
      workspaceElement = atom.views.getView(atom.workspace);
      return activationPromise = atom.packages.activatePackage("ruby-define-method");
    });
    afterEach(function() {
      return activeEditor.destroy();
    });
    return describe("when the ruby-define-method:new_instance_method event is triggered", function() {
      return it("wraps text on line around def and end with indent in body", function() {
        return waitsForPromise((function(_this) {
          return function() {
            var activate, setActiveEditor, setSampleText;
            setActiveEditor = function(editor) {
              return activeEditor = editor;
            };
            setSampleText = function() {
              return activeEditor.setText('doggie');
            };
            activate = function() {
              return atom.commands.dispatch(workspaceElement, 'ruby-define-method:new_instance_method');
            };
            return atom.workspace.open('some-file').then(setActiveEditor).then(setSampleText).then(activate).then(activationPromise).then(function() {
              var indentText;
              indentText = activeEditor.getTabText();
              return expect(activeEditor.getText()).toBe("def doggie(var)\n" + indentText + "\nend\n");
            });
          };
        })(this));
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2hlY3Rvcmh1ZXJ0YXMvLmF0b20vcGFja2FnZXMvcnVieS1kZWZpbmUtbWV0aG9kL3NwZWMvcnVieS1kZWZpbmUtbWV0aG9kLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLCtCQUFBOztBQUFBLEVBQUMsYUFBYyxPQUFBLENBQVEsTUFBUixFQUFkLFVBQUQsQ0FBQTs7QUFBQSxFQUNDLElBQUssT0FBQSxDQUFRLHNCQUFSLEVBQUwsQ0FERCxDQUFBOztBQUFBLEVBRUEsZ0JBQUEsR0FBbUIsT0FBQSxDQUFRLDJCQUFSLENBRm5CLENBQUE7O0FBQUEsRUFTQSxRQUFBLENBQVMsa0JBQVQsRUFBNkIsU0FBQSxHQUFBO0FBQzNCLFFBQUEsdURBQUE7QUFBQSxJQUFBLE9BQXNELEVBQXRELEVBQUMsMEJBQUQsRUFBbUIsc0JBQW5CLEVBQWlDLDJCQUFqQyxDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxnQkFBQSxHQUFtQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUIsSUFBSSxDQUFDLFNBQXhCLENBQW5CLENBQUE7YUFDQSxpQkFBQSxHQUFvQixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsb0JBQTlCLEVBRlg7SUFBQSxDQUFYLENBRkEsQ0FBQTtBQUFBLElBTUEsU0FBQSxDQUFVLFNBQUEsR0FBQTthQUNSLFlBQVksQ0FBQyxPQUFiLENBQUEsRUFEUTtJQUFBLENBQVYsQ0FOQSxDQUFBO1dBU0EsUUFBQSxDQUFTLG9FQUFULEVBQStFLFNBQUEsR0FBQTthQUM3RSxFQUFBLENBQUcsMkRBQUgsRUFBZ0UsU0FBQSxHQUFBO2VBQzlELGVBQUEsQ0FBZ0IsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFBLEdBQUE7QUFDZCxnQkFBQSx3Q0FBQTtBQUFBLFlBQUEsZUFBQSxHQUFrQixTQUFDLE1BQUQsR0FBQTtxQkFBWSxZQUFBLEdBQWUsT0FBM0I7WUFBQSxDQUFsQixDQUFBO0FBQUEsWUFDQSxhQUFBLEdBQWdCLFNBQUEsR0FBQTtxQkFBTSxZQUFZLENBQUMsT0FBYixDQUFxQixRQUFyQixFQUFOO1lBQUEsQ0FEaEIsQ0FBQTtBQUFBLFlBRUEsUUFBQSxHQUFXLFNBQUEsR0FBQTtxQkFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsZ0JBQXZCLEVBQXlDLHdDQUF6QyxFQUFOO1lBQUEsQ0FGWCxDQUFBO21CQUlBLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBZixDQUFvQixXQUFwQixDQUNFLENBQUMsSUFESCxDQUNRLGVBRFIsQ0FFRSxDQUFDLElBRkgsQ0FFUSxhQUZSLENBR0UsQ0FBQyxJQUhILENBR1EsUUFIUixDQUlFLENBQUMsSUFKSCxDQUlRLGlCQUpSLENBSTBCLENBQUMsSUFKM0IsQ0FJZ0MsU0FBQSxHQUFBO0FBQzVCLGtCQUFBLFVBQUE7QUFBQSxjQUFBLFVBQUEsR0FBYSxZQUFZLENBQUMsVUFBYixDQUFBLENBQWIsQ0FBQTtxQkFDQSxNQUFBLENBQU8sWUFBWSxDQUFDLE9BQWIsQ0FBQSxDQUFQLENBQThCLENBQUMsSUFBL0IsQ0FBcUMsbUJBQUEsR0FBbUIsVUFBbkIsR0FBOEIsU0FBbkUsRUFGNEI7WUFBQSxDQUpoQyxFQUxjO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBaEIsRUFEOEQ7TUFBQSxDQUFoRSxFQUQ2RTtJQUFBLENBQS9FLEVBVjJCO0VBQUEsQ0FBN0IsQ0FUQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/hectorhuertas/.atom/packages/ruby-define-method/spec/ruby-define-method-spec.coffee
