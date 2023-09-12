const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

// Parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL database connection configuration
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'test',
  password: 'Test123#',
  database: 'test',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

//USERS CRUD START
// Get all users
app.get('/users', (req, res) => {
    db.query('SELECT * FROM user', (err, results) => {
      if (err) {
        console.error('Error retrieving users:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.status(200).json(results);
    });
});
  
  // Get a single user by ID
app.get('/users/:id', (req, res) => {
    const UserId = req.params.id;
    db.query('SELECT * FROM user WHERE UserId = ?', [UserId], (err, result) => {
      if (err) {
        console.error('Error retrieving user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json(result[0]);
      }
    });
});

  // Delete a user by ID
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM user WHERE UserId = ?', [userId], (err, result) => {
      if (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json({ message: 'User deleted successfully' });
      }
    });
});

// Create a new user
app.post('/users', (req, res) => {
  const { FirstName, LastName, Email, Phone} = req.body;
  const query = 'INSERT INTO user (FirstName, LastName, Email, Phone) VALUES (?, ?, ?, ?)';
  db.query(query, [FirstName, LastName, Email, Phone], (err, result) => {
    if (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.status(201).json({ message: 'User created successfully' });
  });
});

// Update a user by ID
app.put('/users/:UserId', (req, res) => {
  const UserId = req.params.UserId;
  const { FirstName, LastName, Email, Phone } = req.body;
  const query = 'UPDATE user SET FirstName = ?, LastName = ?, Email = ?, Phone = ? WHERE UserId = ?';
  db.query(query, [FirstName, LastName, Email, Phone, UserId], (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json({ message: 'User updated successfully' });
    }
  });
});

//USERS CRUD END

//ISSUES CRUD START
// Get all issues
app.get('/issues', (req, res) => {
    db.query(`SELECT I.IssueId, I.Message, I.Created, U.FirstName+' '+U.LastName User, A.FirstName+' '+A.LastName Agent  FROM issue I LEFT JOIN agent A ON I.AgentX=A.AgentId LEFT JOIN user U ON U.UserId=I.UserX`, (err, results) => {
      if (err) {
        console.error('Error retrieving issues:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.status(200).json(results);
    });
});

// Create a new issues
app.post('/issues', (req, res) => {
    const { Message, UserX } = req.body;
    const query = 'INSERT INTO issue (Message, Created, UserX, AgentX, Finished) VALUES (?, ?, ?, ?, ?)';
    const query2 = 'SELECT A.AgentId FROM agent A WHERE Active = 1 ORDER BY RAND() LIMIT 1';
    
    var freeAgentId = null;
    
    try {
        db.query(query2, (err, result) => {
            if (err) {
                console.error('Error getting a free agent:', err);
            }
        
            if (result.length === 0) {
                console.error('No free agent found.');
            }
            freeAgentId = result[0].AgentId;

            if(freeAgentId>0){
                db.query(query, [Message, new Date(), UserX, freeAgentId, 0], (err, result) => {
                if (err) {
                    console.error('Error creating issue:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
                res.status(201).json({ message: 'Issues created successfully' });
                });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//ISSUES CRUD END

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});