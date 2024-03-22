// This file was copied and modified from the samle CPSC 304 Node Project
const oracledb = require('oracledb');
const loadEnvFile = require('./utils/envUtil');
const errorHandler = require('./utils/errorHandler');
const sanitize = require('./utils/sanitization');
const envVariables = loadEnvFile('./.env');

// Database configuration setup. Ensure your .env file has the required database credentials.
const dbConfig = {
    user: envVariables.ORACLE_USER,
    password: envVariables.ORACLE_PASS,
    connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`
};

// ----------------------------------------------------------
// Wrapper to manage OracleDB actions, simplifying connection handling.
async function withOracleDB(action) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        return await action(connection);
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}


// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.
async function testOracleConnection() {
    return await withOracleDB(async (connection) => {
        return true;
    }).catch((error) => {
        throw errorHandler(error);
    });
}

// People Table
async function selectPeopleTable() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM PEOPLE');
        return result
    }).catch((error) => {
        throw errorHandler(error);
    });
}

async function insertPeopleTable(email, companyId, role, firstName, lastName, industry, department) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO PEOPLE VALUES (:email, :companyId, :role, :firstName, :lastName, :industry, :department)`,
            [email, companyId, role, firstName, lastName, industry, department],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch((error) => {
        throw errorHandler(error);
    });
}

async function deletePerson(email) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE FROM PEOPLE WHERE email=:email`,
            [email],
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch((error) => {
        throw errorHandler(error);
    });
}

async function insertCompanyTable(companyId, website, name) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO Company VALUES (:companyId, :website, :name)`,
            [companyId, website, name],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch((error) => {
        throw errorHandler(error);
    });
}

// UPDATE
async function updateCompanyTableALL(oldCID, newWebsite, newName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE Company SET website=:newWebsite, name=:newName WHERE companyID=:oldCID`,
            [newWebsite, newName, oldCID],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch((error) => {
        throw errorHandler(error);
    });
}

async function deleteSpecificCompanyTable(companyID) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE FROM Company WHERE companyID=:companyID`,
            [companyID],
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch((error) => {
        throw errorHandler(error);
        
    });
}

async function selectCompanyTable() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(`SELECT * FROM Company`);
        return result
    }).catch((error) => {
        throw errorHandler(error);
    });
}

//Division
async function divisionDepartmentAllCompanies() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT DISTINCT p2.department 
            FROM People p2 
            WHERE NOT EXISTS (
                SELECT c1.companyID 
                FROM Company c1
                WHERE NOT EXISTS (
                    SELECT p1.companyID
                    FROM People p1
                    WHERE p1.department = p2.department
                    AND p1.companyID = c1.companyID
                ))`
            );
        return result
    }).catch((error) => {
        throw errorHandler(error);
    });
}

//projections

async function projectTables(columns, table) {
    return await withOracleDB(async (connection) => {
        columns = sanitize(columns);
        table = sanitize(table);
        const result = await connection.execute(
            `SELECT ${columns} FROM ${table}`
        );
        return result;
    }).catch((error) => {
        console.log("we here");
        throw errorHandler(error);
    });
}

async function getAllTables() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT table_name FROM user_tables`
        );
        return result;
    }).catch((error) => {
        throw errorHandler(error);
    });
}

async function getTableAttributes(table) {
    table = table.toUpperCase(); // enforce that the table is all uppercase
    return await withOracleDB(async (connection) => {
        table = sanitize(table);
        const result = await connection.execute(
            `SELECT column_name FROM user_tab_columns WHERE table_name='${table}' ORDER BY column_id`
        );
        return result;
    }).catch((error) => {
        throw errorHandler(error);
    })
}

//Join People and company table with regards to the companyID
async function joinPeopleAndCompanyTable() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * FROM Company c, People p WHERE p.CompanyID = c.CompanyID`
        );
        return result
    }).catch((error) => {
        throw errorHandler(error);
    });
}

//Join People and company table then show all the people working in specified company => JOIN AND QUERY
async function companyNameLookup(companyName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * FROM Company c, People p WHERE p.CompanyID = c.CompanyID AND c.Name= :companyName`,
            [companyName],
            { autoCommit: true }
        );
        return result
    }).catch((error) => {
        throw errorHandler(error);
    });
}

// GROUP BY AGGREGATION
//See the number of connections in a company
async function peopleInACompany() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT c.Name AS CompanyName, COUNT(c.Name) AS NumberOfConnections FROM Company c, People p
             WHERE p.CompanyID = c.CompanyID GROUP BY c.Name`
        );
        return result
    }).catch((error) => {
        throw errorHandler(error);
    });
}

//AGGREGATION WITH HAVING 
//See the number of companies with more than a specified number of connections
async function filterPositionInACompany(threshold) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT c.Name AS CompanyName, p.position, COUNT(p.Position) AS NumberOfPositions FROM Company c, People p
             WHERE p.CompanyID = c.CompanyID GROUP BY p.Position, c.Name HAVING COUNT(p.Position) > :threshold`,
             [threshold],
            { autoCommit: true }
        );
        return result
    }).catch((error) => {
        throw errorHandler(error);
    });
}

//NESTED AGGREGATION WITH GROUPBY TODO
//Find the number of people working a certain role in each company; eg- how many hr connections do i have in each company?
async function positionPerCompany() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT AVG(NumberOfConnections)
            FROM (
                SELECT c.Name AS CompanyName, COUNT(c.Name) AS NumberOfConnections FROM Company c, People p
            WHERE p.CompanyID = c.CompanyID GROUP BY c.Name
            )`            
        );
        return result
    }).catch((error) => {
        throw errorHandler(error);
    });
}

// SELECTION FUNCTIONS shows all attributes and allows user to choose what goes in WHERE:
async function filterPeopleTable(whereClause) {
    return await withOracleDB(async (connection) => {
        whereClause = sanitize(whereClause);
        const result = await connection.execute(
            `SELECT * FROM PEOPLE WHERE ${whereClause}`,
        );
        return result;
    }).catch((error) => {
        throw errorHandler(error);
    });
}


module.exports = {
    testOracleConnection,
    selectPeopleTable,
    insertPeopleTable,
    deletePerson,
    insertCompanyTable,
    updateCompanyTableALL,
    deleteSpecificCompanyTable,
    selectCompanyTable,
    projectTables,
    getAllTables,
    getTableAttributes,
    joinPeopleAndCompanyTable,
    companyNameLookup,
    peopleInACompany,
    filterPositionInACompany,
    positionPerCompany,
    filterPeopleTable,
    divisionDepartmentAllCompanies
};