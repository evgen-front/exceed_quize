import './infoBlock.scss'

interface InfoBlockProps {
    title: string;
    subtitle: string
}

export const InfoBlock = ({ title, subtitle }: InfoBlockProps) => {
    return <div className="infoBlock">
        <h3>{title}</h3>
        <span>{subtitle}</span>
    </div>
}