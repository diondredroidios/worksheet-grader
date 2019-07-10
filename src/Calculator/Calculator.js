class Calculator {

    static formulas = {
        "celsius": {
            "kelvin": c => c + 273.15
        },
        "fahrenheit": {
            "rankine": f => f + 459.67
        },
        "kelvin": {
            "celsius": k => k - 273.15,
            "rankine": k => k * 1.8
        },
        "rankine": {
            "fahrenheit": r => r - 459.67,
            "kelvin": r => r * 5 / 9
        },

        "fluid ounce": {
            "tablespoon": oz => oz * 2,
            "cup": oz => oz / 8,
            "gallon": oz => oz / 128,
            "liter": oz => oz / 33.814,
            "cubic foot": oz => oz / 957.506
        },
        "tablespoon": {
            "fluid ounce": tbsp => tbsp / 2
        },
        "cup": {
            "fluid ounce": cup => cup * 8
        },
        "gallon": {
            "fluid ounce": gal => gal * 128
        },
        "liter": {
            "fluid ounce": l => l * 33.814,
            "cubic foot": l => l / 28.317
        },
        "cubic foot": {
            "cubic inch": ft => ft * 1728,
            "fluid ounce": ft => ft * 957.506,
            "liter": ft => ft * 28.317,
        },
        "cubic inch": {
            "cubic foot": inch => inch / 1728
        }
    }

    static formulaFor(inputUnit, targetUnit) {
        let inputName = inputUnit.rawValue.toLowerCase()
        let targetName = targetUnit.rawValue.toLowerCase()
        return Calculator.formulas[inputName][targetName]
    }

    static convertValueAndUnitTo(inputValue, inputUnit, targetUnit) {

        // validate input
        let number = Number(inputValue)
        if (Number.isNaN(number)) {
            throw new Error(`Input value "${number}" is not a number`)
        }

        // converting to same unit?
        if (inputUnit === targetUnit) {
            return number
        }

        // get formula
        let formula = Calculator.formulaFor(inputUnit, targetUnit)

        // direct formula?
        if (formula) {
            // calculate
            console.info(`There is a direct conversion from ${inputUnit.rawValue} to ${targetUnit.rawValue}`)
            let result = formula(number)
            console.log(`Converting ${number} ${inputUnit.rawValue} to ${targetUnit.rawValue}`, result);
            return result

        } else {
            // create new formula
            console.info(`No direct conversion from ${inputUnit.rawValue} to ${targetUnit.rawValue}`)

            let result = number

            // convert to absolute scale?
            if (inputUnit !== inputUnit.absoluteScaleUnit) {
                let inputValToInputAbs = Calculator.formulaFor(inputUnit, inputUnit.absoluteScaleUnit)
                result = inputValToInputAbs(number)
                console.log(`Converting ${number} ${inputUnit.rawValue} to ${inputUnit.absoluteScaleUnit.rawValue}`, result);
            }

            // convert to the other aboslute scale?
            if (inputUnit.absoluteScaleUnit !== targetUnit.absoluteScaleUnit) {
                let inputAbsToTargetAbs = Calculator.formulaFor(inputUnit.absoluteScaleUnit, targetUnit.absoluteScaleUnit)
                let resultBefore = result
                result = inputAbsToTargetAbs(result)
                console.log(`Converting ${resultBefore} ${inputUnit.absoluteScaleUnit.rawValue} to ${targetUnit.absoluteScaleUnit.rawValue}`, result);
            }

            // convert out of absolute scale?
            if (targetUnit !== targetUnit.absoluteScaleUnit) {
                // convert to value in relative scale
                let resultBefore = result
                let targetAbsToTargetVal = Calculator.formulaFor(targetUnit.absoluteScaleUnit, targetUnit)
                result = targetAbsToTargetVal(result)
                console.log(`Converting ${resultBefore} ${targetUnit.absoluteScaleUnit.rawValue} to ${targetUnit.rawValue}`, result);
            }

            return result
        }
    }
}

export default Calculator