#!/usr/bin/env bash

# Missing auth
curl -i -X POST localhost:8080/api/v1/aliases \
    --header "Content-Type: application/json" \
    --header "X-Requested-With: XMLHttpRequest" \
    --data '{
        "domain": "anonaddy.me",
        "description": "For example.com",
        "format": "uuid"
    }'


# Invalid auth format
curl -i -X POST localhost:8080/api/v1/aliases \
    --header "Authorization: notatoken" \
    --header "Content-Type: application/json" \
    --header "X-Requested-With: XMLHttpRequest" \
    --data '{
        "domain": "anonaddy.me",
        "description": "For example.com",
        "format": "uuid"
    }'


# Invalid auth
curl -i -X POST localhost:8080/api/v1/aliases \
    --header "Authorization: Bearer notatoken" \
    --header "Content-Type: application/json" \
    --header "X-Requested-With: XMLHttpRequest" \
    --data '{
        "domain": "anonaddy.me",
        "description": "For example.com",
        "format": "uuid"
    }'
