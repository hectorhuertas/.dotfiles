function print_separator(){
  printf '\033[34m%*s\n' "${COLUMNS}" '' | tr ' ' -
  printf '\033[32m%*s\n' "${COLUMNS}" '' | tr ' ' %
  printf '\033[32m%*s\n' "${COLUMNS}" '' | tr ' ' %
  printf '\033[34m%*s\n' "${COLUMNS}" '' | tr ' ' -
}

# Using `bat` instead of `less` to let the diff stay in the terminal buffer
function dif() {
	print_separator
  icdiff -r $@ | less --tabs=4 -RFX
}

# Directory files differences only
function ddif(){
 icdiff $@ | less --tabs=4 -RFX
}

# Recursive diff
function rdif() {
	print_separator
	# GNU `diff` needed for this one. OSX native BSD one doesn't have colors
  # `bat` is needed because `less` does not colorize all added lines
  diff --color=always -u -r --exclude=.terraform --exclude=.git $@ | bat --style=changes
}

alias d=dif
alias dd=ddif
alias rd=rdif
