{TextEditor} = require 'atom'
{$} = require 'atom-space-pen-views'
RubyDefineMethod = require '../lib/ruby-define-method'

# Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
#
# To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
# or `fdescribe`). Remove the `f` to unfocus the block.

describe "RubyDefineMethod", ->
  [workspaceElement, activeEditor, activationPromise] = []

  beforeEach ->
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage("ruby-define-method");

  afterEach ->
    activeEditor.destroy()

  describe "when the ruby-define-method:new_instance_method event is triggered", ->
    it "wraps text on line around def and end with indent in body", ->
      waitsForPromise =>
        setActiveEditor = (editor) => activeEditor = editor;
        setSampleText = () => activeEditor.setText('doggie');
        activate = () => atom.commands.dispatch(workspaceElement, 'ruby-define-method:new_instance_method');

        atom.workspace.open('some-file')
          .then(setActiveEditor)
          .then(setSampleText)
          .then(activate)
          .then(activationPromise).then () ->
            indentText = activeEditor.getTabText()
            expect(activeEditor.getText()).toBe("def doggie(var)\n#{indentText}\nend\n")
