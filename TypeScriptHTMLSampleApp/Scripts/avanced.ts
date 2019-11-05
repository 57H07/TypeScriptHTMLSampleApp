
//#region Intersection Types
function extend<First, Second>(first: First, second: Second): First & Second {
    const result: Partial<First & Second> = {};
    for (const prop in first) {
        if (first.hasOwnProperty(prop)) {
            (result as First)[prop] = first[prop];
        }
    }
    for (const prop in second) {
        if (second.hasOwnProperty(prop)) {
            (result as Second)[prop] = second[prop];
        }
    }
    return result as First & Second;
}

class Repository {

    constructor(public context: string) { }
    save = () => {
        console.log("Record saved !...");
    }
}

interface Loggable {
    log(message: string): void;
}

class ConsoleLogger implements Loggable {
    log(message: string) {
        console.log(`LOG : ${message}.`);
    }
}
//#endregion

//#region Union Types
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    } else if (typeof padding === "string") {
        return padding + value;
    }
}
//#endregion

//#region Type Guards
interface Bird {
    name: string;

    fly(): void;
    layEggs(): void;
}

class Pigeon implements Bird {
    name = "Georges";

    fly = () => console.log("fly");
    layEggs = () => console.log("layEggs");
}

interface Fish {
    name: string;

    swim(): void;
    layEggs(): void;
}

class Baracudda implements Fish {
    name = "Bubble";

    swim = () => console.log("swim");
    layEggs = () => console.log("layEggs");
}

function getSmallPet(choice: number): Fish | Bird {
    if (choice == 1)
        return new Baracudda();
    else
        return new Pigeon();
}

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}
//#endregion

//#region Optionnal parameters

function sum(a: number, b?: number) {
    return a + (b || a);
}
//#endregion

//#region alias

type FishOrBird = Fish | Bird;

function GePetName(pet: FishOrBird) {
    return pet.name;
}

type LinkedList<T> = T & { next: LinkedList<T> };

type Easing = "ease-in" | "ease-out" | "ease-in-out"; // enum-like behavior with strings
class UIElement {
    animate(dx: number, dy: number, easing: Easing) {
        if (easing === "ease-in") {
            // ...
        }
        else if (easing === "ease-out") {
        }
        else if (easing === "ease-in-out") {
        }
        else {
            // error! should not pass null or undefined.
        }
    }

    easeIn(dx: number, dy: number, easing: "ease-in") {
        if (easing === "ease-in") {
            // ...
        }
        else {
            // error! should not pass null or undefined.
        }
    }
}
//#endregion

//#region Discriminated Unions
interface Square {
    kind: "square";
    size: number;
}
interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Rectangle | Circle;

// The never type represents the type of values that never occur. Function returning never must have unreachable end point
function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}

function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
        default: return assertNever(s);
    }
}
//#endregion

//#region Polymorphic "this" types
class BasicCalculator {
    public constructor(protected value: number = 0) { }
    public currentValue(): number {
        return this.value;
    }
    public add(operand: number): this {
        this.value += operand;
        return this;
    }
    public multiply(operand: number): this {
        this.value *= operand;
        return this;
    }
}

class ScientificCalculator extends BasicCalculator {
    public constructor(value = 0) {
        super(value);
    }
    public sin() {
        this.value = Math.sin(this.value);
        return this;
    }
}
//#endregion

//#region Type inference
class SomeBaseClass<T extends string | number> {

    private value!: T
    // Any of these will also work
    //value!: T
    //m(v:T): void {}
    //m(): T { return null as any }
}

type ExtractInner<T> = T extends SomeBaseClass<infer U> ? U : T;

class StringVersion extends SomeBaseClass<string> { }
class NumberVersion extends SomeBaseClass<number> { }

type InferredStringWithExtend = ExtractInner<StringVersion>  // string
type InferredNumberWithExtend = ExtractInner<NumberVersion>  // number
    //#endregion


