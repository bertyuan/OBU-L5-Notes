
# Software Development with C and C++

> [!info]
> Leon Liang  
> Tel: 18080987933  
> Email: leon@zy.cdut.edu.cn  

## Week 1 - C&C++ basics

### A basic C program:

```c
#include <stdio.h>

int main(){
  puts("Hello World!\n");
  return 0;
}
```

`#include` in C resembles import in Java or Python, except that the imported material is a header file; what this means will be discussed later.  
The angle brackets `<>` tell C to search for the `stdio.h` file in the compiler’s standard libraries.  
Using quotes `""` is legal but tells C that the file should be in the same directory.  

C is not object o#### Strings in C: Copying
```c
char name[20];
name[20] = "Bob";ted, and in C++ ob#### Strings in C: Compare
```c
char name[20];
scanf("%19s",name); orientation is not mandatory as it is in Java.  
You do not have to define classes (in C you cannot) and your `main` “method” must not be in a class (and is thus a function, not a method).

The syntax for defining a function is the same as a method in Java but without the access specifier (`public`/`private` etc.) since these don’t apply to functions.  
The `main` function is the main program. It returns an `int`, which is returned to the operating system.

`puts` is the C function to output a string. (It’s part of stdio, that’s why we imported it.)   
`\n` at the end of the string represents the byte sent to the OS to tell it to move to the next line.

---

### The same in c++:

```cpp
#include <iostream>
using std::cout;
using std::endl;

int main() {
 cout << “Hello World!” << endl;
 return 0;
}
```

---

### C++ differences:

- The `.h` can be left off the import. Traditionally built-in C++ libraries have no file extension.
- Instead of using the `stdio` library, we use the `iostream` library and `stream output` operators.
- These are a C++ addition that simplifies output but also makes the syntax more abstract.
- This is a good example of the difference in style between C and C++.

---

### A simple loop:

```c:line-numbers
#include <stdio.h>
#include <stdint.h>

int main() {
  for (uint8_t x=0; x<10; x++) {
    printf(“%i\n”,x);
  }
  return 0;
}
```

Looking at the `for` loop:

```c:line-numbers=5
  for (uint8_t x=0; x<10; x++) {  
    printf(“%i\n”,x);            
  }                              
```

As mentoned before, the `for` syntax in C and C++ is identical to Java. (Java copied it from C++!)  
The `printf` (print formatted) function is used to print out strings containing numbers or other material.  
Also note the type declaration is unusual.

---

### Type declarations in C

- In the original C, the types used were the same as in Java – `int`, `float`, etc.
- However, unlike Java, C compiles right down to machine code – and different computers have different abilities to handle numbers in machine code.

- This caused confusion with int meaning different things and having different properties based on the machine being compiled on. As a result, in 1999 the types were respecified to allow the programmer to specify exactly how the computer should store the number.

---

### Integer standard types

| Type      | Memory  | Min                        | Max                         |
|-----------|---------|----------------------------|-----------------------------|
| `int8_t`  | 1 byte  | -128                       | 127                         |
| `uint8_t` | 1 byte  | 0                          | 255                         |
| `int16_t` | 2 bytes | -32768                     | 32767                       |
| `uint16_t`| 2 bytes | 0                          | 65535                       |
| `int32_t` | 4 bytes | -2147483648                | 2147483647                  |
| `uint32_t`| 4 bytes | 0                          | 4294967295                  |
| `int64_t` | 8 bytes | -9223372036854775808       | 9223372036854775807         |
| `uint64_t`| 8 bytes | 0                          | 18446744073709551615        |

- Modern processors can handle up to 32-bit numbers in single machine code instructions. Many can handle 64-bit numbers.
- However, smaller embedded systems may only be able to deal with 16-bit or even 8-bit numbers directly in their machine code.
- Managing larger numbers on these systems requires the compiler to include extra code to transfer carry, etc, information between parts of the number.

---

### Relative types:

`(U)Int_leastX_t`: declares the variable must have at least X bits but may have more. This is used to allow for systems with machine code that may no longer handle smaller numbers.

`(U)Int_fastX_t`: declares the variable must have at least X bits and should be “fast” on the platform being used. The precise meaning of this is not defined but compilers are supposed to select a type native to the CPU’s code. ---*Rarely used*.

---

### `Printf`

In Python:  
`print("You have",dogs,"dogs and",cats,"cats.")`  
In C:  
`printf("You have %i dogs and %icats.\n",dogs,cats);`

