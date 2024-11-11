#!/usr/bin/env bash

# Missing domain
curl -i -X POST localhost:8080/api/v1/aliases \
    --header "Authorization: Bearer CHANGEMEBEARER" \
    --header "Content-Type: application/json" \
    --header "X-Requested-With: XMLHttpRequest" \
    --data '{
        "description": "For example.com",
        "format": "uuid"
    }'


# Invalid format
curl -i -X POST localhost:8080/api/v1/aliases \
    --header "Authorization: Bearer CHANGEMEBEARER" \
    --header "Content-Type: application/json" \
    --header "X-Requested-With: XMLHttpRequest" \
    --data '{
        "domain": "anonaddy.me",
        "description": "For example.com",
        "format": "aaaa"
    }'
