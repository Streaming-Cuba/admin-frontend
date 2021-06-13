cd /home/streaming/apps/admin-frontend
sudo git pull https://github.com/Streaming-Cuba/admin-frontend.git -s recursive -X theirs
yarn --ignore-engines
pm2 restart admin-frontend