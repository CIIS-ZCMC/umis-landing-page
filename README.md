# UMIS (Unified Management and Identity System)

**UMIS** is a centralized platform for user sign-in and registration, designed to handle authentication and access management across multiple integrated systems. Once authenticated, users can view a list of systems they have access to, and seamlessly navigate between systems with automatic authentication.

## Features

- **User Authentication & Registration**: Provides a secure sign-in and registration mechanism.
- **Single Sign-On (SSO)**: Automatically authenticates users across multiple systems, allowing seamless redirection without re-entering credentials.
- **System Access Dashboard**: Displays a list of systems the user has access to.
- **Auto-Redirection with Authentication**: When users click on a system, they are redirected with their authentication details, ensuring secure and smooth transitions.

## Built With

- **React**: For building the user interface.
- **Vite**: For fast development and Hot Module Replacement (HMR).
- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)**: Uses Babel for fast refresh.
- **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)**: An alternative using SWC for fast refresh.
- **Context API / Redux**: To manage global state for user sessions and system access (can be extended based on your implementation).
- **OAuth / JWT / OpenID Connect**: (optional) For implementing secure authentication across systems.

## Getting Started

To get started with this project, follow the steps below:

### Prerequisites

- **Node.js** and **npm**: Ensure you have Node.js installed on your system. You can download it from [Node.js](https://nodejs.org/).
- **Vite**: Vite is used for development and bundling. Learn more at [Vite Official Documentation](https://vitejs.dev/).

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/umis.git
    cd umis
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

### Running the App

To start the development server with hot-reloading:
```bash
npm run dev
