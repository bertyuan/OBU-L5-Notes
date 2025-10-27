# Week 5 - Object Orientation II

## Inheritance and Polymorphism

- **Inheritance:** the ability for a class to extend or inherit another class. A derived class obtains all of the base class’s properties and methods, and can override them or add new ones.
- **Polymorphism:** if a class inherits from another class, it can be treated as a member of that base class. For example, if `Dog` inherits `Animal`, a `Dog` instance can be referred to as an `Animal` and passed to functions that expect `Animal` parameters.

## What’s different between Java & C++

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

| Inheritance | Base (Animal) member | Access in Derived (Dog) |
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
