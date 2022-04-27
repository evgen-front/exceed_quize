import { NavLink } from "react-router-dom"

export const EmptyStartedTests = () => {
    return <div className="testListItem">
        <span className="testListItem_announce">вы пока не начали ни один тест</span>
        <NavLink to='/home' className={'testListItem_announce'}>найти тест</NavLink>
    </div>
}