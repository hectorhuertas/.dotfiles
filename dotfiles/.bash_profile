[[ -s "$HOME/.profile" ]] && source "$HOME/.profile" # Load the default .profile

[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*

# Load in the git branch prompt script
source ~/.git-prompt.sh

# Putting git branch on the prompt
# PS1="\[$GREEN\]\t\[$RED\]-\[$BLUE\]\u\[$YELLOW\]\[$YELLOW\]\w\[\033[m\]\[$MAGENTA\]\$(__git_ps1)\[$WHITE\]\$ "

alias ..='cd ..'
alias ls='ls -GFhA' # -A -> Show hidden files/folders
alias t1='cd ~/turing/1module'
alias t2='cd ~/turing/2module'
alias t3='cd ~/turing/3module'
alias tu='cd ~/turing/4module'
alias tw='cd ~/turing/warmups'
alias tp='cd ~/turing/3module/projects'
alias td='cd ~/turing/DSA/projects'
alias te='cd ~/turing/elixir'
alias tree='tree -FCh' # -a Hidden files: -L 3 ->Show only 3 levels deep
alias gs='git status'
alias ga='git add -A'
alias gc='git commit -m'
alias gpo='git push origin'
alias gco='git checkout'

export PATH=$PATH:/Applications/Postgres.app/Contents/Versions/9.4/bin

export NVM_DIR="/Users/hectorhuertas/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

if [ -f ~/.git-completion.bash ]; then
  . ~/.git-completion.bash
fi
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
