import { Test } from "../../types/types";
import { TestListItem } from "../TestListItem/TestListItem";
import "./testList.scss";

export const TestsList = ({
  tests,
  maxHeight,
}: {
  tests: Test[];
  maxHeight?: string;
}) => {
  return (
    <div className="testListWrapper" style={{ maxHeight }}>
      {tests &&
        tests.map((test, index) => (
          <TestListItem key={`test_${index}`} test={test} />
        ))}
    </div>
  );
};
