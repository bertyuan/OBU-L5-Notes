# Database Coursework 1

## Learning Outcomes

The two coursework of this module address the following learning outcomes:

- Use SQL and XML to define data applications appropriate to a specified problem.
- Use a conceptual modelling language to specify and analyse data requirements and apply database design principles to map a set of system requirements to an efficient (e.g., normalised) database.
- Explain and design transaction-based processing in database systems.
- Exploit techniques for storing and querying XML data.

> [!NOTE]IMPORTANT INFORMATION
> - Due date: **(17th Nov. 2025, Monday at 13:00)**.
> - This coursework is to be carried out individually.
> - You have been given one DTD file (**orders_sample**) and three XML files (**orders_sample**, **library_orders**, and **library_clients**) to be used for the coursework.

## COURSEWORK OUTLINE

A nationwide bookstore chain with multiple branches is integrating client and order information across its stores. Clients can purchase books in-store or place orders through the company’s website. Payments are processed at the retail price, with free delivery offered within the city. Once a purchase is confirmed, the books are delivered to the client’s provided address.

The bookstore’s central administrative office has requested that client and order data be consolidated into a single XML document, suitable for upload via FTP. Additionally, the company aims to leverage the advantages of the JSON format for enhanced interoperability and analytics across its internal systems. Accordingly, the final information should also be consolidated into a single JSON document for deeper analysis and exploration.

## DELIVERABLES

You have been asked to:

### 1) Spot the errors in the given ‘orders_sample.dtd’ file. You should provide:

- **a.** An image of the DTD with the errors circled in red, along with a brief note of each error.  
  The file should be called `1_DTD_sample_Errors.jpeg`.
- **b.** A corrected version of the external DTD file. The file should be called `2_Corrected_sample.dtd`.
- **c.** Provide a screenshot called `3_Validation_sample.jpeg` after validating the `orders_sample.xml` file against the corrected external DTD through a validator, proving that they validate with no errors.

### 2) Submit two XSLT transformations and output files, one to export the XML data and the other to export the JSON data. Your XSLT files must be correctly formatted and be able to run against the XML files (`library_orders`, and `library_clients`) supplied by the bookstore company. The following specifications must be followed:

**a. XML:**

- **I.** The XSL file must be called `4_Transformation_to_XML.xsl`.
- **II.** It must use XSLT v1.0 as requested by the company.
- **III.** You have to provide comments to explain your reasoning and work.
- **IV.** The XML output file must contain a root element called `Orders`.
- **V.** The XML file contents should contain the orders and the relevant client data, ordered by the branch, and then by date.
- **VI.** The provided XML file must be called `5_Output.xml`.
- **VII.** A related external DTD must be automatically referenced in the `output.xml` file and not be manually added.
- **VIII.** DTD Details:
  - Create a new external DTD file that describes the output XML file. So that the administrative office can validate the XML output file and ensure it is correct. The DTD must adhere to the following requirements:
    1. It must follow a logical structure of the data as follows:
    ```txt
    Orders
        Branch
            Date
                Order
                    ...Order and client details
                Order
                    ...Order and client details
            Date
                Order
                    ...Order and client details
        Branch
            Date
                Order
                    ...Order and client details
    ```
    2. Well-written external DTD structure.
    3. Logical naming convention of elements and attributes.
    4. Nested elements are correctly declared.
    5. At least one attribute should be used.
    6. The DTD file must be called `6_Structure.dtd`.
    7. It should be validated against the output XML file through a validator, and a screenshot called `7_Validation_XML.jpeg` should be attached, showing that it validates with no errors.

**b. JSON:**

- **I.** The XSL file must be called `8_Transformation_to_JSON.xsl`.
- **II.** You have to provide comments to explain your reasoning and work.
- **III.** Ensure that the content of the JSON file accurately represents the data from the XML files and save the converted file as `9_Output.json`.
- **IV.** Validate the JSON file, capture a screenshot of the validation, and save it as `10_Validation_json.jpeg` to demonstrate that the file has no errors.

---

### Submission Bundle

The specification for the structure of the submission is as follows:

- **a.** A ZIP file should be uploaded via the online portal.
- **b.** The ZIP bundle must be named `Coursework1_StudentID.zip.`
- **c.** File names must be **EXACT**, including the specified file extension.

---

| **File type** | **Purpose**                                | **Filename**                   | **Marks** |
|---------------|--------------------------------------------|--------------------------------|-----------|
| JPEG file     | Image with DTD errors + errors description | `1_DTD_sample_Errors.jpeg`     | 2         |
| DTD file      | Your corrected DTD file                    | `2_Corrected_sample.dtd`       | 2         |
| JPEG file     | Image of your XML validation               | `3_Validation_sample.jpeg`     | 1         |
| XSL file      | Your XSL to XML transform file             | `4_Transformation_to_XML.xsl`  | 4         |
| XML file      | The result of your XML transform           | `5_Output.xml`                 | 1         |
| DTD file      | The DTD that validates the XML output file | `6_Structure.dtd`              | 3         |
| JPEG file     | Image of your XML validation               | `7_Validation_XML.jpeg`        | 1         |
| XSL file      | Your XSL to JSON transform file            | `8_Transformation_to_JSON.xsl` | 4         |
| JSON file     | The result of your JSON transform          | `9_Output.json`                | 1         |
| JPEG file     | Image of your JSON validation              | `10_Validation_json.jpeg`      | 1         |
