function list {
  rm -f .DS_Store && ls -AF $1
}

alias l=list

function list_long {
  # Only valid for BSD 'ls'. GNU 'ls' has different meaning for '-G' flag
  rm -f .DS_Store && ls -AGlh $1
}

alias ll=list_long

# Old aliases
# alias ls='ls -GA'
# alias ll='ls -GAlh' # List with permits and size
# alias lo='ls -GAlhS' # List ordered by size
