# Week 5 - Object Orientation II

## Inheritance and Polymorphism

- **Inheritance:** the ability for a class to extend or inherit another class. A derived class obtains all of the base class’s properties and methods, and can override them or add new ones.
- **Polymorphism:** if a class inherits from another class, it can be treated as a member of that base class. For example, if `Dog` inherits `Animal`, a `Dog` instance can be referred to as an `Animal` and passed to functions that expect `Animal` parameters.

## What’s different between Java & C++?

| Java                                                             | C++                                                                           |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Everything inherits from class **Object**                        | There is no universal base class                                              |
| Inherited methods and properties have the same access specifiers | Derived classes can limit access to inherited methods and properties          |
| “Interfaces” act like classes with no definitions                | “Pure virtual classes” replace interfaces, but are still classes              |
| You can extend only one class, then implement interface          | You can inherit any number of classes, virtual or otherwise                   |
| Methods are automatically late bound                             | You must specify that methods should be late bound                            |
| Objects are automatically references for polymorphism            | Objects can be value or reference, but polymorphism only works for references |

## Defining a class

```cpp
class Animal {
  public:
    uint16_t getAge();
    std::string *getName();
    void makeNoise();
  protected:
    uint16_t age;
    std::string name;
};
```

## Defining methods

```cpp
uint16_t Animal::getAge() {
  return this->age;
}
std::string *Animal::getName() {
  return &(this->name);
}
void Animal::makeNoise() {
  std::cout << "Hunc.";
}
```

## Defining a derived class

Additional code example:

```cpp
class Dog : public Animal {
public:
  std::string colour;
  void makeNoise();
};
void Dog::makeNoise() {
  std::cout << "Woof!";
}
```

### Access after different inheritance modes
>
> “Beware of this new attribution” — In C++, the inheritance mode can lower access.

| Inheritance | Base (Animal) member | Access in Derived (Dog)  |
|-------------|----------------------|--------------------------|
| public      | public               | public                   |
| public      | protected            | protected                |
| public      | private              | private *(inaccessible)* |
| protected   | public               | protected                |
| protected   | protected            | protected                |
| protected   | private              | private *(inaccessible)* |
| private     | public               | private                  |
| private     | protected            | private                  |
| private     | private              | private *(inaccessible)* |

- We specify that we inherit from `Animal` as a `public` inheritance. This means that all properties and methods in `Animal` will retain the same access in a `Dog` (as they always do in Java)
- If we instead wrote `protected Animal` then all public members of Animal would be `protected` in `Dog`. If we wrote `private Animal` then all public or protected members of `Animal` would be `private` in `Dog`.
- **You can only lower access in a derived class, not raise it** (so you cannot make non-public methods in an `Animal` public in a `Dog`). This can be used to block access to methods you don’t want to be available to callers.
- Note that when we want to override a method, we have to declare it in the class declaration as well as redefine it.

## Using a class’s objects

- Derived objects can be used just like base objects.

- **By value**

  ```cpp
  Dog rover;
  rover.makeNoise();
  ```

- **By reference**

  ```cpp
  Dog *fido = new Dog;
  fido->makeNoise();
  ```

## Declaring a constructor in the base class

```cpp
class Animal {
  public:
    uint16_t getAge();
    std::string* getName();
    void makeNoise();
    Animal(uint16_t _age, const char* _name);
  protected:
    uint16_t age;
    std::string name;
};

Animal::Animal(uint16_t _age, const char* namestr)
  : age(_age), name(namestr) {
  std::cout << name << " has arrived!";
}
```

## Declaring a constructor in the derived class

- Now that `Animal` has a constructor which takes parameters, we will get an error if we keep the existing definition of `Dog`.
- Because `Dog` inherits from `Animal`, an `Animal` must be created whenever a `Dog` is created. This means running an `Animal` constructor, and this means supplying values to its parameters.
- When `Animal` has a parameterized constructor, `Dog` **must** construct the base part by calling the `Animal` constructor in its member-initializer list.

```cpp
Dog::Dog(const char* _name, const char* _colour)
  : Animal(3, _name), colour(_colour) {
  std::cout << name << " is a dog!";
}
```

*Like calling `super(...)` in Java.*

