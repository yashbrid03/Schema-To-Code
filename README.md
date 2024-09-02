# Schema to code
This project provides User Interface to generate SQL database schema code by just doing drag and drop.You can save and download your schemas. You can also generate SQL queries according to your needs.

## Architecture
![Group 14](https://github.com/user-attachments/assets/f0e6470f-02f0-4477-8adb-8d7885c693ac)

## Workflow
#### Schema designer Workflow
1. The user creates a board.
2. The user can create multiple tables and add fields to each table.
3. The user connects tables to define relationships between them.
4. The board is updated and saved in Firebase.
5. The user can download the schema as a PNG file.
6. The user can generate SQL code for the designed schema.
7. Data from the design is collected and processed through a custom workflow, which outputs the corresponding SQL code.

#### Query Generator Workflow
1. The user provides a database schema or schema description along with the expected query result as input.
2. This input is collected and processed through a custom workflow, which generates the SQL query needed to achieve the desired output.

## Techstack
<li>ReactJs</li>
<li>Firebase</li>
<li>ReactFlow</li>
<li>Tailwind</li>
<li>EdenAI</li>
