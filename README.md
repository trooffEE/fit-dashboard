### Инициализация бота
  1. - /start
    - передаем ссылку пользователя прохождения регистрации [example](https://app.com/?telegramTag=@userTag)
    - человек вводит пароль и отправляет его
    - вернуть человека в чат (ссылка на чат ботом)
  2. - Какую статиску вы хотите собирать?
    - Калории
    - Сон
    - Тренировки
    * Если выбран сон или калории - уточнить время оповещения для каждого из них
    * Если выбран тренировка - то кидается ссылка на веб-морду, где ты настриваешь тренировку
    
### Флоу работы
#### В основе работы бользователя, взаимодействие с тг-ботом
  #### - Каждый день человеку необходимо ответить на вопросы бота за прошедший день
    * - "Сколько ты спал?"
    * - "Сколько ты ел?" (либо калории, либо блюда)

  #### - Бот имеет фунционал "начал тренировку"
    * - После окончания тренировки бот отправляет ссылку, пеерходя по которой человек может заполнять
        информацию о своей тренировке (время тренировки, упраженения - повторения, подходы и тип упражнения)
        $ - поискать апиху, в которой может быть инфорамация о пользе тренировки
        $ - поискать апиху, которая дает список упражнений

  #### - Функицонал посмотреть продвинутую статику (переход на веб-морду)