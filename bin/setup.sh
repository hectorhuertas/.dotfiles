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

mkdir -p ~/.config
touch ~/.config/.gitkeep
echo "Inside ~/.config folder..."

rm -rf ~/.config/karabiner
ln -s ~/.dotfiles/dotfiles/.config/karabiner ~/.config/karabiner
echo "... karabiner"

rm -rf ~/.config/alacritty
ln -s ~/.dotfiles/dotfiles/.config/alacritty ~/.config/alacritty
touch ~/.config/alacritty/colors/current.yml # Create empty color theme
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

rm -rf ~/.config/yamllint
ln -s ~/.dotfiles/dotfiles/.config/yamllint ~/.config/yamllint
echo "... yamllint"

rm -rf ~/.config/zsh
ln -s ~/.dotfiles/dotfiles/.config/zsh ~/.config/zsh
echo "... zsh"

echo "Setting up node..."
n_prefix="$HOME/.local/share/n"
mkdir -p "${n_prefix}" && N_PREFIX="${n_prefix}" n lts
echo "... installed"

echo "Setting up node packages..."

npm install --global prettier
echo "... prettier"

npm install --global jsonlint
echo "... jsonlint"

echo "Setting up go tools..."

GO111MODULE=on go get mvdan.cc/sh/v3/cmd/shfmt
echo "... shfmt"

echo "Setting up vim-plug for (n)vim package management..."
plug_home="$HOME/.local/share/nvim/site/autoload"
rm -rf "${plug_home}/plug.vim" && mkdir -p "${plug_home}"
wget -qO "${plug_home}/plug.vim" \
  https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
echo "... installing plugins and binaries in an nvim window..."
echo "... it may take some time, let it run..."
sleep 2
nvim -c "PlugUpdate" -c quit -c quit
echo "... installed!"

echo "DONE!!"
