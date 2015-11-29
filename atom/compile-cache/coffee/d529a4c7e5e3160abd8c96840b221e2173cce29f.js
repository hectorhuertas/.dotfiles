(function() {
  var CompositeDisposable, SeeingIsBelieving, defaultLang, spawn;

  spawn = require('child_process').spawn;

  CompositeDisposable = require('atom').CompositeDisposable;

  defaultLang = 'en_US.UTF-8';

  module.exports = SeeingIsBelieving = {
    activate: function() {
      this.subscriptions = new CompositeDisposable;
      return this.subscriptions.add(atom.commands.add('atom-workspace', {
        'seeing-is-believing:annotate-document': (function(_this) {
          return function() {
            return _this.annotateDocument();
          };
        })(this),
        'seeing-is-believing:annotate-magic-comments': (function(_this) {
          return function() {
            return _this.annotateMagicComments();
          };
        })(this),
        'seeing-is-believing:remove-annotations': (function(_this) {
          return function() {
            return _this.removeAnnotations();
          };
        })(this)
      }));
    },
    deactivate: function() {
      return this.subscriptions.dispose();
    },
    configDefaults: {
      'ruby-command': 'ruby',
      'add-to-env': {
        'LANG': defaultLang,
        'ADD_TO_PATH': ''
      },
      'flags': ['--alignment-strategy', 'chunk', '--number-of-captures', '300', '--line-length', '1000', '--timeout', '12']
    },
    invokeSib: function(vars) {
      var args, capturedError, crntBody, editor, newBody, sib;
      editor = vars.editor;
      crntBody = editor.getText();
      args = ['-S', 'seeing_is_believing'].concat(vars.flags);
      newBody = "";
      capturedError = "";
      console.log('Seeing is Believing:');
      console.log('  command: ' + vars.rubyCommand + ' ' + args.join(' '));
      console.log('  env:     ', vars.env);
      sib = spawn(vars.rubyCommand, args, {
        'env': vars.env
      });
      sib.stdout.on('data', (function(_this) {
        return function(output) {
          return newBody += output;
        };
      })(this));
      sib.stderr.on('data', (function(_this) {
        return function(output) {
          capturedError += output;
          return console.error('Seeing is Believing stderr:' + output);
        };
      })(this));
      sib.on('close', (function(_this) {
        return function(code) {
          console.log('Seeing is Believing closed with code ' + code);
          if (capturedError.indexOf('LoadError') !== -1) {
            return alert("It looks like the Seeing is Believing gem hasn't been installed, run\n`gem install seeing_is_believing`\nto do so, then make sure it worked with\n`seeing_is_believing --version`\n\nIf it should be installed, check logs to see what was executed\n(Option+Command+I)");
          } else if (code === 2) {
            return alert(capturedError);
          } else {
            return _this.withoutMovingScreenOrCursor(editor, function() {
              return editor.setText(newBody + capturedError);
            });
          }
        };
      })(this));
      sib.stdin.write(crntBody);
      return sib.stdin.end();
    },
    getVars: function() {
      var addToPath, editor, fileName, flag, key, newEnv, newEnvVars, newFlags, oldEnvVars, oldFlags, rubyCommand, sibConfig, _ref, _ref1, _ref2;
      sibConfig = atom.config.get('seeing-is-believing');
      newEnvVars = {};
      oldEnvVars = (_ref = sibConfig['add-to-env']) != null ? _ref : {};
      for (key in oldEnvVars) {
        newEnvVars[key] = oldEnvVars[key];
      }
      oldFlags = (_ref1 = sibConfig['flags']) != null ? _ref1 : [];
      newFlags = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = oldFlags.length; _i < _len; _i++) {
          flag = oldFlags[_i];
          _results.push(flag);
        }
        return _results;
      })();
      rubyCommand = (_ref2 = sibConfig['ruby-command']) != null ? _ref2 : 'ruby';
      editor = atom.workspace.getActivePaneItem();
      fileName = editor.getPath();
      if (fileName) {
        newFlags.push('--as', fileName);
      }
      addToPath = newEnvVars.ADD_TO_PATH || "";
      delete newEnvVars.ADD_TO_PATH;
      newEnv = this.merge(process.env, newEnvVars);
      if (newEnv.PATH) {
        newEnv.PATH = addToPath + ':' + newEnv.PATH;
      } else {
        newEnv.PATH = addToPATH;
      }
      newEnv.LANG || (newEnv.LANG = defaultLang);
      if (newFlags.indexOf('--shebang') !== -1) {
        newFlags.push('--shebang', rubyCommand);
      }
      return {
        "env": newEnv,
        "flags": newFlags,
        "editor": editor,
        "rubyCommand": rubyCommand
      };
    },
    inEditor: function() {
      var editor;
      editor = atom.workspace.getActivePaneItem();
      return (editor != null) && (editor.displayBuffer != null) && (editor.getText != null) && (editor.setText != null) && (editor.getPath != null) && (editor.getCursorScreenPosition != null) && (editor.setCursorScreenPosition != null);
    },
    annotateDocument: function() {
      if (typeof this.inEditor === "function" ? this.inEditor() : void 0) {
        return this.invokeSib(this.getVars());
      }
    },
    annotateMagicComments: function() {
      var vars;
      if (typeof this.inEditor === "function" ? this.inEditor() : void 0) {
        vars = this.getVars();
        vars.flags.push('--xmpfilter-style');
        return this.invokeSib(vars);
      }
    },
    removeAnnotations: function() {
      var vars;
      if (typeof this.inEditor === "function" ? this.inEditor() : void 0) {
        vars = this.getVars();
        vars.flags.push('--clean');
        return this.invokeSib(vars);
      }
    },
    merge: function(leftObj, rightObj) {
      var key, mergedObj, value;
      mergedObj = {};
      for (key in leftObj) {
        value = leftObj[key];
        mergedObj[key] = value;
      }
      for (key in rightObj) {
        value = rightObj[key];
        mergedObj[key] = value;
      }
      return mergedObj;
    },
    withoutMovingScreenOrCursor: function(editor, f) {
      var cursor, scrollLeft, scrollTop;
      cursor = editor.getCursorBufferPosition();
      scrollTop = editor.getScrollTop();
      scrollLeft = editor.getScrollLeft();
      f();
      editor.setCursorBufferPosition(cursor);
      editor.setScrollLeft(scrollLeft);
      return editor.setScrollTop(scrollTop);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2hlY3Rvcmh1ZXJ0YXMvLmF0b20vcGFja2FnZXMvc2VlaW5nLWlzLWJlbGlldmluZy9saWIvc2VlaW5nLWlzLWJlbGlldmluZy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFDQTtBQUFBLE1BQUEsMERBQUE7O0FBQUEsRUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLGVBQVIsQ0FBd0IsQ0FBQyxLQUFqQyxDQUFBOztBQUFBLEVBSUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUpELENBQUE7O0FBQUEsRUFPQSxXQUFBLEdBQWMsYUFQZCxDQUFBOztBQUFBLEVBc0JBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLGlCQUFBLEdBQ2Y7QUFBQSxJQUFBLFFBQUEsRUFBVSxTQUFBLEdBQUE7QUFDUixNQUFBLElBQUMsQ0FBQSxhQUFELEdBQWlCLEdBQUEsQ0FBQSxtQkFBakIsQ0FBQTthQUNBLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0IsZ0JBQWxCLEVBQ2pCO0FBQUEsUUFBQSx1Q0FBQSxFQUErQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTttQkFBRyxLQUFDLENBQUEsZ0JBQUQsQ0FBQSxFQUFIO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBL0M7QUFBQSxRQUNBLDZDQUFBLEVBQStDLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO21CQUFHLEtBQUMsQ0FBQSxxQkFBRCxDQUFBLEVBQUg7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUQvQztBQUFBLFFBRUEsd0NBQUEsRUFBK0MsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFBLEdBQUE7bUJBQUcsS0FBQyxDQUFBLGlC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

//# sourceURL=/Users/hectorhuertas/.atom/packages/seeing-is-believing/lib/seeing-is-believing.coffee
