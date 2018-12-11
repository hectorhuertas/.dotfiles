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
* Encrypt hard drive (FireVault in OSX)
* Install every system update
* Install 'Command Line Tools' with: `$ xcode-select --install`
* Install brew from https://brew.sh/
* Make sure the project is cloned so this README lives at ~/.dotfiles/README.md

### Usage
* Installing or updating configs:
  * Run `bin/brew.sh` to install basic utilities in macOs
  * Run `bin/setup.sh` to install personal configurations. Ideally this should be OS agnostic (not currently)
  * Run `bin/cron.sh` to setup cron jobs
* Making changes to existing configs:
  * Modify the desired file under ~/.dotfiles/dotfiles
  * Commit the changes to the github repository
* Adding new configurations:
  * Copy the new configuration file/s into ~/.dotfiles/dotfiles
  * Update setup.sh with the installation process

## #2 Personal configurations for utilities

This project involves setting up an awesome personal system environment by building awesome configurations for awesome UNIX utilities. The ultimate goal is having an amazing, ultra-productive system & workflow.

### Philosophy
* Focus on improving productivity
* Understand every line, using comments, don't copy blindly!
* Use only what I need, KISS

### To Do
##### High
##### Medium
* Find a good way to diff things, both git and non-git
  * Try to ditch `icdiff`, `colordiff`, `diff-so-fancy` and such
  * Explore `git difftool --tool-help`
* Shorcut improvements
  * Shorcuts for common folders like xdev, terraform, kube-manifests, dotfiles, .config, etc. Explore using CDPATH
  * Shorcut/aliases to better navigate envs in terraform/kube-manifests
  * Kubectl shortcuts for context and namespaces
  * fzf open nvim in a new pane/window (this done well can obsolete nvim file navigation) 
* vim-go is broken in 1.11. Dein seems hard to use, vim-plug could be easier and it's more used and supported by plugins
* UI improvements
  * Change fonts in terminal and nvim
  * Add powerlevel9k theme for zsh?
  * Different background colors for different machines / kube environments, ...
