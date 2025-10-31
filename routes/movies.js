var express = require('express');
var router = express.Router();
const MovieController = require('../controllers/movieController');

// --- API endpoints (JSON) ---
// lista
router.get('/api', (req, res) => {
	const movies = MovieController.index();
	res.json(movies);
});

// último 5
router.get('/api/last5', (req, res) => {
	const sortBy = req.query.sort || 'year';
	const movies = MovieController.last5(sortBy);
	res.json({ sortBy, movies });
});

// get by id
router.get('/api/:id', (req, res) => {
	const movie = MovieController.findById(req.params.id);
	if (!movie) return res.status(404).json({ error: 'Not found' });
	res.json(movie);
});

// create
router.post('/api', (req, res) => {
	const created = MovieController.create(req.body);
	res.status(201).json(created);
});

// update
router.put('/api/:id', (req, res) => {
	const updated = MovieController.update(req.params.id, req.body);
	if (!updated) return res.status(404).json({ error: 'Not found' });
	res.json(updated);
});

// delete
router.delete('/api/:id', (req, res) => {
	const ok = MovieController.delete(req.params.id);
	res.json({ deleted: ok });
});

// --- View routes (render EJS) ---
router.get('/', (req, res) => {
	const movies = MovieController.index();
	res.render('movies/index', { movies });
});

router.get('/new', (req, res) => {
	res.render('movies/new');
});

router.post('/create', (req, res) => {
	MovieController.create(req.body);
	res.redirect('/movies');
});

router.get('/last5', (req, res) => {
	const sortBy = req.query.sort || 'year';
	const movies = MovieController.last5(sortBy);
	res.render('movies/last5', { movies, sortBy });
});

router.get('/:id/edit', (req, res) => {
	const movie = MovieController.findById(req.params.id);
	if (!movie) return res.status(404).send('Not found');
	res.render('movies/edit', { movie });
});

router.post('/:id/update', (req, res) => {
	MovieController.update(req.params.id, req.body);
	res.redirect('/movies');
});

router.post('/:id/delete', (req, res) => {
	MovieController.delete(req.params.id);
	res.redirect('/movies');
});

module.exports = router;
