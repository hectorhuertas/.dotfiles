alias e='declare -p | rg'

function parse_flag_hh(){
  flag="$1"
  cmd="$2"
  echo "$cmd" \
    | awk 's=index($0,"'$flag'") {print substr($0, s+1+length("'$flag'"))}' \
    | awk '{print $1}'
}
