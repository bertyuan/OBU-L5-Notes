# Week 3 Seminar Exercises - C and C++: Pointers and structures

Complete each of the exercises below using CLion. Test each exercise after implementing it; the exercise is not complete until the program works.

1. Create a C project. Copy and paste the program below which uses and updates a struct.

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

typedef struct {
     char name[20];
     uint16_t enrolledYear;
} student;

void setupStudent(student *student, const char *name) {
     student->enrolledYear = 2017;
     strncpy(student->name, name, 19);
}

int main() {
     student mrValue;
     setupStudent(&mrValue, "Mr Value");
     
     student *msDynamic = (student *) malloc(sizeof(student));
     setupStudent(msDynamic, "Ms Dynamic");
     
     student custom;
     char nameBuffer[40];
     puts("Enter a name: ");
     fgets(nameBuffer, 40, stdin);
     fflush(stdin);
     setupStudent(&custom, nameBuffer);
     
     puts(mrValue.name);
     puts(msDynamic->name);
     puts(custom.name);
     
     free(msDynamic);
     
     return 0;
}
```

Run the program. Note the use of the function `fgets()`. This is (at last!) the "safe" way to do input in C, rather than using `scanf`.

2. Here is how to safely input an integer year:

```c
bool inputOk = false;
uint16_t enyear;
char yearBuffer[5];
puts("Enter a year: ");
while(!inputOk) {
    // Input the candidate value as a string
    fgets(yearBuffer,5,stdin);
    // Try converting it to an integer
    char *endCheck;
    enyear = (uint16_t)strtol(yearBuffer,&endCheck,0);
    // Strtol sets endCheck equal to the address of the
    // last character it converted +1. If the whole string
    // was a year number this should be == to the address
    // of the end of the string
    // parameter 0 means that compiler transforms characters
    // into decimal integers and only accept characters as 0~9 
    if (endCheck == (yearBuffer+strlen(yearBuffer))) {
        inputOk=true;
    } else {
        puts("That wasn't a number.");
    }
    // If more than 4 characters were input, fgets()
    // will only have taken the first 4, so throw away
    // the remaining ones.
    fflush(stdin);
}
printf("%i",enyear);
```

Using this code, and adding some of your own, allow the enrollment year of `custom` to be set by the user as well as the name. *(It would be a good idea to make the code above into a reusable function.)*

3. Modify the program to allocate `custom` dynamically, in the same way that `msDynamic` is allocated.

4. Add a sensibly sized property `yearsCompleted` to the `student` struct. Set it to zero for newly created students.

5. Write a function `advanceStudent` that inputs a student and increases their `yearsCompleted` value by one. Call this on a student from your main program and check that it works.

6. Place the three students, `mrValue`, `msDynamic` and `custom`, into an array. You should think carefully about what to store in the array (values or addresses). Because `mrValue` and `msDynamic` are stored differently, you will need to load them into the array differently.

7. Write a loop that goes through your array of students and calls `advanceStudent` on all of them. Check that the values in the array are updated. Also check if the values stored in `mrValue`, `msDynamic` and `custom` are updated. Should they be? How can you make them be updated, or not be, without adding extra updates to the loop?

8. In languages that allow arrays, or other list structures, to be created without a fixed length, a common data structure used is a **dynamic linked list**. C does not have these built in, but you can create them yourself. We will try to do this now. Start by adding a property to the `student` record called `next`, which is of type `student *`. It should be set to `NULL` (a built-in value) on a newly created student.

9. To create a linked list, rather than storing the students in an array, each student will store a pointer to the "next" one in the list. Modify the program to remove the array and instead store `msDynamic` as the "next" student after `mrValue`, and `custom` as the "next" student after `msDynamic`.

10. Write a function that accepts a linked list of students as a parameter and counts the number of students in it. *(How do you "accept a linked list of students as a parameter"? What structure allows the entire list of students to be accessed, eventually?)*

11. Write a function that accepts a `student` structure and a linked list of students and adds the given `student` to the list. *(Again, think carefully about the use of values and references.)*

---

参考答案：
```c
//
// Created by 不死鸟Anka on 2025/10/13.
//
#include <stdbool.h>
#include <stdio.h>
#include <stdint.h>
#include <string.h>
#include <stdlib.h>

