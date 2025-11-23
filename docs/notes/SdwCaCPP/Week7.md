# Week 7 - Templates and STL
>
> STL: Standard Template Library

## Table of content

- Template
  - Define template class
  - Use template class
- STL
  - Identify STL
  - Use standard list
  - Identify iterator
  - Know some STLs
- Smart pointer
  - Identify and use unique_ptr
  - Identify shared_ptr

## Introduction

- Templates
  - Enable programmers to specify an entire range of related functions and related classes
  - 使程序员能够指定一系列相关的函数和相关类
    - Called function-template specializations and class-template specializations, respectively
    - 分别称为函数模板特化和类模板特化
  - Generic programming
  - 泛型编程
  - Analogy: templates are like stencils, template specializations are like separate tracings
  - 类比：模板就像模板，模板特化就像单独的描图
    - All tracings have the same shape, but they could have different colors
    - 所有描图形状相同，但它们可能有不同的颜色

## The generics problem

```cpp
class PairOfUint16s {
public:
    uint16_t getMember(uint8_t x);
    void setMember(uint8_t x, uint16_t newValue);
    PairOfUint16s(uint16_t first, uint16_t second);
protected:
    uint16_t items[2];
};
```

---

- If we want to define many similar classes
- 如果我们想定义许多相似的类
`class PairOfUint8s {. . .`  
`class PairOfUint32s {. . .`  
`class PairOfInt32s {. . .`  
`class PairOfInt16s {. . .`  
`class PairOfInt8s {. . .`  
- Since the basic functionality of a “pair” is the same, the function and code of this class remains almost identical, no matter what type was stored inside the pair.
- 由于“pair”的基本功能相同，无论存储在“pair”中的是什么类型，这个类的函数和代码几乎都是相同的。

---

- However, we can’t normally just write one class for a pair of “anything” because we have to declare parameter and return types.
- 然而，我们通常不能只为“anything”的pair编写一个类，因为我们必须声明参数和返回类型。
- We could work around this by using subclassing (if we were using objects, but "int" types aren’t objects) or by using void pointers (which are generally horrible)
- 我们可以通过使用子类化（如果我们使用对象，但“int”类型不是对象）或使用空指针（这通常很糟糕）来解决这个问题。

## Defining a template class

<table>
    <tr>
        <td>keyword <span style="color: red">template</span> tell compiler, this is a template<br>关键字 <span style="color: red">template</span> 告诉编译器，这是一个模板</td>
        <td><span style="color: red">&lt;typename T&gt;</span> tell compiler, <span style="color: red">T</span> could represent any legal type<br><span style="color: red">&lt;typename T&gt;</span> 告诉编译器，<span style="color: red">T</span> 可以代表任何合法类型</td>
        <td><span style="color: red">class Pair</span> tell the compiler, this declaration is still a class, named <span style="color: red">Pair</span><br><span style="color: red">class Pair</span> 告诉编译器，这个声明仍然是一个名为 <span style="color: red">Pair</span> 的类</td>
    </tr>
</table>

```cpp
template <typename T> class Pair {
public:
    T getMember(uint8_t x);
    void setMember(uint8_t x, T newValue);
    Pair(T first, T second);
protected:
    T items[2];
};
```

## Defining template methods

<table>
    <tr>
        <td><span style="color: red">Template &lt;typename T&gt;</span> tell compiler, this definition applies template<br><span style="color: red">Template &lt;typename T&gt;</span> 告诉编译器，此定义适用于模板</td>
        <td><span style="color: red">T</span> represent return type of method getMember()<br><span style="color: red">T</span> 表示方法 getMember()的返回类型</td>
    </tr>
</table>

```cpp
template <typename T> T Pair<T>::getMember(uint8_t x){
    return items[x];
}
```

