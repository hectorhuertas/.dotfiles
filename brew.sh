#!/bin/sh

brew update

brew upgrade

brew tap caskroom/cask

brew cask install google-chrome
brew cask install atom
brew cask install spectacle
brew cask install steam
brew cask install evernote
brew cask install slack
brew cask install iterm2
brew cask install dropbox
brew cask install skype

brew cleanup
brew cask cleanup
