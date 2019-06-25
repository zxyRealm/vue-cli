cd /home/git/vue-cli/
git pull origin master
npm run build
rm -rf /home/projects/web/dist/*
mv /home/git/vue-cli/dist/* /home/projects/web/
