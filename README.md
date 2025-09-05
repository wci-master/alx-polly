# ALX Polly - Interactive Polling Application

## Project Overview

ALX Polly is a modern, interactive polling application built with Next.js that allows users to create, vote on, and manage polls. The application features a clean, responsive UI with animations and real-time updates.

### Tech Stack

- **Frontend**: Next.js 15.5, React 19.1, TypeScript
- **UI Components**: Custom UI components with Tailwind CSS
- **Animations**: Framer Motion for smooth transitions
- **State Management**: React hooks and context
- **Testing**: Jest for unit and integration testing

## Features

- Create custom polls with multiple options
- Vote on existing polls
- View real-time poll results
- Responsive design for all devices
- Animated UI elements for better user experience
- Toast notifications for user feedback

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/alx-polly.git
cd alx-polly
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables (if needed):

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_API_URL=your_api_url_if_applicable
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage Examples

### Creating a Poll

1. Navigate to the Polls page
2. Click the "Create Poll" button
3. Fill in the poll title, description, and options
4. Click "Create" to publish your poll

### Voting on a Poll

1. Browse the available polls on the Polls page
2. Click on a poll to view its details
3. Select your preferred option
4. Click "Vote" to submit your choice
5. View the updated results in real-time

## Testing

The application includes comprehensive tests for all major components and services.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── polls/            # Polls pages and components
│   └── page.tsx          # Home page
├── components/           # Reusable UI components
│   ├── ui/               # Base UI components
│   └── polls/            # Poll-specific components
├── hooks/                # Custom React hooks
├── services/             # Service layer for data handling
│   └── poll-service.ts   # Poll management service
├── styles/               # Global styles
└── __tests__/            # Test files
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
