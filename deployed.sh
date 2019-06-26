cd /home/git/vue-cli/
git pull origin master
npm install
npm run build
rm -rf /home/projects/web/dist/*
mv /home/git/vue-cli/dist/* /home/projects/web/
