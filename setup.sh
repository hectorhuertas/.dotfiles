#!/bin/sh
set -e

echo "--------------------"
echo "-- Dotfiles setup --"
echo "--------------------"

if [ ! -x "$HOME/.dotfiles/setup.sh" ]; then
  echo "ERROR: The dotfiles repository should be cloned at '~/.dotfiles',"
  echo "       so this script should be at '~/.dotfiles/setup.sh'"
  exit
fi

if [ "$(pwd)" != "$HOME/.dotfiles" ]; then
  echo "ERROR: This script must be run from $HOME/.dotfiles"
  exit
fi

echo "Symlinking config files..."

rm -f ~/.gitconfig
ln -s ~/.dotfiles/dotfiles/.gitconfig ~/.gitconfig
echo "... .gitconfig"

rm -f ~/.tmux.conf
ln -s ~/.dotfiles/dotfiles/.tmux.conf ~/.tmux.conf
echo "... .tmux.conf"

rm -f ~/.zshenv
ln -s ~/.dotfiles/dotfiles/.zshenv ~/.zshenv
rm -rf ~/.zsh
ln -s ~/.dotfiles/dotfiles/.zsh ~/.zsh
echo "... .zsh"

rm -rf ~/.hammerspoon
ln -s ~/.dotfiles/dotfiles/.hammerspoon ~/.hammerspoon
echo "... .hammerspoon"

mkdir -p ~/.config
echo "Inside ~/.config folder..."

rm -rf ~/.config/karabiner
ln -s ~/.dotfiles/dotfiles/.config/karabiner ~/.config/karabiner
echo "... karabiner"

rm -rf ~/.config/alacritty
ln -s ~/.dotfiles/dotfiles/.config/alacritty ~/.config/alacritty
echo "... alacritty"

echo "DONE!!"
