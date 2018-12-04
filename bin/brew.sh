#!/bin/sh

if ! command -v brew > /dev/null; then
  echo "ERROR: This script requires having 'Homebrew' installed"
  exit
fi

brew update

brew upgrade

brew install awscli
brew install bat
brew install colordiff
brew install coreutils
# Use GNU utils instead of BSD
# https://stackoverflow.com/questions/3504945/timeout-command-on-mac-os-x
#PATH="/usr/local/opt/coreutils/libexec/gnubin:$PATH"
#MANPATH="/usr/local/opt/coreutils/libexec/gnuman:$MANPATH"
brew install diff-so-fancy
#brew install exercism
#brew install fasd
brew install fd
brew install fzf
brew install gnupg
brew install go
brew install hub
brew install icdiff
brew install jq
brew install neovim
#brew install nmap
#brew install node
brew install ripgrep
#brew install shellcheck
brew install tmux
brew install trash
#brew install tree
brew install unrar
brew install watch
brew install wget
brew install zplug
brew install zsh

brew tap caskroom/cask

#brew cask install atom
#brew cask install battle-net
brew cask install dash
brew cask install docker
brew cask install dropbox
#brew cask install evernote
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
