import { Boy } from './Boy.js';

export class Main {
    static AlexJ = new Boy("Alex", "Justman", 5, 9);
    static AlexP = new Boy("Alex", "Phan", 5, 7);
    static RyanP = new Boy("Ryan", "Palmer", 6, 0);
    static RyanH = new Boy("Ryan", "Haase", 5, 10);
    static Blondie = new Boy("Dylan", "Back", 5, 11);
    static Mario = new Boy("Mario", "Mazzi", 5, 8);

    static main(args) {
        
    }

    static nameTest() {
        let s = Main.AlexJ.toString() + "\n";
        s += Main.AlexP.toString() + "\n";
        s += Main.RyanP.toString() + "\n";
        s += Main.RyanH.toString() + "\n";
        s += Main.Blondie.toString() + "\n";
        s += Main.Mario.toString();

        return s;
    }
}