#!/bin/sh

if ! command -v brew > /dev/null; then
  echo "ERROR: This script requires having 'Homebrew' installed"
  exit
fi

brew update

brew upgrade

brew install exercism
brew install hub
brew install jq
brew install nmap
brew install node
brew install tmux
brew install trash
brew install unrar
brew install vim
brew install wget
brew install zplug
brew install zsh

brew tap caskroom/cask

brew cask install atom
brew cask install battle-net
brew cask install docker
brew cask install dropbox
brew cask install evernote
brew cask install flux
brew cask install gog-galaxy
brew cask install google-chrome
brew cask install intel-power-gadget
brew cask install iterm2
brew cask install karabiner-elements
brew cask install keepingyouawake
brew cask install keybase
brew cask install macs-fan-control
brew cask install qbittorrent
brew cask install skype
brew cask install slack
brew cask install spectacle
brew cask install steam
brew cask install tomighty
brew cask install vlc
brew cask install yujitach-menumeters

brew cleanup
brew cask cleanup
