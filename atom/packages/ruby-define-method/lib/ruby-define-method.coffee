module.exports =
  activate: (state) ->
    'use strict'

    atom.commands.add 'atom-workspace', "ruby-define-method:new_instance_method", => @new_instance_method()

  new_instance_method: ->
    editor = atom.workspace.getActiveTextEditor()
    editorElement = atom.views.getView(editor)
    cursor = editor.getLastCursor()
    method_name = cursor.getCurrentBufferLine().trim()
    selection = editor.getLastSelection()
    selection.selectLine()
    editor.insertText("def " + method_name + "(var)\n\nend\n", {
      autoIndent: true
      autoIndentNewline: true
      autoDecreaseIndent: true
    })
    cursor.moveUp(1)
    indent_level = editor.indentationForBufferRow(cursor.getBufferRow()) + 1
    cursor.moveUp(1)
    editor.setIndentationForBufferRow(cursor.getBufferRow(), indent_level)
    cursor.moveUp(1)
    cursor.moveToEndOfLine()
    cursor.moveLeft()
    selection.selectToBeginningOfWord()
