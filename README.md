# Stock Management

This repository contains two projects: the backend (Nest.js) and the frontend (Next.js) for the Price Tracker.

## Folder Structure

- **Backend**: `price-tracker`
- **Frontend**: `price-tracker-frontend`

## Cloning the Repository

To clone the repository, use the following command:

```bash
git clone https://github.com/diwakarsinghrana/stock-management.git
```

## Backend Setup

1. **Navigate to the backend project directory:**

    ```bash
    cd price-tracker
    ```

2. **Set up MongoDB:**

    Ensure you have a MongoDB instance running and obtain the MongoDB connection URL.

3. **Create a `.env` file:**

    Create a `.env` file in the root of the backend project and add the following variables:

    ```env
    MONGODB_URI=your_mongodb_url
    API_URL=https://api.coingecko.com/api/v3/simple/price
    FRONTEND_URL=http://localhost:3000
    PORT=8000
    ```

4. **Install dependencies:**

    ```bash
    npm install
    ```

5. **Running the backend server:**

    - **Development mode:**

        ```bash
        npm run start:dev
        ```

    - **Build the project:**

        ```bash
        npm run build
        ```

    - **Production mode:**

        ```bash
        npm run start
        ```

## Frontend Setup

1. **Navigate to the frontend project directory:**

    ```bash
    cd price-tracker-frontend
    ```

2. **Create an environment variable file:**

    Create a `.env` file in the root of the frontend project and add the following variable:

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8000
    ```

    This should be the URL of your backend server.

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Running the frontend server:**

    - **Development mode:**

        ```bash
        npm run dev
        ```

    - **Build the project:**

        ```bash
        npm run build
        ```

    - **Production mode:**

        ```bash
        npm start
        ```

## Project Details

The backend server polls for new data every 15 seconds. This interval is chosen to avoid API rate limits, as the API used is free and has restrictions on the number of requests per minute.
