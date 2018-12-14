if command -v nvim > /dev/null; then
  export EDITOR=nvim

  my_nvim() {
    if [ "$1" != "" ]
    then
      nvim $1
    else
      nvim .
    fi
  }

  alias v='my_nvim'
fi