- The first parameter (called the format string) gives the overall structure of
what you want to print.
- You add “slots” into it with `%i` (or other markers we’ll see later), then fill
them in.

---

### The loop in C++:

```cpp:line-numbers
#include <iostream>
using namespace std;

int main() {
  for (uint8_t x=0; x<10; x++) {
    cout << +x << endl;
  }
return 0;
}
```

The code is mostly the same as in C except we are using the iostream facilities C++ provides.   
This is cleaner than printf:
```cpp
cout << "You have " << dogs << " dogs and " << cats << " cats." << endl;
```

---

```cpp
#include <iostream>
using namespace std;

int main() {
  for (uint8_t x=0; x<10; x++) {
  cout << +x << endl;
  }
return 0;
} 
```

However, note the `+` before `x`. This is because, without the specific information printf gives, C++ has to assume what format to use to print the contents of the variable. In the case of an 8-bit integer, by default, it assumes wrong! (It’s ok for larger integers though..)

---

A test, please run this line and see the result:

```cpp
#include <iostream>
using namespace std;

int main() {
for (uint8_t x=0; x<2; x++) {
  cout << +x << endl;
  cout<<-x<<endl;
  cout<<x<<endl;
  }

cout<<sizeof(int)<<endl;
cout<<sizeof(uint16_t );

return 0;
}
```


::: details See the output
The output is:
```
0
0
null
1
-1
null
4
2
```
:::

---

### Input

```cpp
int main() {
  int32_t age;
  puts(“How old are you?”);
  scanf(“%i”,&age);
  printf(“You typed %i.\n”,age);
  if (age > 18) {
    puts(“You can vote.”);
  }
return 0;
}
```

### Input in C

- `scanf` is the input equivalent of `printf`.
- Normally modern programs do not use `scanf` because it is bad at handling errors (eg, if the user did not type a number). We will learn to do input better later. Use `scanf` for the moment.
- Note the `&` sign before age in `scanf`. This means that we are passing a pointer to age. This is necessary because we want `scanf` to change the value stored in variable age. We’ll go much more into pointers later on.
- We declare the variable as `int32_t` because this is what the `%i` specifier in `scanf` requires, even though it would be better to use a smaller type for an age.

### Input in C++

```cpp
int main() {
  uint16_t age;
  cout << “How old are you?”;
  cin >> age;
  cout << “You typed” << age <<
  endl;
  if (age > 18) {
    cout << “You can vote.”;
  }
return 0;
}
```

### Input in C and C++

Again at this stage, the code is similar except we use C++’s IO streaming functions.  

`cin >>` is used for input. Again, this is not ideal at handling errors, although it is better than scanf. But use it for the moment.  

Note there is no & sign before age in the input statement. We still need the value of age to change, so we are still actually passing a pointer. But C++ deals with this for us in the background so we don’t need to add the explicit &.  

This can be helpful, but it can also be awkward, as learning the difference is vital to learning C and C++.

---

### Conversion Specifiers in C

| Conversion | Output Specification                                        |
|------------|-------------------------------------------------------------|
| `%a`       | Floating-point number, hexadecimal (16进制) digits and p-notation |
| `%c`       | Single character.                                           |
| `%d`       | Signed decimal integer.                                     |
| `%e`       | Floating-point number, e-notation.                          |
| `%f`       | Floating-point number, decimal notation.                    |
| `%i`       | Signed decimal integer (same as %d).                        |
| `%o`       | Unsigned octal integer.                                     |
| `%p`       | A pointer.                                                  |
| `%s`       | Character string.                                           |
| `%u`       | Unsigned decimal integer.                                   |
| `%x`       | Unsigned hexadecimal integer, using hex digits 0–F.         |
| `%%`       | Prints a percent sign.                                      |

---

## Week 2 - Function, String and Arrays

### Table of content

- Function in C
- Variable with value and reference
- Array in C and C++
- String in C and C++
- Functions/methods of string

### Function in C/C++

| Java            | C                    | C++                      |
|-----------------|----------------------|--------------------------|
| member function | independent function | member function (method) |

```c
Return_type/void function_name(Arg_List){
Function body;
}
```
`Arg_List` is a comma separated list of arguments.  

Example:
```c
int TestFunction(int x){
return x+1;
}
```

### Passing parameters in C/C++ functions

- Parameters: 形式参数
- Arguments: 实际参数


In C and C++ there are two methods of passing parameters to a function.
1. Pass by value:
  - A copy of the parameter is passed to the function.
  - The parameter itself **cannot be modified** within the function.
