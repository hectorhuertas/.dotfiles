#!/bin/sh
set -e

echo "--------------------"
echo "-- Dotfiles setup --"
echo "--------------------"

if [ ! -x "$HOME/.dotfiles/bin/setup.sh" ]; then
  echo "ERROR: The dotfiles repository should be cloned at '~/.dotfiles',"
  echo "       so this script should be at '~/.dotfiles/bin/setup.sh'"
  exit
fi

echo "Symlinking config files..."

rm -f ~/.zshenv
ln -s ~/.dotfiles/dotfiles/.zshenv ~/.zshenv
echo "... .zshenv"

mkdir -p ~/.ssh
rm -f ~/.ssh/config
ln -s ~/.dotfiles/dotfiles/.ssh/config ~/.ssh/config
echo "... .ssh/config"

rm -f ~/.gitignore
ln -s ~/.dotfiles/dotfiles/.gitignore@home ~/.gitignore
echo "... .gitignore"

rm -rf ~/.terminfo
ln -s ~/.dotfiles/dotfiles/.terminfo ~/.terminfo
echo "... .terminfo"

mkdir -p ~/.config
touch ~/.config/.gitkeep
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

rm -rf ~/.config/hammerspoon
ln -s ~/.dotfiles/dotfiles/.config/hammerspoon ~/.config/hammerspoon
echo "... hammerspoon"

rm -rf ~/.config/nvim
ln -s ~/.dotfiles/dotfiles/.config/nvim ~/.config/nvim
echo "... nvim"

rm -rf ~/.config/ripgrep
ln -s ~/.dotfiles/dotfiles/.config/ripgrep ~/.config/ripgrep
echo "... ripgrep"

rm -rf ~/.config/tmux
ln -s ~/.dotfiles/dotfiles/.config/tmux ~/.config/tmux
echo "... tmux"

rm -rf ~/.config/zsh
ln -s ~/.dotfiles/dotfiles/.config/zsh ~/.config/zsh
echo "... zsh"

echo "Setting up vim-plug for (n)vim package management..."
plug_home="$HOME/.local/share/nvim/site/autoload"
rm -rf ${plug_home}/plug.vim && mkdir -p ${plug_home}
wget -qO ${plug_home}/plug.vim \
  https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
echo "... installing plugins and binaries in an nvim window..."
echo "... it may take some time, let it run..."
sleep 2
nvim -c "PlugUpdate" -c quit -c quit
echo "... installed!"

echo "DONE!!"

echo "Installing utilities..."

rm -rf /usr/local/bin/code_backup
ln -s ~/.dotfiles/dotfiles/bin/code_backup.bash /usr/local/bin/code_backup
echo "... code_backup"

echo "DONE!!"
