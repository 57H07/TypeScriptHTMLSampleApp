interface IHumanoid {
    nbLegs: number;
    nbArms: number;
}

abstract class Humanoid implements IHumanoid {

    readonly nbLegs: number;
    readonly nbArms: number;

    protected readonly actionMethod: (value: string) => void;

    constructor(humanoid: IHumanoid, actionMethod = (v: string) => console.log(v)) {
        if (humanoid) {
            this.nbArms = humanoid.nbArms;
            this.nbLegs = humanoid.nbLegs;
        }
        this.actionMethod = actionMethod;
    }

    abstract sayHello(): void;

    walk() {
        this.actionMethod(`Something with ${this.nbLegs} and ${this.nbArms} arms legs are walking ...`);
    }
}

class Human extends Humanoid {

    private readonly _maxLenght: number = 20;

    private _name: string;
    get name(): string {
        return this._name;
    }
    set name(name: string) {
        if (name && name.length > this._maxLenght) {
            throw new Error("name has a max lenght of " + this._maxLenght);
        }
        this._name = name;
    }

    private _firstName: string;
    get firstName(): string {
        return this._firstName;
    }

    set firstName(firstName: string) {
        if (firstName && firstName.length > this._maxLenght) {
            throw new Error("firstName has a max lenght of " + this._maxLenght);
        }
        this._firstName = firstName;
    }

    constructor(name: string, firstName: string, actionMethod: (value: string) => void) {
        super({ nbArms: 2, nbLegs: 2 }, actionMethod);
        this.name = name;
        this.firstName = firstName;
    }

    sayHello() {
        this.actionMethod(`${this.name} ${this.firstName}: Hello !`);
    }
}

enum AlienColorSkin {
    Grey,
    Green
}

class Alien extends Humanoid {
    // readonly homeWorld: string; => optional, because we have a readonly statement at the constructor

    readonly color: AlienColorSkin;

    constructor(readonly homeWorld: string, colorSkin: AlienColorSkin, actionMethod: (value: string) => void) {
        super({ nbArms: 4, nbLegs: 4 }, actionMethod);
        //this.homeWorld = homeWorld;
        let test = { G: "Green", Gr: "Grey" };
        this.color = colorSkin;
    }

    layingEgg<T extends Humanoid>(species: T) {
        this.actionMethod(`A Alien eggs with ${species.nbLegs} legs and ${species.nbArms} arms has been layed.`);
    }

    sayHello() {
        this.actionMethod(`The Alien from ${this.homeWorld} say : Brtz brtz`);
    }
}
