if command -v kubectl > /dev/null; then
  function kubectl() {
    unfunction "$0"
    source <(kubectl completion zsh)
    command "$0" "$@"
  }

  alias k='kubectl'
  alias -g A='--all-namespaces'
fi
