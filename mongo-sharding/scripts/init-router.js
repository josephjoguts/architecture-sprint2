sh.addShard("shard1/shard1:27017")
sh.addShard("shard2/shard2:27017")
sh.enableSharding("somedb")
sh.shardCollection("somedb.helloDoc", { "name" : "hashed" } )