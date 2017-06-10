# Hector Huertas' .dotfiles

This are my personal configurations and the scripts to easily install them.

This are two projects in one: the management of the dotfiles themselves and the configuration of my environment.

**NOTE:** This project must be cloned so this README lives at ~/.dotfiles/README.md

## #1 Dotfiles management

This project involves the management of the dotfiles and the utilities used to install and keep them in sync.

### Goals
* Super easy to install/update/sync
* Built my me
  * Understand every line, using comments
  * Production quality (nice UI, good errors, etc)
* Learn unix systems and proper shell scripting

### Prerequisites
* Install every system update
* Install 'Command Line Tools' with: ```$ xcode-select --install```
* Install brew from https://brew.sh/
* Make sure the project is cloned so this README lives at ~/.dotfiles/README.md

### Usage
* Installing or updating configs:
  * Run brew.sh to install basic utilities in macOs
  * Run setup.sh to install personal configurations
* Making changes to exiting configs:
  * Modify the desired file under ~/.dotfiles/dotfiles
  * Commit the changes to the github repository
* Adding new configurations:
  * Copy the new configuration file/s into ~/.dotfiles/dotfiles
  * Update setup.sh with the installation process

### To Do
* Add sudo powers to brew script?

## #2 Personal configurations for utilities

This project involves setting up an awesome personal system environment by building awesome configurations for awesome UNIX utilities.

The ultimate goal is having an amazing, ultra-productive system & workflow

### Philosophy
* Focus on improving productivity
* Understand every line, using comments, don't copy blindly!
* Use only what I need, KISS


### To Do
* Tmux
  * Persistent tmux sessions
  * Nice, useful theme/status bar
  * Keep config when sshing into remote servers
* Zsh
  * Basic config to implement quick alias
  * auto-suggestions
  * Nice, useful theme
* Desired additions
  * Vim
  * Iterm2

### Ongoing work info
* Tons of bookmarks
* Tmux book page 47
* Currently using downloaded zsh gmrl config and using .zshrc.local as my .zshrc
