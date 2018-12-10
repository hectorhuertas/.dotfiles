if command -v kubectl > /dev/null; then
  source <(command kubectl completion zsh)

  function is_dangerous_apply() {
    args="$@"
    [[ "$args" != *' apply '* ]] && return 1
    context=$(parse_flag_hh --context "$args")
    [[ "$context" != *prod* ]] && return 1
    [[ $PWD == *$context* ]] && return 1
    return 0
  }

  function unsafeKube() {
    command kubectl "$@"
  }

  function kubectl() {
    if is_dangerous_apply "$@"; then
      echo "\033[0;31mERROR: Applying to prod from a dev environment!\033[0m"
      echo "Use 'unsafeKube' instead of 'kubectl' to skip this check"
    else
      echo $ "$0" "$@"
      command kubectl "$@"
    fi
  }

  alias k='kubectl'
  alias -g A='--all-namespaces'
fi
