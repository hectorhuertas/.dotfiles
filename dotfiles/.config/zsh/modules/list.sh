function list {
  ls -AF $1
}

alias l=list

function list_long {
  # Only valid for BSD 'ls'. GNU 'ls' has different meaning for '-G' flag
  ls -AGlh $1
}

alias ll=list_long
