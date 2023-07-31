const express = require('express');
const Lessons = require('../models/dbhelpers');

const router = express.Router();

// all endpoints are for /api/lessons
router.post('/', (req, res) => {
    Lessons.add(req.body)
    .then(lesson => {
        res.status(200).json(lesson)
    })
    .catch(error => {
        res.status(500).json({message: "Cannot add Lesson"});
    })
});

router.get('/', (req, res) => {
    Lessons.find()
    .then(lessons => {
        res.status(200).json(lessons);
    })
    .catch(error => {
        res.status(500).json({message: "Unable to retrieve Lessons"})
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Lessons.findById(id).then(lesson => {
        if (lesson) {
            res.status(200).json(lesson)
        } else {
            res.status(404).json({ message: "Record not found"});
        }
    }).catch(error => {
        res.status(500).json({ message: "Unable to perform findbyid operation"})
    }) 
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Lessons.remove(id).then(count => {
        if (count) {
            res.status(200).json({ message: "Successfully deleted record(s)"})
        } else {
            res.status(404).json({ message: "Unable to locate record for deletion"})
        }
    }).catch(error => {
        res.status(500).json({ message: "Unable to perform delete operation"})
    })
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Lessons.update(id, changes)
    .then(lesson => {
        if (lesson) {
            res.status(200).json(lesson)
        } else {
            res.status(404).json({ message: "Unable to locate record for updating"})
        }
    }).catch(error => {
        res.status(500).json({ message: "Unable to perform update operations"})
    })
});

router.post('/:id/messages', (req, res) => {
    const { id } = req.params;
    const msg = req.body;

    if (!msg.lesson_id) {
        msg["lesson_id"] = parseInt(id, 10);
    }

    Lessons.findById(id)
    .then(lesson => {
        if (!lesson) {
            res.status(404).json({ message: "Invalid Lesson ID"});
        }
        // Check for all required fields
        if (!msg.sender || !msg.message) {
            res.status(400).json({ message: "Must provide both Sender and Message values"});
        }
        Lessons.addMessage(msg, id)
        .then(message => {
            if (message) {
                res.status(200).json(message);
            }
        }).catch(error => {
            res.status(500).json({ message: "Failed to add message"});
        })
    }).catch(error => {
        res.status(500).json({ message: "Error finding Lesson"});
    })

});

router.get('/:id/messages', (req, res) => {
    const { id } = req.params;
    
    Lessons.findLessonMessages(id)
    .then(lessons => {
        res.status(200).json(lessons)
    }).catch(error => {
        res.status(500).json({ message: "Error retrieving messages"});
    })
});

module.exports = router;