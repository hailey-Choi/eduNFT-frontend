function Answer(props) {
    return (
        <div
            className="bg-gray-900 dark:bg-gray-100 h-16 w-auto mb-4 rounded-md flex items-center"
            onClick={() => props.onClick(props.answer)}
        >
            <input
                type="radio"
                name="answer"
                value={props.answer}
                className="ml-5 dark:bg-gray-100"
            />
            <label className="text-gray-200 dark:text-gray-500 text-lg ml-4">
                {props.answer}
            </label>
        </div>
    )
}

function AnswerCard(props) {
    return (
        <div className="my-5">
            {props.answers.map((answer) => (
                <Answer key={answer} answer={answer} onClick={props.onClick} />
            ))}
        </div>
    )
}

export default AnswerCard
