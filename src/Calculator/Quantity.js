class Quantity {
    static temperature = new Quantity("Temperature")
    static volume = new Quantity("Volume")

    static get all() {
        return [Quantity.temperature, Quantity.volume]
    }

    rawValue = undefined

    constructor(rawValue) {
        this.rawValue = rawValue
    }

}

export default Quantity