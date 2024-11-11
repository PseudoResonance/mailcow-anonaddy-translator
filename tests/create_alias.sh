#!/usr/bin/env bash

# Random alias
curl -i -X POST localhost:8080/api/v1/aliases \
    --header "Authorization: Bearer CHANGEMEBEARER" \
    --header "Content-Type: application/json" \
    --header "X-Requested-With: XMLHttpRequest" \
    --data '{
        "domain": "anonaddy.me",
        "description": "For example.com",
        "format": "uuid"
    }'

# Custom alias
curl -i -X POST localhost:8080/api/v1/aliases \
    --header "Authorization: Bearer CHANGEMEBEARER" \
    --header "Content-Type: application/json" \
    --header "X-Requested-With: XMLHttpRequest" \
    --data '{
        "domain": "anonaddy.me",
        "description": "For example.com",
        "format": "custom",
        "local_part": "test"
    }'
