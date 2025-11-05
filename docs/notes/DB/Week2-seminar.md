# XML with DTDs

## Exercise 1 – Create an internal DTD for your XML file

1. Look up your XML code describing the film from last week. Ensure that your XML is well-formed and includes all necessary elements.
2. List the data points required to describe your favorite movie. You can look up the film on IMDB.com
3. Then create an INTERNAL DTD to describe your file. Please ensure you write this code manually to help consolidate the lecture content.
4. Validate your XML file using an XML validator. Create CSV files to describe the films according to the data points you decided on above.

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<!DOCTYPE movies [
    <!ELEMENT movies (movie)*>
    <!ELEMENT movie (title, director, year, release_date, language, genre, rating, duration, cast, plot)>
    <!ELEMENT title (#PCDATA)>
    <!ELEMENT director (#PCDATA)>
    <!ELEMENT year (#PCDATA)>
    <!ELEMENT release_date (#PCDATA)>
    <!ELEMENT language (#PCDATA)>
    <!ELEMENT genre (#PCDATA)>
    <!ELEMENT rating (#PCDATA)>
    <!ELEMENT duration (#PCDATA)>
    <!ELEMENT cast (actor*)>
    <!ELEMENT actor (#PCDATA)>
    <!ATTLIST actor prefix CDATA #REQUIRED>
    <!-- #REQUIRED表示必选属性 -->
    <!-- <!ATTLIST actor prefix CDATA #IMPLIED> #IMPLIED表示可选属性 -->
    <!ELEMENT plot (#PCDATA)>
]>
<!-- This XML document contains a list of movies with their details -->
<movies>
    <movie>
        <title>Home Alone</title>
        <director>Chris Columbus</director>
        <year>1990</year>
        <release_date>1990-11-16</release_date>
        <language>English</language>
        <genre>Comedy &amp; Family</genre>
        <rating>7.6</rating>
        <duration>103</duration>
        <cast>
            <actor prefix="Mr.">Macauley Culkin</actor>
            <actor prefix="Mr.">Joe Pesci</actor>
            <actor prefix="Mr.">Daniel Stern</actor>
            <actor prefix="Mrs.">Catherine O'Hara</actor>
        </cast>
        <plot>
            An eight-year-old boy is accidentally left behind when his family flies to Paris for their Christmas vacation. He must defend his home against two burglars.
        </plot>
    </movie>
    <movie>
        <title>Zootopia</title>
        <director>Byron Howard</director>
        <year>2016</year>
        <release_date>2016-03-17</release_date>
        <language>English</language>
        <genre>Animation &amp; Adventure</genre>
        <rating>8.0</rating>
        <duration>108</duration>
        <cast>
            <actor prefix="Ms.">Ginnifer Goodwin</actor>
            <actor prefix="Mr.">Jason Bateman</actor>
            <actor prefix="Mr.">Idris Elba</actor>
            <actor prefix="Ms.">Shakira</actor>
        </cast>
        <plot>
            In a city of anthropomorphic animals, a bunny cop and a cynical con artist fox must work together to uncover a conspiracy.
        </plot>
    </movie>
</movies>
```

## Exercise 2 – Create an external DTD for the CustomerDB file

Good Cinemas have given you 3 data files (supplied in CSV format). They want to transmit this data into one XML vocabulary to pass it to developers in one go.

1. Create a single XML file with three random rows of data from CustomerDB (you will need to manually add the relevant Geo and Films data to the transactions).
2. Check that the XML file is well written.
3. Create a DTD file to describe this data (link the DTD as an EXTERNAL DTD.)
4. Check your work by using an XML validator.

```xml
<!ELEMENT Customers (Customer+)>  
    <!ELEMENT Customer (FirstName, LastName, FullName, Cinema, Film, Tickets, Date, Time, Movie, City, Region, Country)>  
    <!ELEMENT FirstName (#PCDATA)>  
    <!ELEMENT LastName (#PCDATA)>  
    <!ELEMENT FullName (#PCDATA)>  
    <!ELEMENT Cinema (#PCDATA)>  
    <!ELEMENT Film (#PCDATA)>  
    <!ELEMENT Tickets (#PCDATA)>  
    <!ELEMENT Date (#PCDATA)>  
    <!ELEMENT Time (#PCDATA)>  
    <!ELEMENT Movie (Certificate, Duration)>  
        <!ELEMENT Certificate (#PCDATA)>  
        <!ELEMENT Duration (#PCDATA)>  
    <!ELEMENT City (#PCDATA)>  
    <!ELEMENT Region (#PCDATA)>  
    <!ELEMENT Country (#PCDATA)>
```

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE Customers SYSTEM "CustomerdbDTD.dtd">
<!-- This XML document contains a list of customers with their details -->
<Customers>
    <Customer>
        <FirstName>Lawrence</FirstName>
        <LastName>Aadimulam</LastName>
        <FullName>Aadimulam, Lawrence</FullName>
        <Cinema>Birmingham</Cinema>
        <Film>Godzilla</Film>
        <Tickets>1</Tickets>
        <Date>26/07/2014</Date>
        <Time>20:00:00</Time>
        <Movie>
            <Certificate>12</Certificate>
            <Duration>123</Duration>
        </Movie>
        <City>Birmingham</City>
        <Region>Midlands</Region>
        <Country>England</Country>
    </Customer>
</Customers>
```
