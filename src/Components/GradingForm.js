import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Quantity from '../Calculator/Quantity';
import Question from '../Calculator/Question';
import UnitSelect from './UnitSelect';
import Grade from '../Calculator/Grade';

export default class GradingForm extends Component {
    state = {
        questions: []
    }

    addVolumeQuestion() {
        this.addQuestion(Quantity.volume)
    }

    addTemperatureQuestion() {
        this.addQuestion(Quantity.temperature)
    }

    addQuestion(quantity) {
        let question = new Question()
        question.quantity = quantity
        this.setState(prevState => {
            let questions = prevState.questions
            questions.push(question)
            return { questions }
        })
    }

    setInputValueFor(value, question) {
        this.setPropertyAndValueForQuestion('inputValue', value, question)
    }

    setInputUnitFor(unit, question) {
        this.setPropertyAndValueForQuestion('inputUnit', unit, question)
    }

    setTargetUnitFor(unit, question) {
        this.setPropertyAndValueForQuestion('targetUnit', unit, question)
    }

    setTargetValueFor(value, question) {
        this.setPropertyAndValueForQuestion('targetValue', value, question)
    }

    setPropertyAndValueForQuestion(propertyName, value, question) {
        // console.log("setPropertyAndValueForQuestion", propertyName, value, question)
        this.setState(prevState => {
            let questions = prevState.questions
            let index = questions.indexOf(question)
            questions[index][propertyName] = value
            return { questions }
        })
    }

    deleteQuestion(question) {
        this.setState(prevState => {
            let questions = prevState.questions
            let index = questions.indexOf(question)
            questions.splice(index, 1)
            return { questions }
        })
    }

    render() {
        return (
            <div>
                {/* heading */}
                <h1 className="mt-5">Worksheet</h1>
                <p className="lead mb-3">Correct answers: {this.state.questions.filter(question => question.grade === Grade.correct).length}/{this.state.questions.length}</p>

                {/* table */}
                <Table>
                    <thead>
                        <tr>
                            <th>Input value</th>
                            <th>Input unit</th>
                            <th>Target unit</th>
                            <th>Student answer</th>
                            <th>Result</th>
                            <th>Correct anwer</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.questions.map((question, i) =>
                            <tr key={i}>
                                <td>
                                    <Form.Control
                                        type="text"
                                        placeholder="0.00"
                                        value={question.inputValue === undefined ? "" : question.inputValue}
                                        onChange={event => this.setInputValueFor(event.target.value, question)} />
                                </td>
                                <td>
                                    <UnitSelect unit={question.inputUnit} quantity={question.quantity} onChange={unit => this.setInputUnitFor(unit, question)} />
                                </td>
                                <td>
                                    <UnitSelect unit={question.targetUnit} quantity={question.quantity} onChange={unit => this.setTargetUnitFor(unit, question)} />
                                </td>
                                <td>
                                    <Form.Control
                                        type="text"
                                        placeholder="0.00"
                                        value={question.targetValue === undefined ? "" : question.targetValue}
                                        onChange={event => this.setTargetValueFor(event.target.value, question)} />
                                </td>
                                <td className="align-middle">
                                    {
                                        (() => {
                                            let grade = question.grade

                                            let className = grade === Grade.correct ? "text-success"
                                                : grade === Grade.incorrect ? "text-danger"
                                                    : grade === Grade.invalid ? "text-warning"
                                                        : "text-muted"

                                            return <span className={className}>{grade ? grade.rawValue : `Not yet graded`}</span>
                                        })()
                                    }
                                </td>
                                <td className="align-middle">
                                    {question.correctAnswer}
                                </td>
                                <td className="align-middle">
                                    <Button
                                        variant="link"
                                        size="sm"
                                        title="Delete question"
                                        className="text-danger text-decoration-none"
                                        onClick={() => this.deleteQuestion(question)}>
                                        X
                                    </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>

                    {/* Buttons */}
                    <tfoot>
                        <tr>
                            <td colSpan={7} className="pl-2">
                                {Quantity.all.map((quantity, i) =>
                                    <Button
                                        onClick={() => this.addQuestion(quantity)}
                                        variant="success"
                                        className="mr-2"
                                        key={i}>
                                        <strong>+</strong> {quantity.rawValue} question
                                    </Button>
                                )}
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        )
    }
}
