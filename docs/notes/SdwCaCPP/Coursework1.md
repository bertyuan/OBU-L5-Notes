# SdwCaCPP Coursework1

## Important Dates

Week 6(an available day in that week): Class test 1.  
Week 6(07/11/2025): coursework 1 project file submission.

## Background

A library is an institution that collects, organizes, preserves, and provides access to a wide range of information resources—including books, e-books, journals, newspapers, audiobooks, videos, and digital databases—for education, research, leisure, and community engagement. Its core purpose is to make knowledge and culture accessible to all, regardless of age, background, or ability. For a university, the library is one of the essential infrastructure facilities. It mainly serves the teachers and students on campus.  
图书馆是一个收集、组织、保存并提供广泛信息资源——包括书籍、电子书、期刊、报纸、有声书、视频和数字数据库——的机构，这些资源用于教育、研究、休闲和社区参与。其核心目的是让知识和文化对所有年龄、背景和能力的人都能获得。对于大学来说，图书馆是基本基础设施之一。它主要服务于校园内的教师和学生。  

A Library Management System (LMS) is a typical software applied in many common libraries. It is usually designed to streamline and automate the day-to-day operations of a library. It centralizes the management of key tasks to save time, reduce errors, and improve user experience. Core functions typically include:  
图书馆管理系统（LMS）是许多常见图书馆中应用的典型软件。它通常被设计用来简化并自动化图书馆的日常运营。它将关键任务的管理集中化，以节省时间、减少错误并提高用户体验。核心功能通常包括：  

- **Resource cataloguing**: Creating and maintaining searchable records (e.g., author, title, subject) for all library materials.
- **资源编目**：为所有图书馆资料创建和维护可搜索的记录（例如，作者、标题、主题）。
- **Circulation management**: Handling check-outs, returns, renewals, and tracking of borrowed items (including overdue notifications).
- **流通管理**：处理借阅、归还、续借以及跟踪借出物品（包括逾期通知）。
- **Patron management**: Storing user profiles, tracking borrowing history, and managing memberships or library cards.
- **读者管理**：存储用户资料、跟踪借阅历史和管理会员资格或图书馆卡。
- **Inventory control**: Monitoring stock levels, identifying lost/damaged items, and facilitating acquisitions of new resources.
- **库存控制**：监控库存水平、识别遗失/损坏的物品，并促进新资源的采购。

For this coursework, you will be creating a very simple LMS to support a small library operation. You are **not** required to write an actual LMS, only the back-end program code that would support one. You will need to complete the LMS based on a rough framework of a CLion project provided, which contains some basic files.  
为此课程作业，您将创建一个非常简单的学习管理系统（LMS）来支持小型图书馆运营。您不需要编写实际的学习管理系统，只需编写支持一个学习管理系统的后端程序代码即可。您需要根据提供的 CLion 项目的大致框架完成学习管理系统，其中包含一些基本文件。  

Complete and extend it by doing the tasks below. Note that the later tasks are less explicitly described than the earlier ones, meaning that you must solve more problems yourself. This is intentional.  
通过完成以下任务来完善和扩展它。请注意，后续任务比早期任务描述得不够明确，这意味着您必须自己解决更多问题。这是故意的。  

The coursework is written to be built using `gcc` through CMake and CLion. It is not recommended that you attempt to build it using Visual Studio or XCode.  
课程作业是用 `gcc` 通过 CMake 和 CLion 构建的。不建议您尝试使用 Visual Studio 或 XCode 构建它。  

## Coursework Tasks

### Task 1

In the current system, there is a `Person` class with some basic properties and member functions. You need to create two derived classes(encode .h and .cpp files respectively) based on it, named `Teacher` and `Student`, which represent the two kinds of users of the library on the campus.  
在当前系统中，有一个 `Person` 类，具有一些基本属性和成员函数。您需要基于它创建两个派生类（分别创建 .h 和 .cpp 文件），命名为 `Teacher` 和 `Student`，代表校园图书馆的两种用户。  

The features of the `Student` class  
`Student` 类的特性  

