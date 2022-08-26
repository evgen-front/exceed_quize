import { QuestionService } from 'api/services/QuestionService';
import { Question } from 'types';

export const updateQuestionAction = ({
  test_id,
  question_id,
  data,
}: {
  test_id: number;
  question_id: number;
  data: Question;
}) => QuestionService.updateQuestion(test_id, question_id, data);

export const createQuestionAction = ({
  test_id,
  data,
}: {
  test_id: number;
  data: Question;
}) => QuestionService.createNewQuestion(test_id, data);

export const createImageAction = ({
  test_id,
  question_id,
  data,
}: {
  test_id: number;
  question_id: number;
  data: any;
}) => QuestionService.createImage(test_id, question_id, data);

export const deleteImageAction = ({
  test_id,
  question_id,
}: {
  test_id: number;
  question_id: number;
}) => QuestionService.deleteImage(test_id, question_id);
