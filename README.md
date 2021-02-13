Реализация бекэнда для проекта movies-explorer

**Адрес, по которому доступен API**
####https://api.myvideobookmark.com/

### Команды
Локальный запуск с hot-reload
`npm run dev`
Локальный запуск
`npm start`

### Endpoints
- **POST /signup** создаёт пользователя с переданными в теле: email, password и name
- **POST /signin** проверяет переданные в теле почту и пароль и возвращает JWT
- **GET /users/me** возвращает информацию о пользователе (email и имя)
- **PUT /users/me** обновляет информацию о пользователе (email и имя)
- **GET /movies** возвращает все сохранённые пользователем фильмы
- **POST /movies** создаёт фильм с переданными в теле:
  movieId, country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail
- **DELETE /movies/_id** удаляет сохранённый фильм по _id
  

###Логирование
- **request.log**, чтобы хранить информацию о всех запросах к API;
- **error.log**, чтобы хранить информацию об ошибках, которые возвращает API.

### Ratelimit
Настроен ratelimit
- не более 20 запросов в минуту с одного IP
- не более 5 аккаунтов в час с одного IP
