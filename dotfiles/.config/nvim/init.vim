set number
set nolist " waiting for a proper color theme to set to 'list'
set listchars=tab:>·,eol:¬

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
let g:go_auto_sameids = 1
let g:go_fmt_command = "goimports"

" Vim-Terraform settings
let g:terraform_fmt_on_save = 1

" Location of explorer history
let g:netrw_home="~/.cache/vim"

" Dein plugin manager setup
set runtimepath+=~/.cache/vim/dein/repos/github.com/Shougo/dein.vim " path to dein.vim

if dein#load_state(expand('~/.cache/vim/dein'))
  call dein#begin(expand('~/.cache/vim/dein'))
  call dein#add('Shougo/dein.vim')

  call dein#add('fatih/vim-go')
  call dein#add('hashivim/vim-terraform')
  call dein#add('junegunn/fzf', { 'build': './install --all', 'merged': 0 })
  call dein#add('junegunn/fzf.vim', { 'depends': 'fzf' })
  " call dein#add('Shougo/deoplete.nvim')

  if !has('nvim')
    call dein#add('roxma/nvim-yarp')
    call dein#add('roxma/vim-hug-neovim-rpc')
  endif

  call dein#end()
  call dein#save_state()
endif

filetype plugin indent on
syntax enable

" Uses the system clipboard instead of the default '""' one
set clipboard^=unnamed
" Remap x to yank to the _ register instead of the default one
noremap x "_x