- A property `major`, indicating what major the student is studying.
- 一个属性 `major`，表示学生所学的专业。
- A property `level`, indicating which level the student is.
- 一个属性 `level`，表示学生所在的层级。
- A property `bookNumber`, indicating the number of books the student borrowed. It should not exceed 2 as the maximum number.
- 一个属性 `bookNumber`，表示学生借阅的书籍数量。最大数量不应超过 2。
- A method `getBook()` to show how many and what books are borrowed by the student.
- 一个方法 `getBook()`，用于显示学生借阅了多少本书以及借阅了哪些书。
- A method `displayInfo()` inherited to show basic information of the student.
- 一个继承的方法 `displayInfo()`，用于显示学生的基本信息。
- Other properties or methods to support you in completing the class properly.
- 其他属性或方法，以支持您正确完成这个类。

The features of the `Teacher` class  
`Teacher` 类的属性  

- A property `department`, indicating which department the teacher belongs to.
- 一个属性 `department`，表示教师所属的部门。
- A property `bookNumber`, indicating the number of books the teacher borrowed. It should not exceed 5 as the maximum number.
- 一个属性 `bookNumber`，表示教师借阅的书籍数量。最大数量不应超过 5。
- A method `getBook()` to show how many and what books are borrowed by the teacher.
- 一个方法 `getBook()`，用于显示教师借阅了多少本书以及借阅了哪些书。
- A method `displayInfo()` inherited to show basic information of the teacher.
- 一个继承的方法 `displayInfo()`，用于显示教师的基本信息。
- Other properties or methods to support you in completing the class properly.
- 其他属性或方法，以帮助您正确完成这个类。

### Task 2

In the current system, there is a `Book` class with some basic properties and member functions. You need to create two derived classes(encode .h and .cpp files respectively) based on it, named `ProfessionalBook` and `Novel`, which represent the two kinds of books.  
在当前系统中，有一个包含一些基本属性和成员函数的 `Book` 类。您需要基于它创建两个派生类（分别创建 .h 和 .cpp 文件），命名为 `ProfessionalBook` 和 `Novel`，以表示这两种书籍。  

The features of the `ProfessionalBook` class  
`ProfessionalBook` 类的特性  

- A property `field`, indicating what field the book belongs to.
- 一个属性 `field`，表示书籍所属的领域。
- A method `displayInfo()` inherited to show basic information of the professional book.
- 一个继承的方法 `displayInfo()`，用于显示专业书籍的基本信息。
- Other properties or methods to support you in completing the class properly.
- 其他属性或方法，以帮助您正确完成这个类。

The features of the `Novel` class  
`Novel` 类的特性  

- A property `genre`, indicating what genre the book is.
- 属性 `genre`，指示书籍所属的类型。
- A method `displayInfo()` inherited to show basic information of the novel book.
- 一个继承的方法 `displayInfo()`，用于显示小说的基本信息。
- Other properties or methods to support you in completing the class properly.
- 其他属性或方法，以帮助您正确完成这个类。

### Task 3

In the current system, there is a `LibrarySpace` class with some basic properties and member functions. You need to create two derived classes(encode .h and .cpp files respectively) based on it, named `BookRoom` and `ReadingRoom`, which represent the two kinds of rooms.  
在当前系统中，存在一个具有一些基本属性和成员函数的 `LibrarySpace` 类。您需要基于它创建两个派生类（分别创建 .h 和 .cpp 文件），命名为 `BookRoom` 和 `ReadingRoom`，以表示两种类型的房间。  

The features of the `BookRoom` class  
`BookRoom` 类的功能  

- A property `category`, indicating what kind of books are stored in the room.
- 属性 `category`，指示房间中存储的书籍类型。
- A method `displayInfo()` inherited to show basic information of the book room.
- 一个继承的方法 `displayInfo()`，用于显示书库的基本信息。
- Other properties or methods to support you in completing the class properly.
- 其他属性或方法，以帮助您正确完成这个类。

The features of the `ReadingRoom` class  
`ReadingRoom` 类的特性  

