import Grader from "./Grader";

class Question {
    quantity = undefined

    inputValue = undefined
    inputUnit = undefined

    targetValue = undefined
    targetUnit = undefined

    correctAnswer = undefined

    get grade() {
        try {
            let { grade, correctValue } = Grader.grade(this)
            this.correctAnswer = correctValue
            return grade
        } catch (error) {
            return null
        }
    }
}

export default Question