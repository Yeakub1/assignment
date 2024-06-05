# Travel Buddy Server 

## Live URL
**https://server-site-apps.vercel.app**

## Features

- **Trip Management**: Create, view, and manage your trips with ease.
- **Travel Buddy Requests**: Send and receive travel buddy requests to join or invite others to your trips.
- **User Profile**: Update user profile status and Maintain your user profile to share information about yourself with other users.
- **Search and Filter**: Find trips and potential travel buddies based on destination, dates, budget, and more.


## Technology Used

- **Programming Language**: TypeScript
- **Web Framework**: Express.js
- **Database**: Railway Database PostgreSQL with Prisma ORM 
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Zod for schema validation
- **Deployment**: Vercel


## API Endpoints

### User Endpoints

- **Register User**: `POST /api/register`
- **Login User**: `POST /api/login`

## Trip Endpoints

- **Create Trip**: `POST /api/trips`
- **Get Trip**: `GET /api/trips`

## Travel Buddy Endpoints

- **Send Travel Buddy Request**: `POST /api/trip/:tripId/request`
- **Get Potential Travel Buddies For a Specific Trip**: `GET /api/travel-buddies/:tripId`
- **Respond to Travel Buddy Request**: `PUT /api/travel-buddies/:buddyId/respond`

## UserProfile Endpoints

- **Get User Profile**: `GET /api/profile`
- **Update User Profile**: `PUT /api/profile`

## Getting Started

To set up the Travel Buddy App locally, follow these steps:

1. **Clone the Repository**
2. **Install Dependencies**: `cd travel-buddy && npm install`
3. **Set Up Environment Variables**: Create a `.env` file based on the provided `.env.example` file and fill in the necessary configuration.
4. **Run Migrations**: `npx prisma migrate dev` to apply database migrations.
5. **Start the Server**: `npm start` to run the backend server.
7. **Access the App**: Visit `http://localhost:3000` in your browser to access the Travel Buddy App.

