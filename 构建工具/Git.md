1.初始化一个 Git 仓库，使用 git init 命令。

2.添加文件到 Git 仓库，分两步：

    第一步，使用命令git add <file>，注意，可反复多次使用，添加多个文件；
    第二步，使用命令git commit -m "提交说明"，完成。

3. 要随时掌握工作区的状态，使用 git status 命令。

4. 如果 git status 告诉你有文件被修改过，用 git diff 可以查看修改内容。

5. HEAD 指向的版本就是当前版本，因此，Git 允许我们在版本的历史之间穿梭，使用命令 git reset --hard commit_id。
   //git reset --hard HEAD^返回上版本

6. 穿梭前，用 git log 可以查看提交历史，以便确定要回退到哪个版本。

7. 要重返未来，用 git reflog 查看命令历史，以便确定要回到未来的哪个版本。

**工作区(working directory)--add--缓存区(stage)--commit--分支(master)
**每次修改，如果不 add 到暂存区，那就不会加入到 commit 中。

8.撤回修改的内容

    场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令git checkout -- file。

    场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令git reset HEAD file，就回到了场景1，第二步按场景1操作。

    场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。

9.删除文件
git checkout 其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。
git rm 用于删除一个文件。如果一个文件已经被提交到版本库，那么你永远不用担心误删，但是要小心，你只能恢复文件到最新版本，
你会丢失最近一次提交后你修改的内容。 10.使用 github 远程仓库

    第1步：创建SSH Key。在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有id_rsa和id_rsa.pub这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key：

    $ ssh-keygen -t rsa -C "youremail@example.com"

    你需要把邮件地址换成你自己的邮件地址，然后一路回车，使用默认值即可，由于这个Key也不是用于军事目的，所以也无需设置密码。

    如果一切顺利的话，可以在用户主目录里找到.ssh目录，里面有id_rsa和id_rsa.pub两个文件，这两个就是SSH Key的秘钥对，id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人。

    第2步：登陆GitHub，打开“Account settings”，“SSH Keys”页面：

    然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容：

11.要关联一个远程库，使用命令 git remote add origin https://github.com/yan19zhou/zhoustore.git(github库地址)
关联后，使用命令 git push -u origin master 第一次推送 master 分支的所有内容；
此后，每次本地提交后，只要有必要，就可以使用命令 git push origin master 推送最新修改；

12.要克隆一个仓库，首先必须知道仓库的地址，然后使用 git clone 命令克隆。$ git clone git@github.com:michaelliao/gitskills.git
Git 支持多种协议，包括 https，但通过 ssh 支持的原生 git://,使用 ssh 协议速度最快。

13.Git 使用分支：
查看分支：git branch
创建分支：git branch <name>
切换分支：git checkout <name>
创建+切换分支：git checkout -b <name>
合并某分支到当前分支：git merge <name>
删除分支：git branch -d <name>
ps:当 Git 无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。
\*\*用 git log --graph 命令可以看到分支合并图。

    在实际开发中，我们应该按照几个基本原则进行分支管理：

    首先，master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；
    那在哪干活呢？干活都在dev分支上，也就是说，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，在master分支发布1.0版本；
    你和你的小伙伴们每个人都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以了。

    小结
    Git分支十分强大，在团队开发中应该充分应用。
    合并分支时，加上--no-ff参数就可以用普通模式合并$ git merge --no-ff -m "merged bug fix 101" issue-101，
    合并后的历史有分支，能看出来曾经做过合并，而fast forward合并就看不
    出来曾经做过合并。

    bug管理
    	修复bug时，我们会通过创建新的bug分支进行修复，然后合并，最后删除；
    	当手头工作没有完成时，先把工作现场git stash一下，然后去修复bug，
    	修复后，再git stash pop(恢复的同时把stash也删除掉)，回到工作现场。
    	可以使用git stash list命令查看stash的工作现场

14.开发一个新 feature，最好新建一个分支；
如果要丢弃一个没有被合并过的分支，可以通过 git branch -D <name>强行删除。

15.多人协作
查看远程库信息，使用 git remote -v；

    本地新建的分支如果不推送到远程，对其他人就是不可见的；

    从本地推送分支，首先使用git push origin branch-name，如果推送失败，则因为远程分支比你的本地更新，先用git pull抓取远程的新提交；

    如果合并有冲突，则解决冲突，并在本地提交；没有冲突或者解决掉冲突后，再用git push origin branch-name推送就能成功！

    在本地创建和远程分支对应的分支，使用git checkout -b branch-name origin/branch-name，本地和远程分支的名称最好一致；

    如果git pull提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，

    建立本地分支和远程分支的关联，使用git branch --set-upstream branch-name origin/branch-name；

    ps：从远程抓取分支，使用git pull，如果有冲突，要先处理冲突。