// 原结构体没有名字，会导致编辑器认为 'student*' 类型的表达式被隐式转换为不兼容的指针类型 'struct student*'
// typedef struct {
typedef struct student {
    char name[20];
    uint16_t enrolledYear;
    int yearsCompleted;
    struct student *next;
} student;
/* struct student { ... } 这里的第一个 student 是结构体标签，用于给结构体类型命名。这样可以用 struct student 来声明变量。
 * 最后一个 student; 是类型别名，通过 typedef 可以直接用 student 作为类型名，无需加 struct 前缀。
 * struct student：结构体标签，用于 struct student 这种写法。
 * student：类型别名，用于直接写 student，更简洁。
 * 有了 typedef 后，student 和 struct student 等价。
 */

uint16_t inputEnrollmentYear() {
    bool inputOk = false;
    uint16_t enyear = 0;
    char yearBuffer[5];
    // 清除标准输入缓存
    setbuf(stdin, NULL);
    puts("Enter a year: ");
    while(!inputOk) {
        // Input the candidate value as a string
        fgets(yearBuffer,sizeof(yearBuffer),stdin);
        // Try converting it to an integer
        char *endCheck;
        enyear = (uint16_t)strtol(yearBuffer,&endCheck,0);
        /* strtol()函数用法
         * 将字符串转换成长整型数(long)
         * 头文件 #include <stdlub.h>
         * 其原型为 long int strtol(const char* str, char** endptr,int base);
         * 【参数说明】str 为要转换的字符串，endstr 为第一个不能转换的字符的指针，base 为字符串 str 所采用的进制。
         * 【函数说明】strtol() 会将参数 str 字符串根据参数 base 来转换成长整型数(long)。参数 base 范围从2 至36，或0。参数base 代表 str 采用的进制方式，如base 值为10 则采用10 进制，若base 值为16 则采用16 进制等。
         * strtol() 会扫描参数 str 字符串，跳过前面的空白字符（例如空格，tab缩进等，可以通过 isspace() 函数来检测），直到遇上数字或正负符号才开始做转换，再遇到非数字或字符串结束时(’\0’)结束转换，并将结果返回。
         */
        // Strtol sets endCheck equal to the address of the
        // last character it converted +1. If the whole string
        // was a year number this should be == to the address
        // of the end of the string
        // parameter 0 means that compiler transforms characters
        // into decimal integers and only accept characters as 0~9
        if (endCheck == (yearBuffer+strlen(yearBuffer))) {
            inputOk=true;
        } else {
            puts("That wasn't a number.");
        }
        // If more than 4 characters were input, fgets()
        // will only have taken the first 4, so throw away
        // the remaining ones.
        fflush(stdin);
        /*
         * inputEnrollmentYear() 用 fgets 读取年份，用户输入 2023 并回车，fgets 只读取前 4 个字符，回车符还留在缓冲区。下次输入调用 fgets 时，直接读到这个回车，导致输入值为空。
         * 解决方法：在读取数字后，清空输入缓冲区。
         */
        int c;
        while ((c = getchar()) != '\n' && c != EOF) {
            /* 循环体是空的，什么也不做。
             * 实际作用就是不断调用 getchar() 来“吃掉”输入缓冲区里的字符，直到读到换行符 \n 或者 EOF 为止。 */
        }
    }
    return enyear;
}

/* C 语言中不能直接返回局部数组。正确做法是让函数返回 char*，并在外部传入缓冲区，或者用静态缓冲区。*/
void inputName(char *nameBuffer, size_t bufferSize) {
    // 清除标准输入缓存
    setbuf(stdin, NULL);
    puts("Enter a name: ");
    fgets(nameBuffer, bufferSize, stdin);
    // 去除末尾换行符
    nameBuffer[strcspn(nameBuffer, "\n")] = '\0';
    /* strspn() 从参数 str1 字符串的开头计算连续的字符，而这些字符都完全是 str2 所指字符串中的字符。
     * 简单的说，若 strspn() 返回的数值为n，则代表字符串 str 开头连续有 n 个字符都是属于字符串 accept 内的字符。
     * 函数 strcspn() 的含义与 strspn() 相反
     * strcspn() 从字符串 str 的开头计算连续的字符，而这些字符都完全不在字符串 str1 中。
     * 简单地说，若 strcspn() 返回的数值为 n，则代表字符串 str 开头连续有 n 个字符都不是字符串 str1 中的字符。
     * 换句话说，它返回的是 str1 中第一个出现在 str2 中的字符的索引。
     */
    fflush(stdin);
}

void setupStudent(student *student, const char *name, uint16_t enrolledYear) {
    strncpy(student->name, name, 19);
    student->enrolledYear = enrolledYear;
    student->yearsCompleted = 0;
    student->next = NULL;
}

void advanceStudent(student *student) {
    student->yearsCompleted++;
}

