#!/bin/bash

run() {
    echo "Starting the NestJS server..."

    yarn run start:dev
    SERVER_PID=$!

    echo "Server started with PID $SERVER_PID."

    cleanup() {
        echo "Stopping the NestJS server..."
        kill $SERVER_PID
        wait $SERVER_PID 2>/dev/null
        echo "Server stopped."
        exit
    }

    trap cleanup SIGINT SIGTERM

    wait $SERVER_PID
}

run
