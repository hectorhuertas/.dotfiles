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
