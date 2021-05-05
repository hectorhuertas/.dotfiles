# Prefixing `_` because aliases is a zsh variable
_aliases=(
  x xdev
  u xdev/uw
  dx Dropbox
  dt .dotfiles
  dc .dotfiles/dotfiles/.config

  tpa xdev/uw/terraform/aws/prod
  tpac xdev/uw/terraform/aws/prod/core
  tpab xdev/uw/terraform/aws/prod/sys-iam-boundaries
  tpak xdev/uw/terraform/aws/prod/k8s
  tpal xdev/uw/terraform/aws/prod/sys-log
  tpar xdev/uw/terraform/aws/prod/sys-iam-roles
  tda xdev/uw/terraform/aws/dev
  tdac xdev/uw/terraform/aws/dev/core
  tdab xdev/uw/terraform/aws/dev/sys-iam-boundaries
  tdak xdev/uw/terraform/aws/dev/k8s
  tdao xdev/uw/terraform/aws/dev/k8s-exp-1
  tda1 xdev/uw/terraform/aws/dev/k8s-exp-1
  tdat xdev/uw/terraform/aws/dev/k8s-exp-2
  tda2 xdev/uw/terraform/aws/dev/k8s-exp-2
  tdal xdev/uw/terraform/aws/dev/sys-log
  tdar xdev/uw/terraform/aws/dev/sys-iam-roles
  tpg xdev/uw/terraform/gcp/prod
  tpgc xdev/uw/terraform/gcp/prod/core
  tpgk xdev/uw/terraform/gcp/prod/k8s
  tpgl xdev/uw/terraform/gcp/prod/sys-log
  tdg xdev/uw/terraform/gcp/dev
  tdgc xdev/uw/terraform/gcp/dev/core
  tdgk xdev/uw/terraform/gcp/dev/k8s
  tdgo xdev/uw/terraform/gcp/dev/k8s-exp-1
  tdg1 xdev/uw/terraform/gcp/dev/k8s-exp-1
  tdgl xdev/uw/terraform/gcp/dev/sys-log
  tpm xdev/uw/terraform/merit/prod
  tpmk xdev/uw/terraform/merit/prod/k8s
  tdm xdev/uw/terraform/merit/dev
  tdmk xdev/uw/terraform/merit/dev/k8s
  tpc xdev/uw/terraform/cloudflare/system-prod
  tdc xdev/uw/terraform/cloudflare/system-dev

  mpa xdev/uw/kubernetes-manifests/prod-aws
  mpas xdev/uw/kubernetes-manifests/prod-aws/kube-system
  mpal xdev/uw/kubernetes-manifests/prod-aws/sys-log
  mpam xdev/uw/kubernetes-manifests/prod-aws/sys-mon
  mpap xdev/uw/kubernetes-manifests/prod-aws/sys-prom
  mda xdev/uw/kubernetes-manifests/dev-aws
  mdas xdev/uw/kubernetes-manifests/dev-aws/kube-system
  mdal xdev/uw/kubernetes-manifests/dev-aws/sys-log
  mdam xdev/uw/kubernetes-manifests/dev-aws/sys-mon
  mdap xdev/uw/kubernetes-manifests/dev-aws/sys-prom
  moa xdev/uw/kubernetes-manifests/exp-1-aws
  moas xdev/uw/kubernetes-manifests/exp-1-aws/kube-system
  moal xdev/uw/kubernetes-manifests/exp-1-aws/sys-log
  moam xdev/uw/kubernetes-manifests/exp-1-aws/sys-mon
  moap xdev/uw/kubernetes-manifests/exp-1-aws/sys-prom
  mta xdev/uw/kubernetes-manifests/exp-2-aws
  mtas xdev/uw/kubernetes-manifests/exp-2-aws/kube-system
  mtal xdev/uw/kubernetes-manifests/exp-2-aws/sys-log
  mtam xdev/uw/kubernetes-manifests/exp-2-aws/sys-mon
  mtap xdev/uw/kubernetes-manifests/exp-2-aws/sys-prom
  mpg xdev/uw/kubernetes-manifests/prod-gcp
  mpgs xdev/uw/kubernetes-manifests/prod-gcp/kube-system
  mpgl xdev/uw/kubernetes-manifests/prod-gcp/sys-log
  mpgm xdev/uw/kubernetes-manifests/prod-gcp/sys-mon
  mpgp xdev/uw/kubernetes-manifests/prod-gcp/sys-prom
  mdg xdev/uw/kubernetes-manifests/dev-gcp
  mdgs xdev/uw/kubernetes-manifests/dev-gcp/kube-system
  mdgl xdev/uw/kubernetes-manifests/dev-gcp/sys-log
  mdgm xdev/uw/kubernetes-manifests/dev-gcp/sys-mon
  mdgp xdev/uw/kubernetes-manifests/dev-gcp/sys-prom
  mog xdev/uw/kubernetes-manifests/exp-1-gcp
  mogs xdev/uw/kubernetes-manifests/exp-1-gcp/kube-system
  mogl xdev/uw/kubernetes-manifests/exp-1-gcp/sys-log
  mogm xdev/uw/kubernetes-manifests/exp-1-gcp/sys-mon
  mogp xdev/uw/kubernetes-manifests/exp-1-gcp/sys-prom
  mpm xdev/uw/kubernetes-manifests/prod-merit
  mpms xdev/uw/kubernetes-manifests/prod-merit/kube-system
  mpml xdev/uw/kubernetes-manifests/prod-merit/sys-log
  mpmm xdev/uw/kubernetes-manifests/prod-merit/sys-mon
  mpmp xdev/uw/kubernetes-manifests/prod-merit/sys-prom
  mdm xdev/uw/kubernetes-manifests/dev-merit
  mdms xdev/uw/kubernetes-manifests/dev-merit/kube-system
  mdml xdev/uw/kubernetes-manifests/dev-merit/sys-log
  mdmm xdev/uw/kubernetes-manifests/dev-merit/sys-mon
  mdmp xdev/uw/kubernetes-manifests/dev-merit/sys-prom
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
bindkey '^O' fzf-folder-widget

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
bindkey '^P' fzf-file-widget
