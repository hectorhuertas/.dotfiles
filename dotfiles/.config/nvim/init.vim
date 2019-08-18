set number
set nolist " waiting for a proper color theme to set to 'list'
set listchars=tab:>·,eol:¬

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
let g:go_def_mode='gopls'
let g:go_metalinter_autosave = 1
let g:go_metalinter_command='golangci-lint'
let g:go_auto_type_info = 1

" Vim-Terraform settings
let g:terraform_fmt_on_save = 1

" Location of explorer history
let g:netrw_home="~/.cache/vim"

" Vim-plug plugin manager setup
call plug#begin('~/.local/share/nvim/plugged')
  " Make sure you use single quotes
  Plug 'fatih/vim-go', { 'do': ':GoInstallBinaries' }
  Plug 'hashivim/vim-terraform'
  Plug 'neoclide/coc.nvim', {'do': { -> coc#util#install()}}
call plug#end()

" coc.vim setup
let g:coc_global_extensions = [
	\ 'coc-css',
	\ 'coc-highlight',
	\ 'coc-html',
	\ 'coc-json',
	\ 'coc-snippets'
\ ]

inoremap <expr> <Tab> pumvisible() ? "\<C-n>" : "\<Tab>"
inoremap <expr> <S-Tab> pumvisible() ? "\<C-p>" : "\<S-Tab>"
inoremap <expr> <cr> pumvisible() ? "\<C-y>" : "\<C-g>u\<CR>"
" Use <C-l> for trigger snippet expand.
imap <C-l> <Plug>(coc-snippets-expand)

" Use <C-j> for select text for visual placeholder of snippet.
vmap <C-j> <Plug>(coc-snippets-select)

" Use <C-j> for jump to next placeholder, it's default of coc.nvim
let g:coc_snippet_next = '<c-j>'

" Use <C-k> for jump to previous placeholder, it's default of coc.nvim
let g:coc_snippet_prev = '<c-k>'


" Parse comments in jsonc files
autocmd FileType json syntax match Comment +\/\/.\+$+

" Uses the system clipboard instead of the default '""' one
set clipboard^=unnamed
" Remap x to yank to the _ register instead of the default one
noremap x "_x
