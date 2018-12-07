# Disable cron mails
crontab -l | grep 'MAILTO=""' || (crontab -l 2>/dev/null; echo 'MAILTO=""') | crontab -
# Remove unwanted docker folder
crontab -l | grep '* * * * * rm -rf ~/.docker' || (crontab -l 2>/dev/null; echo "* * * * * rm -rf ~/.docker") | crontab -
# Remove all .DS_Store files
crontab -l | grep "* * * * * find ~ -name '.DS_Store' -type f -delete" || (crontab -l 2>/dev/null; echo "* * * * * find ~ -name '.DS_Store' -type f -delete") | crontab -
