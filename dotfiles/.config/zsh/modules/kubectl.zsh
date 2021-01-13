#!/bin/zsh

if command -v kubectl > /dev/null; then
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
    # I'm lazy loading autocompletion because sourcing it at shell startup takes 1s
    #
    # If autocompletion function is not found, load kubectl autocompletion
    if ! type __start_kubectl >/dev/null 2>&1; then
        source <(command kubectl completion zsh)
    fi

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

  function kube_force_delete_pods(){
    cluster="$1"
    node="$2"
    kubectl --context="$cluster" get pod --all-namespaces -owide | rg "$node" | awk '{print "kubectl --context='"$cluster"' -n "$1" delete pod --grace-period=0 --force "$2}'
  }

  alias k='kubectl'
  alias kbd='kube_force_delete_pods'
  alias rawKube='unsafeKube'
  alias -g A='--all-namespaces'
  alias rgk='kube_rg'

  # Generated aliases
  providers=(aws gcp merit)
  providers_aliases=(a g m)
  clusters=(dev exp-1 exp-2)
  clusters_aliases=(d o t)
  namespaces=(kube-system sys-ingress-priv sys-ingress-pub sys-log sys-mon sys-prom)
  namespaces_aliases=(s priv pub l m p)

  for i in {1..$#clusters}; do
    for j in {1..$#providers}; do
      _alias="k${clusters_aliases[i]}${providers_aliases[j]}"
      _command="kubectl --context ${clusters[i]}-${providers[j]}"
      alias "$_alias"="$_command"

      for k in {1..$#namespaces}; do
        _alias="k${clusters_aliases[i]}${providers_aliases[j]}${namespaces_aliases[k]}"
        _command="kubectl --context ${clusters[i]}-${providers[j]} -n ${namespaces[k]}"
        alias "$_alias"="$_command"
      done
    done
  done
fi

if command -v stern > /dev/null; then
  # Generated aliases
  providers=(aws gcp)
  providers_aliases=(a g)
  clusters=(dev exp-1 exp-2)
  clusters_aliases=(d o t)
  namespaces=(kube-system sys-ingress-priv sys-ingress-pub sys-log sys-mon sys-prom)
  namespaces_aliases=(s priv pub l m p)

  for i in {1..$#clusters}; do
    for j in {1..$#providers}; do
      _alias="s${clusters_aliases[i]}${providers_aliases[j]}"
      _command="stern --context ${clusters[i]}-${providers[j]}"
      alias "$_alias"="$_command"

      for k in {1..$#namespaces}; do
        _alias="s${clusters_aliases[i]}${providers_aliases[j]}${namespaces_aliases[k]}"
        _command="stern --context ${clusters[i]}-${providers[j]} -n ${namespaces[k]}"
        alias "$_alias"="$_command"
      done
    done
  done
fi
