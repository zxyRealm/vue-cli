cd /home/git/vue-cli/
git fetch --all
git reset --hard origin/master
sudo npm install
npm run build
if [ $? -eq 0 ]
then
rm -rf /home/projects/web/dist/*
cp -R /home/git/vue-cli/dist/ /home/projects/web/ -f
fi