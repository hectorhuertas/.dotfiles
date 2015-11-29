(function() {
  var BufferedProcess, CompositeDisposable, RubocopAutoCorrect, fs, path, spawnSync, temp, which, _ref;

  _ref = require('atom'), CompositeDisposable = _ref.CompositeDisposable, BufferedProcess = _ref.BufferedProcess;

  spawnSync = require('child_process').spawnSync;

  which = require('which');

  path = require('path');

  fs = require('fs-plus');

  temp = require('temp');

  module.exports = RubocopAutoCorrect = (function() {
    function RubocopAutoCorrect() {
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.workspace.observeTextEditors((function(_this) {
        return function(editor) {
          if (editor.getGrammar().scopeName.match("ruby")) {
            return _this.handleEvents(editor);
          }
        };
      })(this)));
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'rubocop-auto-correct:current-file': (function(_this) {
          return function() {
            var editor;
            if (editor = atom.workspace.getActiveTextEditor()) {
              return _this.run(editor);
            }
          };
        })(this),
        'rubocop-auto-correct:toggle-auto-run': (function(_this) {
          return function() {
            return _this.toggleAutoRun();
          };
        })(this),
        'rubocop-auto-correct:toggle-notification': (function(_this) {
          return function() {
            return _this.toggleNotification();
          };
        })(this),
        'rubocop-auto-correct:toggle-correct-file': (function(_this) {
          return function() {
            return _this.toggleCorrectFile();
          };
        })(this)
      }));
    }

    RubocopAutoCorrect.prototype.destroy = function() {
      return this.subscriptions.dispose();
    };

    RubocopAutoCorrect.prototype.handleEvents = function(editor) {
      var buffer, bufferSavedSubscription, editorDestroyedSubscription;
      buffer = editor.getBuffer();
      bufferSavedSubscription = buffer.onDidSave((function(_this) {
        return function() {
          return buffer.transact(function() {
            if (atom.config.get('rubocop-auto-correct.autoRun')) {
              return _this.run(editor);
            }
          });
        };
      })(this));
      editorDestroyedSubscription = editor.onDidDestroy(function() {
        bufferSavedSubscription.dispose();
        return editorDestroyedSubscription.dispose();
      });
      this.subscriptions.add(bufferSavedSubscription);
      return this.subscriptions.add(editorDestroyedSubscription);
    };

    RubocopAutoCorrect.prototype.toggleAutoRun = function() {
      if (atom.config.get('rubocop-auto-correct.autoRun')) {
        atom.config.set('rubocop-auto-correct.autoRun', false);
        return atom.notifications.addSuccess("Turn OFF, Auto Run");
      } else {
        atom.config.set('rubocop-auto-correct.autoRun', true);
        return atom.notifications.addSuccess("Turn ON, Auto Run");
      }
    };

    RubocopAutoCorrect.prototype.toggleNotification = function() {
      if (atom.config.get('rubocop-auto-correct.notification')) {
        atom.config.set('rubocop-auto-correct.notification', false);
        return atom.notifications.addSuccess("Turn OFF, Notification");
      } else {
        atom.config.set('rubocop-auto-correct.notification', true);
        return atom.notifications.addSuccess("Turn ON, Notification");
      }
    };

    RubocopAutoCorrect.prototype.toggleCorrectFile = function() {
      if (atom.config.get('rubocop-auto-correct.correctFile')) {
        atom.config.set('rubocop-auto-correct.correctFile', false);
        return atom.notifications.addSuccess("Correct the buffer");
      } else {
        atom.config.set('rubocop-auto-correct.correctFile', true);
        return atom.notifications.addSuccess("Correct the file");
      }
    };

    RubocopAutoCorrect.prototype.run = function(editor) {
      if (!editor.getGrammar().scopeName.match("ruby")) {
        return atom.notifications.addError("Only use source.ruby");
      }
      if (atom.config.get('rubocop-auto-correct.correctFile')) {
        if (editor.isModified()) {
          editor.save();
        }
        return this.autoCorrectFile(editor.getPath());
      } else {
        return this.autoCorrectBuffer(editor.getBuffer());
      }
    };

    RubocopAutoCorrect.prototype.autoCorrectBuffer = function(buffer) {
      var args, command, options, tempFilePath;
      command = atom.config.get('rubocop-auto-correct.rubocopCommandPath');
      tempFilePath = this.makeTempFile("rubocop.rb");
      fs.writeFileSync(tempFilePath, buffer.getText());
      args = ['-a', tempFilePath];
      options = {
        encoding: 'utf-8',
        timeout: 5000
      };
      return which(command, function(err) {
        var offenses, re, rubocop;
        if (err) {
          return atom.notifications.addFatalError("Rubocop command is not found.", {
            detail: 'When you don\'t install rubocop yet, Run `gem install rubocop` first.\n\nIf you already installed rubocop, Please check package setting at `Rubocop Command Path`.'
          });
        }
        rubocop = spawnSync(command, args, options);
        if (rubocop.stderr !== "") {
          return atom.notifications.addError(rubocop.stderr);
        }
        if (rubocop.stdout.match("corrected")) {
          buffer.setTextViaDiff(fs.readFileSync(tempFilePath, 'utf-8'));
          if (atom.config.get('rubocop-auto-correct.notification')) {
            re = /^.+?(:[0-9]+:[0-9]+:.*$)/mg;
            offenses = rubocop.stdout.match(re);
            return offenses.map(function(offense) {
              var message;
              message = offense.replace(re, buffer.getBaseName() + "$1");
              return atom.notifications.addSuccess(message);
            });
          }
        }
      });
    };

    RubocopAutoCorrect.prototype.autoCorrectFile = function(filePath) {
      var args, command, stderr, stdout;
      command = atom.config.get('rubocop-auto-correct.rubocopCommandPath');
      args = ['-a', filePath];
      stdout = function(output) {
        if (output.match("corrected")) {
          if (atom.config.get('rubocop-auto-correct.notification')) {
            return atom.notifications.addSuccess(output);
          }
        }
      };
      stderr = function(output) {
        return atom.notifications.addError(output);
      };
      return which(command, function(err) {
        var rubocop;
        if (err) {
          return atom.notifications.addFatalError("Rubocop command is not found.", {
            detail: 'When you don\'t install rubocop yet, Run `gem install rubocop` first.\n\nIf you already installed rubocop, Please check package setting at `Rubocop Command Path`.'
          });
        }
        return rubocop = new BufferedProcess({
          command: command,
          args: args,
          stdout: stdout,
          stderr: stderr
        });
      });
    };

    RubocopAutoCorrect.prototype.makeTempFile = function(filename) {
      var directory, filePath;
      directory = temp.mkdirSync();
      filePath = path.join(directory, filename);
      fs.writeFileSync(filePath, '');
      return filePath;
    };

    return RubocopAutoCorrect;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2hlY3Rvcmh1ZXJ0YXMvLmF0b20vcGFja2FnZXMvcnVib2NvcC1hdXRvLWNvcnJlY3QvbGliL3J1Ym9jb3AtYXV0by1jb3JyZWN0LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxnR0FBQTs7QUFBQSxFQUFBLE9BQXlDLE9BQUEsQ0FBUSxNQUFSLENBQXpDLEVBQUMsMkJBQUEsbUJBQUQsRUFBc0IsdUJBQUEsZUFBdEIsQ0FBQTs7QUFBQSxFQUNDLFlBQWEsT0FBQSxDQUFRLGVBQVIsRUFBYixTQURELENBQUE7O0FBQUEsRUFFQSxLQUFBLEdBQVEsT0FBQSxDQUFRLE9BQVIsQ0FGUixDQUFBOztBQUFBLEVBR0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBSFAsQ0FBQTs7QUFBQSxFQUlBLEVBQUEsR0FBSyxPQUFBLENBQVEsU0FBUixDQUpMLENBQUE7O0FBQUEsRUFLQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FMUCxDQUFBOztBQUFBLEVBT0EsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNTLElBQUEsNEJBQUEsR0FBQTtBQUNYLE1BQUEsSUFBQyxDQUFBLGFBQUQsR0FBaUIsR0FBQSxDQUFBLG1CQUFqQixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsYUFBYSxDQUFDLEdBQWYsQ0FBbUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBZixDQUFrQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxNQUFELEdBQUE7QUFDbkQsVUFBQSxJQUFHLE1BQU0sQ0FBQyxVQUFQLENBQUEsQ0FBbUIsQ0FBQyxTQUFTLENBQUMsS0FBOUIsQ0FBb0MsTUFBcEMsQ0FBSDttQkFDRSxLQUFDLENBQUEsWUFBRCxDQUFjLE1BQWQsRUFERjtXQURtRDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFB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

//# sourceURL=/Users/hectorhuertas/.atom/packages/rubocop-auto-correct/lib/rubocop-auto-correct.coffee
