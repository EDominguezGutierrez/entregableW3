const catchError = require('../utils/catchError');
const Director = require('../models/Director');
const Movie = require('../models/Movie');


// --> GET
const getAll = catchError(async(req, res) => {
    const results = await Director.findAll({ include: [ Movie ]});
    return res.json(results);
});


// --> POST
const create = catchError(async(req, res) => {
    const result = await Director.create(req.body);
    return res.status(201).json(result);
});


// --> GET
const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Director.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});


// --> DELETE
const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Director.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});


// --> PUT
const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Director.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}