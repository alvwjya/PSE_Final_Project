const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
import {getRooms, addRoom} from '../controllers/roomController';

router.get('/', getRooms);
router.post('/', addRoom);