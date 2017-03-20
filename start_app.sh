#!/bin/bash

#port=$(( $1 ? $1 : 80 ))
npm update
bower update
mkdir www/js
cd www/js
mkdir controllers lib
cd ../../
gulp js
gulp lib
gulp sass
#PORT=${port} node server.js