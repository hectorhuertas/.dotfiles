function anki_backup() {
  backup_location="$HOME/Dropbox/data/anki_backups"
  filename="$(date '+%Y-%m-%d@%H:%M:%S')_anki_backup.tar.gz"
  collection_location="$HOME/Library/Application Support/Anki2"

  # Make sure that anki is not running
  grepping=$(ps aux | grep '/Applications/Anki' | grep -v 'grep')
  if [[ $grepping != "" ]]; then
    echo "\033[0;31mERROR: Anki is running!\033[0m"
    exit 1
  fi

  # Backup collection in a new file
  mkdir -p $backup_location
  tar -zcf "$backup_location/$filename" "$collection_location" 2> /dev/null
  if [[ ! -f "$backup_location/$filename" ]]; then
    echo "\033[0;31mERROR: failed to create backup file\033[0m"
    exit 1
  fi

  # Delete older backup
  while [[ $(ls -1 $backup_location | wc -l) > 3 ]]; do
    rm "$backup_location/$(ls -t $backup_location | tail -1)"
  done
}
