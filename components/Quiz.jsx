import { useState } from 'react'
import AnswerCard from '../components/AnswerCard'
import questions from '../questions.json'

export default function Quiz(props) {
    const [randomIndex, _] = useState(
        Math.floor(Math.random() * questions.nft.length),
    )
    const question = questions.nft[randomIndex].question
    const answers = questions.nft[randomIndex].answers
    const correctAnswer = questions.nft[randomIndex].correctAnswer

    return (
        <div className="pt-6 pb-2 mx-5">
            <p className="font-bold text-3xl mb-2">Quiz</p>
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