<table>
    <tr>
        <td><span style="color: red">Pair&lt;T&gt; ::</span>tell compiler, the method belongs to which class, and it’s a template class<br><span style="color: red">Pair&lt;T&gt; ::</span> 告诉编译器，该方法属于哪个类，并且它是一个模板类</td>
    </tr>
    <tr>
        <td>Have to remind you, remember to add <span style="color: red">&lt;T&gt;</span> behind the class name;<br>必须提醒您，记得在类名后面添加 <span style="color: red">&lt;T&gt;</span></td>
    </tr>
</table>

---

- Template method

```cpp
template <typename T> void Pair<T>::setMember(uint8_t x, T newValue) {
    items[x] = newValue;
}
```

- Template constructor

```cpp
template <typename T> Pair<T>::Pair(T first, T second) {
    items[0] = first;
    items[1] = second;
}
```

## Using a template class

`<……>` tell compiler which exact type we use for this object  
`<……>` 告诉编译器我们为这个对象使用哪种确切类型  

```cpp
int main() {
    Pair<uint16_t> test(4,5);
    cout << test.getMember(0);
    Pair<std::string> stest("Hello", "SEKAI");
    cout << stest.getMember(0);
}
```

- `test(4,5)` and `stest("Hello", "SEKAI")` are two objects of class `Pair`
- `test(4,5)` 和 `stest("Hello", "SEKAI")` 是类 `Pair` 的两个对象
- These two object use different parameters, but they do same work;
- 这两个对象使用不同的参数，但执行相同的工作；

## Templates

- Templates allow a section of code to be declared with parameters that are assigned at <span style="color: red">compile time</span>.
- 模板允许在<span style="color: red">编译时</span>声明带有参数的代码段。
- When a template class is used, the compiler builds a new version of that class based on the parameters given and inserts that into the program source code.
- 当使用模板类时，编译器会根据给定的参数构建该类的新版本，并将其插入到程序源代码中。
- This is usually only useful when it is impossible, or substantially improves performance, to <span style="color: red">adapt the code at run time</span> – as in the case of multiple types.
- 这通常只在无法<span style="color: red">在运行时适应代码</span>，或者显著提高性能时才有用——例如在多种类型的情况下。

### Template functions

<table>
    <tr>
        <td><span style="color: red">Template &lt;typename T&gt;</span> tell compiler, this definition applies template<br><span style="color: red">Template &lt;typename T&gt;</span> 告诉编译器，此定义适用于模板</td>
        <td><span style="color: red">T</span> represent return type of function twice()<br><span style="color: red">T</span> 代表函数 twice() 的返回类型</td>
    </tr>
</table>

```cpp {2}
template <typename T> T twice(T x) {
    return (x * (T)2); // (T) cast integer 2 into the type T
}
cout << twice(123);
cout << twice(123.1);
```

### The trouble with templates

```cpp
cout << twice(“moose”);
```

- This will not produce an error when written, but this will then generate a compiler type error in the template, which can be awkward to deal with,
- 当编写时，这不会产生错误，但随后在模板中会生成编译器类型错误，这可能会很麻烦处理，
- Especially with more complex templates
- 尤其是在更复杂的模板中
- In modern C++, it is possible to insert requirements for the template type inside the template, which can make the error friendlier (<span style="color: red">but not get rid of it</span>):
- 在现代 C++中，可以在模板内部插入对模板类型的请求，这可以使错误更友好（<span style="color: red">但并不能消除它</span>）：

```cpp
template <typename T> T twice(T x) {
    static_assert(std::is_arithmetic<T>::value,"Can't double non arithmetic value");
    return (x * (T)2);
}
```

`static_assert` is a prompt for compiler and users, can’t help much  
`static_assert` 是编译器和用户的提示，帮助不大  
> Example: Trouble with template

### The Standard Template Library

