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
setopt histignorespace histreduceblanks incappendhistory interactivecomments
setopt nomatch notify promptsubst

## ZSH "new" completion system
# Define compinit as zsh function instead of external command (man zshbuiltins)
autoload -Uz compinit
# Use .cache for the dumped completion configuration
mkdir -p ~/.cache/zsh
compinit -d ~/.cache/zsh/zcompdump

## Change cursor on vi mode
# https://vt100.net/docs/vt510-rm/DECSCUSR.html
function zle-line-init zle-keymap-select () {
  if [ $KEYMAP = vicmd ]; then
    printf "\e[2 q" # ▇ Block when vi mode
  else
    printf "\e[6 q" # | Beam when insert mode
  fi
}
zle -N zle-line-init
zle -N zle-keymap-select

## Quick reload util
reload_config() {
  source $ZDOTDIR/.zshrc;
  echo "Zsh reloaded!";
}
alias r='reload_config'

## Add my own binaries to the path
PATH="$HOME/.dotfiles/dotfiles/bin:$PATH"

## Load custom modules and Zplugins
# Load all custom modules
for module in $ZDOTDIR/modules/*; do
  source "$module"
done

# Load zinit after custom modules, to allow syntax highlighter to apply everywhere
source $ZDOTDIR/.zinit

## Keybindings
bindkey -v # vi mode
bindkey -M viins '^K' history-substring-search-up
bindkey -M vicmd '^K' history-substring-search-up
bindkey -M viins '^J' history-substring-search-down
bindkey -M vicmd '^J' history-substring-search-down
bindkey -M viins '^L' end-of-line
bindkey -M vicmd '^L' end-of-line
bindkey -M viins '^E' forward-word
bindkey -M vicmd '^E' forward-word
bindkey -M viins '^B' backward-word
bindkey -M vicmd '^B' backward-word
# Following bindings change the deleting vi behaviour for the normal one I expect
bindkey -M viins '^?' backward-delete-char
bindkey -M vicmd '^?' backward-delete-char
bindkey -M viins '^H' backward-delete-char
bindkey -M vicmd '^H' backward-delete-char
bindkey -M viins '^W' backward-kill-word
bindkey -M vicmd '^W' backward-kill-word
bindkey -M viins '^U' kill-line
bindkey -M vicmd '^U' kill-line

## Shell performance profiling (see line 1)
#zprof
