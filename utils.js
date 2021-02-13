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
  idIsNotValid: 'Невалидный ID',
  emptyFieldError: 'Данное поле не должно быть пустым',
  requireFieldError: 'Данное поле является обязательным',
  notEnoughData: 'Данное поле содержит недостаточно символов',
  tooMuchData: 'Количество символов в данном поле превышает допустимое значение',
  notANumber: 'Данное поле должно быть положительным числом',
  tooBigNumber: 'Значение этого поля превышает максимально допустимое',
};

module.exports = errorMessages;