- A key feature of modern C++ is the <span style="color: #8B0000">Standard Template Library</span> which provides templated class implementations of many <span style="color: red">standard data structures</span>.
- 现代 C++的一个关键特性是<span style="color: #8B0000">标准模板库</span>，它提供了许多<span style="color: #8B0000">标准数据结构</span>的模板类实现。
- This allows easy use of data structures, such as lists, which must be built manually in C.
- 这允许轻松使用数据结构，如列表，在 C 语言中必须手动构建。
- In many cases, a single structure (such as a list) will have several options for which implementation you want to use.
- 在许多情况下，单个结构（如列表）会有多个实现选项。

## STL: Lists
>
> 这里的List应该翻译为链表

```cpp
array<type, size>
```

represents an array list. Behaves just like a C array except that it is an object and has the STL list methods.  
表示数组列表。行为类似于 C 数组，除了它是一个对象并且具有 STL 列表方法。

```cpp
array<int,10> a1,a2,a3;
```

↓
<table>
    <tr>
        <td>int a1[10];<br>int a2[10];<br>int a3[10];</td>
        <td><center>+</center></td>
        <td>object a1;<br>object a2;<br>object a3;</td>
    </tr>
</table>
↓

```cpp
#include <array>
……
cout<<a1[0]<<endl;
cout<<a2[2]<<endl;
cout<<a1.begin()<<endl;
cout<<a1.end()<<endl;
cout<<a2.size()<<endl;
```

See example  
Use as int type array  
Use as object too  

---

```cpp
list<type>
```

represents a <span style="color: red">doubly linked list</span>, which can increase size as necessary and easily insert options in any position. But cannot support random access to elements; you can only step forwards or backwards to reach the element you want.  
表示一个<span style="color: red">双向链表</span>，可以根据需要增加大小，并可以轻松地在任何位置插入选项。但是不支持随机访问元素；您只能向前或向后移动以到达您想要的元素。
![](../../img/Pasted_image_20251110113227.png)

```cpp
std::list<Room*> Room::rooms;
```

---

```cpp
forward_list<type>
```

represents a singly linked list, which is slightly smaller and faster than a doubly linked list, but you can only step forward.  
表示一个单链表，比双向链表略小且更快，但只能向前移动。
![](../../img/Pasted_image_20251110113946.png)

---

```cpp
deque<type>
```

represents a “double ended queue”. A <span style="color: #8B0000">variable length list</span> with <span style="color: #8B0000">random access</span>, but adding items in the middle is slow; they can be quickly added only at the start or the end.  
表示一个“双端队列”。一个具有<span style="color: #8B0000">随机访问</span>的<span style="color: #8B0000">变长列表</span>，但向中间添加项目较慢；它们只能快速添加到开始或结束。

- <span style="color: red">A deque is not physically contiguous in memory, but logical contiguously</span>
- <span style="color: red">双端队列在内存中不是物理连续的，但逻辑上是连续的</span>

> deque: double-ended queue

![](../../img/Pasted_image_20251110114320.png)

---

> 矢量容器，自带索引  
> 普通数组 (arr) 不能作为迭代对象 (iterator)

```cpp
vector<type>
```

represents a dynamically managed away, which has <span style="color: #8B0000">variable length</span> and <span style="color: #8B0000">random access</span>, but can only quickly add items at the end.  
表示一种动态管理的数据结构，具有<span style="color: #8B0000">可变长度</span>和<span style="color: #8B0000">随机访问</span>，但只能快速在末尾添加项目。

- Unlike a deque, a vector is <span style="color: #8B0000">stored contiguously in memory</span>, which means accessing it is faster – <span style="color: #8B0000">but when it expands, it has to be reallocated and moved</span>, which can be slow.
- 与 deque 不同，向量在<span style="color: #8B0000">内存中连续存储</span>，这意味着访问它更快——<span style="color: #8B0000">但当它扩展时，它必须重新分配并移动</span>，这可能会很慢。
![](../../img/Pasted_image_20251110114557.png)

### The main difference between deque and vector
>
> contiguous: 连续的

