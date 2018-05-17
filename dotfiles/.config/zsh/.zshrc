## History
HISTFILE=$HOME/.local/share/zsh/history
HISTSIZE=10000
SAVEHIST=10000

## Set or unset basic options
setopt noautocd appendhistory nobeep extendedglob globdots histignorealldups
setopt histignorespace histreduceblanks incappendhistory nomatch notify

## ZSH "new" completion system
# Define compinit as zsh function instead of external command (man zshbuiltins)
autoload -Uz compinit
# Use .cache for the dumped completion configuration
mkdir -p ~/.cache/zsh
compinit -d ~/.cache/zsh/zcompdump

# Set edit mode (e for emacs, v for vim)
bindkey -v

## Better keybindings
bindkey -M viins '^K' history-substring-search-up
bindkey -M viins '^J' history-substring-search-down
bindkey -M viins '^L' vi-forward-char
bindkey -M viins '^C' clear-screen

# Quick reload util
reload_config() {
  source $ZDOTDIR/.zshrc;
  echo "Zsh reloaded!";
}
alias r='reload_config'

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
