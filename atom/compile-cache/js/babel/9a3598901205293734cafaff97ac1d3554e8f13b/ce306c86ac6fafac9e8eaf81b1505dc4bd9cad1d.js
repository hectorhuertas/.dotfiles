'use babel';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var StatusBarItem = (function () {
  function StatusBarItem() {
    _classCallCheck(this, StatusBarItem);

    this.element = document.createElement('a');
    this.element.className = 'line-ending-tile inline-block';
    this.setLineEndings(new Set());
  }

  _createClass(StatusBarItem, [{
    key: 'setLineEndings',
    value: function setLineEndings(lineEndings) {
      this.lineEndings = lineEndings;
      this.element.textContent = lineEndingName(lineEndings);
    }
  }, {
    key: 'hasLineEnding',
    value: function hasLineEnding(lineEnding) {
      return this.lineEndings.has(lineEnding);
    }
  }, {
    key: 'onClick',
    value: function onClick(callback) {
      this.element.addEventListener('click', callback);
    }
  }]);

  return StatusBarItem;
})();

exports['default'] = StatusBarItem;

function lineEndingName(lineEndings) {
  if (lineEndings.size > 1) {
    return 'Mixed';
  } else if (lineEndings.has('\n')) {
    return 'LF';
  } else if (lineEndings.has('\r\n')) {
    return 'CRLF';
  } else {
    return '';
  }
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3ByaXZhdGUvdmFyL2xpYi9qZW5raW5zL3dvcmtzcGFjZS9hdG9tL25vZGVfbW9kdWxlcy9saW5lLWVuZGluZy1zZWxlY3Rvci9saWIvc3RhdHVzLWJhci1pdGVtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQTs7QUNFWCxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7QUFDM0MsT0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDLENBQUM7O0FBRUgsSUFBSSxZQUFZLEdBQUcsQ0FBQyxZQUFZO0FBQUUsV0FBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQUUsU0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFBRSxVQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLEFBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQUFBQyxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQUU7R0FBRSxBQUFDLE9BQU8sVUFBVSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUFFLFFBQUksVUFBVSxFQUFFLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQUFBQyxJQUFJLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsQUFBQyxPQUFPLFdBQVcsQ0FBQztHQUFFLENBQUM7Q0FBRSxDQUFBLEVBQUcsQ0FBQzs7QUFFdGpCLFNBQVMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFBRSxNQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFBRSxVQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7R0FBRTtDQUFFOztBQUV6SixJRFJxQixhQUFhLEdBQUEsQ0FBQSxZQUFBO0FBQ3BCLFdBRE8sYUFBYSxHQUNqQjtBQ1NiLG1CQUFlLENBQUMsSUFBSSxFRFZILGFBQWEsQ0FBQSxDQUFBOztBQUU5QixRQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDMUMsUUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsK0JBQStCLENBQUE7QUFDeEQsUUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUE7R0FDL0I7O0FDWUQsY0FBWSxDRGpCTyxhQUFhLEVBQUEsQ0FBQTtBQ2tCOUIsT0FBRyxFQUFFLGdCQUFnQjtBQUNyQixTQUFLLEVEWlEsU0FBQSxjQUFBLENBQUMsV0FBVyxFQUFFO0FBQzNCLFVBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFBO0FBQzlCLFVBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQTtLQUN2RDtHQ2FBLEVBQUU7QUFDRCxPQUFHLEVBQUUsZUFBZTtBQUNwQixTQUFLLEVEYk8sU0FBQSxhQUFBLENBQUMsVUFBVSxFQUFFO0FBQ3pCLGFBQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUE7S0FDeEM7R0NjQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLFNBQVM7QUFDZCxTQUFLLEVEZEMsU0FBQSxPQUFBLENBQUMsUUFBUSxFQUFFO0FBQ2pCLFVBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0tBQ2pEO0dDZUEsQ0FBQyxDQUFDLENBQUM7O0FBRUosU0RuQ21CLGFBQWEsQ0FBQTtDQ29DakMsQ0FBQSxFQUFHLENBQUM7O0FBRUwsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHRHRDRyxhQUFhLENBQUE7O0FBcUJsQyxTQUFTLGNBQWMsQ0FBRSxXQUFXLEVBQUU7QUFDcEMsTUFBSSxXQUFXLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtBQUN4QixXQUFPLE9BQU8sQ0FBQTtHQUNmLE1BQU0sSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ2hDLFdBQU8sSUFBSSxDQUFBO0dBQ1osTUFBTSxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDbEMsV0FBTyxNQUFNLENBQUE7R0FDZCxNQUFNO0FBQ0wsV0FBTyxFQUFFLENBQUE7R0FDVjtDQUNGO0FDb0JELE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDIiwiZmlsZSI6InN0YXR1cy1iYXItaXRlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXR1c0Jhckl0ZW0ge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTmFtZSA9ICdsaW5lLWVuZGluZy10aWxlIGlubGluZS1ibG9jaydcbiAgICB0aGlzLnNldExpbmVFbmRpbmdzKG5ldyBTZXQoKSlcbiAgfVxuXG4gIHNldExpbmVFbmRpbmdzIChsaW5lRW5kaW5ncykge1xuICAgIHRoaXMubGluZUVuZGluZ3MgPSBsaW5lRW5kaW5nc1xuICAgIHRoaXMuZWxlbWVudC50ZXh0Q29udGVudCA9IGxpbmVFbmRpbmdOYW1lKGxpbmVFbmRpbmdzKVxuICB9XG5cbiAgaGFzTGluZUVuZGluZyAobGluZUVuZGluZykge1xuICAgIHJldHVybiB0aGlzLmxpbmVFbmRpbmdzLmhhcyhsaW5lRW5kaW5nKVxuICB9XG5cbiAgb25DbGljayAoY2FsbGJhY2spIHtcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjYWxsYmFjaylcbiAgfVxufVxuXG5mdW5jdGlvbiBsaW5lRW5kaW5nTmFtZSAobGluZUVuZGluZ3MpIHtcbiAgaWYgKGxpbmVFbmRpbmdzLnNpemUgPiAxKSB7XG4gICAgcmV0dXJuICdNaXhlZCdcbiAgfSBlbHNlIGlmIChsaW5lRW5kaW5ncy5oYXMoJ1xcbicpKSB7XG4gICAgcmV0dXJuICdMRidcbiAgfSBlbHNlIGlmIChsaW5lRW5kaW5ncy5oYXMoJ1xcclxcbicpKSB7XG4gICAgcmV0dXJuICdDUkxGJ1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnJ1xuICB9XG59XG4iLCIndXNlIGJhYmVsJztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG52YXIgU3RhdHVzQmFySXRlbSA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFN0YXR1c0Jhckl0ZW0oKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFN0YXR1c0Jhckl0ZW0pO1xuXG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc05hbWUgPSAnbGluZS1lbmRpbmctdGlsZSBpbmxpbmUtYmxvY2snO1xuICAgIHRoaXMuc2V0TGluZUVuZGluZ3MobmV3IFNldCgpKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhTdGF0dXNCYXJJdGVtLCBbe1xuICAgIGtleTogJ3NldExpbmVFbmRpbmdzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0TGluZUVuZGluZ3MobGluZUVuZGluZ3MpIHtcbiAgICAgIHRoaXMubGluZUVuZGluZ3MgPSBsaW5lRW5kaW5ncztcbiAgICAgIHRoaXMuZWxlbWVudC50ZXh0Q29udGVudCA9IGxpbmVFbmRpbmdOYW1lKGxpbmVFbmRpbmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdoYXNMaW5lRW5kaW5nJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFzTGluZUVuZGluZyhsaW5lRW5kaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5saW5lRW5kaW5ncy5oYXMobGluZUVuZGluZyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb25DbGljaycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uQ2xpY2soY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNhbGxiYWNrKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gU3RhdHVzQmFySXRlbTtcbn0pKCk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFN0YXR1c0Jhckl0ZW07XG5cbmZ1bmN0aW9uIGxpbmVFbmRpbmdOYW1lKGxpbmVFbmRpbmdzKSB7XG4gIGlmIChsaW5lRW5kaW5ncy5zaXplID4gMSkge1xuICAgIHJldHVybiAnTWl4ZWQnO1xuICB9IGVsc2UgaWYgKGxpbmVFbmRpbmdzLmhhcygnXFxuJykpIHtcbiAgICByZXR1cm4gJ0xGJztcbiAgfSBlbHNlIGlmIChsaW5lRW5kaW5ncy5oYXMoJ1xcclxcbicpKSB7XG4gICAgcmV0dXJuICdDUkxGJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG4iXX0=
//# sourceURL=/Users/hectorhuertas/Downloads/Atom.app/Contents/Resources/app.asar/node_modules/line-ending-selector/lib/status-bar-item.js
