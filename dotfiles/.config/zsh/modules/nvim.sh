if command -v nvim > /dev/null; then
  export EDITOR=nvim

  my_nvim() {
    if [ "$1" != "" ]; then
      nvim $1
    else
      # __fsel defined in navigation.sh
      nvim $(__fsel)
    fi
  }

  alias v='my_nvim'
fi

