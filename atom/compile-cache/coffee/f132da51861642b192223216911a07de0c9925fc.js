(function() {
  var RubyBlockView;

  module.exports = RubyBlockView = (function() {
    function RubyBlockView(serializeState) {
      this.element = document.createElement('div');
      this.element.classList.add('ruby-block');
    }

    RubyBlockView.prototype.destroy = function() {
      return this.element.remove();
    };

    RubyBlockView.prototype.getElement = function() {
      return this.element;
    };

    RubyBlockView.prototype.updateMessage = function(rowNumber) {
      var message, row;
      row = atom.workspace.getActiveTextEditor().lineTextForBufferRow(rowNumber);
      if (this.element.hasChildNodes()) {
        this.element.removeChild(this.element.firstChild);
      }
      message = document.createElement('div');
      message.textContent = "Line: " + (rowNumber + 1) + " " + row;
      message.classList.add('message');
      return this.element.appendChild(message);
    };

    return RubyBlockView;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2hlY3Rvcmh1ZXJ0YXMvLmF0b20vcGFja2FnZXMvcnVieS1ibG9jay9saWIvcnVieS1ibG9jay12aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxhQUFBOztBQUFBLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNTLElBQUEsdUJBQUMsY0FBRCxHQUFBO0FBRVgsTUFBQSxJQUFDLENBQUEsT0FBRCxHQUFXLFFBQVEsQ0FBQyxhQUFULENBQXVCLEtBQXZCLENBQVgsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBbkIsQ0FBdUIsWUFBdkIsQ0FEQSxDQUZXO0lBQUEsQ0FBYjs7QUFBQSw0QkFNQSxPQUFBLEdBQVMsU0FBQSxHQUFBO2FBQ1AsSUFBQyxDQUFBLE9BQU8sQ0FBQyxNQUFULENBQUEsRUFETztJQUFBLENBTlQsQ0FBQTs7QUFBQSw0QkFTQSxVQUFBLEdBQVksU0FBQSxHQUFBO2FBQ1YsSUFBQyxDQUFBLFFBRFM7SUFBQSxDQVRaLENBQUE7O0FBQUEsNEJBWUEsYUFBQSxHQUFlLFNBQUMsU0FBRCxHQUFBO0FBQ2IsVUFBQSxZQUFBO0FBQUEsTUFBQSxHQUFBLEdBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBZixDQUFBLENBQW9DLENBQUMsb0JBQXJDLENBQTBELFNBQTFELENBQU4sQ0FBQTtBQUVBLE1BQUEsSUFBNkMsSUFBQyxDQUFBLE9BQU8sQ0FBQyxhQUFULENBQUEsQ0FBN0M7QUFBQSxRQUFBLElBQUMsQ0FBQSxPQUFPLENBQUMsV0FBVCxDQUFxQixJQUFDLENBQUEsT0FBTyxDQUFDLFVBQTlCLENBQUEsQ0FBQTtPQUZBO0FBQUEsTUFJQSxPQUFBLEdBQVUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FKVixDQUFBO0FBQUEsTUFLQSxPQUFPLENBQUMsV0FBUixHQUF1QixRQUFBLEdBQU8sQ0FBQyxTQUFBLEdBQVUsQ0FBWCxDQUFQLEdBQW9CLEdBQXBCLEdBQXVCLEdBTDlDLENBQUE7QUFBQSxNQU1BLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBbEIsQ0FBc0IsU0FBdEIsQ0FOQSxDQUFBO2FBT0EsSUFBQyxDQUFBLE9BQU8sQ0FBQyxXQUFULENBQXFCLE9BQXJCLEVBUmE7SUFBQSxDQVpmLENBQUE7O3lCQUFBOztNQUZGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/hectorhuertas/.atom/packages/ruby-block/lib/ruby-block-view.coffee
