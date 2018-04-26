# Hector Huertas' .dotfiles

These are my personal configurations and the scripts to easily install them.

There are two projects in one: the management of the dotfiles themselves and the configuration of my environment.

**NOTE:** This project must be cloned so this README lives at ~/.dotfiles/README.md

## #1 Dotfiles management

This project involves the management of the dotfiles and the utilities used to install and keep them in sync.

### Goals
* Super easy to install/update/sync
* Built by me
  * Understand every line, using comments
  * Production quality (nice UI, good errors, etc)
* Learn unix systems and proper shell scripting

### Prerequisites
* Install every system update
* Install 'Command Line Tools' with: `$ xcode-select --install`
* Install brew from https://brew.sh/
* Make sure the project is cloned so this README lives at ~/.dotfiles/README.md

### Usage
* Installing or updating configs:
  * Run `bin/brew.sh` to install basic utilities in macOs
  * Run `bin/setup.sh` to install personal configurations
* Making changes to exiting configs:
  * Modify the desired file under ~/.dotfiles/dotfiles
  * Commit the changes to the github repository
* Adding new configurations:
  * Copy the new configuration file/s into ~/.dotfiles/dotfiles
  * Update setup.sh with the installation process

### To Do
* Add sudo powers to brew script?
* Colorize output & errors?

## #2 Personal configurations for utilities

This project involves setting up an awesome personal system environment by building awesome configurations for awesome UNIX utilities.

The ultimate goal is having an amazing, ultra-productive system & workflow

### Philosophy
* Focus on improving productivity
* Understand every line, using comments, don't copy blindly!
* Use only what I need, KISS

### To Do
* Autostart tmux session with same window group
* Improve dein install:
  * Remove bad setup in zsh folder
  * Cleanup install script in setup.sh
  * Remove the crappy working folder (.vim/dein...) for something better like "~/.local/share.../nvim??)
* Check all the bookmarks
* Tmux (`Prefix ?` to show predefined comands)
  * Persistent tmux sessions
  * Nice, useful theme/status bar
  * Keep config when sshing into remote servers
  * Using comand line with hjkl
    * Go to start/end of line
    * Move one work back /forth
  * Different background colors for different machines / kube environments, ...
  * Find out why selecting with double click or with drag selection acts weird/doesnt work with mouse mode on
  * Find out when in vi-mode some keys throw a weird output (like C-b or C-t, but not C-r or C-l)
  * Figure out how to copy and paste from the copy mode and vim
* Zsh
  * Basic config to implement quick alias
  * auto-suggestions
  * Nice, useful theme
  * Reorganize the way elements are sourced (maybe source a folder and put alike things inside? Like an aliases folder and inside different files for different programs?)
  * Check that a program is installed before sourcing/autocompleting related things
  * Make sure zsh history works as intended, as well as `nohup` and `nonotify` options
  * Try to implement XDG variables to move most of the configurations to .config folder
  * Improve the keybindigs, specially for going to the beginning and end of line. Like: `[[ -z "$terminfo[khome]" ]] || bindkey -M emacs "$terminfo[khome]" beginning-of-line`
* Desired additions
  * Vim/NeoVim
  * fzf
  * powerlevel9k theme for zsh?
* Use hamerspoon scripts to implement spectacle's functionality
* Git
  * Create a prompt indication to let me know when I'm in a dirty master
* AWS
  * How to create keypair locally and upload them and get the fingerprints
  * Create the keypair using `ssh-keygen -t rsa -b 2048 -C "peter@jander.io"`. It's also possible using openssl, but then i need to find which formats the output should be. If using ssh-keygen, explore how to pass all the options (no passphrase and set output files path and names)
  * Get the AWS fingerprints using `openssl pkey -in /path/to/key -pubout -outform DER | openssl md5 -c`
  * Check https://serverfault.com/questions/603982/why-does-my-openssh-key-fingerprint-not-match-the-aws-ec2-console-keypair-finger
  * Include aws cli command to upload the public key to amazon, and afterwards check the fingerprint is correct

#### Shortcuts system
* Types of shortcuts
  * Desktop and window management (mission control and spectacle)
  * Global shortcuts (copy, paste, select all, undo...)
  * Set focus on specific application (and cycle thought windows?)
  * Move between panes of application
  * Tmux actions
  * Graphical application shortcuts
  * Terminal applications shortcuts
* Style of shortcut
  * Key combination
  * Prefix + Key
* Shortcut combinations (avoiding big hand movement)
  * Avoid Ctrl + Shift
  * Avoid option/alt

#### Implemented shortcuts outside of this dotfiles
* MacOs: (Cmd + Ctrl)
  * D: Show Desktop
* Spectacle: (Cmd + Ctrl)
  * Vim keys: resize to proper side
  * F: Fullscreen
  * C: Center (has weird side effect, press ESC to exit it)
