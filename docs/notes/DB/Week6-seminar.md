# Week 6 Seminar - XSLT application

## Exercise 1 – Merge two documents

Download the practical files from the student website. You should have a single folder containing the following.

```txt
Films sample.xml
OMDB_data.xml
Initial file.xsl
```

Open the **initial file.xsl** and **films sample.xml** (It’s best to have all files in the same folder), and run a transform. You should end up with an initial results file containing a line repetition. It means that the output is correct. However, this is the XML structure we want to create:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<root>
  <movie>
    <title></title>
    <overview></overview>
    <imdbid></imdbid>
    <writer></writer>
    <director></director>
    <cast>
      <cast-member firstName="" lastName="">
        <character firstName="" lastName=""/>
      </cast-member>
      <cast-member firstName="" lastName="">
        <character firstName="" lastName=""/>
      </cast-member>
    </cast>
    <showing-in>
      <cinema></cinema>
      <cinema></cinema>
    </showing-in>
  </movie>
</root>
```

You will see that some of the information is in the **films sample.xml** and **OMDB_data.xml** files.  

**Hint**: In the ‘Initial file.xsl’ transform, you will find some comments in the file to guide you in creating the final transform.  

Note: the output may not be a byte-for-byte copy of the source, but it will be equivalent in XML terms. (i.e., `<element></element>` may be output as `<element />`, but they are equivalent since both are ways of describing the same empty element).

Reference Answer:

```xml
<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output omit-xml-declaration="no" method="xml" encoding="UTF-8" indent="yes"/>

    <xsl:template match="root">
        <root>
            <xsl:apply-templates select="results"/>
        </root>
    </xsl:template>

    <xsl:template match="results">
        <br>
            There should be 2 copies of this line - one for each
            result
        </br>
        <xsl:variable name="omdb" select="document('OMDB-data.xml')/root/movie"/>
        <xsl:variable name="filmTitle" select="normalize-space(title)"/>
        <xsl:variable name="matchedMovie" select="$omdb[@title = $filmTitle]"/>

        <movie>
            <xsl:copy-of select="title"/>
            <xsl:copy-of select="overview"/>
            <imdbid>
                <xsl:value-of select="$matchedMovie/@imdbID"/>
            </imdbid>
            <writer>
                <xsl:value-of select="$matchedMovie/@writer"/>
            </writer>
            <director>
                <xsl:value-of select="$matchedMovie/@director"/>
            </director>
            <xsl:copy-of select="cast"/>
            <xsl:copy-of select="showing-in"/>
        </movie>
    </xsl:template>
</xsl:stylesheet>
```
