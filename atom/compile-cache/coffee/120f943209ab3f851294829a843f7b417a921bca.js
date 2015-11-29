(function() {
  var File, RubocopAutoCorrect, fs, path, temp;

  path = require('path');

  fs = require('fs-plus');

  temp = require('temp');

  File = require('atom').File;

  RubocopAutoCorrect = require('../lib/rubocop-auto-correct');

  describe("RubocopAutoCorrect", function() {
    var activationPromise, buffer, editor, filePath, workspaceElement, _ref;
    _ref = [], workspaceElement = _ref[0], editor = _ref[1], buffer = _ref[2], filePath = _ref[3], activationPromise = _ref[4];
    beforeEach(function() {
      var directory;
      directory = temp.mkdirSync();
      atom.project.setPaths([directory]);
      workspaceElement = atom.views.getView(atom.workspace);
      activationPromise = atom.packages.activatePackage('rubocop-auto-correct');
      filePath = path.join(directory, 'example.rb');
      fs.writeFileSync(filePath, '');
      atom.config.set('rubocop-auto-correct.autoRun', false);
      atom.config.set('rubocop-auto-correct.notification', false);
      atom.config.set('rubocop-auto-correct.rubocopCommandPath', 'rubocop');
      waitsForPromise(function() {
        return atom.packages.activatePackage("language-ruby");
      });
      waitsForPromise(function() {
        return atom.workspace.open(filePath).then(function(o) {
          return editor = o;
        });
      });
      runs(function() {
        buffer = editor.getBuffer();
        return atom.commands.dispatch(workspaceElement, 'rubocop-auto-correct:current-file');
      });
      return waitsForPromise(function() {
        return activationPromise;
      });
    });
    describe("when the editor is destroyed", function() {
      beforeEach(function() {
        return editor.destroy();
      });
      return it("does not leak subscriptions", function() {
        var rubocopAutoCorrect;
        rubocopAutoCorrect = atom.packages.getActivePackage('rubocop-auto-correct').mainModule.rubocopAutoCorrect;
        expect(rubocopAutoCorrect.subscriptions.disposables.size).toBe(4);
        atom.packages.deactivatePackage('rubocop-auto-correct');
        return expect(rubocopAutoCorrect.subscriptions.disposables).toBeNull();
      });
    });
    describe("when the 'rubocop-auto-correct:current-file' command is run", function() {
      beforeEach(function() {
        return buffer.setText("{ :atom => 'A hackable text editor for the 21st Century' }\n");
      });
      describe("when correct buffer", function() {
        beforeEach(function() {
          return atom.config.set('rubocop-auto-correct.correctFile', false);
        });
        it("manually run", function() {
          var bufferChangedSpy;
          atom.commands.dispatch(workspaceElement, 'rubocop-auto-correct:current-file');
          bufferChangedSpy = jasmine.createSpy();
          buffer.onDidChange(bufferChangedSpy);
          waitsFor(function() {
            return bufferChangedSpy.callCount > 0;
          });
          return runs(function() {
            return expect(buffer.getText()).toBe("{ atom: 'A hackable text editor for the 21st Century' }\n");
          });
        });
        return it("auto run", function() {
          var bufferChangedSpy;
          atom.config.set('rubocop-auto-correct.autoRun', true);
          editor.save();
          bufferChangedSpy = jasmine.createSpy();
          buffer.onDidChange(bufferChangedSpy);
          waitsFor(function() {
            return bufferChangedSpy.callCount > 0;
          });
          return runs(function() {
            return expect(buffer.getText()).toBe("{ atom: 'A hackable text editor for the 21st Century' }\n");
          });
        });
      });
      return describe("when correct file", function() {
        beforeEach(function() {
          return atom.config.set('rubocop-auto-correct.correctFile', true);
        });
        it("manually run", function() {
          var bufferChangedSpy;
          atom.commands.dispatch(workspaceElement, 'rubocop-auto-correct:current-file');
          bufferChangedSpy = jasmine.createSpy();
          buffer.onDidChange(bufferChangedSpy);
          waitsFor(function() {
            return bufferChangedSpy.callCount > 1;
          });
          return runs(function() {
            return expect(buffer.getText()).toBe("{ atom: 'A hackable text editor for the 21st Century' }\n");
          });
        });
        return it("auto run", function() {
          var bufferChangedSpy;
          atom.config.set('rubocop-auto-correct.autoRun', true);
          editor.save();
          bufferChangedSpy = jasmine.createSpy();
          buffer.onDidChange(bufferChangedSpy);
          waitsFor(function() {
            return bufferChangedSpy.callCount > 1;
          });
          return runs(function() {
            return expect(buffer.getText()).toBe("{ atom: 'A hackable text editor for the 21st Century' }\n");
          });
        });
      });
    });
    describe("when toggle config", function() {
      beforeEach(function() {
        return this.rubocopAutoCorrect = new RubocopAutoCorrect;
      });
      it("changes auto run", function() {
        atom.config.set('rubocop-auto-correct.autoRun', false);
        this.rubocopAutoCorrect.toggleAutoRun();
        expect(atom.config.get('rubocop-auto-correct').autoRun).toBe(true);
        this.rubocopAutoCorrect.toggleAutoRun();
        return expect(atom.config.get('rubocop-auto-correct').autoRun).toBe(false);
      });
      it("changes notification", function() {
        atom.config.set('rubocop-auto-correct.notification', false);
        this.rubocopAutoCorrect.toggleNotification();
        expect(atom.config.get('rubocop-auto-correct').notification).toBe(true);
        this.rubocopAutoCorrect.toggleNotification();
        return expect(atom.config.get('rubocop-auto-correct').notification).toBe(false);
      });
      return it("changes correct method", function() {
        atom.config.set('rubocop-auto-correct.correctFile', false);
        this.rubocopAutoCorrect.toggleCorrectFile();
        expect(atom.config.get('rubocop-auto-correct').correctFile).toBe(true);
        this.rubocopAutoCorrect.toggleCorrectFile();
        return expect(atom.config.get('rubocop-auto-correct').correctFile).toBe(false);
      });
    });
    return describe("when makeTempFile", function() {
      return it("run makeTempFile", function() {
        var tempFilePath;
        this.rubocopAutoCorrect = new RubocopAutoCorrect;
        tempFilePath = this.rubocopAutoCorrect.makeTempFile("rubocop.rb");
        return expect(fs.isFileSync(tempFilePath)).toBe(true);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2hlY3Rvcmh1ZXJ0YXMvLmF0b20vcGFja2FnZXMvcnVib2NvcC1hdXRvLWNvcnJlY3Qvc3BlYy9ydWJvY29wLWF1dG8tY29ycmVjdC1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSx3Q0FBQTs7QUFBQSxFQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUFQLENBQUE7O0FBQUEsRUFDQSxFQUFBLEdBQUssT0FBQSxDQUFRLFNBQVIsQ0FETCxDQUFBOztBQUFBLEVBRUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRlAsQ0FBQTs7QUFBQSxFQUdDLE9BQVEsT0FBQSxDQUFRLE1BQVIsRUFBUixJQUhELENBQUE7O0FBQUEsRUFLQSxrQkFBQSxHQUFxQixPQUFBLENBQVEsNkJBQVIsQ0FMckIsQ0FBQTs7QUFBQSxFQU9BLFFBQUEsQ0FBUyxvQkFBVCxFQUErQixTQUFBLEdBQUE7QUFDN0IsUUFBQSxtRUFBQTtBQUFBLElBQUEsT0FBa0UsRUFBbEUsRUFBQywwQkFBRCxFQUFtQixnQkFBbkIsRUFBMkIsZ0JBQTNCLEVBQW1DLGtCQUFuQyxFQUE2QywyQkFBN0MsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULFVBQUEsU0FBQTtBQUFBLE1BQUEsU0FBQSxHQUFZLElBQUksQ0FBQyxTQUFMLENBQUEsQ0FBWixDQUFBO0FBQUEsTUFDQSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQWIsQ0FBc0IsQ0FBQyxTQUFELENBQXRCLENBREEsQ0FBQTtBQUFBLE1BRUEsZ0JBQUEsR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUF4QixDQUZuQixDQUFBO0FBQUEsTUFHQSxpQkFBQSxHQUFvQixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FB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

//# sourceURL=/Users/hectorhuertas/.atom/packages/rubocop-auto-correct/spec/rubocop-auto-correct-spec.coffee
