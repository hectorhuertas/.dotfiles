export STRONGBOX_HOME="$HOME/.config/strongbox"

function start_ssh_tunnels() {
  # These won't work if the jumpbox keys are not already accepted
  autossh -f -M 0 -Nn -D 127.0.0.1:2424 jumpbox.dev.uw.systems
  autossh -f -M 0 -Nn -D 127.0.0.1:2425 jumpbox.prod.uw.systems
  autossh -f -M 0 -Nn -D 127.0.0.1:2426 jumpbox.dev.gcp.uw.systems
  autossh -f -M 0 -Nn -D 127.0.0.1:2427 jumpbox.prod.gcp.uw.systems
}
alias tunnels=start_ssh_tunnels


function kube_applier_status() {
  unsafeKube --context=$1 get ns -o json \
    | jq -r '.items[] | "\(.metadata.name) \(.metadata.annotations."kube-applier.io/enabled") \(.metadata.annotations."kube-applier.io/dry-run")"' \
    | column -t -N NAMESPACE,ENABLED,DRY-RUN
}
alias ka_status=kube_applier_status

alias uw='cd ~/Dropbox/info/uw'
