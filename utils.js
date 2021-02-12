const errorMessages = {
  authError: 'Ошибка авторизации',
  passwordError: 'Поле "password" должно содержать не менее 8 символов',
  serverError: 'На сервере произошла ошибка',
  notFoundError: 'Запрашиваемый ресурс не найден',
  dataError: 'Ошибка в данных или валидации',
  emailError: 'Пользователь с таким email уже зарегистрирован',
  forbiddenError: 'Нет прав на эту операцию',
  urlInvalid: 'Данное поле должно быть валидным url-адресом',
  emailInvalid: 'Неправильный формат адреса электронной почты',
  credentialsError: 'Неправильные почта или пароль',
  tooManyRequests: 'Превышено допустимое количество запросов',
};

module.exports = errorMessages;