2. Pass by reference:
  - *Memory address* of the parameter is passed.
  - The parameter **can be modified** within the function.

### A function example in C: Pass by value

```c
int addOneTo(int x) {
  x++;
  return x;
}
int main() {
  int x = 20;
  int y = addOneTo(x);
  printf(“%i\n”,x);
  printf(“%i\n”,y);
  return 0;  // display 20 and 21
}
```

### A function example in C: Pass by reference

```c
int addOneTo(int *x) {
  *x = *x + 1;
  return *x;
}
int main() {
  int z = 20;
  int y = addOneTo(&z);
  printf(“%i\n”,z);
  printf(“%i\n”,y);
  return 0;  // display 21 and 21
}
```

> [!TIP]
> Thinking Question:  
> What is the real meaning of the “*X”

### How variables are stored

- When you create a variable, the compiler allocates some space in
memory for the variable.
- When the variable is later referred to, it can be in two senses:
  - The actual **value** of the variable;
  - The location in memory of the variable (the **address** or **reference**).
- To pass a variable to a function, one of these **must be copied** to be given to the function. (Making a copy of some kind is inevitable because there must be a **fixed location** in memory the function reads to find out what to work on.)

### Value & Reference

The process of using value and reference types is hidden in Java, but is explicit in C (and in C++ to a lesser extent)

You have already used this when you call `scanf` in C.  
```c
int number;
scanf(“%i”,&number);
```
The `&` operator gives the address of the named variable.  

You need to provide the address to `scanf` so it can update the contents of the variable `number`.  

### Accepting references via pointer

```c
void addOneTo(uint16_t *x) {
  *x = *x + (uint16_t)1;
}
int main() {
  uint16_t b = 2;
  addOneTo(&b);
  printf(“%i\n”,b);
}
```

#### Tell the difference

```c
#include <stdio.h>

uint16_t addOneTo(uint16_t *x)
{
  *x = *x + (uint16_t)1;
  return *x; // [!code --]
  return x; // [!code ++]
}

int main(){
  uint16_t x = 2;
  printf("%i\n", x);
  uint16_t y = addOneTo(&x);
  printf("%i\n", x);
  printf("%i\n", y);
  return 0;
}
```

### Accepting references

```c
void addOneTo(uint16_t *x) {
  *x = *x + (uint16_t)1;
}
```

This shows how you can write a function that updates its parameter, like `scanf`. 
- `uint16_t *x` declares that <span style="color: red">x</span> holds <span style="color: red">the address of</span> a 16-bit unsigned integer (this is called a <span style="color: red">pointer</span>) 
- `*x` tells C to go to the address stored in <span style="color: red">x</span> and read or update the value there.
<p style="text-align:center;">This is called <span style="color: red">dereferencing（解除引用）</span></p>

```c
int main() {
    uint16_t b = 2;
    addOneTo(&b);
    printf(“%i”,b);
}
```

- When we call addOneTo(), we have to pass it a pointer, not a number. So we use the <span style="color: red">&amp;</span> operator.
- Note that we are passing a basic type, an int, by reference here. One of the benefits of <span style="color: red">references being explicit（显式引用）</span> in C is that we can pass any type we choose by reference or by value.

##### Accepting references in C

```c
void addOneTo(uint16_t &x) {
    x = x + (uint16_t)1;
}
int main() {
    uint16_t b = 2;
    addOneTo(b);
    printf(“%i”,b);
}
```

Try to figure out the result:

```cpp
#include <iostream>
void addOneTo(uint16_t *x) {
    (*x) ++;
}
void addOneTo2(uint16_t y) {
    y++;
    printf("the intermediate variable is %i \n",y);
}
void addOneTo3(uint16_t &y) {
    y++;
    printf("the intermediate variable is %i \n",y);
}
int main() {
    uint16_t b = 2;
    printf("%i, \n", b);
    addOneTo(&b) ;
    printf("%i. \n", b);
    addOneTo2(b);
    printf("add again without pointer, the result is %iln ", b);
    addOneTo3(b);
    printf("add again with &, the result is %i\n ", b);
}
```

```console
2,
3.
the intermediate variable is 4
add again without pointer the result is 3
 the intermediate variable is 4
add again with & the result is 4
```

C language can’t accept the function arguments like `void addOneTo3(int &x);`  
> Sorry, I wrote it in a C++ environment ---- Leon Liang

##### Accepting references in C++

