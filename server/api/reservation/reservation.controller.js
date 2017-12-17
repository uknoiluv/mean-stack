/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Reservations              ->  index
 * POST    /api/Reservations              ->  create
 * GET     /api/Reservations/:id          ->  show
 * PUT     /api/Reservations/:id          ->  upsert
 * PATCH   /api/Reservations/:id          ->  patch
 * DELETE  /api/Reservations/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import reservation from './reservation.model';
import {send} from '../../components/mailer';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Reservations
export function index(req, res) {
  return reservation.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Reservation from the DB
export function show(req, res) {
  return reservation.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Reservation in the DB
export function create(req, res) {
  send(req.body);
  console.log('req.body inside create', req.body);
  return reservation.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Reservation in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return reservation.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Reservation in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return reservation.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Reservation from the DB
export function destroy(req, res) {
  return reservation.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
