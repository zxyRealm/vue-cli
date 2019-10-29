## 								nginx 服务启用与配置

### vue项目nginx配置

​	由于nginx 安装的方式不同，其配置文件的位置可能会不同，如果是编译后的nginx安装包，一般在 conf 文件夹下，此文件夹下一般包含以下内容,  docker 安装的话，一般在 `/etc/nginx` 文件夹下。

```shell
conf.d  fastcgi_params  koi-utf  koi-win  mime.types  modules  nginx.conf  scgi_params  uwsgi_params  win-utf
```

以上文件中我们需要修改的是 `nginx.conf` 文件，以下是示例模板

```shell
user  root;
worker_processes  auto;

error_log  /var/log/nginx/error.log warn;
# pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

   # log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
   #                  '$status $body_bytes_sent "$http_referer" '
   #                 '"$http_user_agent" "$http_x_forwarded_for"';

    # access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    # include /etc/nginx/conf.d/*.conf;
    server {
        listen       80;
        server_name  localhost;
        root         /root/web/dist1;
        location / {
            try_files $uri $uri/ /index.html;
            index index.html index.htm;
        }
        
        error_page  404         /index.html;
        # 接口代理配置； 最大body_size配置，大文件上传需要添加此项，否则上传请求会失败
        location /api/ {
           proxy_pass           http://localhost:8000/;
           proxy_redirect       http://localhost:8000/api/ /;
           client_max_body_size 2g;
	 }
    }
}

```