- <span style="color: #8B0000">is contiguous in the memory?</span>
- 在内存中是连续的吗？
  - Deque is not physically contiguous in memory
  - 双端队列在内存中不是物理连续的
  - Vector is physically contiguous
  - 向量在内存中是物理连续的
  - They are both logically contiguous
  - 它们在逻辑上都是连续的

### STL: List methods

- Standard list access methods are implemented on all these types:
- 标准列表访问方法在所有这些类型上实现：  
`push_front, pop_front, push_back, pop_back, insert, erase, swap, clear, size, empty, sort, reverse`
- For lists with random access, you can access members using the `[]` operator (same as arrays) or the `at` method.
- 对于具有随机访问的列表，您可以使用 `[]` 运算符（与数组相同）或 `at` 方法来访问成员。

---

- To access individual members of lists, all versions of the STL lists support <span style="color: #8B0000">iterators</span>.
- 为了访问列表的各个成员，所有版本的 STL 列表都支持<span style="color: #8B0000">迭代器</span>。

> Recognize an <span style="color: #8B0000">iterator</span> as a pointer(object) used to point to elements in a list; this pointer can be set by a specific method  
> 将<span style="color: #8B0000">迭代器</span>识别为用于指向列表中元素的指针（对象）；此指针可以通过特定方法设置

- An iterator (called a cursor in some languages) is <span style="color: #8B0000">an object</span> which contains a reference to a list, and a reference to a specific location in that list. Iterators have methods which allow them to be used to manipulate the entire list.
- 迭代器（在某些语言中称为游标）是一个包含对列表的引用以及对列表中特定位置的引用的<span style="color: #8B0000">对象</span>。迭代器有方法可以用来操作整个列表。
- You can get an iterator from a list using the methods `begin` and `end`.
- 您可以使用方法 `begin` 和 `end` 从列表中获取迭代器。

### Example of list and iterators

```cpp {10}
#include <vector>
#include <iostream>
#include <string>
int main() {
    std::vector<std::string> names;
    names.resize(4);
    names[0] = "Bob"; names[1] = "Sid";
    names[2] = "Jane"; names[3] = "Andrea";
    auto iter = names.begin();
// "auto" represent iter can be any object type, Not know the type until begin()
return something
    std::cout << (*iter);
    iter+=2;
    std::cout << (*iter);
    return 0;
}
```

> Example: List and iterators

### Example of a linked list

```cpp {7-11}
#include <iostream>
#include <list>
#include <string>
int main() {
    std::list<std::string> names;
    names.clear();
    names.push_back("Bob");
    names.push_back("Sid");
    names.push_back("Jane");
    names.push_back("Andrea");
    // Constantly inserting elements at the end of the list
    auto iter = names.begin();
    std::cout << (*iter);
    iter++;
    iter++;
    std::cout << (*iter);
    return 0;
}
```

>Example: linked list

### Other STL types(read books)

```cpp
set<type>
```

represents a type of list which acts as a mathematical set – a list which contains or does not contain elements, without multiplicity or order.  
表示一种列表类型，它作为数学集合使用——一个包含或不包含元素、无重复且无顺序的列表。  
Elements are kept in sorted order.  
元素保持有序排列。

```cpp
multiset<type>
```

similar to a set, but allows multiplicity of elements.  
类似于集合，但允许元素重复。

```cpp
map<type, type>
```

represents a mapping from keys to values, in the same way as a Python dictionary or Java map, <span style="color: red">one key to one value</span>.  
表示从键到值的映射，与 Python 字典或 Java 映射类似，<span style="color: red">一个键对应一个值</span>。

```cpp
multimap<type, type>
```

similar to a map except <span style="color: red">one key can be mapped to many values</span>.  
类似于映射，但<span style="color: red">一个键可以映射到多个值</span>。

### STL Algorithms