* Have an utility to list all `unsafe` things on my user: uncommited changes and non-master branches in $HOME and xdev repos
##### Low
* Set EDITOR variable
* Review dotfiles activating lines independently, to make sure I catch all dependencies (and remove the possible ones). Also star and follow all the things I use.
* Review dotfiles checking that a program is installed before sourcing/autocompleting related things
* Learn and understand zsh completions (https://iridakos.com/tutorials/2018/03/01/bash-programmable-completion-tutorial)
* Run zsh completions and other expensive commands asynchronously
* Reduce zsh startup time by using zprof (instructions in first lines of .zshrc). Consider exploring `zplug times` or dumping zplug for zgen or zim. Also try to reduce compinit times.
* Find out why this is being ingored in plugin zsh-syntax-highlighting: `HISTORY_SUBSTRING_SEARCH_HIGHLIGHT_FOUND='bg=magenta,fg=white,bold'`. It seems like another plugin is overriding the default behaviour. Or maybe it's some zsh keybinding in vi mode?
* If using alacritty terminfo, nvim cannot change cursor properly. nvim 0.3.2 will fix:
  * https://github.com/jwilm/alacritty/issues/1630#issuecomment-427570121
  * https://github.com/neovim/neovim/pull/9048
* Explore the options of plugin `zsh-autosuggestions` and check if they fixed the issues with v0.5.0 (https://github.com/zsh-users/zsh-autosuggestions/issues/398)
* Cleanup $HOME
  * Remove `.lesshst` and `.viminfo`
  * Set vars to avoid creation of `.bashrc` and `.bash_sessions`
  * When possible, remove `.kube`
* Tmux (`Prefix ?` to show predefined comands)
  * Install tmux terminfo and change the TERM variable
  * Persistent tmux sessions
  * Start tmux attached to the existing session, if there is one
  * Nice, useful theme/status bar
  * Keep config when sshing into remote servers
  * Enable working mouse mode: find out why selecting with double click or with drag selection acts weird/doesnt work with mouse mode on
  * Find out when in vi-mode some keys throw a weird output (like C-b or C-t, but not C-r or C-l)
  * Make it easy to open panes in same path
    * Open panes in the same path (e.g. `bind % split-window -h -c "#{pane_current_path}"`)
    * Make it super easy to copy the current path (shortcut for `pwd | tr -d '\n' | pbcopy`)
    * A combination of both, maybe running the shortcut command each time I split panes, so I can quickly cd into it if I want
* Create tmux widget to show if my ssh tunnels are up
* Implement all shell functions and aliases via go commands, so it can be ported easily between mac and linux and between zsh, fish or bash
* Try to move to fish shell, seems much faster than zsh
* Use hamerspoon scripts to implement spectacle's functionality
* Create a good setup with `oathtool`. Check my lastapss for sumologic
* Setup `tsocks` tool for use cases like using `siege` against our private graylog endpoint
* Get a command to momentarily highligh cursor. This needs to be done via Alacritty, since tmux or zsh can't do it well (there is a shell function in zsh/modules/unix.sh, but not very useful). Currently there is no way to do it, this will need opening an issue/PR
* Check all the bookmarks

### Shortcut system
In order to have a productive environment, efficient shortcuts are essential. Here are a few cosiderations about the shortcut system, a list of shortcuts living outside of this dotfiles and the global list of shortcuts.

#### Shorcut considerations
* Discouraged combinations
  * To avoid uncomfortable hand movements, avoid shortcuts using the option/alt key or the Ctrl+Shift combination
* OSX `Command` key in tmux
  * Using OSX `Command` key inside tmux is quite problematic. OSX has a lot of hidden shortcuts that, even when disabled, prevent the key combination to reach applications like Alacritty. To make things worse, tmux only allows `Ctrl` and `Meta` keys as modifier keys. Last but not least, Alacritty currently (0.2.4) does not have a default way of sending `Meta` modifier, requiring the user to set custom keybinding for that
  * To circumvent these issues, `Command` shortcuts inside tmux are defined as follows:
    * In karabiner-elements, use a custom complex modification to capture specific `Command + <key>` combinations and forward them as `Alt + <key>` only in Alacritty. This avoids triggering the OSX shortcuts. The complex modification needs to target specific shortcuts to avoid disabling other global shortcuts implemented with `Command`, like Spectacle or Hammerspoon ones
    * In Alacritty, enable `Alt + <key>` as `Meta + <key>` for those shortcuts. (https://github.com/jwilm/alacritty/issues/62)
    * In tmux config, use `Meta` as the key modifier for the desired shortcuts
* Loose list of shortcuts types
  * Desktop and window management (mission control and spectacle)
  * Global shortcuts (copy, paste, select all, undo...)
  * Set focus on specific application (and cycle thought windows?)
  * Move between panes of application
  * Tmux actions
  * Graphical application shortcuts
  * Terminal applications shortcuts

#### Implemented shortcuts outside of this dotfiles
* MacOs:
  * Show Desktop: Cmd+Ctrl+D
  * Focus next window of the same program: Cmd + `
  * Select next keyboard input source/language: Cmd + Space
  * Screenshots: Check mac shortcuts
  * Spotlight launcher: Cmd + Space
* Spectacle: (Cmd + Ctrl)
  * Vim keys: resize to proper side
  * F: Fullscreen
  * C: Center (has weird side effect, press ESC to exit it)

#### Dotfiles global shortcut list
* Switch application (Cmd + <key>)
  * Itunes: I
  * Chrome: ;
  * Alacritty: M
  * Slack: O
* Tmux focus navigation  (Cmd + <key>)
  * Pane switching: H,L,K,J
  * Windows switching: N,P
* Tmux shorcuts (Prefix + key)
  * Resize pane: H,L,K,J
  * Create window: c,C
  * Split pane: |,\,v,-,_,h
  * Reload settings: r
* ZSH (Ctrl + <key>)
  * Vi mode: ESC (no Ctrl)
  * History search: UP, DOWN
  * End of line: L
  * Forward word: E
  * Backward delete char: H
  * Backward delete word: W
  * Kill line: U
