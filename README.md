План запуска приложения:

1. `docker volume rm -f $(docker volume ls -q)`
    1. Опционально. Команда очищает текущие volume на случай коллизии в названиях

2. `docker compose up -d`
    1. Запуск приложения, дождаться раскатки

3. `docker-compose exec configSrv-1 sh -c "mongosh < /scripts/init-configserver.js"`
    1. Раскатываем конфиг сервер

4. `docker-compose exec shard1-a sh -c "mongosh < /scripts/init-shard01.js"`
5. `docker-compose exec shard2-a sh -c "mongosh < /scripts/init-shard02.js"`
    1. Раскатываем шарды. При ошибке коннекта необходимо повторить, они иногда не сразу инициилизируются

6. `docker-compose exec mongos_router sh -c "mongosh < /scripts/init-router.js"`
    1. Раскатываем роутер. Необходимо подождать секунд 30 перед запуском команды, пока нормально инициилизируются шарды и конфиг сервер

7. `docker-compose exec mongos_router mongosh`
   `use somedb`  
   `for(var i = 0; i < 3000; i++) db.helloDoc.insert({age:i, name:"ly"+i})`
   Заполняем данные в коллекции

После этих 7 пунктов приложение заработает и можно зайти в swagger
http://localhost:8080/docs#/default/list_users__collection_name__users_get
И проверять


Ссылка на схему:
https://drive.google.com/file/d/1ygmjrtspasgylVs3Fd7tM6RXTbymZnYQ/view?usp=sharing