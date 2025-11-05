# XPath

## Exercise 1 – Analyze the following DTD file and derive a full XML document

```xml
<!ELEMENT Scholars (Scholar)+>
<!ELEMENT Scholar (((Firstname,Lastname)|Fullname),
Nationality,Birthplace,Age,Sex,Professions)>
<!ATTLIST Scholar SID ID #REQUIRED type CDATA #FIXED 'Scientist'>
<!ELEMENT Firstname (#PCDATA)>
<!ELEMENT Lastname (#PCDATA)>
<!ELEMENT Fullname (#PCDATA)>
<!ELEMENT Nationality (#PCDATA)>
<!ELEMENT Birthplace EMPTY>
<!ELEMENT Age (#PCDATA)>
<!ATTLIST Age Status (Alive|Dead) 'Alive'>
<!ATTLIST Age Birsthdate CDATA #REQUIRED>
<!ATTLIST Age Deathdate CDATA #IMPLIED>
<!ELEMENT Sex (#PCDATA)>
<!ELEMENT Professions (Profession+)>
<!ELEMENT Profession (#PCDATA)>
```

---

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>  
<!DOCTYPE Scholars [  
    <!ELEMENT Scholars (Scholar)+>  
    <!ELEMENT Scholar (((Firstname,Lastname)|Fullname),  
            Nationality,Birthplace,Age,Sex,Professions)>  
    <!ATTLIST Scholar SID ID #REQUIRED type CDATA #FIXED 'Scientist'>  
    <!ELEMENT Firstname (#PCDATA)>  
    <!ELEMENT Lastname (#PCDATA)>  
    <!ELEMENT Fullname (#PCDATA)>  
    <!ELEMENT Nationality (#PCDATA)>  
    <!ELEMENT Birthplace EMPTY>  
    <!ELEMENT Age (#PCDATA)>  
    <!ATTLIST Age Status (Alive|Dead) 'Alive'>  
    <!ATTLIST Age Birsthdate CDATA #REQUIRED>  
    <!ATTLIST Age Deathdate CDATA #IMPLIED>  
    <!ELEMENT Sex (#PCDATA)>  
    <!ELEMENT Professions (Profession+)>  
    <!ELEMENT Profession (#PCDATA)>  
]>  
<Scholars>  
    <Scholar SID="S001">  
        <Firstname>Anka</Firstname>  
        <Lastname>Businiao</Lastname>  
        <Nationality>China</Nationality>  
        <Birthplace/>  
        <Age Status="Alive" Birsthdate="1987-01-20">38</Age>  
        <Sex>Male</Sex>  
        <Professions>  
            <Profession>Software Engineer</Profession>  
            <Profession>Professor</Profession>  
        </Professions>  
    </Scholar>  
    <Scholar SID="S002">  
        <Fullname>Bertand Yuen</Fullname>  
        <Nationality>USA</Nationality>  
        <Birthplace/>  
        <Age Status="Alive" Birsthdate="2005-03-14">20</Age>  
        <Sex>Female</Sex>  
        <Professions>  
            <Profession>Computer Scientist</Profession>  
        </Professions>  
    </Scholar>  
</Scholars>
```

## Exercise 2 – Considering the derived XML code, express the following XPath queries

- The ID of all scholars.
  - Absolute Location Path: `/Scholars/Scholar/@SID`
  - Relative Location Path: `//@SID`
- The nationality of the second scholar.
  - Absolute Location Path: `/Scholars/Scholar[2]/Nationality`
  - Relative Location Path: `//Scholar[2]/Nationality`
- The sex of scholars who are alive.
  - Absolute Location Path: `/Scholars/Scholar/Age[@Status="Alive"]/../Sex`
  - Relative Location Path: `//Age[@Status="Alive"]/../Sex` or `//Scholar[Age/@Status="Alive"]/Sex`
- Using the relative location path, retrieve the first profession of all scholars.
  - `//Professions/Profession[1]`
  - By the way, using absolute location path is: `/Scholars/Scholar/Professions/Profession[1]`
- The ID of all-male scholars.
  - Absolute Location Path: `/Scholars/Scholar/Sex[text()="Male"]/../@SID`
  - Relative Location Path: `//Sex[text()="Male"]/../@SID`
- All attributes of the scholar age.
  - Absolute Location Path with axes: `/Scholars/Scholar/Age/attribute::*`
  - Relative Location Path with axes: `//Age/attribute::*` <br>or without axes: `//Age/@*`

## Exercise 3 – Merge the following XML files into a single XML file considering using namespace identifiers

FILE1:

```xml
<Events>
    <Event>
        <title>Registration Event</title>
        <date>Oct 10, 2023</date>
    </Event>
</Events>
```

FILE2:

```xml
<Events>
    <Event>
        <title>Books-Signing Event</title>
        <date>Oct 15, 2023</date>
    </Event>
</Events>
```

Merged:

```xml
<?xml version="1.0" encoding="UTF-8"?>  
<MergedEvents xmlns:f1="https://xml.anka2.top/file1"  
              xmlns:f2="https://xml.anka2.top/file2">  
    <f1:Events>  
        <f1:Event>  
            <f1:title>Registration Event</f1:title>  
            <f1:date>Oct 10, 2023</f1:date>  
        </f1:Event>  
    </f1:Events>  
  
    <f2:Events>  
        <f2:Event>  
            <f2:title>Books-Signing Event</f2:title>  
            <f2:date>Oct 15, 2023</f2:date>  
        </f2:Event>  
    </f2:Events>  
</MergedEvents>
```

> [!TIP]
> URI `https://xml.anka2.top/file1` 和 `https://xml.anka2.top/file2` 需要添加到IntelliJ IDEA设置->语言和框架->架构和DTD->忽略的模式和DTD
