function cd_list {
  cd $1 && list
}
alias c=cd_list

function z_list {
  _z $1 2>&1 && list
}
alias z=z_list


