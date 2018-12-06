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
  * Run `bin/cron.sh` to setup cron jobs
* Making changes to exiting configs:
  * Modify the desired file under ~/.dotfiles/dotfiles
  * Commit the changes to the github repository
* Adding new configurations:
  * Copy the new configuration file/s into ~/.dotfiles/dotfiles
  * Update setup.sh with the installation process

## #2 Personal configurations for utilities

This project involves setting up an awesome personal system environment by building awesome configurations for awesome UNIX utilities.

The ultimate goal is having an amazing, ultra-productive system & workflow

### Philosophy
* Focus on improving productivity
* Understand every line, using comments, don't copy blindly!
* Use only what I need, KISS

### To Do
* vim-go is broken. Dein seems hard to use, vim-plug could be easier and it's more used and supported by plugins
* Check all the bookmarks
* Autostart tmux session with same window group
* Instalar nuevo alacritty (cuando hayan binarios estables, y ojala brew cask). Incluir terminfo.
  * Install tmux terminfo and change the TERM variable
* Tmux (`Prefix ?` to show predefined comands)
  * Install tmux terminfo and change the TERM variable
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
  * Make it easy to open panes in same path
    * Open panes in the same path (e.g. `bind % split-window -h -c "#{pane_current_path}"`)
    * Make it super easy to copy the current path (shorcut for `pwd | tr -d '\n' | pbcopy`)
    * A combination of both, maybe running the shorcut command each time I split panes, so I can quickly cd into it if I want
* Shell
  * Try to move to fish shell, seems much faster than zsh
  * Implement all shell functions and aliases via go commands, so it can be ported easily between mac and linux and between zsh, fish or bash
* Zsh
  * Reduce startup time by using zprof (instructions in first lines of .zshrc). Consider
    exploring `zplug times` or dumping zplug for zgen or zim. Also try to reduce
    compinit times.
  * Explore using CDPATH
  * Basic config to implement quick alias
  * Explore the options of gplugin `zsh-autosuggestions` and check if they fixed the issues with v0.5.0 (https://github.com/zsh-users/zsh-autosuggestions/issues/398)
  * Nice, useful theme
  * Find out why this is being ingored in plugin zsh-syntax-highlighting: `HISTORY_SUBSTRING_SEARCH_HIGHLIGHT_FOUND='bg=magenta,fg=white,bold'`. It seems like another plugin is overriding the default behaviour. Or maybe it's some zsh keybinding in vi mode?
  * Reorganize the way elements are sourced (maybe source a folder and put alike things inside? Like an aliases folder and inside different files for different programs?)
  * Check that a program is installed before sourcing/autocompleting related things
  * Make sure zsh history works as intended, as well as `nohup` and `nonotify` options
  * Try to implement XDG variables to move most of the configurations to .config folder
  * Improve the keybindigs, specially for going to the beginning and end of line. Like: `[[ -z "$terminfo[khome]" ]] || bindkey -M emacs "$terminfo[khome]" beginning-of-line`
* Desired additions
  * fzf
  * powerlevel9k theme for zsh?
* Use hamerspoon scripts to implement spectacle's functionality
* Git
  * Create a prompt indication to let me know when I'm in a dirty master
  * Explore `git difftool --tool-help`
* AWS
  * How to create keypair locally and upload them and get the fingerprints
  * Create the keypair using `ssh-keygen -t rsa -b 2048 -C "peter@jander.io"`. It's also possible using openssl, but then i need to find which formats the output should be. If using ssh-keygen, explore how to pass all the options (no passphrase and set output files path and names)
  * Get the AWS fingerprints using `openssl pkey -in /path/to/key -pubout -outform DER | openssl md5 -c`
  * Check https://serverfault.com/questions/603982/why-does-my-openssh-key-fingerprint-not-match-the-aws-ec2-console-keypair-finger
  * Include aws cli command to upload the public key to amazon, and afterwards check the fingerprint is correct
* Other
  * Create a good setup with `oathtool`. Check lastapss for sumologic
  * Setup `tsocks` tool for use cases like using `siege` against our private graylog endpoint

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
