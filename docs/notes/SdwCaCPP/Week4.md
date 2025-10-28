# Week4 - Basics of C++ Object Orientation

>[!NOTE]
>【Glossary 词汇表】  
>explicitly 显式地  
>implicitly 隐式地  
>destructor function 析构函数  

## Table of content

- Define a class in C++<br>在 C++中定义一个类
- Access specifiers<br>访问修饰符
- Constructor<br>构造函数
- Destruction<br>析构函数

## What’s the same

| **Java**                                     | **C++**                                      |
|----------------------------------------------|----------------------------------------------|
| Classes<br>类                                | Classes<br>类                                |
| Data members (properties)<br>数据成员（属性）  | Data members (properties)<br>数据成员（属性）  |
| Member functions (methods)<br>成员函数（方法） | Member functions (methods)<br>成员函数（方法） |
| Inheritance<br>继承                          | Inheritance<br>继承                          |
| Polymorphism<br>多态                         | Polymorphism<br>多态                         |
| Constructor functions<br>构造函数            | Constructor functions<br>构造函数            |
> [!TIP]
> 面向对象三大特征 (The Foundation of OOP):  
> inheritance、polymorphism、encapsulation

## What’s different

| **Java**                                                                                                  | **C++**                                                                                                                                    |
|-----------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| Everything must be an object<br>一切都必须是对象                                                          | You can choose when to use objects<br>你可以选择何时使用对象                                                                               |
| Classes (as well as properties/methods) can have access specifiers<br>类（以及属性/方法）可以具有访问限定符 | <span style="color:red">Classes can’t have access specifiers because C++ doesn’t have packages<br>类不能有访问限定符，因为 C++没有包</span> |
| Classes go in their own files<br>类可以放在它们自己的文件中                                               | Classes can go in any file<br>类可以放在任何文件中                                                                                         |
> [!TIP]
> For C++, we <span style="color:red">can’t</span> define a class as following way:  
> `public class xxx{}`

---

| **Java**                                                                                | **C++**                                                                                                                             |
|-----------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| Method definitions go inside the class<br>方法定义放在类内部                            | Method _declarations_ go inside the class, _definitions_ go outside<br>方法声明放在类内部，定义放在外部                              |
| Access specifiers are given for each property/method<br>每个属性/方法都指定了访问修饰符 | Access specifiers are given using labels<br>使用标签指定访问修饰符                                                                  |
| Objects are automatically treated as references<br>对象自动被视为引用                   | Objects are treated as values or references as you choose, as with structs<br>对象可以像结构体一样，根据您的选择被当作值或引用来处理 |

## Defining a class

```cpp
class Animal { 
    public: uint16_t getAge();
        std::string *getName(); //declaration inside class body
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
    // definition outside class body
    return &(this->name);
}
void Animal::makeNoise() {
    std::cout << "Hunc.";
}
```

## Using a class

- As with structs, objects can be declared and created by value or by reference.<br>与结构体类似，对象可以通过值或引用进行声明和创建。
- By value:
```cpp
Animal rover;
rover.makeNoise();
```
- By reference:
```cpp
Animal *fido = new Animal;
fido->makeNoise();
```
- For reasons we shall see later, many C++ programmers only ever use objects by reference (which is why Java made that the only way to use them), but it is legal to use them by value.<br>由于我们稍后会看到的原因，许多 C++程序员只通过引用使用对象（这就是为什么 Java 只允许这样使用它们），但按值使用它们是合法的。
- Note that, unlike Java, we do not need to write `new Animal()` because the brackets are not required if the constructor has no parameters (a default constructor is being used)<br>请注意，与 Java 不同，我们不需要写 `new Animal()` ，因为如果构造函数没有参数（正在使用默认构造函数），则不需要括号。

## What is an object?

