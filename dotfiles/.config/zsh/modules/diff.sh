dif() {
  diff --unified --recursive --exclude=.terraform --exclude=.git "$@" | delta
}

# Directory files differences only
ddif() {
  diff --unified --recursive --exclude=.terraform --exclude=.git --brief "$@"
}

alias d=dif
alias dd=ddif
