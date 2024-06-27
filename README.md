# assessment-spring-batch
Backend Technical Assessment

## Service

- `assessment-service` directory
- Install Java 17 or higher
- Open the project under the service folder with IDE
- Open Terminal and Run `mvn clean package`
- Open Postman Collection `postman_collection.json`
- Run Batch Process `http://localhost:9090/api/v1/batch-process`
- Get JWT token from `http://localhost:9090/api/v1/auth/login`
- Get All Transactions `http://localhost:9090/api/v1/transactions`
- Search Transaction by Customer ID OR Account No OR Description
- Update Transaction with Description only `http://localhost:9090/api/v1/transactions/update/1`

## Web

### Install Node
- Install node for your machine, version 14.20, from https://nodejs.org/en/blog/release/v14.20.0

#### Project execution
- Open the project directory in Visual Studio Code or another code editor.
- Open the git bash terminal from the project directory, or use the Visual Studio Code terminal to run the project.

### Run project
- Ensure you are in the project directory (which contains `packages.json`).
- Install all dependencies using the command - `npm install`
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/` for Login page User: `admin` and Password: `123456`


