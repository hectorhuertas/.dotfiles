# Use GNU utils instead of BSD
PATH="/usr/local/opt/coreutils/libexec/gnubin:$PATH"
MANPATH="/usr/local/opt/coreutils/libexec/gnuman:$MANPATH"
PATH="/usr/local/opt/findutils/libexec/gnubin:$PATH"
MANPATH="/usr/local/opt/findutils/libexec/gnuman:$MANPATH"
PATH="/usr/local/opt/gnu-sed/libexec/gnubin:$PATH"
MANPATH="/usr/local/opt/gnu-sed/libexec/gnuman:$MANPATH"
PATH="/usr/local/opt/grep/libexec/gnubin:$PATH"
MANPATH="/usr/local/opt/grep/libexec/gnuman:$MANPATH"
PATH="/usr/local/opt/make/libexec/gnubin:$PATH"
MANPATH="/usr/local/opt/make/libexec/gnuman:$MANPATH"
PATH="/usr/local/opt/util-linux/bin:$PATH"

alias e='declare -p | rg'
alias cpwd="pwd | tr -d '\n' | pbcopy"

function parse_flag_hh(){
  flag="$1"
  cmd="$2"
  echo "$cmd" \
    | awk 's=index($0,"'$flag'") {print substr($0, s+1+length("'$flag'"))}' \
    | awk '{print $1}'
}

# https://vt100.net/docs/vt510-rm/DECSCUSR.html
function blink_cursor_hh(){
  times=10
  while [[ $times != 0 ]];do
    printf "\e[4 q"
    sleep 0.05
    printf "\e[2 q"
    sleep 0.05
    ((times = times - 1))
  done
}

# https://stackoverflow.com/questions/2829613/how-do-you-tell-if-a-string-contains-another-string-in-posix-sh
contains() {
    string="$1"
    substring="$2"
    if test "${string#*$substring}" != "$string"
    then
        return 0    # $substring is in $string
    else
        return 1    # $substring is not in $string
    fi
}
