# Streams and Files

Complete each of the exercises below using CLion. If you have difficulty writing a program, try writing it in Java or Python first to get an idea of the structure to use. Although most programs written in C will also run in C++, if you are asked to write a program in C++ you are expected to make use of C++'s features.

1. Create a new C++ project. Cut and paste the following code.

```cpp
#include <iostream>
using namespace std;

class Rational {
private:
    int64_t num;
    uint64_t denom;
public:
    Rational()
         : num(0), denom(1)
    {}
    Rational(const Rational &o)
        : num(o.num), denom(o.denom)
    {}
    Rational(int64_t numP, uint64_t denomP)
        : num(numP), denom(denomP)
    {
        if(denomP == 0){
            throw std::logic_error("Rational number cannot have a zero denominator");
        }
    }
    int64_t numerator() const {
        return num;
    }
    uint64_t denominator() const {
        return denom;
    }

    friend Rational operator*(const Rational&,const Rational&);
    friend Rational operator+(const Rational&,const Rational&);
};
Rational operator*(const Rational& l, const Rational& r){
    return Rational( l.num*r.num, l.denom*r.denom );
}
Rational operator+(const Rational& l, const Rational& r){
    return Rational( l.num*r.denom + r.num*l.denom, l.denom*r.denom );
}
int main() {
    Rational a(1,2);
    Rational b(2,3);
    Rational c = a+b;
    Rational d = a*b;

    cout << a << endl;
    cout << b << endl;
    cout << c << endl;
    cout << d << endl;
}
```

- The class represents rational numbers with signed numerator and positive (non-zero) denominator.
- Operator overloading allows to use “natural” addition and multiplication.
- The `friend` keyword can be use to give specific non-class-members full access to private data. This is useful for code that semantically/logically belongs to a class, but for syntactic reasons cannot not be in it (may appear in operator overloading).

2. This code does not yet compile because there is no operator `<<` defined for `Rational`. Implement it such that the original code compiles and outputs:

```console
(1/2)
(2/3)
(7/6)
(2/6)
```

3. Create a matching input stream operator `>>`. Test it by reading a `Rational` from the `cin` standard input with

```cpp
Rational e;
cin >> e;
cout << "input was " << e << endl;
```

Simple solution:

```cpp
istream& operator>>(istream& is, Rational& r){
    char c1, c2, c3;
    int64_t rnum;
    uint64_t rdenom;
    is>>c1>>rnum>>c2>>rdenom>>c3;
    r=Rational(rnum, rdenom);
    return is;
}
```

4. In the input operator, test whether the data read actually represents a `Rational` with the correct formatting. Only write the output parameter `r` if it does. If not, set the stream’s _fail bit_ so that other parts of the program have a chance of detecting the problem. You can use the following code to test:

```cpp
cout << "input rational number: ";
Rational e;
cin >> e;
if(cin.fail()){
    cout << "the input could not be parsed" << endl;
    cin.clear(); // clear previous errors
}
else{
    cout << "input was " << e << endl;
}
```

- Test for wrong separator characters as well as invalid numbers in between. Are there other relevant test cases?

5. Now implement a function `bool store(list<Rational> l, string filename)`. It takes a list of numbers and a filename. It must then create a new file with that name, and write all numbers in the list into it. In order to have a human-readable file, separate the numbers with new-lines (one number per line). Return `true` if the writing was successful, `false` if not. Create a list to test with and choose a filename. Inspect the generated file in the file browser.

6. Write a function `bool append(Rational r, string filename)` that appends a number to the end of an existing file. Again, return true if and only if the output was successful.

7. Now write a function `bool read(string filename, list<Rational> &list)` that reads a list of numbers from a file. The file with the given name is supposed to be opened and values filled into the list given in the second parameter. Again, return `true` only if everything was correct. The file should be in the format as written by `store`. However, write a method that is robust (e.g. does not crash or give wrong values) to missing files, wrongly formatted files and the like. In order to check whether individual numbers have been read correctly, check whether the operator `operator>>(istream& is, Rational& r)`, if used, set the `failbit`.

参考答案：

