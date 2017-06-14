
# Lines configured by zsh-newuser-install
HISTFILE=$ZDOTDIR/.history
HISTSIZE=5000
SAVEHIST=5000

# Set or unset basic options
setopt autocd extendedglob nomatch notify
unsetopt appendhistory beep

# End of lines configured by zsh-newuser-install

# The following lines were added by compinstall
zstyle :compinstall filename '$ZDOTDIR/.zshrc'

autoload -Uz compinit
compinit
# End of lines added by compinstall

source <(kubectl completion zsh)  # setup autocomplete in zsh
source <(kops completion zsh)

# Don't save duplicates in history
setopt histignorealldups
# Don't send SIGHUP (similar to SIGKILL) to background processes when the shell exits.
unsetopt nohup

# report about cpu-/system-/user-time of command if running longer than
# 5 seconds
REPORTTIME=5

source $ZDOTDIR/.keybindings
# Load aliases after functions, so I can alias them
source $ZDOTDIR/.aliases
# Load Zplugins last, to allow syntax highlighter to apply everywhere
source $ZDOTDIR/.zplug
