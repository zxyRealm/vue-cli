SITE_PATH='/home/projects/web/'
USER='www'
USER_GROUP='www'

cd /home/git/vue-cli/
git fetch --all
git reset --hard origin/master
sudo npm install
npm run build
if [ $? -eq 0 ]
then
chown -R $USER:$USER_GROUP $SITE_PATH
rm -rf /home/projects/web/dist/*
cp -R /home/git/vue-cli/dist/ /home/projects/web/ -f
else
 echo 'npm run build failed'
fi