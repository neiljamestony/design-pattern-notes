// SINGLETON - a pattern that restricts the instantiation of a class to a singular instance
class Settings {
  static instance: Settings;

  // prevent new with private constructor - adding "new" won't work
  private constructor() {}

  // checking if the instance is created
  static getInstance(): Settings {
    // if no one is created, create one
    // only one instance is possible
    if (!Settings.instance) {
      Settings.instance = new Settings();
    }

    return Settings.instance;
  }
}

// const settings = new Settings(); - won't work
const settings = Settings.getInstance();

// PROTOTYPE - CLONING, CLASS INHERITANCE - protoype pattern is alternative to implement in class inheritance
// provides a mechanism to copy the original object to a new object and then modify it according to our needs.

class Animal {}

class Dog extends Animal {}
class Cat extends Animal {}

const zombie = {
  eatBrains() {
    return "yum";
  },
};

const chad = Object.create(zombie, { name: { value: "chad" } });
// console.log(chad); // returns {name: 'chad'}
// console.log(Object.getPrototypeOf(chad)); // returns eatBrains func
// console.log(chad.eatBrains()); // returns 'yum'

// BUILDER PATTERN - creating objects step by step rather than constructor
//a design pattern designed to provide a flexible solution to various object creation problems in object-oriented programming

class Hotdog {
  constructor(
    public bun: string,
    public ketchup?: boolean,
    public mustard?: boolean
  ) {}

  addKetchup() {
    this.ketchup = true;
    return this;
  }

  addMustard() {
    this.mustard = true;
    return this;
  }
}

const myLunch = new Hotdog("bread");
// METHOD CHAINING
// myLunch.addKetchup().addMustard();

// FACTORY PATTERN - instead of using "new" to instantiate an object, you will use function or object to do it for you

class IOSButton {}
class AndroidButton {}

// without factory
let os: string = "ios";
const btn = os === "ios" ? new IOSButton() : new AndroidButton();

class ButtonFactory {
  createButton(os: string): IOSButton | AndroidButton {
    if (os === "ios") {
      return new IOSButton();
    } else {
      return new AndroidButton();
    }
  }
}

// with factory
const factory = new ButtonFactory();
const btn1 = factory.createButton(os);
const btn2 = factory.createButton("windows");

// FACADE PATTERN - a class or a face of an object, that hides small details, that the end user doesn't need to see

class PlumbingSystem {
  setPressure(p: number) {}
  turnOn() {}
  turnOff() {}
}

class ElectricalSystem {
  setVoltage(v: number) {}
  turnOn() {}
  turnOff() {}
}

class House {
  private plumbing = new PlumbingSystem();
  private electrical = new ElectricalSystem();

  public turnOnSystem() {
    this.plumbing.setPressure(120);
    this.plumbing.turnOn();
    this.electrical.setVoltage(120);
    this.electrical.turnOn();
  }

  public shutdown() {
    this.plumbing.turnOff();
    this.electrical.turnOff();
  }
}

const client = new House();
client.turnOnSystem();
client.shutdown();

// PROXY | SUBSTITUTE - replacing original object, into new.

// BEHAVIORAL

// ITERATOR - allow you to traverse the collection of the object

const animals = ["dog", "cat", "bird"];

for (const animal in animals) {
  console.log(animals[animal]);
}

// manual range function, looping from the start to end.

function range(start: number, end: number, step = 1) {
  return {
    // use it with "for of"
    [Symbol.iterator]() {
      return this;
    },
    next() {
      // check if the start if less than the end
      if (start < end) {
        start = start + step;
        return { value: start, done: false };
      }
      return { done: true, value: end };
    },
  };
}

for (const n of range(0, 100, 5)) {
  // JUST LIKE A PULL-BASED SYSTEM
  // console.log(n); 5, 10, ... 100
}

// OBSERVER - PUSH-BASED SYSTEM, allows many objects to subscribe to events that are broadcast by another event
// const news = new Subject();

// const tv1 = news.subscribe((v) => console.log(v + "via Den TV"));
// const tv2 = news.subscribe((v) => console.log(v + "via BatCave TV"));
// const tv3 = news.subscribe((v) => console.log(v + "via Airport TV"));

// news.next("breaking news: ");
// news.next("the war is over ");

// console.log(tv1);
// console.log(tv2);
// console.log(tv3);

// MEDIATOR - MIDDLEMAN || BROKER || MIDDLEWARE,

class Airplane {
  land() {}
}

class Runway {
  clear: boolean | undefined;
}

class Tower {
  clearForLanding(runway: Runway, plane: Airplane) {
    if (runway.clear) {
      console.log(`Plane ${plane} is clear for landing`);
    }
  }
}

// STATE - WHEN AN OBJECTS BEHAVE DIFFERENTLY BASED ON THE FINITE NUMBER OF STATES

interface State {
  think(): string;
}

class HappyState implements State {
  think(): string {
    return "I am happy";
  }
}

class SadState implements State {
  think(): string {
    return "I am sad";
  }
}

class Human {
  state: State;

  constructor() {
    this.state = new HappyState();
  }

  think() {
    return this.state.think();
  }

  changeState(state: State) {
    this.state = state;
  }
}
