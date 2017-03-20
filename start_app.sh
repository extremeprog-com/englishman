#!/bin/bash

npm update
bower update
mkdir www/js
cd www/js
mkdir controllers lib
cd ../../
gulp js
gulp lib
gulp sass
