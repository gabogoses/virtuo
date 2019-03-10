const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Station = require("../models/station");
const Car = require("../models/car");

router.get("/", (req, res, next) => {
  Station.find()
    .populate({ path: "cars", select: "name" })
    .select()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  const station = new Station({
    _id: mongoose.Types.ObjectId(),
    stationName: req.body.stationName
  });
  station
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Station created succesfully"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  res.status(201).json({
    message: "Station created",
    station: station
  });
});

router.get("/:stationId", (req, res, next) => {
  Station.findById(req.params.stationId)
    .populate({ path: "cars", select: "name" })
    .exec()
    .then(station => {
      if (!station) {
        return res.status(404).json({
          message: "Station not found"
        });
      }
      res.status(200).json({
        station: station
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:stationId", (req, res, next) => {
  Station.remove({ _id: req.params.stationId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Station deleted"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;