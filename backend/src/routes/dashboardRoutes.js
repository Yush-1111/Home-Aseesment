const express = require('express');
const authMiddleware = require('../middleware');

const router = express.Router();

const dummyData = {
  leads: [
    { id: 1, name: 'Acme Corp', status: 'New' },
    { id: 2, name: 'BlueSky Ltd', status: 'Contacted' },
    { id: 3, name: 'Orbit Tech', status: 'Qualified' }
  ],
  tasks: [
    { id: 1, title: 'Follow up with Acme Corp', dueDate: '2026-03-28' },
    { id: 2, title: 'Prepare proposal for BlueSky Ltd', dueDate: '2026-03-30' },
    { id: 3, title: 'Schedule demo with Orbit Tech', dueDate: '2026-04-01' }
  ],
  users: [
    { id: 1, name: 'Ayush', role: 'Admin' },
    { id: 2, name: 'Riya', role: 'Sales' },
    { id: 3, name: 'Karan', role: 'Support' }
  ]
};

router.get('/dashboard', authMiddleware, (req, res) => {
  return res.json({
    message: `Welcome ${req.user.name}`,
    data: dummyData
  });
});

module.exports = router;
