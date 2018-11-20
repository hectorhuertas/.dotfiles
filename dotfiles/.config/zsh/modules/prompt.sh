# ZSH PROMPT EXPERIMENT
function exit_check() {
  if [ "$1" = 0 ]; then
    out=""
  else
    out="$1 "
  fi
  echo "%F{red}$out"
}

#export PS1='%F{cyan}%* $(exit_check "$?")%F{magenta}%n%F{cyan}@%F{yellow}%m%F{red}:%F{cyan}%~%F{red}|%F{green}$(git_prompt_info)%F{cyan} %# '

## Uncomment to enable updating prompt
#TMOUT=1
#TRAPALRM() {
#time zle reset-prompt
#}
