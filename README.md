# BWinners Test Task Tomasz Sikora

The Multibet app includes features such as filtering, backend-hosted data, a cart system, and submission functionality. While many more features and tests could be implemented, due to time constraints, some functionalities may contain bugs. This is expected given the limited timeframe in which the app was developed.

# 🛠️ Tech Stack

- React + TypeScript
- Zustand for state management
- Tailwind CSS for styling
- Vite for build tooling
- Vitest for unit testing

# 📱 Features

- Responsive design optimized for mobile and desktop
- Multi-bet selection and cart summary
- Simple and clean UI
- Basic input validation and error feedback

# 🧪 Testing

Includes a set of unit tests covering key logic and hooks. Not all features are tested due to time constraints.


## 🧩 Project Structure

- `frontend/` – Main application with UI, hooks, and components
- `backend/` – JSON server mock API (`db.json`)
- `frontend/store/` – Zustand state stores
- `frontend/hooks/` – Custom logic (e.g., cart handling, filtering)
- `frontend/components/` – Reusable UI components
- `frontend/api/` – fetching and transforming content coming from backend
- `frontend/assets/` – place for media assets
- `frontend/config/` – holds application-wide configuration values, such as environment-based API URLs.
- `frontend/constamnts/` – holds application-wide values which are contant
- `frontend/mappers/` – holds functions that transform data from external formats (e.g., API responses) into internal app models.
- `frontend/message/` – holds centralized place to keep copy for the project
- `frontend/types/` – holds shared types
- `frontend/utils/` – holds utility function which can be useful across the app

### Install and run the app

- `yarn install` install all dependencies
- `yarn dev` for development environment
- `yarn build` build prod environemnt
- `yarn start` run prod environment
- `yarn test` run unit tests
