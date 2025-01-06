# Mailcow Anonaddy Request Translator

Translates anonaddy alias requests to mailcow's API. Used as a temporary way to automatically generate mailcow aliases from Bitwarden.

## Installation

A Dockerfile is provided to build a Docker container to run the exporter. Additionally, a Kubernetes Helm chart is included for easy deployment.

### Docker Quickstart Guide

1. Clone the repository to a directory of your choice.
2. Create an environment variable file, `.env` in the directory with the application, and configure it.
3. Edit the config file from the default in `config/default.json` as described below.
4. Build the image with `docker compose build` and run it with `docker compose up -d`.

### Helm Quickstart Guide

1. Install the Helm repo.
```sh
helm repo add mailcow-anonaddy-translator https://pseudoresonance.github.io/mailcow-anonaddy-translator/
```
2. Fetch the values file and configure it to connect to your modem.
```sh
helm show values mailcow-anonaddy-translator/mailcow-anonaddy-translator > values.yaml
```
3. Install the chart.
```sh
helm install mailcow-anonaddy-translator mailcow-anonaddy-translator/mailcow-anonaddy-translator -n mailcow-anonaddy-translator -f values.yaml
```

## Configuration

The config file contains simple user credentials and forward emails. Each user must have a unique password, used as the Anonaddy API key in Bitwarden. Aliases created with that key will be forwarded to the configured email address.
