# Disable cron mails
crontab -l | grep 'MAILTO=""' || (crontab -l 2>/dev/null; echo 'MAILTO=""') | crontab -
# Remove unwanted docker folder
crontab -l | grep "* * * * * rm -rf ~/.docker" || (crontab -l 2>/dev/null; echo "* * * * * rm -rf ~/.docker") | crontab -
# Remove all .DS_Store files
crontab -l | grep "* * * * * find ~ -name '.DS_Store' -type f -delete" || (crontab -l 2>/dev/null; echo "* * * * * find ~ -name '.DS_Store' -type f -delete") | crontab -
# Remove bash files
crontab -l | grep "* * * * * rm -rf ~/.bash_sessions; rm ~/.bash_history" || (crontab -l 2>/dev/null; echo "* * * * * rm -rf ~/.bash_sessions; rm ~/.bash_history") | crontab -
# Remove lesshist file
crontab -l | grep "* * * * * rm ~/.lesshst" || (crontab -l 2>/dev/null; echo "* * * * * rm ~/.lesshst") | crontab -
