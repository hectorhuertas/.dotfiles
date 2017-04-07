#!/bin/sh

brew update

brew upgrade

brew tap caskroom/cask

brew cask install atom
brew cask install dropbox
brew cask install evernote
brew cask install google-chrome
brew cask install iterm2
brew cask install skype
brew cask install slack
brew cask install spectacle
brew cask install steam

brew cleanup
brew cask cleanup
