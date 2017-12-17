'use strict';

import mongoose from 'mongoose';
// import {registerEvents} from './thing.events';

var ReservationSchema = new mongoose.Schema({
  Type: String,
  golfers: Number,
  course: String,
  teeDate: String,
  teeTime: String,
  menClubs: Number,
  womenClubs: Number,
  specialRequest: String,
  address: String,
  city: String,
  name: String,
  email: String,
  phone: String
});

// registerEvents(ReservationSchema);
export default mongoose.model('Reservation', ReservationSchema);
