import { LogoutOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { AuthService } from '../../../../services/AuthService'
import './ProfileHeader.scss'

export const ProfileHeader = () => {
    const _navigate = useNavigate()

    const logout = () => {
        AuthService.logout()
        _navigate('/')
    }
    return <div className="profileHeader">
        <h1>Страница профиля</h1>
        <Button onClick={logout} type="primary" shape="round" icon={<LogoutOutlined />} />
    </div>
}