#!/bin/sh
set -e

echo ""
echo "------------------"
echo "- Dotfiles setup -"
echo "------------------"
echo ""
echo "WARNING: The dotfiles repository should be cloned at '~/.dotfiles',"
echo "         so this script should be at '~/.dotfiles/setup.sh'"
echo ""

echo "Symlinking config files..."

rm ~/.gitconfig
ln -s ~/.dotfiles/dotfiles/.gitconfig ~/.gitconfig
echo "... .gitconfig"

rm ~/.tmux.conf
ln -s ~/.dotfiles/dotfiles/.tmux.conf ~/.tmux.conf
echo "... .tmux.conf"

rm ~/.zshenv
ln -s ~/.dotfiles/dotfiles/.zshenv ~/.zshenv
rm ~/.zsh
ln -s ~/.dotfiles/dotfiles/.zsh ~/.zsh
echo "... .zsh"

echo "DONE!!"
