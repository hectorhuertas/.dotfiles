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
* Colorize output & errors?

## #2 Personal configurations for utilities

This project involves setting up an awesome personal system environment by building awesome configurations for awesome UNIX utilities.

The ultimate goal is having an amazing, ultra-productive system & workflow

### Philosophy
* Focus on improving productivity
* Understand every line, using comments, don't copy blindly!
* Use only what I need, KISS


### To Do
* Check all the bookmarks
* Tmux (`Prefix ?` to show predefined comands)o
  * Persistent tmux sessions
  * Nice, useful theme/status bar
  * Keep config when sshing into remote servers
  * Being able to scroll the buffer using hjkl
  * Using comand line with hjkl
    * Go to start/end of line
    * Move one work back /forth
  * Different background colors for different machines / kube environments, ...
  * Understand why C-b doesnt work as prefix
  * Find out if C-f x2 works in applications like vim, htop or others (this is testing sending the prefix)
  * Find out why default-terminal "tmux-256color" is problematic in iterm2
  * Find out why selecting with double click or with drag selection acts weird/doesnt work with mouse mode on
  * Find out when in vi-mode some keys throw a weird output (like C-b or C-t, but not C-r or C-l)
  * Move deactivated options to its own section (and include other things not used from the book, like pane starting at 1 (page 39))
  * Give more time to keep pressing the repeatable actions, like moving through windows or resizing
* Zsh
  * Basic config to implement quick alias
  * auto-suggestions
  * Nice, useful theme
  * Reorganize the way elements are sourced (maybe source a folder and put alike things inside? Like an aliases folder and inside different files for different programs?)
  * Check that a program is installed before sourcing/autocompleting related things
* Desired additions
  * Vim
  * Iterm2
* macOs
  * Create shortcuts to bring to the front the browser, tmux, browser and atom (maybe slack and evernote?)
