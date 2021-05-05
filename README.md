# Hector Huertas' .dotfiles

These are my personal configurations and the scripts to easily install them.

There are two projects in one: the management of the dotfiles themselves and the configuration of my environment.

**NOTE:** This project must be cloned so this README lives at ~/.dotfiles/README.md

<!-- vim-markdown-toc GFM -->

* [1. Dotfiles management](#1-dotfiles-management)
  * [Goals](#goals)
  * [Prerequisites](#prerequisites)
  * [Usage](#usage)
* [2. Personal configurations for utilities](#2-personal-configurations-for-utilities)
  * [Philosophy](#philosophy)
  * [To Do](#to-do)
    * [Features & utils](#features--utils)
    * [Better navigation/shortcuts](#better-navigationshortcuts)
    * [Better development](#better-development)
    * [Better UI](#better-ui)
      * [Color themes](#color-themes)
      * [Prompt info](#prompt-info)
      * [Nvim info](#nvim-info)
      * [Tmux navigation](#tmux-navigation)
    * [Better performance](#better-performance)
    * [SSH QoL](#ssh-qol)
  * [Known issues](#known-issues)
    * [Blink cursor to locate it](#blink-cursor-to-locate-it)
    * [Python](#python)
    * [Outdated kubernetes schemas](#outdated-kubernetes-schemas)
    * [Sign column](#sign-column)
    * [Alt-issue](#alt-issue)
    * [Non-xdg programs](#non-xdg-programs)
    * [Diffing setup](#diffing-setup)
    * [ZSH performance](#zsh-performance)
      * [kubectl completion](#kubectl-completion)
  * [Discarded](#discarded)
    * [Tmux: persistent sessions](#tmux-persistent-sessions)
    * [Tmux info display](#tmux-info-display)
    * [zsh plugins](#zsh-plugins)
    * [nvim plugins](#nvim-plugins)
  * [Shortcuts](#shortcuts)
    * [Window Manager Level](#window-manager-level)
      * [OS: macOS](#os-macos)
      * [Terminal: alacritty](#terminal-alacritty)
      * [Terminal multiplexer: tmux](#terminal-multiplexer-tmux)
    * [Application Level](#application-level)
      * [ZSH & NVIM](#zsh--nvim)
      * [ZSH only](#zsh-only)
      * [NVIM only](#nvim-only)

<!-- vim-markdown-toc -->

# 1. Dotfiles management

This project involves the management of the dotfiles and the utilities used to install and keep them in sync.

## Goals
* Super easy to install/update/sync
* Built by me
  * Understand every line, using comments
  * Production quality (nice UI, good errors, etc)
* Learn unix systems and proper shell scripting

## Prerequisites
* Encrypt hard drive (FireVault in OSX)
* Install every system update
* Install 'Command Line Tools' with: `$ xcode-select --install`
* Install brew from https://brew.sh/
* Make sure the project is cloned so this README lives at ~/.dotfiles/README.md

## Usage
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

# 2. Personal configurations for utilities

This project involves setting up a personal system environment by building awesome configurations for awesome UNIX utilities. The ultimate goal is having a productive system & workflow.

## Philosophy
* Focus on improving productivity
* Understand every line, using comments, don't copy blindly!
* Use only what I need, KISS

## To Do

* create an nvim shortcut for saving and quitting? I've realised that `:` is pretty annoying when quickly opening/closing files for inspection

### Features & utils
* Create a good setup with `oathtool`. Check my lastapss for sumologic

### Better navigation/shortcuts
* deletion (char, word, section(dividers other than space, line?) (backward and forward?)
* movement (char, word, section(dividers other than space, line?) (backward and forward)
* what to do with spaces before/after deletion/movement?
* fzf
  * fzf git explorer: bottom of https://bluz71.github.io/2018/11/26/fuzzy-finding-in-bash-with-fzf.html and https://github.com/junegunn/fzf/wiki/examples
  * fzf feeding command should detect if im inside an important folder (repo root?) and show all items inside the important command, not inside the folder where fzf is run
  * consider zdharma/history-search-multi-word
* Enable tmux working mouse mode: find out why selecting with double click or with drag selection acts weird/doesnt work with mouse mode on
* should I have default mouse movement and scroll while on chrome/slack/firefox? and then have some weird layer where I can actually input text? maybe besides search function?)
* combine vim/tmux navigation by using the same shorctus
  * https://github.com/christoomey/vim-tmux-navigator
  * https://gist.github.com/mislav/5189704
* have shorcut for flipping light/dark mode, and another for flipping side-by-side diffing in delta
* Review shorcuts in general, but specially in zsh prompt
  * Shortcut(OS: macOS): Mouse-locator: Ctrl-Space???
  * Shortcut(OS: macOS): Mouse movement: Karabiner (Enable with something like `right_.`)
    * Movement: e,s,d,f
    * left, middle, right buttons: j,k,l
    * slow down: `left_.`?
    * speed up: `;`?
    * maybe `right_..` and `right_...` could be scroll up/down in chrome?
  * Shortcut(OS: macOS): Global shortcuts (copy, paste, select all, undo...)
  * Shortcut(OS: macOS): Shortcuts made with karabiner/hammerspoon for graphical applications(like chrome)
  * Document, practice and ankify all shortcuts

### Better development
* list of targets: terraform, yaml, kubernetes, go, shell/zsh/bash, Dockerfile, json
* snippets
  * create one for mdl header
  * create one for printf debugging statements in go
  * stop using stock ones, and create used ones manually
  * potentially learn about snippet sessions and figure out when those should end (https://github.com/neoclide/coc-snippets/issues/161)
* autocomplete
  * go: gopls
  * kube: fix broken stern autocomplete (on shell)
* linting
* formatting
  * tf: `let g:terraform_align=1`?
* code coverage
  * go: on file via shortcut?
* auto-test
  * global: Tasker
  * go: `fswatch -o . -l 0.3 | xargs -n1 -I{} go test`
  * go: use --short flag to avoid integration tests

### Better UI
* inspiration: powerlevel10k, spaceshipt-prompt, gbt...)
* what information to display? (tmux,system bar, nvim bar, zsh...)
  * Create tmux widget to show if my ssh tunnels are up
  * https://github.com/gpakosz/.tmux (check features)
* how/where to display it? (colors, arrangement...)
  * extend color_theme to also change tmux and nvim color schemes (https://shuheikagawa.com/blog/2020/02/14/switching-colorschemes-of-vim-and-alacritty/)
  * syntax highlighting: custom rules? semantic rules?
  * Consider paid fonts
  * context-aware coloring (change colors based on kube env, git branch, dev/prod folder...)
* reconsider `zinit light denysdovhan/spaceship-prompt`
* load info on the prompt async from background jobs
* Visually show if I'm on a "prod" folder. Can't use pane background or tmux bar, so I need to figure out a good cue on the prompt (probably some red color while in a prod dir)

#### Color themes
* Make a script for changing dark/light themes, even if only with solarized, or maybe changing whatever to solarized-light, storing the orignal theme in a var
* Things left to style
  * bat
  * zdharma/fast-syntax-highlighting
  * nvim status bar
  * cmus
* Notable themes
  * base16
  * solarized/flattened
  * gruvbox
  * nord
  * dracula
  * tokio night
  * molokai

#### Prompt info
* git info?

#### Nvim info
* file name
* mode
* git info?
* consider https://github.com/itchyny/lightline.vim instad of airline

#### Tmux navigation
https://github.com/gpakosz/.tmux
* maximize pane in a new window (bind + run 'cut -c3- ~/.tmux.conf | sh -s _maximize_pane "#{session_name}" #D')
* open pane/window with fzf/fpp?

### Better performance
* profile and speed up alacritty, zsh, vim, plugins, etc
  * https://github.com/neoclide/coc.nvim/wiki/F.A.Q#how-could-i-profile-vim
* Review dotfiles checking that a program is installed before sourcing/autocompleting related things
* Use hamerspoon scripts to implement spectacle's functionality
* create an utility to count how many times a function is used (to figure out what I use and don't)

### SSH QoL
* Implement all shell functions and aliases via go commands, so it can be ported easily between mac/linux, zsh/fish/bash, ssh... Check how cfssl does to install several binaries at the same time, and use that to create small go binaries for utilities, to substitute zsh/modules
* Keep config when sshing into remote servers
* check how cfssl does to install several binaries at the same time, and use that to create small go binaries for utilities, to substitute zsh/modules

## Known issues
Long standing problems that are not actionable now

### Blink cursor to locate it
* alacritty blinking cursor will ship in 0.7. Ask for a "blink cursor" action to attach to a keybinding

### Python
It's a pain to manage, especially in macOS, so it'd be great to completely avoid it. Dependencies:
* ultrasnips via coc-snippets (find an alternative that integrates with coc-snippets)
* ansible to use in merit provisioning (dockerize?)

### Outdated kubernetes schemas
kubernetes schemas in coc-yaml are outdated and the source seems abandoned (https://github.com/instrumenta/kubernetes-json-schema/issues/26) (https://github.com/redhat-developer/yaml-language-server/issues/211)

### Sign column
Sign column is too wide, wastes space

Once Neovim 5 is out, use `set signcolumn=number`

### Alt-issue
Alacritty does not process option/alt/meta key properly, thus making it unusable for shortcuts. Issues in bookmarks as "#dotfiles #alacritty #alt-issue"

Once fixed, I should change "Command+<key> => Fn" bindings for "Command+<key> => Alt+<key>"

### Non-xdg programs
Many programs do not follow xdg specification, thus polluting my $HOME
* kube

### Diffing setup
There are 2 main tools for diffing: `git diff` and GNU's `diff`.
* `git diff` is more powerful, but the `--no-index` option doesn't support `exclude pathspec`, so I'd need to use `rg` to source the filenames that git diff should compare
* `diff -u` seems good enough, after feeding its output to a diff formatter

Diff formatting can be done by `delta` or `diff-so-fancy`. Going for `delta` for now, since it seems better and can emulate `diff-so-fancy` diffing.

### ZSH performance
To test zsh loading times, run:
* no config `for i in $(seq 1 10); do /usr/bin/time /bin/zsh -f -c 'exit'; done;`
* non-interactive `for i in $(seq 1 10); do /usr/bin/time /bin/zsh -c 'exit'; done;`
* interactive `for i in $(seq 1 10); do /usr/bin/time /bin/zsh -i -c 'exit'; done;`
* custom .zshrc `for i in $(seq 1 10); do /usr/bin/time /bin/zsh -c 'source ~/custom/.zshrc'; done;`

#### kubectl completion
Adding `source <(command kubectl completion zsh)` to shell init slows down the start ~1s. It seems to be related to compinit having to recompile every time, since it only caches completion files from disk, but I couldn't fix it, so now I'm lazy loading it.

In theory brew kubectl-cli installs zsh completions, but those don't seem to work, probably because it installs the output of `command kubectl completion zsh`, which is supposed to be sourced, and doesn't contain a `_kubecl` function.

Learning zsh completion and debugging and fixing the issue is not worth it vs lazy loading.

## Discarded

### Tmux: persistent sessions
After trying tmux-resurrect & tmux-continuum, I'm not happy with them, and I've realized that I do not need the feature. Instead, I should rely on scripts to open predefined tmux setups/sessions.

### Tmux info display
* Change zoomed display `Z` for `🔍`: `Z` is enough, and changes to `window-status-format` really slow down tmux since they are called once by window
* cpu, loadavg, memory, networking: complex to implement and not that useful, since I got those on the OS bar.
* session name: I don't use sessions for now
* git: too heavy for the tmux bar. this should live at an async prompt
* red color for "prod" panes. Not possible, can't color a specific pane, just the "active" one. And to dinamically re-style the active pane I'd need a way for a command to be run on each pane selection, and there's none. Also, running re-style commands on each status bar update produces a very noticeable blip on the screen & cursor

### zsh plugins
* Syntax highlighting:
  * zsh-users/zsh-syntax-highlighting: Highlight is a bit worse than zdharma's and loading speed is comparable
* Jumping around dirs: not that useful, prefer aliasing important dirs
  * clvv/fasd
  * rupa/z
* Themes:
  * denysdovhan/spaceship-prompt: pure feels snappier with async git

### nvim plugins
* markdown linters(vale+alex): it's such a pain, fires way too much and needs too much setup.

## Shortcuts
* Avoid uncomfortable shortcuts using the option/alt key or the Ctrl+Shift combination
* Avoid uncomfortable shortcuts using Ctrl + letters close to the Ctrl key

### Window Manager Level
Shorcuts driven by the `Command` key

#### OS: macOS
* Switch application: Hammerspoon (Cmd + <key>)
  * Itunes: I
  * Chrome: ;
  * Alacritty: M
  * Slack: O
* Window mangement: Spectacle (Cmd + Ctrl)
  * Vim keys: resize to proper side
  * F: Fullscreen
  * C: Center (has weird side effect, press ESC to exit it)
* Window management: macOS
  * Show Desktop: Cmd+Ctrl+D
  * Focus next window of the same program: `Command + ~`
  * Select next keyboard input source/language: Ctrl + Option + Space
  * Screenshots: Cmd+Shift+3/4
  * Spotlight launcher: Cmd + Space

#### Terminal: alacritty
Currently I'm not using any alacritty shortcuts

#### Terminal multiplexer: tmux
* Tmux Navigation  (Cmd + <key>)
  * Pane switching: H,L,K,J
  * Windows switching: N,P
* Tmux shorcuts (Prefix + key)
  * Resize pane: H,L,K,J
  * Create window: c,C
  * Split pane: `|,\,v,-/_,h`
  * Reload settings: r
  * Create session: S
  * List sessions: s
  * Reorganize panes: Space

### Application Level
Shorcuts driven by the `Command` key

#### ZSH & NVIM

#### ZSH only
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

#### NVIM only
* multicursor Ctrl+N
* autocomplete/snippets: Tab, Ctrl+j/k, Ctrl+h/l
* next-line no matter where: Ctrl+Enter
