(function() {
  module.exports = {
    activate: function(state) {
      'use strict';
      return atom.commands.add('atom-workspace', "ruby-define-method:new_instance_method", (function(_this) {
        return function() {
          return _this.new_instance_method();
        };
      })(this));
    },
    new_instance_method: function() {
      var cursor, editor, editorElement, indent_level, method_name, selection;
      editor = atom.workspace.getActiveTextEditor();
      editorElement = atom.views.getView(editor);
      cursor = editor.getLastCursor();
      method_name = cursor.getCurrentBufferLine().trim();
      selection = editor.getLastSelection();
      selection.selectLine();
      editor.insertText("def " + method_name + "(var)\n\nend\n", {
        autoIndent: true,
        autoIndentNewline: true,
        autoDecreaseIndent: true
      });
      cursor.moveUp(1);
      indent_level = editor.indentationForBufferRow(cursor.getBufferRow()) + 1;
      cursor.moveUp(1);
      editor.setIndentationForBufferRow(cursor.getBufferRow(), indent_level);
      cursor.moveUp(1);
      cursor.moveToEndOfLine();
      cursor.moveLeft();
      return selection.selectToBeginningOfWord();
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2hlY3Rvcmh1ZXJ0YXMvLmF0b20vcGFja2FnZXMvcnVieS1kZWZpbmUtbWV0aG9kL2xpYi9ydWJ5LWRlZmluZS1tZXRob2QuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTtBQUNSLE1BQUEsWUFBQSxDQUFBO2FBRUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFkLENBQWtCLGdCQUFsQixFQUFvQyx3Q0FBcEMsRUFBOEUsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsbUJBQUQsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBOUUsRUFIUTtJQUFBLENBQVY7QUFBQSxJQUtBLG1CQUFBLEVBQXFCLFNBQUEsR0FBQTtBQUNuQixVQUFBLG1FQUFBO0FBQUEsTUFBQSxNQUFBLEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBZixDQUFBLENBQVQsQ0FBQTtBQUFBLE1BQ0EsYUFBQSxHQUFnQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUIsTUFBbkIsQ0FEaEIsQ0FBQTtBQUFBLE1BRUEsTUFBQSxHQUFTLE1BQU0sQ0FBQyxhQUFQLENBQUEsQ0FGVCxDQUFBO0FBQUEsTUFHQSxXQUFBLEdBQWMsTUFBTSxDQUFDLG9CQUFQLENBQUEsQ0FBNkIsQ0FBQyxJQUE5QixDQUFBLENBSGQsQ0FBQTtBQUFBLE1BSUEsU0FBQSxHQUFZLE1BQU0sQ0FBQyxnQkFBUCxDQUFBLENBSlosQ0FBQTtBQUFBLE1BS0EsU0FBUyxDQUFDLFVBQVYsQ0FBQSxDQUxBLENBQUE7QUFBQSxNQU1BLE1BQU0sQ0FBQyxVQUFQLENBQWtCLE1BQUEsR0FBUyxXQUFULEdBQXVCLGdCQUF6QyxFQUEyRDtBQUFBLFFBQ3pELFVBQUEsRUFBWSxJQUQ2QztBQUFBLFFBRXpELGlCQUFBLEVBQW1CLElBRnNDO0FBQUEsUUFHekQsa0JBQUEsRUFBb0IsSUFIcUM7T0FBM0QsQ0FOQSxDQUFBO0FBQUEsTUFXQSxNQUFNLENBQUMsTUFBUCxDQUFjLENBQWQsQ0FYQSxDQUFBO0FBQUEsTUFZQSxZQUFBLEdBQWUsTUFBTSxDQUFDLHVCQUFQLENBQStCLE1BQU0sQ0FBQyxZQUFQLENBQUEsQ0FBL0IsQ0FBQSxHQUF3RCxDQVp2RSxDQUFBO0FBQUEsTUFhQSxNQUFNLENBQUMsTUFBUCxDQUFjLENBQWQsQ0FiQSxDQUFBO0FBQUEsTUFjQSxNQUFNLENBQUMsMEJBQVAsQ0FBa0MsTUFBTSxDQUFDLFlBQVAsQ0FBQSxDQUFsQyxFQUF5RCxZQUF6RCxDQWRBLENBQUE7QUFBQSxNQWVBLE1BQU0sQ0FBQyxNQUFQLENBQWMsQ0FBZCxDQWZBLENBQUE7QUFBQSxNQWdCQSxNQUFNLENBQUMsZUFBUCxDQUFBLENBaEJBLENBQUE7QUFBQSxNQWlCQSxNQUFNLENBQUMsUUFBUCxDQUFBLENBakJBLENBQUE7YUFrQkEsU0FBUyxDQUFDLHVCQUFWLENBQUEsRUFuQm1CO0lBQUEsQ0FMckI7R0FERixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/hectorhuertas/.atom/packages/ruby-define-method/lib/ruby-define-method.coffee
