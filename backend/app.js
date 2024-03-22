const express = require('express');
const { selectPeopleTable, insertPeopleTable } = require('./dbconnection');
const dbconnection = require('./dbconnection');
const app = express();
const cors = require('cors');
const errorHandler = require('./utils/errorHandler');
const loadEnvFile = require('./utils/envUtil');
const envVariables = loadEnvFile('./.env');
const port = envVariables.LOCAL_HOST_PORT;

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
    res.send("First API endpoint test");
});

app.get('/get_people', (req, res) => {
    selectPeopleTable().then((data) => {
        res.send(data);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.post('/add_people', (req, res) => {
    insertPeopleTable(
        req.body.email,
        req.body.companyId,
        req.body.role,
        req.body.firstName,
        req.body.lastName,
        req.body.industry,
        req.body.department
    ).then((data) => {
        if(data) {
            res.json({success: true});
        } else {
            const err = errorHandler('insert');
            res.status(500).send(err)
        }
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.post('/delete_people', (req, res) => {
   dbconnection.deletePerson(req.body.email).then((data) => {
        if(data) {
            res.json({success: true});
        } else {
            const err = errorHandler('delete');
            res.status(500).send(err)
        }
    }).catch((error) => {
        res.status(500).send(error)
    });
});

//Company functions

app.get('/get_company', (req, res) => {
    dbconnection.selectCompanyTable().then((data) => {
        res.send(data);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.post('/add_company', (req, res) => {
    dbconnection.insertCompanyTable(
        req.body.companyId,
        req.body.website,
        req.body.name
    ).then((data) => {
        if(data) {
            res.json({success: true});
        } else {
            const err = errorHandler('insert');
            res.status(500).send(err)
        }
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.post('/update_company', (req, res) => {
    dbconnection.updateCompanyTableALL(
        req.body.oldCID,
        req.body.newWebsite,
        req.body.newName
    ).then((data) => {
        if(data) {
            res.json({success: true});
        } else {
            const err = errorHandler('update');
            res.status(500).send(err)
        }
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.post('/delete_company', (req, res) => {
    dbconnection.deleteSpecificCompanyTable(req.body.companyID).then((data) => {
        if(data) {
            res.json({success: true});
        } else {
            const err = errorHandler('delete');
            res.status(500).send(err)
        }
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.get('/division_department_company', (req, res) => {
    dbconnection.divisionDepartmentAllCompanies().then((data) => {
        res.send(data);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.post('/project_tables', (req, res) => {
    dbconnection.projectTables(req.body.columns, req.body.table).then((data) => {
        res.send(data);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.get('/get_all_tables', (req, res) => {
    dbconnection.getAllTables().then((data) => {
        res.send(data.rows.map(arr => arr[0]));
    }).catch((error) => {
        res.status(500).send(error);
    })
});

app.get('/get_table_attributes', (req, res) => {
    dbconnection.getTableAttributes(req.query.table).then((data) => {
        res.send(data.rows.map(arr => arr[0]));
    }).catch((error) => {
        res.status(500).send(error);
    })
})

app.get('/join_people_company', (req, res) => {
    dbconnection.joinPeopleAndCompanyTable().then((data) => {
        res.send(data);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.post('/lookup_company_name', (req, res) => {
    dbconnection.companyNameLookup(req.body.companyName).then((data) => {
        res.send(data);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.get('/number_people_company', (req, res) => {
    dbconnection.peopleInACompany().then((data) => {
        res.send(data);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.post('/filter_count_positions_in_company', (req, res) => {
    dbconnection.filterPositionInACompany(req.body.threshold).then((data) => {
        res.send(data);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.get('/position_per_company', (req, res) => {
    dbconnection.positionPerCompany(req.body.toSend).then((data) => {
        res.send(data);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.post('/filter_people', (req, res) => {
    dbconnection.filterPeopleTable(req.body.whereClause).then((data) => {
        res.send(data);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
