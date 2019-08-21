const { Pool } = require('pg');

const args = process.argv.slice(2);

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.connect();

const text =
  `
  SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
  FROM teachers
  JOIN assistance_requests ON teachers.id = teacher_id
  JOIN students ON students.id = student_id
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  ORDER BY teachers.name;
  `;
const values = [`%${args[0]}%`];

pool
  .query(text, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(
        `${user.cohort}: ${user.teacher}`
      );
    });
  }).catch(err => console.error('query error', err.stack));


