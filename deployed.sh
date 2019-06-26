SITE_PATH='/home/projects/web/'
USER='www'
USER_GROUP='www'

cd /home/git/vue-cli/
git pull origin master
npm install
npm run build
chown -R $USER:$USER_GROUP $SITE_PATH
rm -rf /home/projects/web/dist/*
mv /home/git/vue-cli/dist/* /home/projects/web/