- In machine code, an object (class instance) is the same as a <span style="color:red">struct</span>. Each instance contains only the data members of the class.<br>在机器码中，对象（类实例）与结构体相同。每个实例只包含类的数据成员。
- <span style="color:red">Methods</span> are not duplicated within each instance (there would be no point!) Instead, they are compiled the same as regular global functions, but their names are internally changed (<span style="color:red">mangled</span>) to prevent them from being confused with functions in other classes.<br>方法在每个实例中不会重复（那没有意义！）相反，它们与常规的全局函数一样编译，但它们的名称在内部被更改（混淆）以防止与其它类中的函数混淆。

---

- When you call a method on an instance, such as `rover.makeNoise()`, the compiler<br>当你对一个实例调用方法时，例如 `rover.makeNoise()` ，编译器
    - Looks up the declared class of `Rover` and sees that it is `Animal`<br>查找 `Rover` 声明的类，并看到它是 `Animal`
    - Looks up the mangled name of the “`makeNoise`” function for `Animal`<br>查找 “`makeNoise`” 函数的混淆名称，用于 `Animal`
    - Performs a call to that mangled function, adding an invisible parameter <span style="color:red">“this”</span> which holds a pointer to the instance on which the call was made (in this case `rover`)<br>执行对该混乱函数的调用，添加一个不可见的参数“this”，该参数包含指向调用实例的指针（在这种情况下为 `rover` ）

## The machine code truth

```cpp
void Animal::makeNoise() {
    std::cout << "Hunc.";
}
...
rover.makeNoise();
```
⬇️ comprehend codes below as machine codes  
⬇️ 将以下代码视为机器代码
```console
void _ZN6Animal9makeNoiseEv(Animal *this) // “this” is hidden by Compiler
{
    std::cout << "Hunc.";
    std::cout<<this->name;
}
...
_ZN6Animal9MakeNoiseEv(&rover);
```

## Access specifiers

- Access specifiers in C++ are the same as in Java: `public`, `protected` and `private`.<br>C++中的访问限定符与 Java 相同： `public` 、 `protected` 和 `private` 。
- These have no effect in machine code. They are only checked at compile time.<br>它们在机器代码中没有任何效果。它们只在编译时进行检查。
<center>Specifiers are meaningful to programmer<br>限定符对程序员有意义<br>
Specifiers help programmer define <span style="color:red">the logical relationship</span> within programs<br>限定符帮助程序员定义程序内的逻辑关系</center>

- Technically it is possible to violate access specifiers by accessing memory directly, since an object instance is just a <span style="color:red">struct</span>. But in practice, this is a very (very) bad idea.<br>技术上，通过直接访问内存来违反访问限定符是可能的，因为对象实例只是一个结构体。但在实践中，这（非常非常）不是一个好主意。

## Declaring a constructor (with parameters)

```cpp
class Animal { 
    public: 
        uint16_t getAge(); 
        std::string *getName(); 
        void makeNoise(); 
        Animal(uint16_t _age, const cha *_name); 
    protected: 
        uint16_t age; 
        std::string name;
}
```

## Implementing a constructor

```cpp
Animal::Animal(uint16_t _age, const char *namestr) : age(_age),name(namestr) { 
    std::cout << name << “has arrived!”;
}
```
- Note the field initializer syntax used to set the initial values of <span style="color:red">age</span> and <span style="color:red">namestr</span>. This appears somewhere <span style="color:red">outside</span> the code block for the constructor!<br>注意使用字段初始化语法来设置年龄和 namestr 的初始值。这个语法出现在构造函数代码块之外！

---

- When a new object is created, before any code that refers to it (including its constructor code) can run, all its data members must be allocated in memory. This includes running their constructors (if they are objects) or initializing them to default values.<br>当创建一个新对象时，在引用它的任何代码（包括其构造函数代码）运行之前，必须为其所有数据成员分配内存。这包括运行它们的构造函数（如果它们是对象）或将它们初始化为默认值。
- Thus, any parameters or default values needed to do this have to be specified outside the constructor code (because <span style="color:red">the code cannot run until the allocation is all done</span>)<br>因此，执行此操作所需的任何参数或默认值都必须在构造函数代码外部指定（因为代码无法在所有分配完成之前运行）

