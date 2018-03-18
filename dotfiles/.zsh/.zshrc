## History
HISTFILE=$ZDOTDIR/.history
HISTSIZE=5000
SAVEHIST=5000

## Set or unset basic options
setopt autocd extendedglob nomatch notify
unsetopt appendhistory beep
# Don't save duplicates in history
setopt histignorealldups
# DEACTIVATED - Don't send SIGHUP (similar to SIGKILL) to background processes when the shell exits.
unsetopt nohup

## BEGIN - Lines were added by compinstall
zstyle :compinstall filename '$ZDOTDIR/.zshrc'
autoload -Uz compinit
compinit
## END - Lines were added by compinstall

## Execute '$ time' if ongoing command lasts more than this value
REPORTTIME=1

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
# Load Zplugins last, to allow syntax highlighter to apply everywhere
source $ZDOTDIR/.zplug
