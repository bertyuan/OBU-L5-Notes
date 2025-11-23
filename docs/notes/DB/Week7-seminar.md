# Week 7 Seminar - Modelling and Loading

## Exercise 1 – Considering the `CustomerDB.csv` file from the last lecture

a. Optimize the storage of the database by refining the structure of `brookes.customers` in terms of field data types.

```sql
CREATE TABLE brookes.customers2 (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    full_name VARCHAR(100),
    cinema VARCHAR(100) NOT NULL,
    film VARCHAR(100) NOT NULL,
    tickets INT NOT NULL CHECK (tickets >= 1),
    show_date DATE NOT NULL,
    show_time TIME NOT NULL
);
```

```sql
LOAD DATA local INFILE '/Users/anka/Documents/成都理工大学/2025-2026/Databases/Week7/customerdb_1.csv'
INTO TABLE brookes.customers2
CHARACTER SET latin1
FIELDS TERMINATED BY ','              -- 字段分隔符
OPTIONALLY ENCLOSED BY '"'            -- 字段可能被引号包围
LINES TERMINATED BY '\r\n'            -- 每行结束符
IGNORE 1 LINES                        -- 跳过表头
(first_name, last_name, full_name, cinema, film, tickets, @date_str, @time_str)
SET 
 show_date = STR_TO_DATE(@date_str, '%d/%m/%Y'),  -- 转换日期格式
 show_time = TRIM(@time_str);
```

> [!NOTE]
> 典型报错：
> ⚠️ `4096 Delimiter '\r' in position 8 in datetime value '20:00:00 ' at row 1 is superfluous and is deprecated. Please remove.`  
> 说明在导入的 CSV 文件中，时间字段（`20:00:00`）后面有一个多余的 **回车符 `\r`** 或空格，MySQL 在解析时认为这是**多余的分隔符**。  

原因分析：

|原因|说明|
|---|---|
|① Windows 生成的 CSV 文件|Windows 使用 `\r\n` 作为换行符，而不是 Linux 的 `\n`。MySQL 会把 `\r` 误认为字段内容的一部分。|
|② CSV 文件的最后一列（`Time`）后面有空格|例如 `"20:00:00 "`，MySQL 会读取到空格或 `\r`。|

解决方法：  
修改 `LOAD DATA` 命令  
显式指定行结束符为 `'\r\n'`，并使用 `TRIM()` 去除多余空格。  
🔹 `TRIM(@time_str)`：自动去除末尾空格或 `\r`  
🔹 `LINES TERMINATED BY '\r\n'`：兼容 Windows 格式的 CSV 文件  

b. Express the answer to the following questions using the proper SQL queries.

1. How many customers?

```sql
SELECT 
 count(*) 
FROM 
 brookes.customers2;
```

2. How many tickets are sold?

```sql
SELECT 
 sum(Tickets) 
FROM 
 brookes.customers2;
```

3. Most popular cinema?

- Show cinema name and count (The cinema that appears most frequently in the database):

```sql
SELECT 
 Cinema, COUNT(*) as Count 
FROM 
 brookes.customers2 
GROUP BY 
 Cinema 
order by 
 count(Cinema) desc 
limit 1;
```

- Only show cinema name:

```sql
SELECT 
 Cinema, 
FROM 
 brookes.customers2 
GROUP BY 
 Cinema 
order by 
 count(Cinema) desc 
limit 1;
```

- ⭐The cinema with the most tickets sold:

```sql
SELECT 
    cinema,
    SUM(tickets) AS total_tickets
FROM 
    brookes.customers2 
GROUP BY 
    cinema
ORDER BY 
    total_tickets DESC
LIMIT 1;
```

4. Most popular film?

- The movie that appears most frequently in the database:

```sql
SELECT 
 Film, COUNT(*) as Count 
FROM 
 brookes.customers2 
GROUP BY 
 Film 
order by 
 count(Film) desc 
limit 1;
```

- ⭐The movie with the highest number of ticket sales:

```sql
SELECT 
    Film,
    SUM(tickets) AS total_tickets
FROM 
    brookes.customers2 
GROUP BY 
    Film
ORDER BY 
    total_tickets DESC
LIMIT 1;
```

5. Most popular date?

```sql
SELECT 
 show_date, COUNT(*) as Count 
FROM 
 brookes.customers2 
GROUP BY 
 show_date 
order by 
 count(show_date) desc 
limit 1;
```

6. Most popular day of the week?

```sql
SELECT 
    DAYNAME(show_date) AS weekday,
    SUM(tickets) AS total_tickets
FROM 
    brookes.customers2
GROUP BY 
    weekday
ORDER BY 
    total_tickets DESC;
```

## Exercise 2 – Create another two tables depending on the Films and Geo CSV files

- films

```sql
CREATE TABLE brookes.films (
    id INT PRIMARY KEY AUTO_INCREMENT,
    movie VARCHAR(100) NOT NULL,
    certificate VARCHAR(10),
    duration INT NOT NULL
);
```

```sql
LOAD DATA local INFILE '/Users/anka/Documents/成都理工大学/2025-2026/Databases/Week7/films_1.csv'
INTO TABLE brookes.films
CHARACTER SET latin1
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(movie, certificate, duration);
```

- geo

```sql
CREATE TABLE brookes.geo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(100) NOT NULL,
    region VARCHAR(100),
    country VARCHAR(100) NOT NULL
);
```

```sql
LOAD DATA local INFILE '/Users/anka/Documents/成都理工大学/2025-2026/Databases/Week7/geo_1.csv'
INTO TABLE brookes.geo
CHARACTER SET latin1
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(city, region, country);
```
