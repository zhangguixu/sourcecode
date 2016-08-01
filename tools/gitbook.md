# gitbook

## 概述

Gitbook 是一款利于git及markdown快速构建在线书籍的工具。官网是 www.gitbook.com 。其实Gitbook自身也是一个提供书籍在线发布的平台。

由于自带的在线编辑器由于网络的原因，编辑更改不是很方便，建议是搭建本地的环境

## 搭建本地环境

步骤1：安装gitbook-cli

gitbook-cli 是gitbook的命令行操作工具，它封装了一系列的命令，包括书籍初始化、预览、构建等等操作。

```shell
npm -g install gitbook-cli
```

步骤2：创建一个github repo

步骤3：clone到本地

```shell
git clone YOUR_REPO_URL
cd YOUR_REPO_FOLDER
```

因为gitbook的服务器在国外，所以可能需要设置代理

```shell
git config --global http.proxy http://proxy.xxx.xx:port
```

其实就是一个git项目，没什么特别的