## Constructors: beware!

```cpp
Animal::Animal(uint16_t _age, const char *namestr){ 
    age = _age; 
    name = namestr; 
    std::cout << name << “has arrived!”;
}
```
- Writing a constructor like this (as you would in Java) does work, but in C++ it is very wasteful.<br>编写这样的构造函数（就像在 Java 中那样）是可行的，但在 C++中非常浪费。
    - <span style="color:red">age</span> and <span style="color:red">name</span> will both be default initialized, then overwritten when the constructor code runs. In other words this is equivalent to:<br>年龄和名称都将进行默认初始化，然后在构造函数代码运行时被覆盖。换句话说，这相当于：
```cpp
age = 0; 
age = _age; 
String name = “”; 
name = namestr;
```
- Avoid doing this.

## Creating an object with a parameterized constructor

- By value:<br>`Animal rover(4, “Rover”);`<br>`rover.makeNoise();`
    - When an object is created by value, the parameters to the constructor are placed directly after the variable name.<br>当一个对象通过值创建时，构造函数的参数直接放在变量名之后。
- By reference:<br>`Animal *fido = new Animal(2, “Fido”);`<br>`fido->makeNoise();`
    - The parameters to the constructor are specified in the same way they would be in Java when an object is created by reference.<br>当通过引用创建对象时，构造函数的参数指定方式与 Java 中相同。

## Implicit construction

- Unlike Java, C++ supports implicit constructors. This means that in some circumstances, syntaxes that do not look like they would construct an object will do so.<br>与 Java 不同，C++支持隐式构造函数。这意味着在某些情况下，看起来不会构造对象的语法实际上会这样做。
- When a class declares a constructor with a single argument, it will be called for value construction in response to an assignment of that type.<br>当一个类声明了一个带有单个参数的构造函数时，它将在对该类型的赋值时被调用以进行值构造。
- For example, if we define (and declare)<br>例如，如果我们定义（并声明）
```cpp
Animal::Animal(const char *_name) : age(0), name(_name) { 
        std::cout << name << " is born!"
}
```

---

- Then writing `Animal stormy = "Stormy";` will work and will print `Stormy is born!`<br>那么编写 `Animal stormy = "Stormy";` 将有效，并将打印 `Stormy is born!`
- Note however that `Animal *stormy = “Stormy”;` will not work.<br>注意然而， `Animal *stormy = “Stormy”;` 将不会工作。
- To create by reference you must explicitly write `Animal *stormy = new Animal(“Stormy”);`<br>要按引用创建，你必须明确写出 `Animal *stormy = new Animal(“Stormy”);`

---

- A single argument constructor of this type will be called whenever an object of the argument type needs to be converted into a member of the class.<br>每当需要将参数类型的对象转换为类的成员时，都会调用此类的一个单参数构造函数。
- It is even legal to write `((Animal)”Stormy”).makeNoise();`<br>甚至可以写出 `((Animal)”Stormy”).makeNoise();`
> It is recommended to forget this way.  
> 建议忘记这种方式。

---

- If you do not want a constructor to be used implicitly, you can disable this in the declaration.<br>如果您不想隐式地使用构造函数，您可以在声明中禁用此功能。
- For example, if we declare the previous Animal constructor as:<br>例如，如果我们声明之前的 Animal 构造函数为：<br>`explicit Animal(const char *_name);`
- `Animal stormy = “Stormy”;` <br>will no longer work. Instead it will be necessary to call the constructor with the normal syntax:<br>将不再工作。相反，您需要使用常规语法调用构造函数：<br>`Animal stormy(“Stormy”);`
- This can be used as a safeguard to prevent these constructors being called by mistake.<br>这可以用作一种安全措施，以防止不小心调用这些构造函数。

> [!TIP]
> 自定义构造函数会覆盖默认的无参构造函数

