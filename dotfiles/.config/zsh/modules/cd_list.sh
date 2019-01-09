function cd_list {
  if [ "$1" != "" ]; then
    cd $1 && list
  else
    # __fosel defined in navigation.sh
    cd $(__fosel)
  fi
}
alias c=cd_list

function z_list {
  _z $1 2>&1 && list
}
alias z=z_list


