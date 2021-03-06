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
cp ~/.config/alacritty/colors/solarized-dark.yml ~/.config/alacritty/colors/current.yml # default theme
echo "... alacritty"

rm -rf ~/.config/git
ln -s ~/.dotfiles/dotfiles/.config/git ~/.config/git
echo "... git"

rm -rf ~/.config/hammerspoon
ln -s ~/.dotfiles/dotfiles/.config/hammerspoon ~/.config/hammerspoon
echo "... hammerspoon"

rm -rf ~/.config/nvim
ln -s ~/.dotfiles/dotfiles/.config/nvim ~/.config/nvim
echo "colorscheme flattened_dark" >"${HOME}/.config/nvim/current-theme.vim" # default theme
echo "... nvim"

rm -rf ~/.config/ripgrep
ln -s ~/.dotfiles/dotfiles/.config/ripgrep ~/.config/ripgrep
echo "... ripgrep"

rm -rf ~/.config/snippets
ln -s ~/.dotfiles/dotfiles/.config/snippets ~/.config/snippets
echo "... snippets"

rm -rf ~/.config/tmux
ln -s ~/.dotfiles/dotfiles/.config/tmux ~/.config/tmux
echo "... tmux"

rm -rf ~/.config/yamllint
ln -s ~/.dotfiles/dotfiles/.config/yamllint ~/.config/yamllint
echo "... yamllint"

rm -rf ~/.config/zsh
ln -s ~/.dotfiles/dotfiles/.config/zsh ~/.config/zsh
echo "... zsh"

echo "Setting up node and packages..."

n_prefix="$HOME/.local/share/n"
mkdir -p "${n_prefix}" && N_PREFIX="${n_prefix}" n lts
echo "... n manager and LTS node version"

npm install --global jsonlint
echo "... jsonlint"

npm install --global prettier
echo "... prettier"

echo "Setting up go tools..."

GO111MODULE=on go get mvdan.cc/sh/v3/cmd/shfmt
echo "... shfmt"

echo "Setting up zinit for zsh plugins..."
zinit_home="$HOME/.local/share/zinit"
rm -rf "${zinit_home}" && mkdir -p "${zinit_home}"
git clone https://github.com/zdharma/zinit.git "${zinit_home}/bin"
echo "... installed!"

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

echo "Installing python modules"
pip3 install pynvim
echo "...pynvim" # To allow nvim plugins access to python

pip3 install neovim-remote
echo "... nvr" # To control neovim servers from the command line

echo "Setting vim-profiler"
git clone https://github.com/bchretien/vim-profiler.git "$HOME/.local/share/vim-profiler"
echo "... installed!"

echo "DONE!!"
