# Hector Huertas' .dotfiles
https://github.com/hectorhuertas/.dotfiles

Using dotbot to backup dotfiles

## Set up

Clone the repo in ~/.dotfiles

    hub clone hectorhuertas/.dotfiles ~/.dotfiles

Execute the install script

    ~/.dotfiles/install

## Dotbot update

To update dotbot execute the following script on my dotfiles repo

    git submodule update --remote dotbot

## Adding files to track
Copiar los dofiles que quiera guardar en la carpeta de dotfiles SIN el punto inicial (no hidden) y anyadir el archivo a la lista de links en install.conf.yaml

## Ignore
.dotfiles
All history files
.CFUserTextEncoding (text encoding for user)
.Trash/ (recycle bin)
.dropbox (isn't user config)
.gem (isn't user config)
.rvm (isn't user config)
.ssh (sensitive user data)
.viminfo
