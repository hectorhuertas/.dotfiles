#!/usr/bin/env bash

# Create a temporary workdir and trap its removal
workdir=$(mktemp -d -t code-backup-XXXXXXXXXX)
trap "rm -rf $workdir" EXIT
cd $workdir

echo "Starting backup..."
for repo in `cat ~/Dropbox/data/inventories/code.data`; do
  echo "... $repo"
  git clone --quiet git@github.com:$repo
  repo_name=$(ls -A)
  organization=${repo%"/$repo_name"}
  bundle_name="$organization=>$repo_name.git-bundle"

  git -C $repo_name bundle create --quiet "$(pwd)/$bundle_name" --all
  rclone copy "$bundle_name" pcloud:backup/code

  rm -rf "$bundle_name"
  rm -rf "$repo_name"
done
echo "Done!"