16.标签：
命令 git tag <name>用于新建一个标签，默认为 HEAD，也可以指定一个 commit id；git tag <name> commit_id

    git tag -a <tagname> -m "blablabla..."可以指定标签信息；

    git tag -s <tagname> -m "blablabla..."可以用PGP签名标签；

    命令git tag可以查看所有标签。

    命令git push origin <tagname>可以推送一个本地标签；

    命令git push origin --tags可以推送全部未推送过的本地标签；

    命令git tag -d <tagname>可以删除一个本地标签；

    命令git push origin :refs/tags/<tagname>可以删除一个远程标签。

16. github 使用：

    在 GitHub 上，可以任意 Fork 开源仓库；

    自己拥有 Fork 后的仓库的读写权限；克隆到本地，在本来更改代码之后推送到 github 仓库

    可以在 github 中推送 pull request 给官方仓库来贡献代码。

17.使用码云
git remote -v 查看远程库信息：
git 给远程库起的默认名称是 origin，如果有多个远程库，我们需要用不同的名称来标识不同的远程库。
仍然以 learngit 本地库为例，我们先删除已关联的名为 origin 的远程库：
git remote rm origin
然后，先关联 GitHub 的远程库：
git remote add github git@github.com:michaelliao/learngit.git
注意，远程库的名称叫 github，不叫 origin 了。
接着，再关联码云的远程库：
git remote add gitee git@gitee.com:liaoxuefeng/learngit.git
同样注意，远程库的名称叫 gitee，不叫 origin。

18. 忽略特殊文件 gitignore
    在 Git 工作区的根目录下创建一个特殊的.gitignore 文件，然后把要忽略的文件名填进去，Git 就会自动忽略这些文件。
    有些时候，你想添加一个文件到 Git，但发现添加不了，原因是这个文件被.gitignore 忽略了：
    如果你确实想添加该文件，可以用-f 强制添加到 Git：

    $ git add -f App.class

    或者你发现，可能是.gitignore 写得有问题，需要找出来到底哪个规则写错了，可以用 git check-ignore 命令检查：
    $ git check-ignore -v App.class
    .gitignore:3:\*.class App.class
    Git 会告诉我们，.gitignore 的第 3 行规则忽略了该文件，于是我们就可以知道应该修订哪个规则。

19. 别名 alias
    git config --global alias.别名 原名 也可以在用户里 gitconfig 中配置

20.搭建 Git 服务器:
搭建 Git 服务器需要准备一台运行 Linux 的机器，强烈推荐用 Ubuntu 或 Debian，这样，通过几条简单的 apt 命令就可以完成安装。

    	假设你已经有sudo权限的用户账号，下面，正式开始安装。

    	第一步，安装git：

    	$ sudo apt-get install git

    	第二步，创建一个git用户，用来运行git服务：

    	$ sudo adduser git

    	第三步，创建证书登录：

    	收集所有需要登录的用户的公钥，就是他们自己的id_rsa.pub文件，把所有公钥导入到/home/git/.ssh/authorized_keys文件里，一行一个。

    	第四步，初始化Git仓库：

    	先选定一个目录作为Git仓库，假定是/srv/sample.git，在/srv目录下输入命令：

    	$ sudo git init --bare sample.git

    	Git就会创建一个裸仓库，裸仓库没有工作区，因为服务器上的Git仓库纯粹是为了共享，所以不让用户直接登录到服务器上去改工作区，并且服务器上的Git仓库通常都以.git结尾。然后，把owner改为git：

    	$ sudo chown -R git:git sample.git

    	第五步，禁用shell登录：

    	出于安全考虑，第二步创建的git用户不允许登录shell，这可以通过编辑/etc/passwd文件完成。找到类似下面的一行：

    	git:x:1001:1001:,,,:/home/git:/bin/bash

    	改为：

    	git:x:1001:1001:,,,:/home/git:/usr/bin/git-shell

    	这样，git用户可以正常通过ssh使用git，但无法登录shell，因为我们为git用户指定的git-shell每次一登录就自动退出。

    	第六步，克隆远程仓库：

    	现在，可以通过git clone命令克隆远程仓库了，在各自的电脑上运行：

    	$ git clone git@server:/srv/sample.git
    	Cloning into 'sample'...
    	warning: You appear to have cloned an empty repository.

    	剩下的推送就简单了。
    	管理公钥

    	如果团队很小，把每个人的公钥收集起来放到服务器的/home/git/.ssh/authorized_keys文件里就是可行的。如果团队有几百号人，就没法这么玩了，这时，可以用Gitosis来管理公钥。