int countStudentsLinkedList(student *head) {
    int count = 0;
    student *current = head;
    while (current != NULL) {
        count++;
        current = current->next;
    }
    // free(current); 此处不能释放 current，因为 current 只是一个指针变量，指向链表中的节点，释放它不会释放链表中的节点，反而会导致悬空指针问题。
    return count;
}

void addStudentToLinkedList(student **head, student *newStudent) {
    if (*head == NULL) {
        *head = newStudent;
    } else {
        student *current = *head;
        while (current->next != NULL) {
            current = current->next;
        }
        current->next = newStudent;
        // free(current); 此处不能释放 current，原因同上
    }
}

int main() {
    student mrValue;
    setupStudent(&mrValue, "Mr Value", 2021);
    student *msDynamic = (student *) malloc(sizeof(student));
    setupStudent(msDynamic, "Ms Dynamic", 2022);

    char nameBuffer[20];
    inputName(nameBuffer, sizeof(nameBuffer));
    // student custom;
    student *custom = (student *) malloc(sizeof(student));
    // setupStudent(&custom, nameBuffer);
    setupStudent(custom, nameBuffer, inputEnrollmentYear());
    // puts(custom.name); // 与 printf("%s\n", custom.name); 等价
    puts(custom->name);
    /* puts会自动在字符串末尾添加换行符
     * 但是 puts() 和 printf() 相比也有一个小小的缺陷，就是如果 puts() 后面的参数是字符指针变量或字符数组，那么括号中除了字符指针变量名或字符数组名之外什么都不能写。*/
    // printf("Enrolled in %i.\n", custom.enrolledYear);
    printf("Enrolled in %i.\n", custom->enrolledYear);
    printf("Initially, years completed is: %i.\n", custom->yearsCompleted);
    advanceStudent(custom);
    printf("After advancing...\n");
    printf("Years completed is: %i.\n", custom->yearsCompleted);

    printf("\n");
    printf("Array:\n");
    // student students[] = {mrValue, *msDynamic, *custom};
    // 上面这种方式不能修改数组元素的值，因为 mrValue 是一个结构体变量，*msDynamic 和 *custom 是解引用指针得到的临时结构体副本，修改它们不会影响原始数据。
    student *students[] = {&mrValue, msDynamic, custom};
    /* sizeof(students) 得到整个数组占用的字节数，sizeof(student) 得到单个结构体占用的字节数。两者相除就得到数组的元素个数。
     * 例如：如果 students 占 60 字节，student 占 20 字节，则有 60/20=3 个元素。*/
    // printf("We have %lu students.\n", sizeof(students)/sizeof(student));
    printf("We have %lu students.\n", sizeof(students)/sizeof(students[0]));
    printf("We have %lu bytes for the array.\n", sizeof(students));
    for (size_t i = 0; i < sizeof(students)/sizeof(students[0]); i++) {
        printf("%s enrolled in %i and has completed %i years.\n",
               students[i]->name, // students[i].name,
               students[i]->enrolledYear, // students[i].enrolledYear,
               students[i]->yearsCompleted); // students[i].yearsCompleted);
        printf("After advancing...\n");
        advanceStudent(students[i]);
        printf("%s has now completed %i years.\n",
               students[i]->name, // students[i].name,
               students[i]->yearsCompleted); // students[i].yearsCompleted);
    }

    // 动态链表
    printf("\n");
    printf("Dynamic linked list:\n");
    mrValue.next = msDynamic;
    msDynamic->next = custom;
    custom->next = NULL;
    student *current = &mrValue;
    printf("We have %i students.\n", countStudentsLinkedList(&mrValue));
    while (current != NULL) {
        printf("%s enrolled in %i and has completed %i years.\n",
               current->name,
               current->enrolledYear,
               current->yearsCompleted);
        current = current->next;
    }
    printf("Now adding a new student to the linked list.\n");
    student *newStudent = (student *) malloc(sizeof(student));
    char newNameBuffer[20];
    inputName(newNameBuffer, sizeof(newNameBuffer));
    setupStudent(newStudent, newNameBuffer, inputEnrollmentYear());
    addStudentToLinkedList(&mrValue.next, newStudent);
    printf("We now have %i students.\n", countStudentsLinkedList(&mrValue));
    current = &mrValue;
    while (current != NULL) {
        printf("%s enrolled in %i and has completed %i years.\n",
               current->name,
               current->enrolledYear,
               current->yearsCompleted);
        current = current->next;
    }
    free(msDynamic);
    free(custom);
    return 0;
}
```