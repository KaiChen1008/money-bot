#!/bin/bash

docker container prune -f

docker rmi money-bot

docker build -t money-bot . --no-cache

. run.sh
