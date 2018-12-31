# Prefixing `_` because aliases is a zsh variable
_aliases=(
  x xdev
  dt .dotfiles
  dc .dotfiles/dotfiles/.config
  tpa xdev/terraform/aws/prod
  tpac xdev/terraform/aws/prod/core
  tpak xdev/terraform/aws/prod/k8s
  tpal xdev/terraform/aws/prod/sys-log
  tda xdev/terraform/aws/dev
  tdac xdev/terraform/aws/dev/core
  tdak xdev/terraform/aws/dev/k8s
  tdao xdev/terraform/aws/dev/k8s-exp-1
  tda1 xdev/terraform/aws/dev/k8s-exp-1
  tdat xdev/terraform/aws/dev/k8s-exp-2
  tda2 xdev/terraform/aws/dev/k8s-exp-2
  tdal xdev/terraform/aws/dev/sys-log
  tpg xdev/terraform/gcp/prod
  tpgc xdev/terraform/gcp/prod/core
  tpgk xdev/terraform/gcp/prod/k8s
  tpgl xdev/terraform/gcp/prod/sys-log
  tdg xdev/terraform/gcp/dev
  tdgc xdev/terraform/gcp/dev/core
  tdgk xdev/terraform/gcp/dev/k8s
  tdgo xdev/terraform/gcp/dev/k8s-exp-1
  tdg1 xdev/terraform/gcp/dev/k8s-exp-1
  tdgl xdev/terraform/gcp/dev/sys-log
  mpa xdev/kubernetes-manifests/prod-aws
  mpas xdev/kubernetes-manifests/prod-aws/kube-system
  mpal xdev/kubernetes-manifests/prod-aws/sys-log
  mpam xdev/kubernetes-manifests/prod-aws/sys-mon
  mpap xdev/kubernetes-manifests/prod-aws/sys-prom
  mda xdev/kubernetes-manifests/dev-aws
  mdas xdev/kubernetes-manifests/dev-aws/kube-system
  mdal xdev/kubernetes-manifests/dev-aws/sys-log
  mdam xdev/kubernetes-manifests/dev-aws/sys-mon
  mdap xdev/kubernetes-manifests/dev-aws/sys-prom
  moa xdev/kubernetes-manifests/exp-1-aws
  moas xdev/kubernetes-manifests/exp-1-aws/kube-system
  moal xdev/kubernetes-manifests/exp-1-aws/sys-log
  moam xdev/kubernetes-manifests/exp-1-aws/sys-mon
  moap xdev/kubernetes-manifests/exp-1-aws/sys-prom
  mta xdev/kubernetes-manifests/exp-2-aws
  mtas xdev/kubernetes-manifests/exp-2-aws/kube-system
  mtal xdev/kubernetes-manifests/exp-2-aws/sys-log
  mtam xdev/kubernetes-manifests/exp-2-aws/sys-mon
  mtap xdev/kubernetes-manifests/exp-2-aws/sys-prom
  mpg xdev/kubernetes-manifests/prod-gcp
  mpgs xdev/kubernetes-manifests/prod-gcp/kube-system
  mpgl xdev/kubernetes-manifests/prod-gcp/sys-log
  mpgm xdev/kubernetes-manifests/prod-gcp/sys-mon
  mpgp xdev/kubernetes-manifests/prod-gcp/sys-prom
  mdg xdev/kubernetes-manifests/dev-gcp
  mdgs xdev/kubernetes-manifests/dev-gcp/kube-system
  mdgl xdev/kubernetes-manifests/dev-gcp/sys-log
  mdgm xdev/kubernetes-manifests/dev-gcp/sys-mon
  mdgp xdev/kubernetes-manifests/dev-gcp/sys-prom
  mog xdev/kubernetes-manifests/exp-1-gcp
  mogs xdev/kubernetes-manifests/exp-1-gcp/kube-system
  mogl xdev/kubernetes-manifests/exp-1-gcp/sys-log
  mogm xdev/kubernetes-manifests/exp-1-gcp/sys-mon
  mogp xdev/kubernetes-manifests/exp-1-gcp/sys-prom
)

for _alias _dir in ${(kv)_aliases}; do
  alias "$_alias=c $HOME/$_dir"
  alias -g "c$_alias=$HOME/$_dir"
done

## FZF utitlity from https://github.com/junegunn/fzf/blob/master/shell/key-bindings.zsh

# Global fzf utils
__fzf_use_tmux__() {
  [ -n "$TMUX_PANE" ] && [ "${FZF_TMUX:-0}" != 0 ] && [ ${LINES:-40} -gt 15 ]
}

__fzfcmd() {
  __fzf_use_tmux__ &&
    echo "fzf-tmux -d${FZF_TMUX_HEIGHT:-40%}" || echo "fzf"
}

# Paste the selected dir path(s) into the command line
__fosel() {
  local cmd="fd --type d . --color=never"
  setopt localoptions pipefail 2> /dev/null
  eval "$cmd" | FZF_DEFAULT_OPTS="--height ${FZF_TMUX_HEIGHT:-40%}" $(__fzfcmd) -m "$@" | while read item; do
    echo -n "${(q)item} "
  done
  local ret=$?
  echo
  return $ret
}

fzf-folder-widget() {
  LBUFFER="${LBUFFER}$(__fosel)"
  local ret=$?
  zle reset-prompt
  return $ret
}
zle     -N   fzf-folder-widget
bindkey '^T' fzf-folder-widget

# Paste the selected file path(s) into the command line
__fsel() {
  local cmd="fd --type f --color=never"
  setopt localoptions pipefail 2> /dev/null
  eval "$cmd" | FZF_DEFAULT_OPTS="--height ${FZF_TMUX_HEIGHT:-40%}" $(__fzfcmd) -m "$@" | while read item; do
    echo -n "${(q)item} "
  done
  local ret=$?
  echo
  return $ret
}

fzf-file-widget() {
  LBUFFER="${LBUFFER}$(__fsel)"
  local ret=$?
  zle reset-prompt
  return $ret
}
zle     -N   fzf-file-widget
bindkey '^E' fzf-file-widget