- A property `multiFunction`, indicating whether the reading room is a multi-function space or not.
- 属性 `multiFunction`，表示阅读室是否为多功能空间。
- A method `displayInfo()` inherited to show basic information of the reading room.
- 一个继承的方法 `displayInfo()`，用于显示阅读室的基本信息。
- Other properties or methods to support you in completing the class properly.
- 其他属性或方法，以帮助您正确完成这个类。

### Task 4

- Modify the book class and the corresponding derived classes so that every book object can record who is borrowing it and when it is borrowed.
- 修改书籍类及其相应的派生类，以便每个书籍对象都能记录借阅者是谁以及何时借阅。
- Modify the person class and the corresponding derived classes so that every teacher or student object can display what books are borrowed and when they are borrowed, respectively.
- 修改人员类及其相应的派生类，以便每个教师或学生对象可以显示分别借阅了哪些书籍以及何时借阅。
- Modify the librarySpace class and the corresponding derived classes so that every room object can display what books are being stored in it.
- 修改图书馆空间类及其相应的派生类，以便每个房间对象可以显示其中存放了哪些书籍。

### Task 5

Please complete the main program to make it a meaningful program by following the instructions.  
请根据以下说明完成主程序，使其成为一个有意义的程序。  

- Create at least 3 student objects, and the basic information of one of the students should be your own basic information.
- 创建至少 3 个学生对象，其中至少一个学生的基本信息应为你自己的基本信息。
- Create at least 2 teacher objects, and the basic information of one of the teachers should be a real one of your instructors.
- 创建至少 2 个教师对象，其中至少一个教师的基本信息应为你真实导师的信息。
- Create at least 2 book room objects, with different categories of books placed in each room.
- 创建至少 2 个图书室对象，每个房间放置不同类别的书籍。
- Create 2 reading room objects, one multi-functional reading room and one normal reading room.
- 创建 2 个阅览室对象，一个多功能阅览室和一个普通阅览室。
- Create at least 5 professional books and 5 novels in different fields and genres.
- 创建至少 5 本不同领域和体裁的专业书籍和 5 本小说。
- Notice: Please use both value definition and reference definition ways to define objects, and pay attention to the difference between these two definition ways in subsequent programming.
- 注意：请使用值定义和引用定义两种方式来定义对象，并在后续编程中注意这两种定义方式的区别。

### Task 6

Apply operational procedures to ensure the effective functionality of the created object.  
将操作程序应用于确保创建的对象有效运行。  

- Allocate books of different categories to their corresponding book rooms.
- 将不同类别的书籍分配到相应的书库。
- Verify that the teachers and students can borrow the books successfully, and that the relevant information is displayed properly.
- 验证教师和学生能否成功借阅书籍，以及相关信息是否正确显示。
- Verify that the book rooms can store books successfully, and that the relevant information is displayed properly.
- 验证书库能否成功存储书籍，以及相关信息是否正确显示。

## Assessment Rules( Very important )

### Assessment Format and Scoring

