#!/bin/sh

if ! command -v brew > /dev/null; then
  echo "ERROR: This script requires having 'Homebrew' installed"
  exit
fi

brew update

brew upgrade

# Some of the utils need $PATH edition, set in zsh/modules/unix.sh
brew install autossh
brew install awscli
brew install bat
brew install coreutils
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
brew install grep
brew install gzip
brew install hub
brew install icdiff
brew install jq
brew install kubernetes-cli
brew install less
brew install make
brew install neovim
#brew install nmap
#brew install node
brew install ripgrep
#brew install shellcheck
brew install terraform
brew install tmux
brew install trash
brew install unrar
brew install watch
brew install wget
brew install zplug
brew install zsh

brew tap caskroom/cask

brew cask install alacritty
#brew cask install atom
#brew cask install battle-net
brew cask install dash
brew cask install docker
brew cask install dropbox
#brew cask install evernote
brew cask install firefox
brew cask install flux
#brew cask install gog-galaxy
#brew cask install google-chrome
#brew cask install google-cloud-sdk
brew cask install hammerspoon
defaults write org.hammerspoon.Hammerspoon MJConfigFile "~/.config/hammerspoon/init.lua"
#brew cask install intel-power-gadget
#brew cask install iterm2
brew cask install karabiner-elements
brew cask install keepingyouawake
#brew cask install keybase
brew cask install macs-fan-control
#brew cask install qbittorrent
brew cask install skype
brew cask install slack
brew cask install spectacle
#brew cask install steam
#brew cask install tomighty
brew cask install vlc
brew cask install yujitach-menumeters

brew cleanup
