	
[[ -s "$HOME/.profile" ]] && source "$HOME/.profile" # Load the default .profile

[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*

alias ..='cd ..'
alias ls='ls -GFh' # -A -> Show hidden files/folders
alias rd='rm -rf'
alias tu='cd ~/turing/1module'
alias tw='cd ~/turing/warmups'
alias tp='cd ~/turing/1module/projects'
alias tree='tree -FCh' # -a Hidden files: -L 3 ->Show only 3 levels deep
