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

" Vim-Terraform settings
let g:terraform_fmt_on_save = 1

" Location of explorer history
let g:netrw_home="~/.cache/vim"

" Vim-plug plugin manager setup
call plug#begin('~/.local/share/nvim/plugged')
  " Make sure you use single quotes
  Plug 'fatih/vim-go', { 'do': ':GoInstallBinaries' }
  Plug 'hashivim/vim-terraform'
  Plug 'mzlogin/vim-markdown-toc'
call plug#end()

" Parse comments in jsonc files
autocmd FileType json syntax match Comment +\/\/.\+$+

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
