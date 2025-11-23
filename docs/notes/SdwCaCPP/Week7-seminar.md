# Week 7 Seminar - C and C++: Templates and STL

Complete each of the exercises below using CLion. Test each exercise after implementing it; the exercise is not complete until the program works.

1. Create a C++ project. Cut and paste the following code that uses a template and an STL list.

```cpp
#include <iostream>
#include <cstdlib>
#include <list>
#include <iterator>
#include <array>
#include <memory>
#include <vector>
#include <ctime>

template <typename T> class Lottery {
public:
    void addItem(T item);
    T drawItem();
protected:
    std::list<T> contents;
};

template <typename T> void Lottery<T>::addItem(T item) {
    contents.push_back(item);
}

template <typename T> T Lottery<T>::drawItem() {
    auto iter = contents.begin();
    uint32_t number = rand() % contents.size();
    std::advance(iter, number);
    T itemCopy = *iter;
    contents.erase(iter);
    return itemCopy;
}


int main() {
    srand(time(nullptr));
    Lottery<uint16_t> l;
    l.addItem(5);
    l.addItem(10);
    l.addItem(20);
    std::cout << l.drawItem() << std::endl;
    std::cout << l.drawItem() << std::endl;
    std::cout << l.drawItem() << std::endl;
}

```

2. Add a method `isEmpty` to the lottery template class which returns true or false based on whether there are items left in the lottery or not.
3. `std::list<T>::size()` is a relatively expensive function. Because `list` is a linked list, it must count through the entire list to establish how many items there are. Modify the `Lottery` class to speed things up by avoiding calling `size()` on the list, while still using a `list`.
4. Add a method `cheat` to the lottery template class which draws the highest value in the lottery, removing it afterwards. The STL library `<algorithm>` includes the function `std::max_element` which can find the highest element in a list; look this up online and use it.
5. Modify the main program so that the lottery is created containing strings instead of numbers. You may use C++ strings or C char arrays. What is the result of calling `cheat` when the lottery contains strings?
  
参考答案：

```cpp
//Lottery.cpp
//
// Created by 不死鸟Anka on 2025/11/10.
//
#include <iostream>
#include <cstdlib>
#include <list>
#include <iterator>
#include <array>
#include <memory>
#include <vector>
#include <ctime>
#include <algorithm>
using namespace std;
template <typename T> class Lottery {
public:
    void addItem(T item);
    T drawItem();
    bool isEmpty() const {
        // return contents.empty();
        return itemNumber == 0;
    }
    int getSize() const {
        return itemNumber;
    }
    T cheat() {
        if (contents.empty()) {
            throw std::runtime_error("cheat on empty lottery");
        }
        auto it = std::max_element(contents.begin(), contents.end());
        T value = *it;
        contents.erase(it);
        --itemNumber;
        return value;
    }
protected:
    std::list<T> contents;
    int itemNumber = 0;
};

template <typename T> void Lottery<T>::addItem(T item) {
    contents.push_back(item); // push_back: 尾插法
    ++itemNumber;
}

template <typename T> T Lottery<T>::drawItem() {
    if (contents.empty()) {
        throw std::runtime_error("drawItem on empty lottery");
    }
    auto iter = contents.begin();
    // range of number is [0, contents.size()-1]
    // this is a pseudo-random number generator
    // uint32_t number = rand() % contents.size();
    uint32_t number = rand() % itemNumber;
    std::advance(iter, number); // move iterator forward by 'number' positions
    T itemCopy = *iter;
    contents.erase(iter);
    --itemNumber;
    return itemCopy;
}


int main() {
    srand(time(nullptr)); // seed the random number generator
    Lottery<uint16_t> l;
    l.addItem(5);
    l.addItem(10);
    l.addItem(20);
    l.addItem(30);
    cout << "At beginning, cheat" << endl;
    std::cout << l.cheat() << std::endl;
    cout << "isEmpty: " << l.isEmpty() << std::endl;
    std::cout << l.drawItem() << std::endl;
    cout << "isEmpty: " << l.isEmpty() << std::endl;
    std::cout << l.drawItem() << std::endl;
    cout << "isEmpty: " << l.isEmpty() << std::endl;
    std::cout << l.drawItem() << std::endl;
    cout << "isEmpty: " << l.isEmpty() << std::endl;
    Lottery<string> l_string;
    l_string.addItem("apple");
    l_string.addItem("banana");
    l_string.addItem("cherry");
    cout << "At beginning, cheat" << endl;
    // The calculation of max element for strings is based on lexicographical order
    std::cout << l_string.cheat() << std::endl;
    cout << "isEmpty: " << l_string.isEmpty() << std::endl;
    std::cout << l_string.drawItem() << std::endl;
    cout << "isEmpty: " << l_string.isEmpty() << std::endl;
    std::cout << l_string.drawItem() << std::endl;
    cout << "isEmpty: " << l_string.isEmpty() << std::endl;
}
```