- As well as the classes, the STL also offers more advanced algorithms for manipulating the contents of lists and sets.
- 除了类之外，STL 还提供了更高级的算法来操作列表和集合的内容。
- Most of these algorithm functions accept iterators as pointers. This means they can be used on parts of lists as well as actual lists.
- 这些算法函数中的大多数接受迭代器作为指针。这意味着它们可以用于列表的部分以及实际的列表。
- In addition, the standard for syntax can accept arrays or STL collection types to loop through:
- 此外，标准语法可以接受数组或 STL 集合类型进行循环遍历：

```cpp
for(int *x: names) {
    cout << *x;
}
```

- Note that the loop variable is a pointer, to prevent unnecessary copying of the items as they are looped through. A C++ reference can also be used here.
- 注意，循环变量是一个指针，以防止在循环过程中不必要地复制项目。在这里也可以使用 C++引用。

> Example: linked list

## Smart pointers

- Another templated feature provided in modern C++ is <span style="color: red">smart pointers</span>.
- 现代 C++提供的另一个模板化特性是<span style="color: red">智能指针</span>。
- Smart pointers attempt to solve the problem of accidental memory leaks by <u><span style="color: red">automatically</span> destroying the object pointed to when no pointer to it is held</u>.
- 智能指针试图通过<u>在没有任何指针持有该对象时<span style="color: red">自动</span>销毁指向的对象</u>来解决意外内存泄漏的问题。

> Burn after reading
> 阅后即焚

- However, without Java-style reflection this process is not completely transparent.
- 然而，没有 Java 风格的反射，这个过程并不完全透明。

### We use smart pointer to prevent what？

- Memory leak
- 内存泄漏

### Leaking memory (reminder)

```cpp {17,18,22}
#include <iostream>
class Test {
public:
    Test();
    void DoSomething();
    ~Test();
};
Test::Test() {
    std::cout << "Created." << std::endl;
}
Test::~Test() {
    std::cout << "Destroyed." << std::endl;
}
void Test::DoSomething(){
    std::cout << "Doing something." << std::endl;
}
void DoSomething(Test *t){
    t->DoSomething();
}
int main() {
    Test *t = new Test();
    DoSomething(t);
    return 0;
}
```

<u>Output</u>

```console
Created.
Doing something.
```

### With a smart pointer

```cpp
int main() {
    std::unique_ptr<Test> t(new Test());
}
```

<table>
    <tr>
        <td>Keyword <span style="color: red">unique_ptr</span> represent a special pointer<br>关键词 <span style="color: red">unique_ptr</span> 代表一种特殊的指针</td>
        <td><span style="color: red">&lt;…&gt;</span> represent to which type class object pointer points<br><span style="color: red">&lt;…&gt;</span> 表示指向哪个类对象的指针</td>
        <td><span style="color: red">t</span> represent a pointer object which points to one Test type object<br><span style="color: red">t</span> 代表一个指向 Test 类型对象的指针对象</td>
    </tr>
</table>

- Without the smart pointer, only “Created.” is printed. The code does not delete the object created by reference, so the memory used leaks. The operating system eventually reclaims it, but the destructor does not run.
- 没有智能指针，只会打印“已创建。”代码没有删除通过引用创建的对象，所以使用的内存泄漏了。操作系统最终会回收它，但析构函数不会运行。
- With the smart pointer, “Created.” and “Destroyed.” are both printed. The object is properly cleaned up inside the program.
- 使用智能指针，会同时打印“已创建。”和“已销毁。”对象在程序内部得到了适当的清理。

---

```cpp {18,19,23}
#include <iostream>
#include <memory>
class Test {
public:
    Test();
    void DoSomething();
    ~Test();
};
Test::Test() {
    std::cout << "Created." << std::endl;
}
Test::~Test() {
    std::cout << "Destroyed." << std::endl;
}
void Test::DoSomething(){
    std::cout << "Doing something." << std::endl;
}
void DoSomething(Test *t){
    t->DoSomething();
}
int main() {
    std::unique_ptr<Test> t(new Test());
    DoSomething(t.get());
    return 0;
}
```

