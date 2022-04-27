import { Test } from "../../types/types"
import { TestListItem } from "../TestListItem/TestListItem"
import './testList.scss'
export const TestsList = ({ tests }: { tests: Test[] }) => {
    return <div className="testListWrapper">
        {tests.map((test, index) => <TestListItem key={`test_${index}`} test={test} />)}
    </div>
}