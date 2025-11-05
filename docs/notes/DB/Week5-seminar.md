# XSLT and JSON

**Considering the Scholars XML code from last week's tutorial:**  
Exercise 1 – Continue your XSLT document to satisfy the given screenshot.  
Exercise 2 – Convert the Scholars XML code into an identical JSON file and validate your answer.  

```json
{  
  "Scholars":  
    {  
    "Scholar": [  
      {  
        "SID": "Sid001",  
        "ScholarType": "Scientist",  
        "FirstName": "Jane",  
        "LastName": "Goodall",  
        "Fullname": "",  
        "Nationality": "British",  
        "Birthplace": "",  
        "Age": [  
          {  
            "@Status": "Alive",  
            "Birthdate": "1934-04-03",  
            "Deathdate": null,  
            "#Value": 90  
          }  
        ],  
        "Sex": "Female",  
        "Professions": [  
          "Zoology",  
          "Anthropology"  
        ]  
      },  
      {  
        "SID": "Sid002",  
        "ScholarType": "Scientist",  
        "FirstName": "",  
        "LastName": "",  
        "Fullname": "Ahmed Zewail",  
        "Nationality": "Egyptian, American",  
        "Birthplace": "",  
        "Age": [  
          {  
            "Status": "Dead",  
            "Birthdate": "1946-02-26",  
            "Deathdate": "2016-08-02",  
            "CurrentAge": 70  
          }  
        ],  
        "Sex": "male",  
        "Professions": [  
          "Chemistry",  
          "Physics"  
        ]  
      }  
    ]  
  }  
}
```

> [!TIP]
> `@` represents attribute  
> `#Value` represents *this* value

Exercise 3 – If you have time, convert the Movies XML code into an identical JSON file and validate your answer.  

```json
{  
  "movies": [  
    {  
      "title": "Home Alone",  
      "director": "Chris Columbus",  
      "year": 1990,  
      "release_date": "1990-11-16",  
      "language": "English",  
      "genre": "Comedy & Family",  
      "rating": 7.6,  
      "duration": 103,  
      "cast": [  
        { "prefix": "Mr.", "name": "Macauley Culkin" },  
        { "prefix": "Mr.", "name": "Joe Pesci" },  
        { "prefix": "Mr.", "name": "Daniel Stern" },  
        { "prefix": "Mrs.", "name": "Catherine O'Hara" }  
      ],  
      "plot": "An eight-year-old boy is accidentally left behind when his family flies to Paris for their Christmas vacation. He must defend his home against two burglars."  
    },  
    {  
      "title": "Zootopia",  
      "director": "Byron Howard",  
      "year": 2016,  
      "release_date": "2016-03-17",  
      "language": "English",  
      "genre": "Animation & Adventure",  
      "rating": 8.0,  
      "duration": 108,  
      "cast": [  
        { "prefix": "Ms.", "name": "Ginnifer Goodwin" },  
        { "prefix": "Mr.", "name": "Jason Bateman" },  
        { "prefix": "Mr.", "name": "Idris Elba" },  
        { "prefix": "Ms.", "name": "Shakira" }  
      ],  
      "plot": "In a city of anthropomorphic animals, a bunny cop and a cynical con artist fox must work together to uncover a conspiracy."  
    }  
  ]  
}
```