> Example: smart pointer

<u>Output</u>

```console
Created.
Doing something.
Destroyed.
```

## How unique_ptr works

- When you create an object by reference, instead of storing the address in a pointer, you store it inside a unique_ptr object which is created <span style="color: red">by value</span>. (A unique_ptr object is the same size as a regular pointer, so there is no overhead in storing it by value.)
- 当你通过引用创建一个对象时，不是将地址存储在指针中，而是将其存储在<span style="color: red">通过值</span>创建的 unique_ptr 对象内部。（unique_ptr 对象的大小与常规指针相同，因此通过值存储时没有开销。）
- Because the unique_ptr is created by value, the compiler automatically <span style="color: red">delete</span>s it when it goes out of scope, which runs its destructor.
- 由于 unique_ptr 是通过值创建的，当它超出作用域时，编译器会自动<span style="color: red">删除</span>它，这会调用其析构函数。
- The unique_ptr’s destructor deletes the object it points to.
- unique_ptr 的析构函数会删除它所指向的对象。
- This means that an object referred to by a unique_ptr can be passed around by address in the usual way, but will also be automatically deleted when the pointer goes out of scope.
- 这意味着可以通过地址以通常的方式传递由 unique_ptr 指向的对象，但指针超出作用域时，对象也会自动被删除。

## Managing a unique_ptr

- As the name implies, a unique_ptr must be unique. <span style="color: red">You must not copy a unique_ptr nor construct any other unique_ptr to the same object.</span>
- 正如其名所示，unique_ptr 必须是唯一的。<span style="color: red">您不能复制 unique_ptr，也不能为同一对象构造任何其他 unique_ptr。</span>
- If you do, the object will be destroyed as soon as <span style="color: red">either</span> unique_ptr goes out of scope.
- 如果这样做，对象将在<span style="color: red">任一</span> unique_ptr 超出作用域时立即被销毁。
- Calling the get method on a unique_ptr will retrieve a regular pointer to the same object. You can pass this to functions, etc, which accept transput parameters.
- 调用 unique_ptr 的 get 方法将检索到同一对象的普通指针。您可以将其传递给接受 transput 参数的函数等。
- However, if you <span style="color: red">store</span> that pointer (eg, by putting it in a global list or object) then you must be aware that the pointer could become invalid <span style="color: red">if the original unique_ptr goes out of scope</span>.
- 然而，如果您将那个指针<span style="color: red">存储</span>起来（例如，将其放入全局列表或对象中），那么您必须意识到，<span style="color: red">如果原始 unique_ptr 超出作用域</span>，该指针可能会变得无效。

## Shared_ptr

```cpp
auto sp = std::make_shared<Test>(); //safe way
shared_ptr<Test> sp1(new Test()); //unsafe way
```

- This will create a smart pointer of type shared_ptr. This form of smart pointer can identify when it is copied, and will <span style="color: red">keep track of how many copies are made and destroy the target object only when all copies are removed.</span>
- 这将创建一个类型为 shared_ptr 的智能指针。这种智能指针可以识别何时被复制，并<span style="color: red">跟踪复制了多少次，只有当所有副本都被移除时才会销毁目标对象。</span>
- However, doing this does create a performance overhead. Also, you must take care to only make copies of a shared pointer once you have created it, not to create another shared pointer for the same resource.
- 然而，这样做确实会产生性能开销。此外，您必须注意，一旦创建了共享指针，就只应复制一次，不要为同一资源创建另一个共享指针。
- It may be better to use manual memory management for more complex cases where shared_ptr’s internal management is not necessary.
- 对于共享_ptr 内部管理不必要且更复杂的场景，可能更适合使用手动内存管理。

> Example: Shared_ptr
