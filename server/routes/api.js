const express = require('express')
const router = express.Router()

const mongojs = require('mongojs')

// Connecting the database
const db = mongojs(
	'mongodb://mean_gvenij_user:me4321an@ds111876.mlab.com:11876/mean-events',
	['events']
)

/* GET api listing. */
router.get('/', (req, res) => {
	db.events.find(function(err, events) {
		if (err) {
			res.send(err)
		} else {
			res.json(events)
		}
	})
})

// Save event
router.post('/event', function(req, res, next) {
	let event = req.body
	console.log(event)

	if (!event.title || !event.duration || !event.start) {
		res.status(400)
		res.json({
			error: 'Invalid Data'
		})
	} else {
		db.events.save(event, function(err, result) {
			if (err) {
				res.send(err)
			} else {
				res.json(result)
			}
		})
	}
})

// Delete event
router.delete('/event/:id', function(req, res, next) {
	db.events.remove(
		{
			_id: mongojs.ObjectId(req.params.id)
		},
		'',
		function(err, result) {
			if (err) {
				res.send(err)
			} else {
				res.json(result)
			}
		}
	)
})

module.exports = router
