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

rm ~/.bash_profile
ln -s ~/.dotfiles/dotfiles/.bash_profile ~/.bash_profile
echo "... .bash_profile"

rm ~/.gitconfig
ln -s ~/.dotfiles/dotfiles/.gitconfig ~/.gitconfig
echo "... .gitconfig"

rm ~/.tmux.conf
ln -s ~/.dotfiles/dotfiles/.tmux.conf ~/.tmux.conf
echo "... .tmux.conf"

rm ~/.zshenv
ln -s ~/.dotfiles/dotfiles/.zshenv ~/.zshenv
mkdir -p ~/.zsh
rm ~/.zsh/.zshrc
ln -s ~/.dotfiles/dotfiles/.zsh/.zshrc ~/.zsh/.zshrc
rm ~/.zsh/.zplug
ln -s ~/.dotfiles/dotfiles/.zsh/.zplug ~/.zsh/.zplug
rm ~/.zsh/.aliases
ln -s ~/.dotfiles/dotfiles/.zsh/.aliases ~/.zsh/.aliases
rm ~/.zsh/.keybindings
ln -s ~/.dotfiles/dotfiles/.zsh/.keybindings ~/.zsh/.keybindings
rm ~/.zsh/.functions
ln -s ~/.dotfiles/dotfiles/.zsh/.functions ~/.zsh/.functions
echo "... .zsh"

echo "DONE!!"

# if [[ $? > 0 ]]; then
#   echo 'Error while creating symlink'
# fi