This coursework will primarily focus on your encoding capabilities as well as your comprehension of object-oriented programming, rather than on your software engineering process (which isn't required to conform to standard procedures during the learning phase).  
本课程作业将主要关注您的编码能力以及您对面向对象编程的理解，而不是您的软件工程过程（在学习阶段，软件工程过程不需要遵循标准程序）。  

The questions of the class test 1 are closely aligned with the coursework 1 tasks. Completing these tasks will significantly enhance your performance and positively impact your class test score.  
第一次课堂测试的问题与第一次课程作业的任务紧密相关。完成这些任务将显著提高您的表现，并积极影响您的课堂测试成绩。  
For class test 1, the assessment format will be a paper examination, and the score obtained on this exam will directly serve as your mark for Coursework 1.  
对于第一次课堂测试，评估形式将是一张试卷，这次考试的成绩将直接作为你课程作业 1 的成绩。  

### Notice on submission

Please note that failure to submit a complete set of project files by the specified deadline will result in a grade of zero.  
请注意，如果在规定的截止日期前未能提交完整的项目文件，将导致成绩为零。  

**Standard rules on plagiarism apply to this coursework.**  
**本课程作业适用标准的剽窃规则。**  

The Code should be your own work and must not be copied from the internet or any other source. If you have difficulty with the coursework, you should approach your practical tutor in the first instance. Posting parts of your answer to the coursework on the publicly available internet where other students may access it will be treated as an incitement to plagiarism. Soliciting or obtaining answers to the coursework in exchange for money and any other consideration will be treated as serious academic misconduct. Asking for coursework answers from any party outside of the University is itself attempted plagiarism, and you should not do it; if that third party commits any of the offenses in this section on your behalf, you may be held responsible, even if you were not directly aware they would do so (because you should not have asked them in the first place).  
代码必须是您自己的作品，不得从互联网或其他来源复制。如果您在课程作业中遇到困难，应首先联系您的实践导师。将您的答案部分发布在公开可访问的互联网上，供其他学生获取，将被视为鼓励剽窃。以金钱或其他任何考虑为交换，索要或获取课程作业答案将被视为严重的学术不端行为。从大学以外的任何一方索要课程作业答案本身就是尝试剽窃，您不应这样做；如果第三方代表您犯下本节中提到的任何罪行，您可能需要承担责任，即使您没有直接意识到他们会这样做（因为您从一开始就不应该向他们提出请求）。  

## Assignment Data

<table>
    <tr>
        <td>Coursework 1<br>submission deadline</td>
        <td>Week 6 (07/11/2025)</td>
    </tr>
    <tr>
        <td>Coursework 1<br>class test</td>
        <td>On an appropriate day in Week 6</td>
    </tr>
    <tr>
        <td>Coursework 2<br>submission deadline</td>
        <td>Week 11 (12/12/2025)</td>
    </tr>
    <tr>
        <td>Coursework 2<br>class test</td>
        <td>On an appropriate day in Week 11</td>
    </tr>
    <tr>
        <td>Assignment Weighting</td>
        <td>Coursework 1 class test weighs 20% of the module<br>Coursework 2 class test weighs 30% of the module</td>
    </tr>
</table>

## Learning Outcomes

- Understand the fundamental concepts of C and C++ programming for object manipulation, data structuring and input/output control.
- 理解 C 和 C++编程的基本概念，包括面向对象操作、数据结构和输入/输出控制。
- Refine a problem specification into a collection of C++ classes.
- 将问题规范细化为一系列 C++类。
- Create a software artifact specified in terms of C++ objects and their interrelations.
- 创建一个以 C++对象及其相互关系为规范的软件工件。
- Research the techniques for safe and efficient programming in C and C++.
- 研究 C 和 C++中安全高效编程的技术。

## Warm Tips

可能出现的错误：  
各个类的cpp文件都已经实现了对应的构造函数、虚函数和必要的成员函数。但编译器仍然报链接错误，很可能是 CMakeLists.txt 没有把所有 cpp 文件都加入到编译目标中。  
如果使用 `add_executable(${name} ${file})`，会为每个 cpp 文件单独生成一个可执行文件（比如 main.cpp 只会和 main.cpp 一起编译，BookRoom.cpp 只会和 BookRoom.cpp 一起编译），而不是把所有相关的 cpp 文件一起编译成一个可执行文件。这会导致 main.cpp 链接不到其它类的实现，出现 undefined symbol 错误。  
正确做法：  
把所有 CHC5028_Coursework1 目录下的 cpp 文件和 main.cpp 一起编译成一个可执行文件。例如：

```cmake
add_executable(main
    CHC5028_Coursework1/main.cpp
    CHC5028_Coursework1/Book.cpp
    CHC5028_Coursework1/BookRoom.cpp
    CHC5028_Coursework1/Date.cpp
    CHC5028_Coursework1/Novel.cpp
    CHC5028_Coursework1/ProfessionalBook.cpp
    CHC5028_Coursework1/ReadingRoom.cpp
    CHC5028_Coursework1/Student.cpp
    CHC5028_Coursework1/Teacher.cpp
)
```
