## History
HISTFILE=$ZDOTDIR/.history
HISTSIZE=10000
SAVEHIST=10000

## Set or unset basic options
setopt noautocd appendhistory nobeep extendedglob globdots histignorealldups histignorespace
setopt histreduceblanks incappendhistory nomatch notify
# DEACTIVATED - Don't send SIGHUP (similar to SIGKILL) to background processes when the shell exits.
# unsetopt nohup  ## Deactivate temporally to understand behaviour. Why `unset nohup`? Shouldn't it be `set nohup`?

## BEGIN - Lines were added by compinstall
zstyle :compinstall filename '$ZDOTDIR/.zshrc'
autoload -Uz compinit
compinit
## END - Lines were added by compinstall

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
