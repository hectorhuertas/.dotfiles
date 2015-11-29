# ruby-define-method package

Adds ruby-define-method:new_instance_method command converts a line of text into a method name with shift+enter like in Textmate.
Please note: I'm still learning my way around Atom, improvements are welcomed!

![Ruby Define Method](https://raw.github.com/alexchee/atom-ruby-define-method/master/images/ruby_define.gif)

To change the keybinding:
```
'.editor[data-grammar~=ruby]':
  'shift-enter': 'ruby-define-method:new_instance_method'
```

TODO:
 * maybe add other Ruby Textmate commands
