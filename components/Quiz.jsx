import { useState } from 'react'
import AnswerCard from '../components/AnswerCard'
import questions from '../questions.json'

export default function Quiz(props) {
    let index = null
    let question_list = null
    if (props.questionType == 'ai') {
        index = Math.floor(Math.random() * questions.ai.length)
        question_list = questions.ai
    } else if (props.questionType == 'nft') {
        index = Math.floor(Math.random() * questions.nft.length)
        question_list = questions.nft
    }
    const [randomIndex, _] = useState(index)

    const question = question_list[randomIndex].question
    const answers = question_list[randomIndex].answers
    const correctAnswer = question_list[randomIndex].correctAnswer

    return (
        <div className="pt-6 pb-2 mx-5">
            <p className="font-bold text-xl mb-2">Quiz</p>
            <p>{question}</p>
            <div>
                <AnswerCard
                    answers={answers}
                    onClick={(answer) => {
                        answer == correctAnswer
                            ? props.onClick(true)
                            : props.onClick(false)
                    }}
                />
            </div>
        </div>
    )
}