- In C++, declaring a parameter with an <span style="color: red">&amp;</span> instead of a <span style="color: red">*</span> creates a special reference parameter (called a <span style="color: #8B0000">reference</span> rather than a <span style="color: #8B0000">pointer</span>)
- It behaves like the pointer did in C, except that the compiler deals with getting addresses and dereferencing for you.
- You do not have to remember to write `&b` when calling the function, nor to write `*x` when modifying the value, <span style="color: red">because</span> the compiler knows that the type is a reference and inserts these for you.

---

```cpp
#include <iostream>
using namespace std;
int main() {
    int *p;
    *p = 123;
    cout<<*p<<endl;
    cout<<p<<endl;
    return 0;
}
```

```console
(empty)
```

Note the difference
```cpp
#include <iostream>
using namespace std;
int main() {
    int *p;
    int q;
    q = 123;
    p = &q;
    cout<<*p<<endl;
    cout<<p<<endl;
    return 0;
}
```

```console
123
0x8000127e0
```

<span style="color: red">Where is the “123” in memory?</span>

---
- Danger awaits those who incautiously use pointers.
- When you create a pointer in C++, <span style="color: red">the computer allocates memory to hold an address, but it does not allocate memory to hold the data to which the address points.</span>
- Creating space for the data involves a separate step. Omitting that step, as in the above, is an invitation to disaster.
```cpp
int main() {
    int *p = new int;
    *p = 123;
    cout<<*p<<endl;
    return 0;
}
```
<span style="color: red">Thinking Question: Ok or not? Why?</span>

```console
123
```

`new`: allocate memory -> constructor  
`int *p = new int;`: 请求分配一块内存给变量（此变量只有指针，没有变量名）

---
- The `<<` operator in C++ (as in `cin >> name`) works like this. It is declared to accept a reference, so you do not have to write `&name;` C++ <span style="color: red">automatically</span> passes in the address because it knows `<<` accepts a reference.
- Using this syntax can help prevent mistakes.
- However, it also hides what is going on.

###### Summary

Now, the difference between \* and &:  
<span style="color: red">&amp; is the reference operator, and * is the dereference.</span>

| &                                        | \*                                               |
| ---------------------------------------- | ------------------------------------------------ |
| is used to get the address of a variable | is used to create a variable to store an address |

### Declaring an array in C

`uint16_t scores[20];`  
The C compiler will:
- Look at the size of the array (20) and the size of the type you asked for. Then multiply these together to get a total size for the array.
- Reserve that much memory in the static data area of the program and store the address of this memory.
- Treat anything mentioning the variable <span style="color: #8B0000">scores</span> as meaning that <span style="color: red">address</span>.

### Arrays: watch out!

`uint16_t scores[20];`
- `scores[0]` will give a uint16
- ...
- `scores[19]` will give a uint16
<span style="color: #8B0000">scores</span> on its own will give an <span style="color: #8B0000">address</span>
`scores2 = scores;`
- will not copy the entire array. It will <span style="color: red">set the address of scores2 equal to the address of scores</span>. This means that both will refer to the same area of memory and changes made to one will apply to the other.

### Using an array in C

```c
int main() {
    uint32_t scores[5];
    for (uint8_t x=0; x<5; x++) {
        printf(“Enter score %i: ”,x);
        scanf(“%u”, &scores[x]);
    }
    for (uint8_t x=0; x<5; x++) {
        printf("%u ", scores[x]);
    }
    printf("\n");
}
```

### Strings in C

- In C, a string is just <span style="color: red">an array of characters</span>. 
    `char name[20];`
- Note that since it is an array, you <span style="color: red">must</span> specify a maximum length.
- The actual length of the string is <span style="color: #8B0000">not stored directly!</span>
---
- To mark the actual length of the string, C inserts a Null character (ASCII 0) in the array after the last character.
- This means that `name[20]`can actually store only up to 19 characters because there must be a room for the Null character.
- When inputting a string using `scanf`, it is important to restrict the length that can be input to ensure there is no attempt to store a longer string than the array can hold.
---
```c
char str[6] = “Hello”;
puts(str);
```
Will display: `Hello`  
Here, `str` is a **pointer/memory address!**  
![](Pasted_image_20250929114054.png)

---
- `char str[6] = “Hello”;` is allowed.
- This allocates enough memory to store “Hello\0” and stores the **starting address** in str.
- However, `str = “Hello”` does not work!
### Strings in C: Copying
```c
char name[20];
name[20] = “Bob”;
```
Why doesn’t this work?
> ➢ Machine code has no way to handle variable length strings.  
> ➢ Every time you work with a string, the compiler has to insert machine code loops to manage them character by character.

