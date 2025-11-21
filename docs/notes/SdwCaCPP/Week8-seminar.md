# Week 8 Seminar - Code Re-Use & Building

Complete each of the exercises below using CLion. If you have difficulty writing a program, try writing it in Java or Python first to get an idea of the structure to use. Although most programs written in C will also run in C++, if you are asked to write a program in C++ you are expected to make use of C++'s features.

1. Create a new C++ project. Cut and paste the following code (from previous week) that uses several classes with inheritance.

```cpp
#include <iostream>
#include <cstdlib>
#include <unistd.h>

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

    sleep(10);
}
```

2. Compile the project (without executing it yet) by hitting Ctrl+F9 or via the “Run”->“Click” menu or by hitting the corresponding toolbar button.

- How many object files, libraries, executables and are created?

3. Run the program. Where did CLion store the file? Open the location in the file browser. Open the file `CMakeLists.txt` in CLion. Change the name of the executable in `CMakeLists.txt` and see how the contents of the file browser change.

4. Under windows, the executable cannot yet be executed by double-click in the file browser, because windows does not by default use the libraries of the compiler we are using. Under other operating systems, this may run as it is. Add the following line to the `CMakeLists.txt` right before the `add_executable`:

```cmake
set(CMAKE_CXX_FLAGS "-static-libstdc++ -static-libgcc")
```

> [!TIP]
> 此编译标识表示将标准库打包进可执行文件，这样编译的程序在未安装标准库的计算机上也可以运行，但程序体积会增大。

- Click “Reload changes” and build the program. Now double-click the executable file in the file browser.

5.  Add the following line to the `CMakeLists.txt` before the `add_executable` and build the software again.

```cmake
set(CMAKE_VERBOSE_MAKEFILE ON)
```

