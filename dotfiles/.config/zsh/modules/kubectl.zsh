#!/bin/zsh

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

  function kube_rg(){
    read -r first_line < /dev/stdin
    echo "$first_line | rg $@"
    rg "$@" < /dev/stdin
  }

  alias k='kubectl'
  alias krg='kube_rg'
  alias -g A='--all-namespaces'

  # Generated aliases
  providers=(aws gcp)
  providers_aliases=(a g)
  clusters=(dev exp-1 exp-2)
  clusters_aliases=(d 1 2)
  namespaces=(kube-system sys-ingress-priv sys-ingress-pub sys-log sys-mon sys-prom)
  namespaces_aliases=(sys priv pub log mon prom)
  
  for i in {1..$#clusters}; do
    for j in {1..$#providers}; do
      for k in {1..$#namespaces}; do
        _alias="k${clusters_aliases[i]}${providers_aliases[j]}${namespaces_aliases[k]}"
        _command="kubectl --context ${clusters[i]}-${providers[j]} -n ${namespaces[k]}"
        alias "$_alias"="$_command"
      done
    done
  done
fi
