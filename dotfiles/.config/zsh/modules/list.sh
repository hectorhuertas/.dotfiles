alias l="exa --long --git --color-scale --all --ignore-glob=.git"
alias ll="exa --long --git --color-scale --all --ignore-glob=.git --tree --level=2"
alias lll="exa --long --git --color-scale --all --ignore-glob=.git --tree --level=3"
alias llll="exa --long --git --color-scale --all --ignore-glob=.git --tree --level=4"

# To be used by other utilities like cd or z
function list {
  l
}
