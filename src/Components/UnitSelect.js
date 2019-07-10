import React, { Component } from 'react'
import Unit from '../Calculator/Unit';
import Form from 'react-bootstrap/Form'

export default class UnitSelect extends Component {

    onChange(event) {
        let unit = Unit.ofRawValue(event.target.value)
        if (!unit) return
        if (this.props.onChange) {
            this.props.onChange(unit)
        }
    }

    render() {
        let options = [
            <option value={""} key={0} disabled>{this.props.quantity.rawValue} Unit</option>
        ]

        let unitOptions = Unit
            .allOfQuantity(this.props.quantity)
            .map(quantity =>
                <option value={quantity.rawValue} key={quantity.rawValue + 1}>
                    {quantity.rawValue}
                </option>)

        options.push(unitOptions)

        return (
            <Form.Control as="select" value={this.props.unit ? this.props.unit.rawValue : ""} onChange={this.onChange.bind(this)}>
                {options}
            </Form.Control>
        )
    }
}
