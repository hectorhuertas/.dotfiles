
# Lines configured by zsh-newuser-install
HISTFILE=$ZDOTDIR/.history
HISTSIZE=5000
SAVEHIST=5000

# Set or unset basic options
setopt autocd extendedglob nomatch notify
unsetopt appendhistory beep

# Set edit mode (e for emacs, v for vim)
bindkey -v
# End of lines configured by zsh-newuser-install

# The following lines were added by compinstall
zstyle :compinstall filename '$ZDOTDIR/.zshrc'

autoload -Uz compinit
compinit
# End of lines added by compinstall

source <(kubectl completion zsh)  # setup autocomplete in zsh
source <(kops completion zsh)
reload() {
  source $ZDOTDIR/.zshrc
  printf "Zsh reloaded!\n"
}

## print hex value of a number
hex() {
    if [[ -n "$1" ]]; then
        printf "%x\n" $1
    else
        print 'Usage: hex <number-to-convert>'
        return 1
    fi
}

q () {git
  git add .;
  git commit -m "$1";
  git push
}

alias ls='ls -GA'
alias ll='ls -GAlh' # List with permits and size
alias lo='ls -GAlhS' # List ordered by size
alias gs='git status'
alias ga='git add -A'
alias gc='git commit -m'
alias gpo='git push origin'
alias gco='git checkout'
alias gd='git diff'

# Don't save duplicates in history
setopt histignorealldups
# Don't send SIGHUP (similar to SIGKILL) to background processes when the shell exits.
unsetopt nohup

# report about cpu-/system-/user-time of command if running longer than
# 5 seconds
REPORTTIME=5

## Better keybindings
bindkey -M viins '^K' history-substring-search-up
bindkey -M viins '^J' history-substring-search-down
bindkey -M viins '^L' vi-forward-char
bindkey -M viins '^C' clear-screen

# Load Zplugins last, to allow syntax highlighter to apply everywhere
source $ZDOTDIR/.zplug
