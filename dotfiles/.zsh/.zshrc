
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


# Created by newuser for 5.3.1
# source $ZDOTDIR/.ztesting
source $ZDOTDIR/.zplug
# source $ZDOTDIR/.grml-zsh

source <(kubectl completion zsh)  # setup autocomplete in zsh

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
