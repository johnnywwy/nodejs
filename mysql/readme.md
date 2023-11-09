## Docker x Mysql

### 使用nodejs 连接docker mysql

```bash
docker run --name mysql -e MYSQL_ROOT_PASSWORD=123456 -p 3306:3306 -d mysql:8.0
```

> --name mysql：给容器命名为mysql，方便后续管理。 -e MYSQL_ROOT_PASSWORD=123456：设置环境变量MYSQL_ROOT_PASSWORD的值为123456，用于设置mysql的root用户密码。
>
>  -d：以后台守护模式运行容器，即容器在后台运行，输出日志信息到stdout。
>
> mysql:8.0：指定镜像名称为mysql，版本为8.0。

### 查看docker

```
docker ps
```

进入容器

```
docker exec -it <name> bash
```

进入 mysql

```
 mysql -u root -p
```

然后输入密码 123456



显示数据库`show databases`

```
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.00 sec)
```



```

```

