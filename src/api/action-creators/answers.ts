import { AnswerService } from 'api/services/AnswerService';
import { SessionService } from 'api/services/SessionService';
import { Answer } from 'types';

export const updateAnswerAction = ({
  question_id,
  answer_id,
  data,
}: {
  question_id: number;
  answer_id: number;
  data: Answer;
}) => AnswerService.updateAnswer(question_id, answer_id, data);

export const deleteAnswerAction = ({
  question_id,
  answer_id,
}: {
  question_id: number;
  answer_id: number;
}) => AnswerService.deleteAnswer(question_id, answer_id);

export const createAnswerAction = ({
  question_id,
  data,
}: {
  question_id: number;
  data: Answer;
}) => AnswerService.createNewAnswer(question_id, data);

export const createUserAnswerAction = ({
  session_id,
  answer_id,
}: {
  session_id: number;
  answer_id: number;
}) => SessionService.createUserAnswer(session_id, { answer_id });