### Using an object with a parameterized constructor

```cpp
Dog rover("Rover", "Green");
rover.makeNoise();
// Output:
// Rover has arrived!
// Rover is a dog!
// Woof!
```

(The `Animal` constructor runs first; then the `Dog` constructor.)

## Polymorphism

- An object which is a member of a derived class can be *referred to* as if it was a member of its base class.

- Writing

```cpp
Animal myPet = rover;
```

- is not referring to `rover` as an `Animal`; it is creating a new `Animal` object by copying the `Animal` part of `rover`.
- This is not polymorphism. myPet will be a separated object.
- its `Colour` property will *be wiped out*, because `Animal` does not have it.

```txt
be wiped out means:
myPet.colour//not allowed
```

To invoke Polymorphism we must use a reference, that is, a pointer/address:

```cpp
Animal *myPet = &rover;
```

myPet is a variable of type `Animal*` now, but it points to `rover`,  
which is an object of `Dog`.

Polymorphism means that there is no type error.

myPet could be cast back to `Dog*` and the `Colour` member  
accessed if necessary (although this is bad design practice).

make a summary of the following example

```cpp
class Dog: public Animal{
  public:
    Dog(int a,const char * n,const char* c);
    string colour;
    void makeNoise();
    void makeBark();
};
Dog::Dog(int a,const char * n,const char* c):
Animal(a,n),colour(c)
{
  cout<<name<<" is a "<<colour<<" dog!";
}
  void Dog::makeNoise() {
  cout<<“Woof"<<endl;
}
  void Dog::makeBark() {
  cout<<"WonWon again"<<endl;
}
```

```cpp
int main() {
  Dog rover(3,"Rover","yellow");
  cout<<rover.colour<<endl;
  Animal myPet = rover;
  Animal *myPet2= &rover;
  myPet2->makeNoise();
  return 0;
  }
```

Could we use?

```cpp
cout<<myPet.colour<<endl;
// NO
```

Could we use?

```cpp
myPet2->makeBark()<<endl;
// NO
```

What's the output of `myPet2->makeNoise();`?

:::details Check your answer
```txt
Hunc.
```
:::

### Summary

- The pointer of a base class can point to a subclass object;
- But it (the pointer) can’t call methods or use attributes that only existed in the subclass;

## Passing a derived class

```cpp
void kick(Animal *victim) {
  cout << “Bad boy kicked " <<
    *(victim->getName()) << "!" <<endl;
  victim->makeNoise();
  }
int main() {
  Dog rover(“Rover”, “Black”);
  kick(&rover);
}
```

There is no type error because, since `Dog` extends `Animal`, `&rover` (of type `Dog*`) can polymorph into a value of type `Animal*`.

However, the result may not be what we expect!

## Compile time binding

```txt
Rover has arrived!
Rover is a dog!
Bad boy kicked Rover!
Hunc.
```

Everything is fine until the call to `makeNoise()`.  
It prints `Hunc`. (the value from `Animal::makeNoise()`).

> [!QUESTION]
> Shouldn’t it print `Woof!`
> (the effect of `Dog::makeNoise()`)?

## The machine code

```cpp
void kick(Animal *victim) {
. . .
  victim->makeNoise();
}
```

compiles to

```txt
void kick(Animal *victim) {
. . .
  _ZN6Animal9MakeNoiseEv(&victim);
}
```

> [!NOTE]
> Whatever we pass the base class object reference or a subclass object
> reference to `victim`, it always be recognized as an `Animal` type pointer,
> so the compiler will choose the method of `Animal`

## Compile time method binding

- When you remember how methods are converted to machine code, it makes it clearer what is going on.
- The C++ compiler has to identify which mangled function name to use for the method call. By default, it does this at *compile time*.
- Because it’s compile time, the compiler can only go based on the *declared* type of the object.
- The *declared* type of `victim` is `Animal`. So the compiler inserts a call to the `Animal` version of `makeNoise`.
- If we want it to respect the overriding of `makeNoise`, we actually need to make the machine code much more complicated.

## The necessary code

```cpp
void kick(Animal *victim) {
  . . .
  victim->makeNoise();
}
```

We want is actually

