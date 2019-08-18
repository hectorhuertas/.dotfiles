export STRONGBOX_HOME="$HOME/.config/strongbox"

function start_ssh_tunnels() {
  # These won't work if the jumpbox keys are not already accepted
  autossh -f -M 0 -Nn -D 127.0.0.1:2424 jumpbox.dev.uw.systems
  autossh -f -M 0 -Nn -D 127.0.0.1:2425 jumpbox.prod.uw.systems
  autossh -f -M 0 -Nn -D 127.0.0.1:2426 jumpbox.dev.gcp.uw.systems
  autossh -f -M 0 -Nn -D 127.0.0.1:2427 jumpbox.prod.gcp.uw.systems
}
alias tunnels=start_ssh_tunnels

alias uw='cd ~/Dropbox/info/uw'
