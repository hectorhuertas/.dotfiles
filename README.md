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
  * Create the new configuration file/s inside ~/.dotfiles/dotfiles
  * Update setup.sh with the installation process for the new file

## #2 Personal configurations for utilities

This project involves setting up a personal system environment by building awesome configurations for awesome UNIX utilities. The ultimate goal is having a productive system & workflow.

### Philosophy
* Focus on improving productivity
* Understand every line, using comments, don't copy blindly!
* Use only what I need, KISS

### To Do
##### High
##### Medium
* ripgrep shorcuts for hidden/unhidden/ follow/nofollow, ignore/not ignore??
* kubectl
  * have a "raw" kubectl without shorcuts or protection, and without cutting the first lines
  * usar kubectl --no-headers (en lugar de cortar la primera linea)
  * change `unsafeKube` for a better name
  * kubectl ... -ojsonpath --template={.status.podIP}
* Improve go coding (some experiments in coc branch)
  * gopls + https://github.com/neoclide/coc.nvim or deoplete
  * autocomplete on tab (go,kubernetes? bash? dockerfile?)
  * snippets shortcuts for expand and jump with tab/s-tab
  * linting and fmt on save (go,json,yaml,kubernetes?,bash?,dockerfile?)
  * code coverage on file via shorcut
  * better color setup
  * command for running tests (* Add `fswatch -o . -l 0.3 | xargs -n1 -I{} go test` somewhere)
  * create a list of tactics to learn
    * navigation (go to declarations with fzf?)
    * multicursor
    * autocomplete
    * snippets (printf for debugging!!)
    * use --short flag to avoid integration tests
* Colors
  * Just need to play with alacritty colors. Changing them already affects neovim
  * May want to change nvim syntax highlighting for the files I'm not happy with
  * There are color testing utilities in `bin`
##### Low
* UI improvements
  * Consider paid fonts
  * Setup useful widgets for shell prompt and tmux bar. Inspiration: powerlevel9k, spaceshipt-prompt, gbt...
  * Add context-aware color highlighting. Change tmux/alacritty colors based on folder, env vars, git branch... Useful to detect production environments, pushing to master...
* Have an utility to list all `unsafe` things on my user: uncommited changes and non-master branches in $HOME and xdev repos
* fzf git explorer: bottom of https://bluz71.github.io/2018/11/26/fuzzy-finding-in-bash-with-fzf.html and https://github.com/junegunn/fzf/wiki/examples
* fzf feeding command should detect if im inside an important folder (repo root?) and show all items inside the important command, not inside the folder where fzf is run
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
  * Duplicate tmux window
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
* Fix broken stern autocomplete
* Review diffing setup
  * Ideally, using `git diff` for everything will be great, but the `--no-index` option doesn't support `exclude pathspec`, so it's not usable for non-git comparisons
  * Next best setup would be using `diff-so-fancy` as the diffing tool for both `git` and GNU `diff`. When writing this comment, `diff` support is not good enough. Review the `diff-so-fancy` releases and weight if it's ready to be the only diff highlighting tool
  * Last option would be using `icdiff` instead of `diff`, and possibly as the `git` diffing tool. The main problems are that `icdiff` doesn't have an `--exclude` option yet and it's git diffing is horrible. Also, it's not as good/pretty as `diff-so-fancy`. Review `icdiff` releases and weight if it's ready to be the only diff highlighting tool
  * Since there is no silver bullet (yet), I'm keeping a `zsh/modules/diff.sh` with different options
