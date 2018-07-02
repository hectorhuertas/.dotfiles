function start_ssh_tunnels() {
  autossh -f -M 0 -Nn -D 127.0.0.1:2424 jumpbox.dev.uw.systems
  autossh -f -M 0 -Nn -D 127.0.0.1:2425 jumpbox.prod.uw.systems
  autossh -f -M 0 -Nn -D 127.0.0.1:2426 jumpbox.dev.gcp.uw.systems
}
alias tunnels=start_ssh_tunnels
