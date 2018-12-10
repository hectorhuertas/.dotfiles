## Shell performance profiling
##
## * Measure total shell startup time running `time zsh -i -c exit`
## * To profile each component time, uncomment the following line and the last
##   line of this file, and open a new shell
#zmodload zsh/zprof

## Locale
export LANG="en_US.UTF-8"

## History
mkdir -p ~/.local/share/zsh
HISTFILE=$HOME/.local/share/zsh/history
HISTSIZE=10000
SAVEHIST=10000

## Set or unset basic options
setopt noautocd appendhistory nobeep extendedglob globdots histignorealldups
setopt histignorespace histreduceblanks incappendhistory nomatch notify
setopt promptsubst

## ZSH "new" completion system
# Define compinit as zsh function instead of external command (man zshbuiltins)
autoload -Uz compinit
# Use .cache for the dumped completion configuration
mkdir -p ~/.cache/zsh
compinit -d ~/.cache/zsh/zcompdump

## Keybindings
bindkey -M main '^K' history-substring-search-up
bindkey -M main '^J' history-substring-search-down
bindkey -M main '^L' forward-char

## Quick reload util
reload_config() {
  source $ZDOTDIR/.zshrc;
  echo "Zsh reloaded!";
}
alias r='reload_config'

## Load custom modules and Zplugins
# Load all custom modules
for module in $ZDOTDIR/modules/*; do
  source "$module"
done
# Load Zplugins last, to allow syntax highlighter to apply everywhere
source $ZDOTDIR/.zplug

## Shell performance profiling (see line 1)
#zprof
