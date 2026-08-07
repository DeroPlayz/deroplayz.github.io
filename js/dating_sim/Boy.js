export class Boy {
    constructor(FirstName, LastName, Feet, Inches) {
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Height = 0; // Inches
        this.Opinion = 0; // 0 is neutral, -5 is hatred, 5 is love, etc.

        this.setHeight(Feet, Inches);
    }

    getFirstName() { return this.FirstName; }
    setFirstName(FirstName) { this.FirstName = FirstName; }

    getLastName() { return this.LastName; }
    setLastName(LastName) { this.LastName = LastName; }

    getHeight() { return this.Height; }
    setHeight(Feet, Inches) { this.Height = (Feet * 12) + Inches; }

    getOpinion() { return this.Opinion; }
    addOpinion(mod) { this.Opinion += mod; }

    toString() {
        let s = "Name: " + this.FirstName + " " + this.LastName + "\nHeight: ";
        let feet = 0; 
        let inches = 0;
        
        for (let i = this.Height; i > 12; ) {
            feet++;
            i = i - 12;
            if (i < 12) { inches = i; }
        }
        s += feet + "'" + inches + '"';
        return s;
    }
}