2. Copy and paste the program below into a new C++ project.

> [!TIP]
> fuse: 保险丝

```cpp
#include <iostream>
#include <cstdlib>
#include <memory>

class Fuse {
public:
    Fuse();
    ~Fuse();
    void setSafe();
    static uint8_t getCount();
    static void resetCount();
protected:
    bool safe;
    static uint8_t count;
};

uint8_t Fuse::count = 0;

Fuse::Fuse() : safe(false) {
    count++;
}

void Fuse::resetCount() {
    count = 0;
}

Fuse::~Fuse() {
    if (!safe) {
        std::cout << "BOOM! A Fuse was destroyed unsafely!" << std::endl;
    }
    count--;
}

void Fuse::setSafe() {
    safe = true;
}

uint8_t Fuse::getCount() {
    return count;
}

void checkCount() {
    if (Fuse::getCount() > 0) {
        std::cout << "BOOM! Some Fuses were not destroyed (memory leak)!" << std::endl;
        Fuse::resetCount();
    }
}

void test1() {
    Fuse f;
    f.setSafe();
}

void test2() {
    Fuse *f = new Fuse();
    f->setSafe();
}

void test3() {
    std::unique_ptr<Fuse> f(new Fuse());
    f->setSafe();
}

Fuse* test4a() {
    std::unique_ptr<Fuse> f(new Fuse());
    return f.get();
}

void test4() {
    Fuse *f = test4a();
    f->setSafe();
}

std::unique_ptr<Fuse> test5a() {
    std::unique_ptr<Fuse> f(new Fuse());
    return f;
}

void test5() {
    std::unique_ptr<Fuse> f = test5a();
    f->setSafe();
}

std::unique_ptr<Fuse> *test6a() {
    auto *f = new std::unique_ptr<Fuse>(new Fuse());
    return f;
}

void test6() {
    std::unique_ptr<Fuse>* f = test6a();
    f->get()->setSafe();
}

int main() {
    std::cout << "Test 1." << std::endl; test1(); checkCount();
    std::cout << "Test 2." << std::endl; test2(); checkCount();
    std::cout << "Test 3." << std::endl; test3(); checkCount();
    std::cout << "Test 4." << std::endl; test4(); checkCount();
    std::cout << "Test 5." << std::endl; test5(); checkCount();
    std::cout << "Test 6." << std::endl; test6(); checkCount();
}
```

Without changing the class `Fuse` or adding any extra calls to `setSafe` or `resetCount`, fix this program so that all 6 tests run without ever printing "BOOM" or crashing the program. Also, work out _why_ each test either works or does not work.  
  
参考答案：

