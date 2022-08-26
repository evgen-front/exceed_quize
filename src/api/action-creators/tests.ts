import { TestService } from 'api/services/TestService';
import { NewTestDataType, TestResponse } from 'types';

export const createTestAction = ({
  currentTest,
}: {
  currentTest: TestResponse | NewTestDataType;
}) => TestService.createTest(currentTest);

export const updateTestAction = ({
  test_id,
  currentTest,
}: {
  test_id: number;
  currentTest: TestResponse | NewTestDataType;
}) => TestService.updateTest(test_id, currentTest);