```cpp
//Rational.cpp
//
// Created by 不死鸟Anka on 2025/11/24.
//
#include <iostream>
#include <list>
#include <string>
#include <fstream>
#include <sstream>
using namespace std;

class Rational {
private:
    int64_t num; //分子
    uint64_t denom; //分母
public:
    Rational() // default constructor
         : num(0), denom(1)
    {}
    Rational(const Rational &o) // copy constructor
        : num(o.num), denom(o.denom)
    {}
    Rational(int64_t numP, uint64_t denomP) // parameterized constructor
        : num(numP), denom(denomP)
    {
        if(denomP == 0){
            throw std::logic_error("Rational number cannot have a zero denominator");
            // 处理分母为零的情况
        }
    }
    int64_t numerator() const {
        return num;
    }
    uint64_t denominator() const {
        return denom;
    }

    // friend 允许非成员函数访问类的私有成员
    friend Rational operator*(const Rational&,const Rational&);
    friend Rational operator+(const Rational&,const Rational&);
    // Add output operator
    friend std::ostream& operator<<(std::ostream&, const Rational&);
    // Add input operator
    friend std::istream& operator>>(std::istream&, Rational&);
};
Rational operator*(const Rational& l, const Rational& r){ // 两个参数：左操作数和右操作数
    return Rational( l.num*r.num, l.denom*r.denom );
}
Rational operator+(const Rational& l, const Rational& r){
    return Rational( l.num*r.denom + r.num*l.denom, l.denom*r.denom );
}
// Implement output operator
std::ostream& operator<<(std::ostream& os, const Rational& r) {
    os << "(" << r.numerator() << "/" << r.denominator() << ")";
    return os;
}
// Implement input operator: accepts optional surrounding parentheses, format: num/denom
std::istream& operator>>(std::istream& is, Rational& r) {
    // use sentry to handle skipws and locale stuff
    std::istream::sentry s(is);
    if (!s) return is;

    // parse into local temporaries so we only modify 'r' on success
    std::streampos startPos = is.tellg(); // may return -1 for some streams, but we won't rely on it

    is >> std::ws; // skip leading whitespace
    bool has_paren = false;
    // peek()函数
    // 其调用形式为cin.peek()，返回值是一个char类型的字符，其返回值是指向指向的当前字符，如果要访问的字符是文件结束符，则函数值是EOF(-1)。
    // 但只是做观测使用，即指针仍停留在当前位置，并不后移。其功能是从输入流中读取一个字符，但该字符并未从输入流中删除。
    if (is.peek() == '(') {
        is.get(); // consume '('
        has_paren = true;
        is >> std::ws;
    }

    int64_t num_val = 0;
    if (!(is >> num_val)) {
        is.setstate(std::ios::failbit);
        return is;
    }

    is >> std::ws;
    char sep = 0;
    if (!(is >> sep) || sep != '/') {
        is.setstate(std::ios::failbit);
        return is;
    }

    // read denominator as signed so we can detect negative values (which are invalid here)
    int64_t denom_signed = 0;
    if (!(is >> denom_signed)) {
        is.setstate(std::ios::failbit);
        return is;
    }

    if (denom_signed <= 0) {
        // invalid denominator (zero or negative)
        is.setstate(std::ios::failbit);
        return is;
    }

    is >> std::ws;
    if (has_paren) {
        char closing = 0;
        if (!(is >> closing) || closing != ')') {
            is.setstate(std::ios::failbit);
            return is;
        }
    }

    // all checks passed — assign to output parameter
    r.num = num_val;
    r.denom = static_cast<uint64_t>(denom_signed);
    return is;
}

// Store a list of Rationals to a file, one per line. Return true on success, false on failure.
bool store(list<Rational> l, string filename) {
    std::ofstream ofs(filename, std::ios::out | std::ios::trunc);
    if (!ofs.is_open() || !ofs.good()) {
        return false;
    }
    for (const Rational &x : l) {
        ofs << x << '\n';
        if (!ofs.good()) {
            return false;
        }
    }
    ofs.close();
    return ofs.good();
}

// Append a Rational to the end of an existing file. Return true iff write succeeded.
bool append(Rational r, string filename) {
    std::ofstream ofs(filename, std::ios::out | std::ios::app); // 设置为追加模式（app）
    if (!ofs.is_open() || !ofs.good()) {
        return false;
    }
    ofs << r << '\n';
    if (!ofs.good()) {
        return false;
    }
    ofs.close();
    return ofs.good();
}

// Read a list of Rationals from a file. Fill the provided list only if the whole file is valid.
// Return true iff every non-empty line contains exactly one valid Rational and the file could be opened/read.
bool read(string filename, list<Rational> &outList) {
    std::ifstream ifs(filename);
    if (!ifs.is_open() || !ifs.good()) {
        return false;
    }

    std::list<Rational> temp;
    std::string line;
    size_t lineNo = 0;
    while (std::getline(ifs, line)) {
        ++lineNo;
        // skip lines that are empty or contain only whitespace
        bool all_ws = true;
        for (char ch : line) if (!std::isspace(static_cast<unsigned char>(ch))) { all_ws = false; break; }
        if (all_ws) continue;

        std::istringstream iss(line);
        // use sentry behavior of streams via operator>>; operator>> will set failbit on malformed input
        Rational r;
        iss >> r;
        if (iss.fail()) {
            // malformed rational on this line
            return false;
        }
        // after successful extraction, there must be only whitespace left
        iss >> std::ws;
        if (!iss.eof()) {
            // trailing garbage after the rational
            return false;
        }
        temp.push_back(r);
    }

    ifs.close();

    if (ifs.bad()) {
        // I/O error
        return false;
    }

    // all good — assign to output parameter
    outList = std::move(temp);
    return true;
}

int main() {
    Rational a(1,2);
    Rational b(2,3);
    Rational c = a+b;
    Rational d = a*b;

    cout << a << endl;
    cout << b << endl;
    cout << c << endl;
    cout << d << endl;

    cout << "input rational number: ";
    Rational e;
    cin >> e;
    if(cin.fail()){
        cout << "the input could not be parsed" << endl;
        cin.clear(); // clear previous errors
    }
    else{
        cout << "input was " << e << endl;
    }

    // Test the store function: create a list and write to a file
    list<Rational> nums;
    nums.push_back(a);
    nums.push_back(b);
    nums.push_back(c);
    nums.push_back(d);

    string outFile = "/Users/anka/Desktop/CPP/Week9/rationals_output.txt";
    bool ok = store(nums, outFile);
    cout << "store returned: " << (ok ? "true" : "false") << " -> " << outFile << endl;

    // Test append: add one more Rational to the same file
    Rational extra(3,5);
    bool appOk = append(extra, outFile);
    cout << "append returned: " << (appOk ? "true" : "false") << " -> " << outFile << endl;

    // Show file contents to verify
    cout << "file contents after append:" << endl;
    std::ifstream ifs(outFile);
    string line;
    while (std::getline(ifs, line)) {
        cout << line << endl;
    }
    ifs.close();

    // Now test the read function to read back the file into a new list
    list<Rational> readBack;
    bool readOk = read(outFile, readBack);
    cout << "read returned: " << (readOk ? "true" : "false") << " -> " << outFile << endl;
    if (readOk) {
        cout << "values read:" << endl;
        for (const auto &rr : readBack) cout << rr << endl;
    }

    // Additional robustness tests
    // 1) malformed file: contains a bad line in the middle
    string badFile = "/Users/anka/Desktop/CPP/Week9/rationals_bad.txt";
    {
        std::ofstream ofs(badFile, std::ios::out | std::ios::trunc);
        ofs << "(1/2)\n";
        ofs << "this_is_not_a_rational\n";
        ofs << "(3/4)\n";
    }
    list<Rational> tmp;
    bool badOk = read(badFile, tmp);
    cout << "read malformed file returned: " << (badOk ? "true" : "false") << " -> " << badFile << endl;

    // 2) missing file
    string missingFile = "/Users/anka/Desktop/CPP/Week9/this_file_does_not_exist.txt";
    list<Rational> tmp2;
    bool missingOk = read(missingFile, tmp2);
    cout << "read missing file returned: " << (missingOk ? "true" : "false") << " -> " << missingFile << endl;

    return 0;
}
```
