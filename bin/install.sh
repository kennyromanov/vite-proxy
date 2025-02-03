#!/bin/bash

set -e  # Stop execution on error

#echo "🔍 Checking dependencies..."

# Function to check if a program is installed
check_dependency() {
    if ! command -v "$1" &> /dev/null; then
        echo "📥 $1 not found, installing..."
        return 1
    else
        return 0
    fi
}

# Check and install Bun
check_dependency bun || {
    curl -fsSL https://bun.sh/install | bash
}

# Install project dependencies
#echo "📦 Installing project dependencies..."
#bun i

# Starting the application
#echo "🎉 Installation completed! Starting the application..."
#bin/start.sh
