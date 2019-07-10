import Quantity from "./Quantity";

class Unit {
    static celsius = new Unit("Celsius")
    static fahrenheit = new Unit("Fahrenheit")
    static kelvin = new Unit("Kelvin")
    static rankine = new Unit("Rankine")

    static liter = new Unit("Liter")
    static cubicInch = new Unit("Cubic inch")
    static cubicFoot = new Unit("Cubic foot")
    static fluidOunce = new Unit("Fluid ounce")
    static tablespoon = new Unit("Tablespoon")
    static cup = new Unit("Cup")
    static gallon = new Unit("Gallon")

    static ofRawValue(rawValue) {
        return Object.values(Unit).filter(value => value.rawValue === rawValue)[0] || undefined
    }

    static allOfQuantity(quantity) {
        return Object.values(Unit).filter(value => value instanceof Unit && value.quantity === quantity)
    }

    rawValue = undefined

    constructor(rawValue) {
        this.rawValue = rawValue
    }

    get absoluteScaleUnit() {
        switch (this) {
            case Unit.celsius:
            case Unit.kelvin:
                return Unit.kelvin

            case Unit.fahrenheit:
            case Unit.rankine:
                return Unit.rankine

            case Unit.liter:
                return Unit.liter

            case Unit.cubicInch:
            case Unit.cubicFoot:
                return Unit.cubicFoot

            case Unit.tablespoon:
            case Unit.cup:
            case Unit.gallon:
                return Unit.fluidOunce

            default:
                return null
        }
    }

    get quantity() {
        switch (this) {
            case Unit.celsius:
            case Unit.fahrenheit:
            case Unit.kelvin:
            case Unit.rankine:
                return Quantity.temperature

            case Unit.liter:
            case Unit.tablespoon:
            case Unit.cubicInch:
            case Unit.cup:
            case Unit.cubicFoot:
            case Unit.gallon:
                return Quantity.volume

            default:
                return null
        }
    }
}

export default Unit
