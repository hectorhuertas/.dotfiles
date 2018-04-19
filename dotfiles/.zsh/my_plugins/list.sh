function list {
  ls -Ap
}

alias l=list

function list_long {
  ls -Aplh
}

alias ll=list_long

# Old aliases
# alias ls='ls -GA'
# alias ll='ls -GAlh' # List with permits and size
# alias lo='ls -GAlhS' # List ordered by size
