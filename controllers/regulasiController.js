const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const Regulasi = require('../models/regulasiModel');
const handlerFactory = require('./handlerFactory');
require('dotenv').config();

exports.getAllRegulasi = catchAsync(async (req, res, next) => {
  const regulasi = await Regulasi.findAll();

  res.status(200).json({
    status: 'success',
    results: regulasi.length,
    data: regulasi,
  });
});

exports.createRegulasi = catchAsync(async (req, res, next) => {
  const regulasi = await Regulasi.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      regulasi,
    },
  });
});

exports.updateRegulasi = catchAsync(async (req, res, next) => {
  // Find the berita record by ID
  const regulasi = await Regulasi.findByPk(req.params.id);

  if (!regulasi) {
    return next(new AppError('No document found with that ID', 404));
  }

  // Update the berita record with the new data
  await regulasi.update(req.body);

  res.status(200).json({
    status: 'success',
    data: regulasi,
  });
});

exports.getRegulasi = catchAsync(async (req, res, next) => {
  const regulasi = await Regulasi.findByPk(req.params.id);

  if (!regulasi) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: regulasi,
  });
});

exports.deleteRegulasi = handlerFactory.deleteOne(Regulasi);
