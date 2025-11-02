# Week 5 Seminar - C and C++: Further Classes
>
> [!TIP]
> FidgetCube: 解压魔方

Complete each of the exercises below using CLion. Test each exercise after implementing it; the exercise is not complete until the program works.

1. Create a C++ project. Copy and paste the following code, which utilizes several classes with inheritance.

```cpp
#include <iostream>
#include <cstdlib>

using std::string;
using std::cout;
using std::endl;

class CubeSide {
public:
    virtual const char *getName() = 0;
};

class FidgetCube {
public:
    CubeSide *getSide(uint8_t sideNo) const;
    bool addSide(CubeSide *newSide);
protected:
    CubeSide *sides[6];
    uint8_t lastSide = 0;
};

bool FidgetCube::addSide(CubeSide *newSide) {
    if (lastSide < 6) {
        sides[lastSide] = newSide;
        lastSide++;
        return true;
    }
    return false;
}

CubeSide *FidgetCube::getSide(uint8_t sideNo) const {
    return sides[sideNo];
}

class DialSide : public CubeSide {
public:
    const char *getName();
    void setDial(uint16_t value);
protected:
    uint16_t dialValue = 0;
    static constexpr char const *dialSideName = "Dial";
};

const char *DialSide::getName() {
    return DialSide::dialSideName;
}

void DialSide::setDial(uint16_t value) {
    if (dialValue <= 10) {
        dialValue = value;
        cout << "A dial was set to " << dialValue << "." << endl;
    }
}

class DialCube : public FidgetCube {
public:
    DialCube();
};

DialCube::DialCube() : FidgetCube() {
    for (uint8_t x = 0; x<6; x++ ){
        addSide(new DialSide());
    }
}


int main() {
    DialCube theDialCube;
    cout << theDialCube.getSide(0)->getName();
    ((DialSide*)theDialCube.getSide(0))->setDial(5);
}

```

Note the following conventions you may not have seen before:

- `const` after the method declaration of `FidgetCube::getSide()` promises that the method does not change the object, and so can be called via a `const` pointer.
- `constexpr` is used when a constant value has to be evaluated by the compiler, rather than just appearing in the program. If we were setting a value to 5, that could be `const`, because 5 can simply be placed into memory. But a string has to be allocated into memory and turned into an address in the program code, so we have to use `constexpr` instead of `const`.
- `constexpr char const *` in the declaration of `dialSideName` indicates that the string pointed to cannot change (it is of type `constexpr char*`) and also that the _pointer_ cannot be changed to point to a different string (the second `const`).

2. Looking at the code above, think about and answer the following questions.

- Why is `dialSideName` declared as a static string?
- Why do we need to cast `theDialCube.getSide(0)` to `DialSide*` to call `setDial`, but not to call `getName`?

