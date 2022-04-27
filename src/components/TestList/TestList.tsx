import { Test } from "../../types/types";
import { TestListItem } from "../TestListItem/TestListItem";
import "./testList.scss";
export const TestsList = ({
  tests,
  maxHeight = "100%",
}: {
  tests: Test[];
  maxHeight?: string;
}) => {
  return (
    <div className="testListWrapper" style={{ maxHeight }}>
      {tests.map((test, index) => (
        <TestListItem key={`test_${index}`} test={test} />
      ))}
    </div>
  );
};
