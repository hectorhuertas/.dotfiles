[[ -s "$HOME/.profile" ]] && source "$HOME/.profile" # Load the default .profile

[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*

alias ..='cd ..'
alias ls='ls -GFhA' # -A -> Show hidden files/folders
alias t1='cd ~/turing/1module'
alias tu='cd ~/turing/2module'
alias tw='cd ~/turing/warmups'
alias tp='cd ~/turing/2module/projects'
alias td='cd ~/turing/DSA/projects'
alias tree='tree -FCh' # -a Hidden files: -L 3 ->Show only 3 levels deep
alias gs='git status'
alias ga='git add -A'
alias gc='git commit -m'

export PATH=$PATH:/Applications/Postgres.app/Contents/Versions/9.4/bin
