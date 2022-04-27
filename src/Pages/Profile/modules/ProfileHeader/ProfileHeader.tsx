import { LogoutOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import './ProfileHeader.scss'

export const ProfileHeader = () => {

    const logout = () => {

    }
    return <div className="profileHeader">
        <h1>Страница профиля</h1>
        <Button onClick={logout} type="primary" shape="round" icon={<LogoutOutlined />} />
    </div>
}