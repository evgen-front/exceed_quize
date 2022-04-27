import { Test } from "../../types/types"
import { TestListItem } from "../TestListItem/TestListItem"

export const TestsList = ({ tests }: { tests: Test[] }) => {
    return <div className="testsListWrapper">
        <p>1</p>
        {tests.map((test, index) => <TestListItem key={`test_${index}`} test={test} />)}
    </div>
}