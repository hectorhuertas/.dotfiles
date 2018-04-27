#!/bin/sh
set -e

echo "--------------------"
echo "-- Dotfiles setup --"
echo "--------------------"

if [ ! -x "$HOME/.dotfiles/bin/setup.sh" ]; then
  echo "ERROR: The dotfiles repository should be cloned at '~/.dotfiles',"
  echo "       so this script should be at '~/.dotfiles/setup.sh'"
  exit
fi

if [ "$(pwd)" != "$HOME/.dotfiles" ]; then
  echo "ERROR: This script must be run from $HOME/.dotfiles"
  exit
fi

echo "Symlinking config files..."

rm -f ~/.tmux.conf
ln -s ~/.dotfiles/dotfiles/.tmux.conf ~/.tmux.conf
echo "... .tmux.conf"

rm -f ~/.zshenv
ln -s ~/.dotfiles/dotfiles/.zshenv ~/.zshenv
echo "... .zshenv"

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

rm -rf ~/.config/git
ln -s ~/.dotfiles/dotfiles/.config/git ~/.config/git
echo "... git"

rm -rf ~/.config/nvim
ln -s ~/.dotfiles/dotfiles/.config/nvim ~/.config/nvim
echo "... nvim"

rm -rf ~/.config/zsh
ln -s ~/.dotfiles/dotfiles/.config/zsh ~/.config/zsh
echo "... zsh"

echo "Setting up dein for (n)vim package management..."
dein_home="$HOME/.cache/vim/dein/repos/github.com/Shougo/dein.vim"
rm -rf ${dein_home}
mkdir -p ${dein_home}
git clone https://github.com/Shougo/dein.vim.git ${dein_home} --quiet
echo "... installed!"
echo "Do not forget to install the plugins inside (n)vim with ':call dein#install()'"

echo "DONE!!"
