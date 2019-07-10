class Grade {
    static correct = new Grade("Correct")
    static incorrect = new Grade("Incorrect")
    static invalid = new Grade("Invalid")

    rawValue = undefined

    constructor(rawValue) {
        this.rawValue = rawValue
    }
}

export default Grade