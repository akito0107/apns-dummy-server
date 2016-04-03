# Dummy APNs Server For Unit Testing
Currently, this package only supports feedback service.

## Requirements
- Node.js ( > v4.2.0)
- npm
- openssl

## Quick Start
1. Generate Certificates
    - [check this page](http://engineering.circle.com/https-authorized-certs-with-node-js/)
1. Run
    ```
    $ npm i
    $ node app.js
    ```
1. Confirm Connection
    ```
    $ openssl s_client -connect localhost:2196
    ```
