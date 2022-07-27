export const resultMessage = (rightAnswers: number, countOfQuestions: number) => {
  const percentOfRight = (rightAnswers / countOfQuestions) * 100;

  switch (true) {
    case percentOfRight >= 80:
      return {
        textMessge: 'Да ты хорош!',
        emoji: '😎',
        color: '#10B981',
      };
    case percentOfRight >= 40:
      return {
        textMessge: 'Неплохо!',
        emoji: '🤓',
        color: '#FF6B00',
      };
    default:
      return {
        textMessge: 'Получится в другой раз!!',
        emoji: '😅',
        color: '#EF4444',
      };
  }
};
