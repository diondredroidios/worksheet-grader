import Calculator from "./Calculator";
import Grade from "./Grade";

class Grader {
    static grade(question) {
        if (question.inputValue === undefined || question.inputUnit === undefined || question.targetValue === undefined || question.targetUnit === undefined) {
            throw new Error(`Question is not ready to grade.`)
        }

        // try calculate correct value
        let correctValue = undefined
        try {
            correctValue = Calculator.convertValueAndUnitTo(question.inputValue, question.inputUnit, question.targetUnit)
        } catch (error) {
            // invalid input
            console.warn("Error grading", error)
            return { grade: Grade.invalid, correctValue }
        }

        // check student's answer
        let studentAnswerNumber = Number(question.targetValue)
        if (Number.isNaN(studentAnswerNumber)) {
            throw new Error(`Target value ${question.targetValue} is not a number`)
        }
        let studentAnswerString = studentAnswerNumber.toFixed(1)

        let correctValueString = correctValue.toFixed(1)

        if (studentAnswerString !== correctValueString) {
            return { grade: Grade.incorrect, correctValue }
        }

        // correct answer
        return { grade: Grade.correct, correctValue }
    }
}

export default Grader;