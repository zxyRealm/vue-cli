JenKins 自动部署

```shell
pipeline {
	agent { docker 'node:10.12.0' }
    stages {
        stage('Build') {
            steps {
                bat 'set'
                sh 'git reset --hard origin/test'
                sh 'npm install'
                sh 'npm run build:test'
                sh 'copy dist'
            }
        }
    }
}
```