> [!TIP]
> 显示详细的原始编译信息，主要用于定位一些链接错误，看看库路径什么的是否配置对。
> [CMake使用精要-CSDN博客](https://blog.csdn.net/qq_17308321/article/details/89345489)

- Which compiler is used here?
- How to the contents of the CMakeLists.txt determine what is happening here?

6. We now want to make the classes `CubeSide` and `FidgetCube` reusable by placing them in separate file and creating a shared library for them. A simple way to create new class files is to right-click on the project in CLion’s left pane and select “New”->“C++ Class” (or separately “C++ Source File” and “C++ Header File”). Create source and header files for both classes `CubeSide` and `FidgetCube`. Note that compile guards will already be present in the header, and that the source file will correctly include the respective header. Move the the class declarations and implementations from `main.cpp` into the appropriate header and source files.

> [!TIP]
> CLion会自动添加 `compile guard`
> `#ifndef STANDALONE_WEEK8_CUBESIDE_H`
> `#define STANDALONE_WEEK8_CUBESIDE_H`
> `...`
> `#endif //STANDALONE_WEEK8_CUBESIDE_H`

7. The new files are not built and linked by default. Modify the `CMakeLists.txt`:

- Create a new shared library by using `add_library` and include the separate source files into it.
- Behind both the library and executable additions in `CMakeLists.txt`, tell cmake to link the library into the executable by using `target_link_libraries`.

8. Build and run the project. Inspect the file browser and look for the shared library file.

9. Add a new source file `main2.cpp` and add this content which, like `main2.cpp`, utilizes the `FidgetCube`:

```cpp
#include <iostream>
#include <cstdlib>

using std::string;
using std::cout;
using std::endl;

#include "CubeSide.h"
#include "FidgetCube.h"

class  JoystickSide : public CubeSide {
public:
    const char *getName();
    void push(uint16_t value);
protected:
    static constexpr char const *joystickSideName = "Joystick";
};

const char * JoystickSide::getName() {
    return JoystickSide::joystickSideName;
}

void JoystickSide::push(uint16_t value) {
    cout << "JoystickSide pushed into direction " << value << "." << endl;
}

class JoystickCube : public FidgetCube {
public:
    JoystickCube();
};

JoystickCube::JoystickCube() : FidgetCube() {
    for (uint8_t x = 0; x<6; x++ ){
        addSide(new JoystickSide());
    }
}


int main() {
    JoystickCube theJoystickCube;
    cout << theJoystickCube.getSide(0)->getName();
    ((JoystickSide*)theJoystickCube.getSide(0))->push(3);
}
```

- Add a new `add_executable` to the cmake configuration that is built from this source file.
- After reloading, you will find the new executable in the drop-down list in the top-right corner among the other built items. Select the new one and execute it.

10. Create a new C++ project and add the following code which computes the prime numbers between 1 and 100 million.

```cpp
#include <iostream>
#include <ctime>
#include <vector>

using namespace std;

int main(int argc, char* args[]) {
    // start measuring time
    clock_t begin = clock();

    const uint32_t N = 100*1000*1000;

    vector<bool> isPrime(N);

    isPrime[0] = false;
    isPrime[1] = false;
    // everything from two onwards is a potential prime
    for(uint32_t p=2; p<=N; p++){
        isPrime[p] = true;
    }

    // filter numbers that are the product of others
    for (uint32_t p=2; p*p<=N; p++){
        if (isPrime[p] == true)
            for (uint32_t i=p; i*p<=N; i++)
                     isPrime[p*i] = false;
    }

    // count remaining numbers (primes)
    uint32_t numPrimes;
    for(int32_t p=2; p<=N; p++){
        if(isPrime[p]){
            numPrimes++;
        }
    }

    clock_t end = clock();
    double elapsed_secs = double(end - begin) / CLOCKS_PER_SEC;
    cout << "Prime numbers found between 1 and " << N << ": " <<    numPrimes << endl;
    cout << "Time needed: " << elapsed_secs << "s" << endl;
    return 0;
}
```

- Execute the program and note the results.

11.  Add the following line to the `CMakeLists.txt` file:

```cmake
set(CMAKE_CXX_FLAGS "-O3")
```

- Compile and run the program again. What changes?
- Google the meaning of the -O3 flag for this compiler. How does that explain what you saw?
- Why is this not enabled by default?

> [CMake指令解析 set(CMAKE_CXX_FLAGS “$ENV{CXXFLAGS} -rdynamic -O3 -fPIC -ggdb -std=c++11 -Wall -Wno-deprec-CSDN博客](https://blog.csdn.net/m0_51551385/article/details/125083575)
> [gcc -O0 -O1 -O2 -O3 四级优化选项及每级分别做什么优化_gcc -o2-CSDN博客](https://blog.csdn.net/qq_31108501/article/details/51842166)

12.  Add `-Wall` to the flags such that the line looks like this:

```cmake
set(CMAKE_CXX_FLAGS "-O3 -Wall")
```

- Build the project (without running it) and observe the compiler output.
- Google the meaning of the -Wall flag.
- What is the compiler telling us here?

13.  Repeat the procedure after adding `-Wextra`.

```cmake
set(CMAKE_CXX_FLAGS "-O3 -Wall -Wextra")
```

- What is the compiler telling us now?

> [cmake设置C++编译器警告方法以及编译器警告详细介绍_-wpedantic-CSDN博客](https://blog.csdn.net/sexyluna/article/details/134770233)

本周[Anka](https://github.com/A-n-k-a)写的CMakeLists.txt：

```cmake
cmake_minimum_required(VERSION 4.0)
project(Standalone_Week8)

set(CMAKE_CXX_STANDARD 20)
#Under windows, the executable cannot yet be executed by double-click in the file browser, because windows does not by default use the libraries of the compiler we are using. Under other operating systems, this may run as it is.
#set(CMAKE_CXX_FLAGS "-static-libstdc++ -static-libgcc")
set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_CXX_FLAGS "-O3 -Wall -Wextra")

add_executable(Standalone_Week8 main.cpp)
add_executable(Standalone Standalone.cpp)

file(GLOB W8_SOURCES "${CMAKE_CURRENT_SOURCE_DIR}/*.cpp")
list(REMOVE_ITEM W8_SOURCES "${CMAKE_CURRENT_SOURCE_DIR}/main.cpp")
list(REMOVE_ITEM W8_SOURCES "${CMAKE_CURRENT_SOURCE_DIR}/Standalone.cpp")
#add_executable(Week8 ${W8_SOURCES})

#file(GLOB FC_SOURCES "${CMAKE_CURRENT_SOURCE_DIR}/FidgetCube/*.cpp")
list(APPEND FC_SOURCES "${CMAKE_CURRENT_SOURCE_DIR}/FidgetCube/CubeSide.cpp")
list(APPEND FC_SOURCES "${CMAKE_CURRENT_SOURCE_DIR}/FidgetCube/FidgetCube.cpp")
add_executable(FidgetCube ${FC_SOURCES})

list(APPEND MAIN2 "${CMAKE_CURRENT_SOURCE_DIR}/FidgetCube/main2.cpp")
add_executable(FidgetCubeMain2 ${MAIN2})

add_executable(PrimeNumbersMain "${CMAKE_CURRENT_SOURCE_DIR}/PrimeNumbers/main.cpp")
```

对应的目录结构：

```txt
Standalone_Week8
├── cmake-build-debug
├── FidgetCube
│   ├── CubeSide.cpp
│   ├── CubeSide.h
│   ├── FidgetCube.cpp
│   ├── FidgetCube.h
│   └── main2.cpp
├── PrimeNumbers
│   └── main.cpp
├── CMakeLists.txt
├── main.cpp
└── Standalone.cpp
```
