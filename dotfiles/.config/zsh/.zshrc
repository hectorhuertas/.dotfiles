## History
HISTFILE=$HOME/.local/share/zsh/history
HISTSIZE=10000
SAVEHIST=10000

## Set or unset basic options
setopt noautocd appendhistory nobeep extendedglob globdots histignorealldups histignorespace
setopt histreduceblanks incappendhistory nomatch notify

# Define compinit as a shell function instead of an external command (man zshbuiltins)
autoload -Uz compinit
# Start "new" zsh completion system
mkdir -p ~/.cache/zsh
compinit -d ~/.cache/zsh/zcompdump

## Setup nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

## Autocompletions
source <(kubectl completion zsh)

## Source other files
source $ZDOTDIR/.keybindings
source $ZDOTDIR/.functions
# Load aliases after functions, so I can alias them
source $ZDOTDIR/.aliases
# New organization method by functionality instead of by type
for file in $ZDOTDIR/my_plugins/*; do
  source "$file"
done
# Load Zplugins last, to allow syntax highlighter to apply everywhere
source $ZDOTDIR/.zplug
