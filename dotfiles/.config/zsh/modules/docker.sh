if command -v docker > /dev/null; then
  export DOCKER_CONFIG="$HOME/.config/docker"

  function dotfiles_docker() {
    rm -rf ~/.docker
  }

  alias docker='rm -rf ~/.docker && docker'
fi
