set number
set nolist " waiting for a proper color theme to set to 'list'
set listchars=tab:>·,eol:¬

set termguicolors

" Default indentation
set expandtab
set shiftwidth=2
set softtabstop=2
set tabstop=2

" Go files
autocmd FileType go set noexpandtab
autocmd FileType go set shiftwidth=4
autocmd FileType go set softtabstop=4
autocmd FileType go set tabstop=4

" Vim-Go settings
let g:go_highlight_build_constraints = 1
let g:go_highlight_extra_types = 1
let g:go_highlight_fields = 1
let g:go_highlight_functions = 1
let g:go_highlight_methods = 1
let g:go_highlight_operators = 1
let g:go_highlight_structs = 1
let g:go_highlight_types = 1
let g:go_fmt_command = "goimports"

" ALE settings
"
" terraform linters didn't worked well
let g:ale_fix_on_save = 1
let g:ale_disable_lsp = 1
let g:ale_completion_enabled = 0
let g:ale_lint_delay = 1000
let g:ale_sign_error = '●'
let g:ale_sign_warning = '~'
let g:ale_linters = {
\   'json': ['jsonlint'],
\   'terraform': [''],
\   'sh': ['shellcheck'],
\   'yaml': ['yamllint'],
\}
let g:ale_fixers = {
\   '*': ['remove_trailing_lines', 'trim_whitespace'],
\   'json': ['prettier'],
\   'terraform': ['terraform'],
\   'sh': ['shfmt'],
\   'yaml': ['prettier'],
\}

" Location of explorer history
let g:netrw_home="~/.cache/vim"

" Vim-plug plugin manager setup
call plug#begin('~/.local/share/nvim/plugged')
  " Make sure you use single quotes
  Plug 'fatih/vim-go', { 'do': ':GoInstallBinaries' }
  Plug 'hashivim/vim-terraform'
  Plug 'mzlogin/vim-markdown-toc'
  Plug 'dracula/vim', { 'as': 'dracula' }
  Plug 'tpope/vim-commentary' "alternative: 'preservim/nerdcommenter'
  Plug 'dense-analysis/ale'
call plug#end()
colorscheme dracula

" Parse comments in jsonc files
autocmd FileType json syntax match Comment +\/\/.\+$+

" Enable fold with syntax, but disable by default
set foldmethod=syntax
set foldlevel=99

" Treat .yaml.tmpl files as yaml (used in prometheus)
autocmd BufRead *.yaml.tmpl set syntax=yaml

" Always show the sign column, to avoid annoyance on showing/hiding
set signcolumn=yes

" Uses the system clipboard instead of the default '""' one
set clipboard^=unnamed
" Remap x to yank to the _ register instead of the default one
noremap x "_x

" Use italic for comments
"
" In vim the line would look like: `highlight Comment cterm=italic`
" but neovim needs `gui` instead of `cterm` when termguicolors is enabled
" https://github.com/neovim/neovim/issues/13188
"
" Also, putting it at the bottom to override themes
highlight Comment gui=italic
