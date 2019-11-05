/// <reference path="Validation.ts" />
/// <reference path="ZipCodeValidator.ts" />

var elExPer: HTMLElement;

window.onload = () => {

    // greeter.ts
    elExPer = document.getElementById('exemple-person');
    let el = document.getElementById('content');
    let greeter = new Greeter(el);
    greeter.start();

    // person.ts
    let bob = new Human("Dylan", "Bob", addListItem);
    let paul = new Alien("Mars", AlienColorSkin.Grey, addListItem);

    addListItem("---- START ----", "b");
    paul.walk();
    bob.walk();
    bob.sayHello();
    paul.sayHello();
    paul.layingEgg(bob);
    paul.layingEgg(paul);
    addListItem("---- END ----", "b");

    // avanced.ts

    // Union Types
    let loggableRepository = extend(new Repository("dbContext"), ConsoleLogger.prototype);
    loggableRepository.save();
    //loggableRepository.log(`Something has been saved with ${loggableRepository.context}`)

    console.log(padLeft("Hello world", 4));
    // Type Guards
    let pet = getSmallPet(2);
    if ((pet as Fish).swim)
        (pet as Fish).swim();
    else if ((pet as Bird).fly)
        (pet as Bird).fly();
    if (isFish(pet))
        pet.swim();
    else
        pet.fly();

    if (pet instanceof Baracudda)
        console.log("It's a baracudda !");
    // Optionnal parameters
    console.log(sum(15));
    console.log(sum(10, null));
    console.log(sum(5, undefined));
    // Type alias
    let linkedListOfBaracudda: LinkedList<Baracudda> = { name: undefined, next: undefined } as LinkedList<Baracudda>;
    let bar = new Baracudda();
    linkedListOfBaracudda.name = bar.name;
    linkedListOfBaracudda.next = linkedListOfBaracudda;
    linkedListOfBaracudda.next.next = linkedListOfBaracudda;
    let barName = linkedListOfBaracudda.name;
    barName = linkedListOfBaracudda.next.name;
    barName = linkedListOfBaracudda.next.next.name;

    let button = new UIElement();
    button.animate(0, 0, "ease-in");
    button.easeIn(0, 0, "ease-in");

    // Polymorphic "this" types
    let v = new BasicCalculator(2)
        .multiply(5)
        .add(1)
        .currentValue();
    let v2 = new ScientificCalculator(2)
        .multiply(5)
        .sin()
        .add(1)
        .currentValue();
    console.log("Computed value : " + v);
    console.log("Computed value with scientificCalculator : " + v2);

    // Using namespace
    let strings = ["Hello", "98052", "101"];
    let validators: { [s: string]: Validation.StringValidator; } = {};
    validators["ZIP code"] = new Validation.ZipCodeValidator();
    validators["Letters only"] = new Validation.LettersOnlyValidator();
    // Show whether each string passed each validator
    for (let s of strings) {
        for (let name in validators) {
            console.log(`"${s}" - ${validators[name].isAcceptable(s) ? "matches" : "does not match"} ${name}`);
        }
    }
};

function addListItem<K extends keyof HTMLElementTagNameMap>(content: string, innerElement?: K) {
    let childItem = document.createElement("li");
    if (innerElement) {
        let innerElem = document.createElement(innerElement);
        innerElem.innerText = content;
        childItem.appendChild(innerElem);
    } else {
        childItem.innerText = content;
    }
    if (elExPer) {
        elExPer.appendChild(childItem);
    }
}

