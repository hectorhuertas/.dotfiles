#!/bin/sh

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

echo "DONE!!"

# if [[ $? > 0 ]]; then
#   echo 'Error while creating symlink'
# fi