How to fix it?

```c
char name[20];
name[0] = ‘B’; // Single quote for char type
name[1] = ‘o’;
name[2] = ‘b’;
name[3] = ‘\0’; // Null character.
```

---

In fact, this is exactly what the `strcpy` function does, but with a loop.  
Format: `char *strcpy(char *dest, char *src);`  
Example: `strcpy(name,”Bob”);`  
<span style="color: red">In C/C++: Double quotes (“”) for strings and single for char type.</span>

### Strings in C: Compare

```c
char name[20];
scanf(“%19s”,name);
if (name == “Bob”) {
    puts(“Hello Bob.”);
} else {
    puts(“I don’t know you.”);
}
```

Why does this always print “I don’t know you”, even if you type “Bob”?
> ➢ <span style="color: red">Name</span> stores an address.  
> ➢ comparing the address stored in <span style="color: red">name</span> with the address where the compiler stored the constant string `Bob`.

- Again, to compare strings the function `strcmp` is provided. This encapsulates the loop necessary to compare the strings.
- Also, it returns 0 if the strings match which must be allowed for in the if statement.
- `if (strcmp(“Bob”,name) == 0) {`
#### C string functions
- `strcpy(a,b)`
    Copy string from b to a.
- `strncpy(a,b,n)`
    Copy up to n characters of string from b to a.
- `strcmp(a,b)`
    Compare strings a and b, return 0 if they match.
- `strcat(a,b)`
    Append string b to a. A must have been declared large enough to hold the result.
- `strlen(a)`
    Get actual length (not including zero terminator) of string stored in a.

```c
char phrase[20];
strcpy(phrase,”Hello There”);
```

- Suppose we now wanted to modify <span style="color: red">phrase</span> so that it contains “Hello Chris”.
- We could <span style="color: red">strcpy</span> the whole phrase into the array, overwriting the previous one.
- But we can also do: 
    `strcpy(phrase+6,”Chris”);`
- A preferable syntax for this is 
    `strcpy(&phrase[6],”Chris”);`
- Phrase holds an address. At that address are stored the bytes 
    `H e l l o <spc> …`
- Thus, moving the address on by 6 bytes will reach the address where `T h e r e` is stored. And we can copy “Chris” into this address.

### C++ strings

- C++ has a type <span style="color: red">string</span> which is a <span style="color: red">class</span>, like Java strings.
- All of the complex loops are hidden inside the methods of the class.
- C++ allows methods to <span style="color: red">override</span> the basic operators applied to a class type.
- So using = on a C++ string actually calls a method that acts like <span style="color: red">strcpy</span>. Using == to test equality calls a method that acts like <span style="color: red">strcmp</span>.

#### C++ string methods

`string s;`
- `s.length()`
    Gives length of the string.
- `s.append(“test”)`
    Appends a string to the end of the string.
- `s.insert(2,”add”)`
    Inserts a string in the middle of the string.
- `s.erase(2,3)`
    Deletes characters in the middle of the string.  
…And many other methods you can find in online references.

### Inputting C++ strings

- You can input a string in C++ using `cin << s` as usual.
- <span style="color: red">Caution</span>, the input will stop at a whitespace character (such as a space).
- To input a line ending in a return, use the function `getline(cin, s);`
- Just like `<<`, `getline` uses reference parameters so you are effectively <span style="color: red">passing the address of</span> `s`, even without writing it explicitly.

### C++ string and C strings

- Every C++ string contains an embedded C-style string (array of characters) which you can access as `s->data`.
- In C++, you can turn a C-string into a C++ string by wrapping it in a string object: 
    `string cppstring(cstring);`  
    or  
    `string* cppstring = new string(cstring);`  

### C and C++

- Given that C++ is much more convenient, you might be wondering <span style="color: red">why does anyone use C</span>?
- In exchange for programmer convenience C++ (and many modern languages) hides complexity from the programmer. It is easy to write code which takes a lot of CPU time or memory without realizing it, because it is hidden.
- When writing programs that need to be <span style="color: red">small</span> and <span style="color: red">efficient, you’d better encoding by C.</span>
- C makes sure you are fully aware of what is going on.

### Summary

- The key symbol & in C
- The meaning of the pointer
- The composition of the Char Array
- How the compiler identify array in C or string in C++
- Functions and methods of String