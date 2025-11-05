# Wee1 Seminar Exercises – XML Basics

## Exercise 1 – Examine data required to describe a ‘film’ on IMDb

Good cinemas want to hold data about the films they show. They need to show enough information on their website to enable potential cinema-goers to decide whether they want to see it. And whether they can take their family or not.  
They would like to include information such as:

- The name of the movie.
- The cast in the movie (2 Actors, 2 actresses).
- When was the movie released?
- The language of the movie?
- How long does the movie run?

1. Write a list of the data points required to describe one of the 1990s blockbusters, “Home Alone.” You can look up the film on IMDB.com
2. Create an XML file that describes the film according to the data points you decided on in no 1.
3. Have you used only elements? If so, would attributes be more appropriate? Rewrite the XML file to ensure you include some appropriate attributes.
Troubleshooting:

- Consider using additional notes as comments.
- Check for any whitespace at the beginning and end of the document.
- Use indentation properly to format the source code to improve readability.
- Make sure your document follows the Key XML specification rules.
  - It starts with the XML declaration.
  - It contains a single root node.
  - All tags closed (opening and closing tags match).
  - Considering case sensitivity, element names do not start with a number, special characters, or spaces.
  - All attributes have values, and all attribute values are in quotes.
  - All elements nest correctly.
*Hint:*
- You can test your file results by opening them in your browser (note that they will be text only!) The XML, in particular, will not open if there are any errors.
Example Answer:  

```xml
<?xml version="1.0" encoding="UTF-8"?>
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
```

## Exercise 2 – Find the errors in the following script (if any) and correct them to have a well-written script

Example Correction:  

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
    <book category="cooking">
        <title lang="en">Everyday Italian</title>
        <author>Giada De Laurentiis</author>
        <year>2005</year>
        <price>30.00</price>
    </book>
    <!-- <book category=children> -->
    <book category="children">
        <title lang="en">Harry Potter</title>
        <author>J K. Rowling</author>
        <year>2005</year>
        <price>29.99</price>
    </book>
    <!-- missing </book> -->
    <book category="web">
        <title lang="en">XQuery Kick Start</title>
        <author>James McGovern</author>
        <author>Per Bothner</author>
        <author>Kurt Cagle</author>
        <author>James Linn</author>
        <author>Vaidyanathan Nagarajan</author>
        <!-- </Author> -->
        <year>2003</year>
        <price>49.99</price>
    </book>
    <!-- <books> -->
    <book category="Human Development">
        <!-- <title lang=en>Atomic Habits</title> -->
        <title lang="en">Atomic Habits</title>
        <author>James Clear</author>
        <year>2018</year>
        <price>21</price>
    </book>
<!-- </bookstore> -->
    <book category="Programming">
        <title lang="en">Algorithm Design</title>
        <!-- <author>Jon Kleinberg & Eva Tardos</author> -->
        <author>Jon Kleinberg &amp; Eva Tardos</author>
        <!-- <author>Jon Kleinberg</author>
        <author>Eva Tardos</author> -->
        <year>2005</year>
        <price>203.46</price>
    </book>
</bookstore>
```