* Get a command to momentarily highlight cursor. This needs to be done via Alacritty, since tmux or zsh can't do it well (there is a shell function in zsh/modules/unix.sh, but not very useful). Currently there is no way to do it, this will need opening an issue/PR
* Check all the bookmarks
* #osx-command-shortcuts-issue
  * Using OSX `Command` key inside tmux is quite problematic. OSX has a lot of hidden shortcuts that, even when disabled, prevent the key combination to reach applications like Alacritty. To make things worse, tmux only allows `Ctrl` and `Meta` keys as modifier keys. Last but not least, Alacritty currently (0.2.4) does not have a default way of sending `Meta` modifier, requiring the user to set custom keybinding for that
  * To circumvent these issues, `Command` shortcuts inside tmux are defined as follows:
    * In karabiner-elements, use a custom complex modification to capture specific `Command + <key>` combinations and forward them as `Alt + <key>` only in Alacritty. This avoids triggering the OSX shortcuts. The complex modification needs to target specific shortcuts to avoid disabling other global shortcuts implemented with `Command`, like Spectacle or Hammerspoon ones
    * In Alacritty, enable `Alt + <key>` as `Meta + <key>` for those shortcuts. (https://github.com/jwilm/alacritty/issues/62)
    * In tmux config, use `Meta` as the key modifier for the desired shortcuts
* consider adding `let g:terraform_align=1` to nvim.init
* make a list of available commands?? (r/reload_config in .zshrc + everything under `modules`)
* add running `:%!jq .` on nvim save when file is json (https://stackoverflow.com/questions/26214156/how-to-auto-format-json-on-save-in-vim)
* Review shorcuts in general, but specially in zsh prompt
* create an utility to count how many times a function is used (to figure out what I use and don't)
* check how cfssl does to install several binaries at the same time, and use that to create small go binaries for utilities, to substitute zsh/modules
* Insert dotfiles shortcuts and utilities into anki (from README and from modules)

### Shortcuts system
In order to have a productive environment, efficient shortcuts are essential. Here are a few cosiderations about the shortcut system, a list of shortcuts living outside of this dotfiles and the global list of shortcuts.

#### Shortcut ToDo
* osx has some `Command` options that can't be disabled (like Cmd+H to hide an app). In order to use `Command` for shortcuts, i need to use karabiner-elements to capture `Command` strokes and transform them into another key (Alt/Option) and then set the shorcuts using the (Alt/Option) modifier for now, I'm only using this technique for alacritty, so i use a custom "complex modification" (that btw i think breaks somethign and many times writes `~` when using some unknown commands)
* alacritty needs to explitily enable any key combinations so need to explicitely add any shortcuts that need to be passed to tmux???
* should I have default mouse movement and scroll while on chrome/slack/firefox? and then have some weird layer where I can actually input text? maybe besides search function?)


#### Shorcuts considerations
* Avoid uncomfortable shortcuts using the option/alt key or the Ctrl+Shift combination
* check #osx-command-shorctus-issue task in To Do
* Loose list of shortcuts types
  * Desktop and window management (mission control and spectacle)
  * Global shortcuts (copy, paste, select all, undo...)
  * Set focus on specific application (and cycle thought windows?)
  * Move between panes of application
  * Tmux actions
  * Graphical application shortcuts
  * Terminal applications shortcuts

#### Shortcuts implemented outside of this dotfiles
* MacOs:
  * Show Desktop: Cmd+Ctrl+D
  * Focus next window of the same program: Cmd + `
  * Select next keyboard input source/language: Ctrl + Option + Space
  * Screenshots: check mac shortcuts
  * Spotlight launcher: Cmd + Space
* Spectacle: (Cmd + Ctrl)
  * Vim keys: resize to proper side
  * F: Fullscreen
  * C: Center (has weird side effect, press ESC to exit it)

#### Dotfiles global shortcuts list
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
  * History search: UP, DOWN, K, J
  * End of line: L
  * Forward word: E
  * Backward delete char: H
  * Backward delete word: W
  * Kill line: U
  * Insert fzf file into command line: P (still valid? defined where?)
  * Insert fzf folder into command line: O (still valid? defined where?)
* Mouse movement (Enable with something like `right_.`)
  * Movement: e,s,d,f
  * left, middle, right buttons: j,k,l
  * slow down: `left_.`?
  * speed up: `;`?
  * maybe `right_..` and `right_...` could be scroll up/down in chrome?
