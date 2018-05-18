if command -v kubectl > /dev/null; then
  source <(kubectl completion zsh)

  alias k='kubectl'
  alias -g A='--all-namespaces'
fi
