const express = require('express');
const { getResturantById, uploadResturantPhoto } = require('../../Controllers/Resturant/user');
const router = expres.router();

router.param("resturantId", getResturantById);

