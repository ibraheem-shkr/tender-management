#!/usr/bin/env bash
# Use this script to wait for a MySQL service to be available
set -e

host="$1"
shift
password="$1"  # Get the password from the arguments
shift
cmd="$@"

# Function to check MySQL readiness
check_mysql() {
  mysqladmin ping -h "$host" -u root -p"$password" --silent
}

# Debugging output
echo "Waiting for MySQL at $host..."

until check_mysql; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "MySQL is up - executing command"
exec $cmd