import { colors } from 'consts';

export const resultMessage = (rightAnswers: number, countOfQuestions: number) => {
  const percentOfRight = (rightAnswers / countOfQuestions) * 100;

  switch (true) {
    case percentOfRight >= 80:
      return {
        textMessge: 'Да ты хорош!',
        emoji: '😎',
        color: colors.GREEN,
      };
    case percentOfRight >= 40:
      return {
        textMessge: 'Неплохо!',
        emoji: '🤓',
        color: colors.PRIMARY,
      };
    default:
      return {
        textMessge: 'Получится в другой раз!!',
        emoji: '😅',
        color: colors.DANGER,
      };
  }
};
