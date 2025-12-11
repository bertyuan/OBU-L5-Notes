# CHC5049 Database Coursework 2

## Learning Outcomes

The two courseworks of this module address the following learning outcomes:  
本模块的两个课程作业旨在实现以下学习成果：  

- Use SQL and XML to define data applications appropriate to a specified problem.
- 使用 SQL 和 XML 定义适用于特定问题的数据应用。
- Use a conceptual modeling language to specify and analyze data requirements and apply database design principles to map system requirements to an efficient (e.g., normalized) database.
- 使用概念建模语言指定和分析数据需求，并将数据库设计原则应用于将系统需求映射到高效（例如，规范化的）数据库。
- Explain and design transaction-based processing in database systems.
- 解释并设计数据库系统中的基于事务的处理。
- Exploit techniques for storing and querying XML data.
- 利用存储和查询 XML 数据的技术。

## OBJECTIVES

The objectives of this assignment are:  
本作业的目标是：  

- To develop skills in the design of data-driven applications.
- 为了培养设计数据驱动应用程序的技能。
- To develop skills in applying SQL to implement the relational design.
- 为了培养应用 SQL 实现关系设计的技能。
- To develop skills in using SQL to define data applications.
- 为了培养使用 SQL 定义数据应用的技能。
- To present an opportunity to practice problem-solving and communication skills.
- 为了提供一个实践问题解决和沟通技巧的机会。

## IMPORTANT INFORMATION

- Due date: <span style="color: red">(19th Dec. 2025, Friday at 13:00).</span>
- 截止日期：<span style="color: red">（2025 年 12 月 19 日，星期五 13:00）。</span>
- Submit a **PDF** file via the online portal with all necessary screenshots, figures, schemes, code, and test runs. State any assumptions made.
- 通过在线门户提交包含所有必要的截图、图表、方案、代码和测试运行的 **PDF** 文件。说明任何做出的假设。
- The file must be named `coursework2_StudentID.pdf`.
- 文件名必须命名为 `coursework2_StudentID.pdf` 。
- This coursework is to be carried out individually.
- 本课程作业需独立完成。
- You have been given three CSV files (`ServiceCenters`, `Equipment`, and `Technicians`).
- 您已收到三个 CSV 文件（ `ServiceCenters` 、 `Equipment` 和 `Technicians` ）。

## TASKS

<div style="text-align: right;">[30 marks total]</div>  
For the coursework submission, you should perform the following:  
对于课程作业提交，你应该执行以下操作：  

1) Examine the files and determine an appropriate relationship model between them. Create and document a physical data model detailing the field types and relationships.<br>检查文件并确定它们之间适当的关系模型。创建并记录一个详细说明字段类型和关系的物理数据模型。<div style="text-align: right;">[5 marks]</div>  
2) Load all three tables into a new database schema.<br>将所有三个表加载到新的数据库中。<div style="text-align: right;">[3 marks]</div>  
3) Recommend and design one additional table that would be appropriate for more efficient reporting of relevant data.<br>推荐并设计一个额外的表格，以更有效地报告相关数据。<div style="text-align: right;">[2 marks]</div>  

The three tables show data redundancies. The reporting system needs to accommodate at least ten years of data. It is unlikely that the current data model will support performance with the anticipated volume.  
三个表格显示了数据冗余。报告系统需要容纳至少十年的数据。目前的数据模型可能无法支持预期的数据量。  

4) Redesign the data model to become more efficient for querying by detailing a logical data model showing elements of first and second normal forms where appropriate.<br>重新设计数据模型，使其在查询时更高效，通过详细展示第一和第二范式元素的逻辑数据模型来实现。<div style="text-align: right;">[3 marks]</div>  
5) Create and document a new physical data model detailing the new structure, and create that structure within your database schema.<br>创建并记录一个新的物理数据模型，详细说明新结构，并在您的数据库模式中创建该结构。<div style="text-align: right;">[3 marks]</div>  
6) Ensure that the data is clean, and describe the steps taken. If you need to remove some of it, explain why that is the case.<br>确保数据是干净的，并描述所采取的步骤。如果您需要删除其中的一部分，请解释原因。<div style="text-align: right;">[2 marks]</div>  
7) Identify appropriate columns and create necessary indexes to optimize query performance.<br>识别合适的列并创建必要的索引以优化查询性能。<div style="text-align: right;">[2 marks]</div>  
8) Answer the following questions using database queries. Include your SQL statements and a screenshot of the output.<br>使用数据库查询回答以下问题。包括你的 SQL 语句和输出截图。<div style="text-align: right;">[10 marks]</div>  
    1. How many different equipment models does the company provide?<br>公司提供多少种不同的设备型号？
    2. How many employed technicians are in each city?<br>每个城市有多少名雇用的技术人员？
    3. How many distinct equipment models are available in each service centre?<br>每个服务中心有多少种不同的设备型号可用？
    4. How many direct reports does each supervisor have?<br>每个主管有多少直接下属？
    5. List all technicians who work at the centre with the highest total stock value.<br>列出在中心工作的所有技术人员中，总库存价值最高的技术人员名单。
    6. Which service centre has the largest technician headcount?<br>哪个服务中心的技术人员数量最多？
    7. Which service centre holds the highest total stock value?<br>哪个服务中心的总库存价值最高？
    8. For the manufacturer “Ritchey”, how many units are held by each service centre?<br>对于制造商“Ritchey”，每个服务中心持有多少单位？
    9. Which equipment type has the highest average unit cost?<br>哪种设备类型的平均单位成本最高？
    10. Which equipment model has the highest total quantity across all centres?<br>哪种设备型号在所有中心的总数量最多？
