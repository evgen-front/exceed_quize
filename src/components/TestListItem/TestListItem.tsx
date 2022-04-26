import { EditTwoTone, PlayCircleTwoTone } from "@ant-design/icons";
import { Test } from "../../types/types";




export const TestListItem = ({ test }: { test: Test }) => {
    return <div className="testListItem">
        <p>{test.title}</p>
        <PlayCircleTwoTone />
        <EditTwoTone />
    </div>
}