```cpp
//Fuse.cpp
//
// Created by 不死鸟Anka on 2025/11/10.
//
#include <iostream>
#include <memory>
#include <cstdint>
using namespace std;
class Fuse {
public:
    Fuse();
    ~Fuse();
    void setSafe();
    static uint8_t getCount();
    static void resetCount();
protected:
    bool safe;
    static uint8_t count;
};

uint8_t Fuse::count = 0;

Fuse::Fuse() : safe(false) {
    count++;
}

void Fuse::resetCount() {
    count = 0;
}

Fuse::~Fuse() {
    if (!safe) {
        std::cout << "BOOM! A Fuse was destroyed unsafely!" << std::endl;
    }
    count--;
}

void Fuse::setSafe() {
    safe = true;
}

uint8_t Fuse::getCount() {
    return count;
}

void checkCount() {
    if (Fuse::getCount() > 0) {
        std::cout << "BOOM! Some Fuses were not destroyed (memory leak)!" << std::endl;
        Fuse::resetCount();
    }
}

void test1() {
    // defined in value way
    Fuse f;
    f.setSafe();
}

void test2() {
    // defined in reference way
    Fuse *f = new Fuse();
    f->setSafe();
    // delete the heap-allocated Fuse so its destructor runs safely
    delete f;
}

void test3() {
    std::unique_ptr<Fuse> f(new Fuse());
    f->setSafe();
}

// Fuse* test4a() {
std::unique_ptr<Fuse> test4a() {
    std::unique_ptr<Fuse> f(new Fuse());
    // return f.get();
    return f;
}

void test4() {
    // Fuse *f = test4a();
    std::unique_ptr<Fuse> f = test4a();
    f->setSafe();
}

std::unique_ptr<Fuse> test5a() {
    std::unique_ptr<Fuse> f(new Fuse());
    return f;
}

void test5() {
    std::unique_ptr<Fuse> f = test5a();
    f->setSafe();
}

std::unique_ptr<Fuse> *test6a() {
    auto *f = new std::unique_ptr<Fuse>(new Fuse());
    return f;
}

void test6() {
    std::unique_ptr<Fuse>* f = test6a();
    f->get()->setSafe();
    // delete the heap-allocated unique_ptr so it destroys the inner Fuse
    delete f;
}

// another solution for test6
unique_ptr<Fuse> test6b() {
    return make_unique<Fuse>();
}

void test6c() {
    unique_ptr<Fuse> f = test6b();
    f->setSafe();
}


int main() {
    std::cout << "Test 1." << std::endl; test1(); checkCount();
    std::cout << "Test 2." << std::endl; test2(); checkCount();
    std::cout << "Test 3." << std::endl; test3(); checkCount();
    std::cout << "Test 4." << std::endl; test4(); checkCount();
    std::cout << "Test 5." << std::endl; test5(); checkCount();
    std::cout << "Test 6." << std::endl; test6(); checkCount();
}
```

---

Why each test originally behaved the way it did, and why the fix works

- Test 1 (stack-allocated)
  - Original behavior: Worked. `Fuse f;` is stack-allocated; `f.setSafe()` marks it safe and the destructor runs at scope exit. No BOOM.
  - After fix: unchanged; still works.
- Test 2 (heap-allocated, no delete originally)
  - Original behavior: FAILED (memory leak detected). The code allocated with `new Fuse()` and called `setSafe()`, but did not `delete` the object. At `checkCount()` the static counter was still > 0 so it printed "BOOM! Some Fuses were not destroyed (memory leak)!".
  - Fix: Added `delete f`; to release the heap object so the destructor runs (it sees `safe==true`) and the static count is decremented. Now no leak, no BOOM.
- Test 3 (unique_ptr local)
  - Original behavior: Worked. `std::unique_ptr<Fuse>` owns the `Fuse`; calling `setSafe()` then letting `unique_ptr` go out of scope correctly destroys the object.
  - After fix: unchanged; still works.
- Test 4 (originally returned raw pointer from local unique_ptr)
  - Original behavior: UB / Failed. `test4a()` created a `std::unique_ptr<Fuse> f`  locally and returned `f.get()` (a raw pointer). The `unique_ptr` was destroyed when `test4a()` returned, so the returned raw pointer pointed to destroyed memory. The object's destructor ran at return time (before the caller called `setSafe()`), causing either a "BOOM! A Fuse was destroyed unsafely!" message (because `safe` was still false) and then the caller calling `setSafe()` on an already-destroyed object produced undefined behavior — this can crash or corrupt memory.
  - Fix: Changed `test4a()` to return a `std::unique_ptr<Fuse>` (transfer ownership) and `test4()` to accept that `unique_ptr`. That keeps the Fuse alive until `setSafe()` is called in `test4()`, and then the destructor runs safely at the end of `test4()`.
- Test 5 (unique_ptr returned by value)
  - Original behavior: Worked. `test5a()` returned a `std::unique_ptr<Fuse>` by value (move semantics), transferring ownership to the caller. The caller marks it safe and the destructor runs at scope exit. No change required.
  - After fix: unchanged; still works.
- Test 6 (pointer to heap-allocated unique_ptr)
  - Original behavior: Depending on exact code, it could leak. The code originally did `auto *f = new std::unique_ptr<Fuse>(new Fuse());` and returned that pointer; the caller used `f->get()->setSafe()` but never <mark>delete</mark>ed the heap-allocated `std::unique_ptr`, so the inner `Fuse` was never destroyed — checkCount() might print the leak message. In some sequences, misuse could also lead to undefined behavior/crash.
  - Fix: After `f->get()->setSafe()` added `delete f;` so the heap-allocated `std::unique_ptr` is freed; its destructor deletes the inner `Fuse` (which has been marked safe), so no leak and no BOOM.
