# Use the official .NET 8 SDK image as a base for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
# Install dotnet-ef as a global tool
RUN dotnet tool install --global dotnet-ef
# Set the PATH to include the dotnet tools
ENV PATH="$PATH:/root/.dotnet/tools"

# Copy the project file and restore dependencies
COPY TenderManagementAPI.csproj ./

# Clear the NuGet cache
RUN dotnet nuget locals all --clear

# Restore dependencies
RUN dotnet restore

# Copy the rest of the application code
COPY . ./
RUN dotnet publish -c Release -o out

# Install necessary tools
RUN apt-get update && \
    apt-get install -y curl netcat-openbsd default-mysql-client && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy wait-for-it script
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Run the migrations
CMD ["/wait-for-it.sh", "tendermanagementapi-mysql_db-1:3306", "--", "dotnet", "ef", "database", "update", "--project", "./TenderManagementAPI.csproj"]