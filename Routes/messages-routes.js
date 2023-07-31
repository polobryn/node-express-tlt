const express = require("express");
const Lessons = require("../models/dbhelpers");

const router = express.Router();

// all endpoints are for /api/messages
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Lessons.removeMessage(id)
    .then(count => {
        if(count > 0) {
            res.status(200).json({ message: `Message with id ${id} successfully deleted`});
        } else {
            res.status(404).json({ message: `There is no message with id ${id}`});
        }
    }).catch(error => {
        res.status(500).json({ message: "Error deleting message"});
    })
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Lessons.updateMessages(id, changes)
    .then(message => {
        if (message) {
            res.status(200).json(message)
        } else {
            res.status(404).json({ message: "Unable to find Message"});
        }
    }).catch(error => {
        res.status(500).json({ message: "Unable to perform update operation"});
    });
});

module.exports = router;