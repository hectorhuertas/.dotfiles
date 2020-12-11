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
    * [Deliberate practice](#deliberate-practice)
    * [Better navigation/shortcuts](#better-navigationshortcuts)
    * [Better development](#better-development)
    * [Diffing setup](#diffing-setup)
    * [Better UI](#better-ui)
    * [Better performance](#better-performance)
    * [SSH QoL](#ssh-qol)
  * [Known issues](#known-issues)
    * [Blink cursor to locate it](#blink-cursor-to-locate-it)
    * [Python](#python)
    * [Outdated kubernetes schemas](#outdated-kubernetes-schemas)
    * [Sign column](#sign-column)
    * [Alt-issue](#alt-issue)
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
* Create a good setup with `oathtool`. Check my lastapss for sumologic
* Check all the bookmarks
* review all lines of the dotfiles, removing unused ones and documenting all the utilities/shortcuts (create an info util or use a text file??)
* make a list of available commands?? (r/reload_config in .zshrc + everything under `modules`)
* Cleanup $HOME
  * Remove `.lesshst` and `.viminfo`
  * Set vars to avoid creation of `.bashrc` and `.bash_sessions`
  * When possible, remove `.kube`
* Fix broken stern autocomplete

### Deliberate practice
* navigation (go to declarations with fzf?)
* multicursor
* autocomplete/snippets
* Insert dotfiles shortcuts and utilities into anki (from README and from modules)

### Better navigation/shortcuts
* deletion (char, word, section(dividers other than space, line?) (backward and forward?)
* movement (char, word, section(dividers other than space, line?) (backward and forward)
* what to do with spaces before/after deletion/movement?
* fzf
  * fzf git explorer: bottom of https://bluz71.github.io/2018/11/26/fuzzy-finding-in-bash-with-fzf.html and https://github.com/junegunn/fzf/wiki/examples
  * fzf feeding command should detect if im inside an important folder (repo root?) and show all items inside the important command, not inside the folder where fzf is run
* Review shorcuts in general, but specially in zsh prompt
* Enable tmux working mouse mode: find out why selecting with double click or with drag selection acts weird/doesnt work with mouse mode on
* should I have default mouse movement and scroll while on chrome/slack/firefox? and then have some weird layer where I can actually input text? maybe besides search function?)

* Shortcut(OS: macOS): Mouse-locator: Ctrl-Space???
* Shortcut(OS: macOS): Mouse movement: Karabiner (Enable with something like `right_.`)
  * Movement: e,s,d,f
  * left, middle, right buttons: j,k,l
  * slow down: `left_.`?
  * speed up: `;`?
  * maybe `right_..` and `right_...` could be scroll up/down in chrome?
* Shortcut(OS: macOS): Global shortcuts (copy, paste, select all, undo...)
* Shortcut(OS: macOS): Shortcuts made with karabiner/hammerspoon for graphical applications(like chrome)

### Better development
* list of targets: terraform, yaml, kubernetes, go, shell/zsh/bash, Dockerfile, json
* snippets
  * create one for mdl header
  * create one for printf debugging statements in go
  * stop using stock ones, and create used ones manually
  * potentially learn about snippet sessions and figure out when those should end (https://github.com/neoclide/coc-snippets/issues/161)
* autocomplete
  * go: gopls
* linting
* formatting
  * tf: `let g:terraform_align=1`?
* code coverage
  * go: on file via shortcut?
* auto-test
  * global: Tasker
  * go: `fswatch -o . -l 0.3 | xargs -n1 -I{} go test`
  * go: use --short flag to avoid integration tests

### Diffing setup
* Ideally, using `git diff` for everything will be great, but the `--no-index` option doesn't support `exclude pathspec`, so it's not usable for non-git comparisons
* Next best setup would be using `diff-so-fancy` as the diffing tool for both `git` and GNU `diff`. When writing this comment, `diff` support is not good enough. Review the `diff-so-fancy` releases and weight if it's ready to be the only diff highlighting tool
* Last option would be using `icdiff` instead of `diff`, and possibly as the `git` diffing tool. The main problems are that `icdiff` doesn't have an `--exclude` option yet and it's git diffing is horrible. Also, it's not as good/pretty as `diff-so-fancy`. Review `icdiff` releases and weight if it's ready to be the only diff highlighting tool
* Since there is no silver bullet (yet), I'm keeping a `zsh/modules/diff.sh` with different options

### Better UI
* inspiration: powerlevel10k, spaceshipt-prompt, gbt...)
* what information to display? (tmux,system bar, nvim bar, zsh...)
  * Create tmux widget to show if my ssh tunnels are up
* how/where to display it? (colors, arrangement...)
  * extend color_theme to also change tmux and nvim color schemes (https://shuheikagawa.com/blog/2020/02/14/switching-colorschemes-of-vim-and-alacritty/)
  * syntax highlighting: custom rules? semantic rules?
  * Consider paid fonts
  * context-aware coloring (change colors based on kube env, git branch, dev/prod folder...)

### Better performance
* profile and speed up alacritty, zsh, vim, plugins, etc
  * #dotfiles #zplug #startup
  * https://github.com/neoclide/coc.nvim/wiki/F.A.Q#how-could-i-profile-vim
  * https://github.com/romkatv/zsh-prompt-benchmark
* Review dotfiles checking that a program is installed before sourcing/autocompleting related things
* Learn and understand zsh completions (https://iridakos.com/tutorials/2018/03/01/bash-programmable-completion-tutorial)
* Run zsh completions and other expensive commands asynchronously
* Reduce zsh startup time by using zprof (instructions in first lines of .zshrc). Consider exploring `zplug times` or dumping zplug for zgen or zim. Also try to reduce compinit times.
* Find out why this is being ingored in plugin zsh-syntax-highlighting: `HISTORY_SUBSTRING_SEARCH_HIGHLIGHT_FOUND='bg=magenta,fg=white,bold'`. It seems like another plugin is overriding the default behaviour. Or maybe it's some zsh keybinding in vi mode?
* Explore the options of plugin `zsh-autosuggestions` and check if they fixed the issues with v0.5.0 (https://github.com/zsh-users/zsh-autosuggestions/issues/398)
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