> Answers are at the [end](#answer-to-question-2) of this file.

3. Create a new class `JoystickSide` which inherits `CubeSide`. It represents a joystick which can be pushed in any of four directions, but immediately returns to the center when released. Add a method `push` to it which prints out when the joystick is pushed. Create a `FidgetCube` with several `JoystickSides` in the main program, and call their `push` methods.
4. Create a new class `JoystickDialCube` which inherits `FidgetCube`. Its constructor should accept two parameters, one of which specifies how many joystick sides the cube should have, and one of which specifies how many dial sides. Test it by creating several cubes with different numbers of sides, including 0.
5. It is awkward to need to cast sides to their "real" type in order to call their methods. (Not awkward method: `auto`) Create a new method `Fidget` in `CubeSide` which is overridden by each particular type of `CubeSide` to call the method representing its interaction, with random parameters if necessary. (To generate a random number, add `#include <random>` at the top of the file, then call `rand() % x` for a random number $0-x$. This may generate a warning because `rand()` is less sophisticated; there is a more sophisticated random number generator in C++ but it is complicated to use. You can research this yourself if you like.)
6. Write a function `playWith` that inputs a `FidgetCube` by reference and calls `Fidget` on all its sides.
7. Create a class `RandomCube` which represents a `FidgetCube`, but when constructed, has its sides randomly selected from the 2 available.
8. Create a new kind of `CubeSide` called `ButtonSide`. It has two buttons and a display which shows a number starting at 5. When the first button is pressed the number goes up by 1, but not above 9. When the second button is pressed the number goes down by 1, but not below 0. The number should be printed whenever a button is pressed. Test this by adding it to some cubes and using the buttons.

参考答案：

```cpp
//  
// Created by 不死鸟Anka on 2025/10/27.  
//  
#include <iostream>  
#include <random>  
#include <cstdlib>  
#include <string>  
#include <cstdint>  
  
using std::string;  
using std::cout;  
using std::endl;  
  
class CubeSide {  
public:  
    virtual ~CubeSide() = default;  
    virtual const char *getName() = 0; // pure virtual function must be overridden  
    virtual void Fidget();  
};  
  
class JoystickSide : public CubeSide {  
public:  
    int direction = 0; // center=0, up=1, right=2, down=3, left=4  
    void push(int _direction);  
    const char *getName() override;  
    void Fidget() override; // override to perform a random push  
};  
  
void JoystickSide::push(int _direction) {  
    direction = _direction;  
    string direction_word;  
    switch (direction)  
    {  
    case 1:  
        direction_word = "UP"; break;  
    case 2:  
        direction_word = "RIGHT"; break;  
    case 3:  
        direction_word = "DOWN"; break;  
    case 4:  
        direction_word = "LEFT"; break;  
    default:  
        direction_word = "CENTER"; break;  
    }  
    cout << "A joystick was pushed to direction " << direction_word << "." << endl;  
    direction = 0;  
    cout << "This joystick returns to center since released" << endl;  
}  
  
const char *JoystickSide::getName() {  
    return "Joystick";  
}  
  
void JoystickSide::Fidget() {  
    // generate a random direction 0..4  
    /*static thread_local std::mt19937 eng{std::random_device{}()};    std::uniform_int_distribution<int> dist(0, 4);    int dir = dist(eng);*/    int dir = rand() % 5; // 0..4  
    cout << "(Fidget) ";  
    push(dir);  
}  
  
class FidgetCube {  
public:  
    FidgetCube();  
    ~FidgetCube();  
    CubeSide *getSide(uint8_t sideNo) const;  
    CubeSide** getSides();  
    bool addSide(CubeSide *newSide);  
protected:  
    CubeSide *sides[6];  
    uint8_t lastSide = 0;  
};  
  
FidgetCube::FidgetCube() : lastSide(0) {  
    for (int i = 0; i < 6; ++i) sides[i] = nullptr;  
}  
  
FidgetCube::~FidgetCube() {  
    for (int i = 0; i < 6; ++i) {  
        if (sides[i]) {  
            delete sides[i];  
            sides[i] = nullptr;  
        }  
    }  
}  
  
bool FidgetCube::addSide(CubeSide *newSide) {  
    if (lastSide < 6) {  
        sides[lastSide] = newSide;  
        lastSide++;  
        return true;  
    }  
    return false;  
}  
  
CubeSide *FidgetCube::getSide(uint8_t sideNo) const {  
    return sides[sideNo];  
}  
  
CubeSide** FidgetCube::getSides() {  
    return sides;  
}  
  
class DialSide : public CubeSide {  
public:  
    const char *getName() override;  
    void setDial(uint16_t value);  
    void Fidget() override; // perform a random dial set  
protected:  
    uint16_t dialValue = 0;  
    static constexpr char const *dialSideName = "Dial";  
};  
  
const char *DialSide::getName() {  
    return DialSide::dialSideName;  
}  
  
void DialSide::setDial(uint16_t value) {  
    // accept values up to 10  
    if (value <= 10) {  
        dialValue = value;  
        cout << "A dial was set to " << dialValue << "." << endl;  
    } else {  
        cout << "Dial value " << value << " out of range (0..10)." << endl;  
    }  
}  
  
void DialSide::Fidget() {  
    /* static thread_local std::mt19937 eng{std::random_device{}()};  
    std::uniform_int_distribution<int> dist(0, 10);    uint16_t val = static_cast<uint16_t>(dist(eng));*/    int val = rand() % 11; // 0..10  
    cout << "(Fidget) ";  
    setDial(val);  
}  
  
// New: ButtonSide with two buttons and a numeric display (0..9)  
class ButtonSide : public CubeSide {  
public:  
    ButtonSide() : display(5) {}  
    const char *getName() override { return "Button"; }  
  
    // press first button: increment (max 9)  
    void pressButton1() {  
        if (display < 9) ++display;  
        cout << "Button 1 pressed. Display: " << display << endl;  
    }  
    // press second button: decrement (min 0)  
    void pressButton2() {  
        if (display > 0) --display;  
        cout << "Button 2 pressed. Display: " << display << endl;  
    }  
  
    void Fidget() override {  
        // randomly press one of the two buttons  
        int which = rand() % 2;  
        cout << "(Fidget) ";  
        if (which == 0) pressButton1();  
        else pressButton2();  
    }  
protected:  
    int display;  
};  
  
// Provide a sensible default for CubeSide::Fidget in case a derived type doesn't override it  
void CubeSide::Fidget() {  
    cout << "(" << getName() << ") has no specific fidget action." << endl;  
}  
  
class DialCube : public FidgetCube {  
public:  
    DialCube();  
};  
  
DialCube::DialCube() : FidgetCube() {  
    for (uint8_t x = 0; x<6; x++ ){  
        addSide(new DialSide());  
    }  
}  
  
class JoystickDialCube : public FidgetCube {  
public:  
    int joystickSides;  
    int dialSides;  
    JoystickDialCube(int jsSides, int dSides) : joystickSides(jsSides), dialSides(dSides) {  
        for (int i = 0; i < joystickSides; ++i) {  
            if (addSide(new JoystickSide())) {  
                cout << "Added joystick side " << i << endl;  
            } else {  
                cout << "Could not add joystick side " << i << endl;  
            }  
        }  
        for (int j = 0; j < dialSides; ++j) {  
            if (addSide(new DialSide())){  
                cout << "Added dial side " << j << endl;  
            } else {  
                cout << "Could not add dial side " << j << endl;  
            }  
        }  
    }  
    // 根据addSide的逻辑，joystickSides 和 dialSides 的和不能超过 6};  
  
// New: RandomCube fills its 6 sides randomly with JoystickSide, DialSide or ButtonSide  
class RandomCube : public FidgetCube {  
public:  
    // default uses nondeterministic seed  
    RandomCube() {  
        std::mt19937 eng(std::random_device{}());  
        std::uniform_int_distribution<int> dist(0, 2); // 0=Joystick,1=Dial,2=Button  
        for (int i = 0; i < 6; ++i) {  
            int pick = dist(eng);  
            if (pick == 0) addSide(new JoystickSide());  
            else if (pick == 1) addSide(new DialSide());  
            else addSide(new ButtonSide());  
        }  
    }  
    // deterministic seed for reproducible cubes  
    explicit RandomCube(unsigned seed) {  
        std::mt19937 eng(seed);  
        std::uniform_int_distribution<int> dist(0, 2);  
        for (int i = 0; i < 6; ++i) {  
            int pick = dist(eng);  
            if (pick == 0) addSide(new JoystickSide());  
            else if (pick == 1) addSide(new DialSide());  
            else addSide(new ButtonSide());  
        }  
    }  
};  
  
void playWith(FidgetCube &fidget_cube) {  
    for (int i = 0; i < 6; ++i) {  
        CubeSide *side = fidget_cube.getSide(i);  
        if (!side) continue;  
        cout << "Side " << i << ": " << side->getName() << endl;  
        side->Fidget();  
    }  
}  
  
int main() {  
    DialCube theDialCube;  
    cout << theDialCube.getSide(0)->getName();  
    ((DialSide*)theDialCube.getSide(0))->setDial(5);  
    // C++样式的类型转换：static_cast<DialSide*>  
  
    // Create a cube and populate with several JoystickSides and DialSides    FidgetCube theCube;  
  
    // Add 2 joystick sides  
    theCube.addSide(new JoystickSide());  
    theCube.addSide(new JoystickSide());  
  
    // Add 1 Button side  
    theCube.addSide(new ButtonSide());  
  
    // Fill remaining sides with dials  
    for (int i = 0; i < 3; ++i) theCube.addSide(new DialSide());  
  
    // Iterate all sides and call push on joystick sides or buttons/dials  
    for (uint8_t i = 0; i < 6; ++i) {  
        CubeSide *s = theCube.getSide(i);  
        if (!s) continue;  
        cout << "Side " << int(i) << ": " << s->getName() << endl;  
        if (auto *js = dynamic_cast<JoystickSide*>(s)) {  
            // push different directions for demonstration  
            int dir = 1 + (i % 4); // 1..4  
            js->push(dir);  
        } else if (auto *ds = dynamic_cast<DialSide*>(s)) {  
            ds->setDial(uint16_t(i + 1));  
        } else if (auto *bs = dynamic_cast<ButtonSide*>(s)) {  
            // test button presses and bounds  
            bs->pressButton1(); // increment  
            bs->pressButton1(); // increment again  
            bs->pressButton2(); // decrement  
            // press multiple times to test clamping            for (int k = 0; k < 6; ++k) bs->pressButton1();  
            for (int k = 0; k < 12; ++k) bs->pressButton2();  
        }  
    }  
  
    JoystickDialCube joystick_dial_cube(1, 5);  
  
    // Demonstrate RandomCube  
    cout << "\nCreating a RandomCube and playing with it:\n";  
    RandomCube rc; // random sides  
    playWith(rc);  
  
    // deterministic example  
    cout << "\nCreating a deterministic RandomCube with seed 42:\n";  
    RandomCube rc2(42);  
    playWith(rc2);  
  
    return 0;  
}
```

9. Can you work out an implementation of `RandomCube` that will allow for the new `ButtonSide`, and any other sides you might write in the future, without needing to reprogram it?
下面给出一个基于工厂注册表的实现：各个 CubeSide 派生类在定义处静态注册一个“工厂函数”，RandomCube 从注册表中随机挑选工厂并创建实例。今后新增派生类只需在类定义处加入一行注册语句，无需修改 RandomCube。

```cpp
#include <vector>  
#include <functional>  
#include <random>  
  
// 工厂注册表（放在 `Week5/FidgetCube.cpp` 或单独工具头文件中）  
struct CubeSideFactory {  
    using Factory = std::function<CubeSide*()>;  
    static std::vector<Factory>& registry() {  
        static std::vector<Factory> reg;  
        return reg;  
    }  
    static void registerFactory(const Factory& f) {  
        registry().push_back(f);  
    }  
    static const std::vector<Factory>& getRegistry() {  
        return registry();  
    }  
};  
  
// 辅助模板：在某个派生类的实现文件中声明一个静态实例即可完成注册  
template<typename T>  
struct SideRegistrar {  
    SideRegistrar() {  
        CubeSideFactory::registerFactory([]() -> CubeSide* { return new T(); });  
    }  
};  
  
// 示例：在每个派生类定义后添加一行（在同一翻译单元中）以完成注册  
// 在 `JoystickSide` 定义处加入：  
// static SideRegistrar<JoystickSide> _regJoystick;  
// 在 `DialSide` 定义处加入：  
// static SideRegistrar<DialSide> _regDial;  
// 在 `ButtonSide` 定义处加入：  
// static SideRegistrar<ButtonSide> _regButton;  
// （新派生类只需同样加入一行即可自动被 RandomCube 使用）  
  
// RandomCube 使用注册表来随机生成 6 个面  
class RandomCube : public FidgetCube {  
public:  
    RandomCube() : RandomCube(static_cast<unsigned>(std::random_device{}())) {}  
  
    explicit RandomCube(unsigned seed) {  
        const auto& reg = CubeSideFactory::getRegistry();  
        if (reg.empty()) return; // 没有注册的侧面，保持空立方体  
  
        std::mt19937 eng(seed);  
        std::uniform_int_distribution<size_t> dist(0, reg.size() - 1);  
        for (int i = 0; i < 6; ++i) {  
            addSide(reg[dist(eng)]()); // 从工厂创建并添加  
        }  
    }  
};
```

用途摘要：

- 在每个派生类的实现文件中添加一行静态注册变量，例如 `static SideRegistrar<ButtonSide> _regButton;`。
- `RandomCube` 不再需要为每种类型写分支，新增侧面只需注册即可自动支持。

---

## Answer to Question 2

1. We create a `dialCube` which can only be dialed at each side of this cube, so we use the same name “Dial” for every side and it shouldn’t be changed.
2. The `getSide()` in `theDialCube.getSide(0)` inherited from class `FigetCube`, it declared as a const method, that means it will not change any object. And also it returns a `CubeSide` type pointer which points to a `DailSide` object this time.<br>`getName()` is declared in `CubeSide` as a virtual method, so when class `DialSide` derived from `CubeSide`, and override the `getName()` method. That means the class `DialSide` has its own `getName()` method.<br>So `theDialCube.getSide(0)->getName()` means it call the `getname()` overrode in class `Dialside` of object `theDialCube`;<br>`theDialCube.getSide(0)` return a `CubeSide` type pointer, but we don’t define method `setDial()` in base class `CubeSide`, that means `CubeSide` type pointer can not call `setDial()` directly.<br>So we must cast `CubeSide` type pointer into `DialSide` type pointer ,until then we can call method `setDial()`.<br>So we must add `(DialSide*)` before `theDialCube.getSide(0)` to cast `Cubside*` to `DialSide*`, until then we can call `setDial(5)` as a method of class `DialSide` object. It cannot be found as a method of class `CubeSide`.  

> [!NOTE]
> 思考题
> 为何不可以：  
> `int *p;`  
> `*p = 123;`  
> 但这样又可以：  
> `static constexpr char const *dialSideName = "Dial";`  
