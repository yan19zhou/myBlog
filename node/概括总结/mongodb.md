##### NOSQL非关系型数据库
#### 增删改查
    -- json格式存储
    链接数据库-- 
    mongodb: 地址  默认端口 27017 
    // 查询所有数据库列表
    show dbs
    // 查询数据库表单
    use database
    show collections
    // 增加数据库
    use database
    db.table.insert({"key":value}) // 直接添加表单则也会同时添加数据库
    //删除数据库
    db.dropDatabase();
    // 删除表单
    db.table.drop();
    // 查询数据
    db.table.find();
    db.table.find({"name":"zhangsan"}) -- select * from table where name="zhangsan"
    db.table.find().limit(10).skip(10) // 从第十条开始查询十条，用于分页
    // 查询指定列 name age
    db.table.find({},{"name":1,"age":1})
    // 查询指定范围
    db.table.find({"age":{$gte:20,$lte26}}) //查询年纪大于等于20和小于等于26的数据
    //包含
    db.table.find({"name":/zh/}) // 查询name字段中包含zh的数据
    db.table.find({"name":/^zh/}) // 以zh开头的数据
    // 排序
    db.table.find().sort({"age":1}) // 1升序，-1降序
    // or查询
    db.table.find({$or:[{"name":"zhangsan"},{"name":"wusi"}]});
    //查询第一条
    db.table.findOne();
    //计数
    db.table.find().count();
    // 修改数据
    db.table.update({"name":"zhangsan"},{$set:{"age",28}}); // 查找name是zhangsan的这条数据，改age为28，去掉$set后为整条替换
    // 删除数据
    db.table.remove({"name":"zhangsan"});
#### 索引
    //添加索引
    db.table.ensureIndex({"name":1})// 给name列添加索引 1表示按升序存储，-1表示按照降序存储
    // 添加唯一索引
    db.table.ensureIndex({"name":1},{unique:true}) // 添加唯一索引的列的值必须唯一，比如id
    // 查询表单索引
    db.tabel.getIndexes();
    // 删除索引
    db.table.dropIndex({"name":1})
    // explain 用来使用的索引情况，耗时，和扫描文档数
     db.table.find().explain( "executionStats" ) // 查询文档耗时



    