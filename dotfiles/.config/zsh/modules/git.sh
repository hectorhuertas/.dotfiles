git_current_branch() {
  echo $(git rev-parse --abbrev-ref HEAD)
}

git_push_origin() {
  git push --set-upstream origin "$(git_current_branch)";
}

git_merge_master() {
  current=$(git_current_branch);
  git checkout master;
  git pull;
  git checkout "$current";
  git merge master;
}

git_rebase_master() {
  current=$(git_current_branch);
  git checkout master;
  git pull;
  git checkout "$current";
  git rebase master;
}

alias gs='git status'
alias gss='git status -s'
alias ga='git add -A'
alias gpl='git pull'
alias gp='git_push_origin'
alias gc='git commit -m'
alias gco='git checkout'
alias gcm='git checkout master'
alias gb='git branch'
alias gbd='git branch -D'
alias gd='git diff'
alias gdc='git diff --cached'
alias gl='git log --graph --pretty=format:"%Cred%h %Creset- %s%C(yellow)%d %Cgreen(%cd) %C(bold blue)<%an>" --date=relative -5'
alias gll='git log --graph --pretty=format:"%Cred%h %Creset- %s%C(yellow)%d %Cgreen(%cd) %C(bold blue)<%an>" --date=short'
alias glf='git log --pretty=format:"%Cred%h %Creset- %s%C(yellow)%d %Cgreen(%cd) %C(bold blue)<%an>" --date=short --numstat -5'
alias gmm='git_merge_master'
alias grm='git_rebase_master'
