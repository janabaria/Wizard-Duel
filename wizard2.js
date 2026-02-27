
class Wizard {
    #name;
    #health;
    #mana;

    constructor(name, health, mana) {
        this.#name = name;
        this.#health = health;
        this.#mana = mana;
    }

    getName() { return this.#name; }
    getHealth() { return this.#health; }
    getMana() { return this.#mana; }
    isDefeated() { return this.#health <= 0; }

    regenerate() {
        this.#mana += 10;
        console.log("[Notice] " + this.#name + " استعاد 10 مانا.");
    }

    reduceHealth(amount) {
        this.#health = Math.max(0, this.#health - amount);
    }

    useMana(amount) {
        if (this.#mana >= amount) {
            this.#mana -= amount;
            return true;
        }
        return false;
    }

    castSpell(opponent) {
        if (this.isDefeated()) return;
    }
}


class FireWizard extends Wizard {
    castSpell(opponent) {
        const cost = 20;
        const damage = 35;

        if (this.useMana(cost)) {
            console.log(this.getName() + " يطلق كرة نارية! (ضرر: " + damage + ")");
            opponent.reduceHealth(damage);
        } else {
            console.log(this.getName() + " لا يملك مانا كافية للهجوم!");
            this.regenerate();
        }
    }
}

class IceWizard extends Wizard {
    castSpell(opponent) {
        const cost = 15;
        const damage = 25;

        if (this.useMana(cost)) {
            console.log(this.getName() + " يطلق رمحاً جليدياً! (ضرر: " + damage + ")");
            opponent.reduceHealth(damage);
        } else {
            console.log(this.getName() + " لا يملك مانا كافية للهجوم!");
            this.regenerate();
        }
    }
}


class Duel {
    static start(w1, w2) {
        console.log("--- بدأت المبارزة النهائية ---");

        let turn = 1;
        while (!w1.isDefeated() && !w2.isDefeated()) {
            console.log("\n-------------------------------------------");
            console.log("الجولة: " + turn);
            
            this.displayStatus(w1);
            this.displayStatus(w2);
            console.log("-------------------------------------------");

            w1.castSpell(w2);
            if (w2.isDefeated()) break;

            w2.castSpell(w1);
            
            turn++;
        }

        console.log("\n===========================================");
        const winner = w1.isDefeated() ? w2 : w1;
        const loser = w1.isDefeated() ? w1 : w2;

        console.log(loser.getName() + " سقط في المعركة!");
        console.log("الفائز هو: " + winner.getName() + " (الصحة المتبقية: " + winner.getHealth() + ")");
        console.log("===========================================");
    }

    static displayStatus(wizard) {
        console.log("الساحر: " + wizard.getName() + " | الصحة: " + wizard.getHealth() + " | المانا: " + wizard.getMana());
    }
}

const merlin = new FireWizard("ميرلين النار", 100, 50);
const gandalf = new IceWizard("غاندالف الجليد", 120, 40);

Duel.start(merlin, gandalf);