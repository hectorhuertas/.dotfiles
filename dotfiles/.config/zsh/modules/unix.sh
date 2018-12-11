alias e='declare -p | rg'

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
