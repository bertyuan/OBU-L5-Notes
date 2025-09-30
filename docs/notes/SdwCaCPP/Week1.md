# Week 1 - C&C++ basics

## A basic C program:

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

C is not object oriented, and in C++ object orientation is not mandatory as it is in Java.  

You do not have to define classes (in C you cannot) and your `main` “method” must not be in a class (and is thus a function, not a method).

The syntax for defining a function is the same as a method in Java but without the access specifier (`public`/`private` etc.) since these don’t apply to functions.  

The `main` function is the main program. It returns an `int`, which is returned to the operating system.

`puts` is the C function to output a string. (It’s part of stdio, that’s why we imported it.)   
`\n` at the end of the string represents the byte sent to the OS to tell it to move to the next line.



## The same in c++:

```cpp
#include <iostream>
using std::cout;
using std::endl;

int main() {
 cout << “Hello World!” << endl;
 return 0;
}
```

## C++ differences:

- The `.h` can be left off the import. Traditionally built-in C++ libraries have no file extension.
- Instead of using the `stdio` library, we use the `iostream` library and `stream output` operators.
- These are a C++ addition that simplifies output but also makes the syntax more abstract.
- This is a good example of the difference in style between C and C++.


## A simple loop:

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


## Type declarations in C

- In the original C, the types used were the same as in Java – `int`, `float`, etc.
- However, unlike Java, C compiles right down to machine code – and different computers have different abilities to handle numbers in machine code.

- This caused confusion with int meaning different things and having different properties based on the machine being compiled on. As a result, in 1999 the types were respecified to allow the programmer to specify exactly how the computer should store the number.


## Integer standard types

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


## Relative types:

`(U)Int_leastX_t`: declares the variable must have at least X bits but may have more. This is used to allow for systems with machine code that may no longer handle smaller numbers.

`(U)Int_fastX_t`: declares the variable must have at least X bits and should be “fast” on the platform being used. The precise meaning of this is not defined but compilers are supposed to select a type native to the CPU’s code. ---*Rarely used*.


## `Printf`

In Python:  
`print("You have",dogs,"dogs and",cats,"cats.")`  
In C:  
`printf("You have %i dogs and %icats.\n",dogs,cats);`

- The first parameter (called the format string) gives the overall structure of
what you want to print.
- You add “slots” into it with `%i` (or other markers we’ll see later), then fill
them in.

## The loop in C++:

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

## Input

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

## Input in C

- `scanf` is the input equivalent of `printf`.
- Normally modern programs do not use `scanf` because it is bad at handling errors (eg, if the user did not type a number). We will learn to do input better later. Use `scanf` for the moment.
- Note the `&` sign before age in `scanf`. This means that we are passing a pointer to age. This is necessary because we want `scanf` to change the value stored in variable age. We’ll go much more into pointers later on.
- We declare the variable as `int32_t` because this is what the `%i` specifier in `scanf` requires, even though it would be better to use a smaller type for an age.

## Input in C++

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

## Input in C and C++

Again at this stage, the code is similar except we use C++’s IO streaming functions.  

`cin >>` is used for input. Again, this is not ideal at handling errors, although it is better than scanf. But use it for the moment.  

Note there is no & sign before age in the input statement. We still need the value of age to change, so we are still actually passing a pointer. But C++ deals with this for us in the background so we don’t need to add the explicit &.  

This can be helpful, but it can also be awkward, as learning the difference is vital to learning C and C++.

## Conversion Specifiers in C

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
