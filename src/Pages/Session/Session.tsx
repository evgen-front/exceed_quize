import { Button } from "antd"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Main } from "../../Layouts/MainView/Main"
import { answersMock } from "./mock"
import { AnswerItem, AnswerProps } from "./modules/AnswerItem/AnwerItem"
import randomColor from 'randomcolor'
import './Session.scss'

export const Session = () => {
  const { id } = useParams()
  const [selectedAnswer, setSelectedAnswer] = useState<null | AnswerProps>(null)


  let background = randomColor()



  return (
    <Main>
      <div className="sessionWrapper">
        <div className="session_backdrop" style={{ background }}></div>
        <div className="session_slide">
          <div className="session_slide-question">
            <img src="https://picsum.photos/220/190" alt="default" className="session_slide-question_img" />
            <div className="session_slide-question_text">
              question text of test {id}
            </div>
          </div>
          <div className="session_slide-answers">
            {answersMock.map((answer, index) => <AnswerItem key={answer.id} onSelect={() => setSelectedAnswer(answer)} selected={selectedAnswer?.id === answer.id} answer={answer} />)}
            <Button shape="round">next</Button>
          </div>
        </div>

      </div>
    </Main>
  )
}