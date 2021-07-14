scriptencoding utf-8

set number
set nolist " waiting for a proper color theme to set to 'list'
set listchars=tab:>·,eol:¬



set termguicolors

" Default indentation
set expandtab
set shiftwidth=2
set softtabstop=2
set tabstop=2

" Create an augroup for my autocommmands
augroup hector
    autocmd!
augroup

" Disable unused default mappings
"
" default mappings can be checked at `:help index`
imap <C-a> <Nop>
" <C-b> doesn't seem to exist
imap <C-c> <Nop>
imap <C-d> <Nop>
imap <C-e> <Nop>
" <C-f> is disabled by default
imap <C-g> <Nop>
imap <C-h> <Nop>
imap <C-i> <Nop>
imap <C-j> <Nop>
imap <C-k> <Nop>
" <C-l> is disabled by default
imap <C-n> <Nop>
imap <C-p> <Nop>
imap <C-q> <Nop>
" <C-s> is reserved for terminal control flow
imap <C-t> <Nop>
imap <C-x> <Nop>
imap <C-y> <Nop>
" <C-z> is disabled by default
imap <C-Space> <Nop>
imap <C-Enter> <Nop>
imap <S-Enter> <Nop>

" Keep used default mappings
"
" <C-m> this is the same as <Enter>/<CR>
" <C-o> execute a command and return to insert mode
" <C-r> used for registers operations
" <C-u> delete all chars before cursor
" <C-v> literal insert mode(https://unix.stackexchange.com/questions/366869/what-does-ctrlv-do-in-vim)
" <C-w> delete word before cursor
" All the rest of Ctrl + Symbol, since I don't plan on using them

" Custom mappings
"
" Go to beginning of next line in insert mode
imap <C-Enter> <C-o>o
" Disable command history
nnoremap q: <Nop>
" Disable search history
nnoremap q/ <Nop>
nnoremap q? <Nop>
" Disable Ex mode
nnoremap Q <Nop>

" Go files
autocmd hector FileType go set noexpandtab
autocmd hector FileType go set shiftwidth=4
autocmd hector FileType go set softtabstop=4
autocmd hector FileType go set tabstop=4

" Transparent backgrounds so tmux "inactive panes" are noticeable
autocmd hector ColorScheme * hi Normal ctermbg=None guibg=None

" Vim-Go settings
let g:go_highlight_build_constraints = 1
let g:go_highlight_extra_types = 1
let g:go_highlight_fields = 1
let g:go_highlight_functions = 1
let g:go_highlight_methods = 1
let g:go_highlight_operators = 1
let g:go_highlight_structs = 1
let g:go_highlight_types = 1
let g:go_fmt_command = 'goimports'

" ALE settings
"
" terraform linters didn't worked well
let g:ale_fix_on_save = 1
let g:ale_disable_lsp = 1
let g:ale_completion_enabled = 0
let g:ale_lint_delay = 1000
let g:ale_sign_error = '●'
let g:ale_sign_warning = '.'
let g:ale_linters = {
\   'markdown': [],
\   'javascript': ['eslint'],
\   'json': ['jsonlint'],
\   'terraform': [],
\   'sh': ['shellcheck'],
\   'vim': ['vint','ale_custom_linting_rules'],
\   'yaml': ['yamllint'],
\}
let g:ale_fixers = {
\   '*': ['remove_trailing_lines', 'trim_whitespace'],
\   'markdown': [],
\   'javascript': ['eslint'],
\   'json': ['prettier'],
\   'terraform': ['terraform'],
\   'sh': ['shfmt'],
\   'vim': [],
\   'yaml': ['prettier'],
\}

" Location of explorer history
let g:netrw_home='~/.cache/vim'

" CoC settings
set hidden "recommended by CoC
let g:coc_global_extensions = [
\   'coc-emmet',
\   'coc-eslint',
\   'coc-highlight',
\   'coc-json',
\   'coc-pairs',
\   'coc-prettier',
\   'coc-snippets',
\   'coc-tsserver',
\   'coc-yaml',
\]

" Completion Key mappings
"
" Use <Tab> to trigger completion
inoremap <expr> <Tab> pumvisible() ? "\<C-y>" : "\<Tab>"
" Use <C-j> & <C-k> to navigate completions
inoremap <expr> <C-j> pumvisible() ? "\<C-n>" : "\<C-j>"
inoremap <expr> <C-k> pumvisible() ? "\<C-p>" : "\<C-k>"
" Use <C-l> & <C-h> to navigate snippet placeholders
let g:coc_snippet_next = '<C-l>'
let g:coc_snippet_prev = '<C-h>'

" Vim-plug plugin manager setup
call plug#begin('~/.local/share/nvim/plugged')
  " Make sure you use single quotes
  Plug 'fatih/vim-go', { 'do': ':GoInstallBinaries' }
  Plug 'hashivim/vim-terraform'
  Plug 'mzlogin/vim-markdown-toc'
  Plug 'dracula/vim', { 'as': 'dracula' }
  Plug 'romainl/flattened'
  Plug 'tpope/vim-commentary' "alternative: 'preservim/nerdcommenter'
  Plug 'dense-analysis/ale'
  Plug 'vim-airline/vim-airline'
  Plug 'airblade/vim-gitgutter'
  Plug 'neoclide/coc.nvim', {'branch': 'release'}
  Plug 'honza/vim-snippets'
  Plug 'mg979/vim-visual-multi', {'branch': 'master'}
  Plug 'mattn/emmet-vim'
call plug#end()

" Parse comments in jsonc files
autocmd hector FileType json syntax match Comment +\/\/.\+$+

" Enable fold with syntax, but disable by default
set foldmethod=syntax
set foldlevel=99

" Treat .yaml.tmpl files as yaml (used in prometheus)
autocmd hector BufRead *.yaml.tmpl set syntax=yaml

" Always show the sign column, to avoid annoyance on showing/hiding
set signcolumn=yes:1

" Uses the system clipboard instead of the default '""' one
set clipboard^=unnamed
" Remap x to yank to the _ register instead of the default one
noremap x "_x

"Set the theme
runtime current-theme.vim

" Use italic for comments
"
" In vim the line would look like: `highlight Comment cterm=italic`
" but neovim needs `gui` instead of `cterm` when termguicolors is enabled
" https://github.com/neovim/neovim/issues/13188
"
" Also, putting it at the bottom to override themes
highlight Comment gui=italic

" Experiment to transparently edit age encrypted files
"
" http://www.softpanorama.org/Editors/Vimorama/vim_piping.shtml
" https://vi.stackexchange.com/questions/22675/how-to-chain-shell-command-with-vim-ex-command
" For now allow swp files, since I only care about encrypted at the cloud, but
" should be an option maybe, if I make this into a proper plugin
autocmd hector BufReadPost,FileReadPost *.age %!age -d -i ~/.config/age/keys.txt
autocmd hector BufWritePre,FileWritePre *.age %!age --encrypt --armor -R ~/.config/age/recipients.txt
autocmd hector BufWritePost,FileWritePost *.age %!age -d -i ~/.config/age/keys.txt