## Copy construction

- A particularly useful form of implicit constructor is a <span style="color:red">copy constructor</span>. This is a constructor that accepts a pointer to another object of the same class.<br>特别有用的一种隐式构造函数是拷贝构造函数。这是一个接受同一类对象指针的构造函数。
```cpp
Animal::Animal(const Animal *c) : age(c->age), name(c->name) { 
    std::cout << name << " has been cloned!";
}
```
- This can then be used to easily duplicate objects.<br>这可以用来轻松地复制对象。
```cpp
Animal dolly = “Dolly”;
Animal dolly2 = &dolly;
Animal *dolly3 = new Animal(&dolly);
```

---

Note that the copy constructor must accept a <span style="color:red">pointer</span> to an existing object. If the object was passed by value, then in the course of doing so, <span style="color:red">it would need to be copied already</span>!  
注意，复制构造函数必须接受一个指向现有对象的指针。如果对象是通过值传递的，那么在这个过程中，它已经需要被复制了！

### Copy Constructor: Example

```cpp
……
class Point {
    private:
        int x, y;
    public:
        Point(int x1, int y1):x(x1),y(y1) {} // Normal constructor
        Point(const Point &p2):x(p2.x),y(p2.y) {}
        // Copy constructor
        int getX(){ return x; }
        int getY(){ return y; }
};

int main()
{
    Point p1(10, 15); // Normal constructor
    Point p2 = p1; // Copy constructor
    cout << "p1.x = " << p1.getX() << ", p1.y = " << p1.getY() << endl;
    cout << "p2.x = " << p2.getX() << ", p2.y = " << p2.getY() << endl;
    return 0;
}
```
output:
```console
p1.x = 10, p1.y = 15
p2.x = 10, p2.y = 15
```

## Destruction

- As well as constructors, C++ implements <span style="color:red">destructors</span>, which are called when an object is deleted.<br>除了构造函数外，C++还实现了析构函数，当对象被删除时会被调用。
- An object is deleted when:<br>对象被删除的情况包括：
    - The program ends.<br>程序结束。
    - It is declared by value, and goes out of scope.<br>通过值声明，并且超出作用域。
    - It is declared by reference, and the `delete` command is used.<br>通过引用声明，并使用 `delete` 命令。

---

- Destructors have a number of restrictions.<br>析构函数有一些限制。
- They cannot take parameters and ;<br>它们不能接受参数和；
- They should not take actions which might fail (since an object cannot refuse to be destroyed)<br>它们不应该执行可能失败的操作（因为对象不能拒绝被销毁）
```cpp
Animal::~Animal() { 
    std::cout << name << " has been destroyed!";
}
```
- Usually we just use default Destruction.<br>通常我们只使用默认的析构函数。

---

- The main use of destruction is to deal with any dynamic objects allocated within the class.<br>析构函数的主要用途是处理类内部分配的任何动态对象。
- For example, if the constructor of object `Ob` calls:<br>例如，如果对象 `Ob` 的构造函数调用：<br>`this->data = new dataThing();`
- Then probably, if that `Ob` object is destroyed, the `dataThing` it created should be destroyed as well.<br>那么，如果 `Ob` 对象被销毁，它创建的 `dataThing` 对象也应该被销毁。
```cpp
Ob::~Ob() { 
    delete this->data;
}
```

## Summary

- One class can have many constructors
- 一个类可以有多个构造函数
- If there is no constructor defined explicitly in the declaration, the compiler will give the class a default constructor (without parameters)
- 如果在声明中没有显式定义构造函数，编译器将为该类提供一个默认构造函数（无参数）
- One class can only have one destructor
- 一个类只能有一个析构函数
- If there are some parameterized constructors in class declaration, and no default constructor definition exists in class, the compiler will not give a default constructor proactively
- 如果类声明中存在一些参数化构造函数，且类中没有默认构造函数的定义，编译器将不会主动提供默认构造函数
