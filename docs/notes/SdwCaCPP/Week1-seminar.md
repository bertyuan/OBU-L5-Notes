# Week 1 Seminar

---

活动域/生存域/生存周期
使用cin时可不用 `&`（reference）

```cpp
#include <iostream>  
using namespace std;  
int main() {  
    char ch[5] = {[0] = 'A', [1] = 'B', [2] = 'C'};  
    cout << ch;  
    return 0;  
}
```

>[!INFO]
>字符型数组是一种数据结构，用于存储一系列相同数据类型的字符元素，每个元素都是一个字符。在许多编程语言中，字符型数组是存储字符串的基本方式，通过添加一个特殊的空字符('\0') 作为字符串的结尾标记。  

## 当周习题参考

1. Compile and run the basic "Hello, World!" program in C that is provided by CLion when you create a "C Executable".

::: code-group

```c [c]
#include <stdio.h>
int main() {
    for (int x=1; x<21; x++) {
        printf("%d and then...\n", x);
    }
    printf("that's all.\n");
    return 0;
}
```

```cpp [cpp]
#include <iostream>

int main()
{
    std::cout << "Hello World" << std::endl;
    return 0;
}
```

:::

2. Referring to the slides for example code, write a C program that counts from 1 to 20, printing out each number as it goes followed by "and then.." on a separate line, then finally printing "that's all." The output should look like:

```txt
1 and then..
2 and then..
3 and then..
(and so on)
20 and then..
that's all.
```

```cpp
#include <iostream>
using namespace std;
int main() {
    for (uint8_t x=1; x<21; x++) {
        cout << +x << " and then..."<< endl;
    }
    cout << "that's all." << endl;
    return 0;
}
```

3. Modify this C program so that it asks the user what number they want to count up to, and counts up to that number.

::: code-group

```c
#include <stdio.h>
int main() {
    int number;
    printf("What number you want to count up to?\n");
    scanf("%d", &number);
    while (number < 1 || number > 100) {
        printf("Please enter a number between 1 and 100: ");
        scanf("%d", &number);
    }
    for (int x=1; x<number+1; x++) {
        printf("%d and then...\n", x);
    }
    printf("that's all.\n");
    return 0;
}
```

```cpp
#include <iostream>

int main()
{
    std::cout << "Enter a number: ";

    int n = 0;
    if (std::cin >> n) {
        for (int i = 1; i <= n; ++i) {
            std::cout << i << " and then.." << std::endl;
        }
    }

    std::cout << "that's all." << std::endl;
    return 0;
}
```

:::

4. Modify the C program so that if the user enters a number less than 1 or more than 100, the program displays an error message and asks them to enter a new number. (`While` and `Do..while` statements in C have the same syntax as Java.)

```cpp
#include <iostream>

int main()
{
    int n = 0;

    std::cout << "Enter a number: ";
    std::cin >> n;

    while (n < 1 || n > 100) {
        std::cout << "Error. Please enter a number between 1 and 100: ";
        std::cin >> n;
    }

    for (int i = 1; i <= n; ++i) {
        std::cout << i << " and then.." << std::endl;
    }

    std::cout << "that's all." << std::endl;
    return 0;
}

```

5. Compile and run the basic "Hello, World!" program in C++ that is provided by CLion when you create a "C++ Executable".

```cpp
#include <iostream>

int main()
{
    std::cout << "Hello World" << std::endl;
    return 0;
}

```

6. Modify the program to ask the user what their name is, and then say "Hello" to them by name. (In C++ the type of a string is `string`. In C strings are more complicated, so don't try and do this in C for now.)

```cpp
#include <iostream>
using std::string;

int main()
{
    string name;
    std::cout << "Enter your name: ";
    std::cin >> name;

    std::cout << "Hello, " << name << "!" << std::endl;
    return 0;
}
```

7. Write a function that inputs a 16-bit integer and returns true if it is even. (Remember that your main function shows the pattern of a function definition. The type for booleans in C and C++ is `bool`. Modulus and equality are `%` and `==` as in Java.) Add this function to your C++ program and test it by calling it on 3 and 4.

```cpp
#include <iostream>
using namespace std;

bool isEven(int16_t number)
{
    return (number % 2) == 0;
}


int main()
{
    std::cout << "Enter an integer number: ";
    int16_t number;
    std::cin >> number;

    if (isEven(number)) {
        std::cout << "The number you entered is even." << std::endl;
    } else {
        std::cout << "The number you entered is odd." << std::endl;
    }
    return 0;
}
```

8. Modify the program to ask the user for a number and then tell them if it is odd or even.

```cpp
#include <iostream>
using namespace std;

bool isEven(int16_t number)
{
    return (number % 2) == 0;
}


int main()
{
    std::cout << "Enter an integer number: ";
    int16_t number;
    std::cin >> number;

    if (isEven(number)) {
        std::cout << "The number you entered is even." << std::endl;
    } else {
        std::cout << "The number you entered is odd." << std::endl;
    }
    return 0;
}
```

9. A common belief in Japan is "yakudoshi", meaning "unlucky ages". The unlucky ages are 25, 42, and 61 for men, and 19, 33, and 37 for women. Modify your C++ program to first ask the user if they are a man or a woman, then ask their age, and print out if their current age is a yakudoshi or not. Make use of the switch statement. (The switch statement is the same in C and C++ as in Java. Don't forget the `breaks`!)

```cpp
#include <iostream>

int main()
{
    char gender;
    int age;

    std::cout << "Enter your gender (M/F): ";
    std::cin >> gender;
    std::cout << "Enter your age: ";
    std::cin >> age;

    switch (gender)
    {
    case 'M':
    case 'm':
        if (age == 25 || age == 42 || age == 61)
        {
            std::cout << "You are in your Yakudoshi year!" << std::endl;
        }
        else
        {
            std::cout << "You are not in your Yakudoshi year." << std::endl;
        }
        break;

    case 'F':
    case 'f':
        if (age == 19 || age == 33 || age == 37 || age == 61)
        {
            std::cout << "You are in your Yakudoshi year!" << std::endl;
        }
        else
        {
            std::cout << "You are not in your Yakudoshi year." << std::endl;
        }
        break;

    default:
        std::cout << "Unrecognized gender input." << std::endl;
        break;
    }

    return 0;
}
```
