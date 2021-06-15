#!/bin/sh

if ! command -v brew >/dev/null; then
  echo "ERROR: This script requires having 'Homebrew' installed"
  exit
fi

# Set custom screenshot location
defaults write com.apple.screencapture location ~/Dropbox/temp

brew update

brew upgrade

# Remove compinit insecure directories warning (https://docs.brew.sh/Shell-Completion#configuring-completions-in-zsh)
chmod -R go-w "$(brew --prefix)/share"

# Some of the utils need $PATH edition, set in zsh/modules/unix.sh
brew install autossh
brew install aws-rotate-key
brew install awscli
brew install bash
brew install bat
brew install cmus
brew install coreutils
brew install curl
brew install diff-so-fancy
brew install diffutils
brew install exa
#brew install exercism
#brew install fasd
brew install fd
brew install findutils
brew install fzf
brew install git
brew install gnu-sed
brew install gnupg
brew install go
brew install graphviz
brew install grep
brew install hub
brew install icdiff
brew install jq
brew install kubernetes-cli
brew install kustomize
brew install ldns
brew install less
brew install make
brew install monolith
brew install neovim
brew install n
brew install nmap
brew install ntfs-3g
brew install oath-toolkit
brew install pwgen
brew install python
brew install rclone
brew install ripgrep
brew install sd
brew install shellcheck
brew install stern
brew install terraform
brew install tmux
brew install trash
brew install rar
brew install util-linux
brew install vint
brew install watch
brew install wget
brew install yamllint
brew install zplug
brew install zsh

brew tap homebrew/cask

brew install --cask alacritty
sudo tic -xe alacritty,alacritty-direct ~/.config/alacritty/alacritty.info # install alacritty terminfo
#brew install --cask battle-net
#brew install --cask dash
brew install --cask docker
brew install --cask dropbox
brew install --cask firefox
brew install --cask flux
#brew install --cask gog-galaxy
#brew install --cask google-chrome
#brew install --cask google-cloud-sdk
brew install --cask hammerspoon
defaults write org.hammerspoon.Hammerspoon MJConfigFile "~/.config/hammerspoon/init.lua"
#brew install --cask intel-power-gadget
brew install --cask karabiner-elements
brew install --cask keepingyouawake
#brew install --cask keybase
brew install --cask macs-fan-control
brew install --cask menumeters
#brew install --cask qbittorrent
brew install --cask skype
brew install --cask slack
brew install --cask spectacle
brew install --cask stats
#brew install --cask steam
#brew install --cask tomighty
brew install --cask vlc

brew tap homebrew/cask-fonts

brew install --cask font-hack
brew install --cask font-monoid

brew cleanup