```txt
void kick(Animal *victim) {
    . . .
    if (victim isReallyA Dog)
        _ZN3Dog9MakeNoiseEv(&victim);
    else
        _ZN6Animal9MakeNoiseEv(&victim);
}
```

The if-else can make sure which will be executed at running time.

## Late method binding

- Because the compiler does not know at compile time what type(s) of derived value will be passed to `kick`, it cannot predict at compiling time which mangled function to call.
- So, it has to insert an if statement in machine code which chooses between them at run time instead of compile time.
- This is called **late binding** (or sometimes **dynamic binding** or **dynamic dispatch**).
- Java does this automatically for every method, but for C++ it is a choice. There is a performance loss associated with this extra `if` statement, although it is very small on modern systems.
- Because of Java, late binding is considered normal nowadays. But at the time C++ was invented, this behavior was seen as strange and dangerous – calling a method on an object and not knowing exactly, at the time you write the code, what function will run!

## The magic word `Virtual`

```cpp {5}
class Animal {
  public:
    uint16_t getAge();
    string *getName();
    virtual void makeNoise();
    . . .
};

class Dog : public Animal {
public:
  string colour;
  void makeNoise() override;
};
```

- Declaring a method **virtual** tells the compiler: “Use late binding on this method.” In other words, “Whenever this method is called, include a machine code if statement to check what type the object really is, instead of just calling the method on this class.”
- Placing **override** after a method declaration tells the compiler: “Make this method **virtual**, and also check it’s overriding something from my base class and give an error if it isn’t.”
- **Override** is optional – you can just use **virtual** in the derived class also – but it is easier to read and avoids mistakes.
- **Virtual** is also optional in the derived class since an overridden method is automatically virtual. But you should always include it (or **override**) to avoid having to trace all the way back to base classes to find out which methods are virtual and which are not.

## The magic goes away

- If a method is not **virtual** in the base class, you can still redefine it in a derived class – but as we saw, it will not be called if the object is not declared as being that derived type. Technically, this is called **hiding** the method, rather than **overriding** it.
- In a constructor, **virtual** methods are ignored, and methods are always called based on the declared type. This is because during the construction process, the object is still being set up, so the machine code if statement to go to the correct function cannot be written – it depends on data created during that setup. (In Java, this works but is banned by most coding conventions and gives a warning in most IDEs, for similar reasons.)

## Calling the super class method

```cpp
void Dog::makeNoise() {
  Animal::makeNoise();
  cout << "Woof!";
}
```

- It is sometimes useful in a derived class to call the same method in the base class and then adapt the results.
- The Java equivalent is calling `super.makeNoise()`.

## Pure virtual classes

```cpp {3}
class NoisyThing {
public:
  virtual void makeNoise() = 0;
};
```

- The `= 0` definition specifies that the `makeNoise()` method in `NoisyThing` has no definition.
- This means that you cannot create any instance of class `NoisyThing`.
- You can, however, inherit it, and instantiate objects in derived classes. In this way it resembles an `interface` in Java (or an abstract class).

## Multiple inheritance

```cpp
class Red {
public:
    virtual void beRed();
};
class Blue {
public:
    virtual void beBlue();
};
public:
class Purple : public Red, public Blue { // [!code error]
public:
    virtual void bePurple();
};
```

```cpp
Purple p;
p.beRed();
p.beBlue();
p.bePurple();

Red *r = &p;
Blue *b = &p;
r->beRed();
b->beBlue();
```

Please check the example “virtual and override”

<br>

- C++’s true multiple inheritance can be helpful, but it must be used extremely carefully.
- It may be a good idea to restrict yourself to the Java rules – inherit only one real class, and beyond that, inherit only pure virtual classes.
- If you inherit multiple real classes, be very careful of clashing method names or property names between them.

<br>

- Doubly, beware of the *diamond of death* – inheriting two classes, which themselves both inherit a common ancestor. This guarantees clashes and confuses the inheritance chain. By default the common ancestor will be subclassed twice!
- You can disable the double subclassing by using the **virtual** keyword in the inheritance declaration. But sharing the common ancestor may not be ideal either. It is best to just **avoid this structure completely**!

## Summary

- The base class and subclass(derived class)
- The construction of subclass
- Polymorphism by base class pointer
- Virtual
