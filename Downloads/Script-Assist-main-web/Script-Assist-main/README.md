# 🚀 ScriptAssist UK

ScriptAssist UK is a comprehensive tool designed to help users easily access and view detailed information about various resources, including launch data from SpaceX. It provides a clean, responsive interface with image galleries, relevant resource links, and additional launch information, all within an intuitive design.

## ✨ Features

- **Responsive Design**: The app is fully responsive and optimized for different devices.
- **Dynamic Image Carousel**: Showcases a gallery of images using the Mantine Carousel with auto-slide functionality.
- **Interactive Modals**: Click on images to view full-size versions in a modal with smooth animations.
- **Resource Links**: Provides useful links such as Webcast, Articles, and Wikipedia related to the launch data.
- **Detailed Launch Information**: Displays additional information, including the launchpad, success status, and failure reasons (if any).
- **Auto-fetch Data**: Uses React Query to fetch and cache data dynamically from the SpaceX API.

## 📋 Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Technologies Used](#technologies-used)
4. [File Structure](#file-structure)
5. [Contributing](#contributing)
6. [License](#license)

## 🛠️ Installation

Follow these steps to set up the project locally:

### 💉 Prerequisites

Make sure you have the following installed:

- **Node.js**: Version 14 or higher.
- **npm**: Version 6 or higher.
- **React**: Version 17 or higher.

## 🪜 Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ScriptAssist-UK.git

1. Navigate to the project folder:

   ```bash
   cd ScriptAssist-UK
1. Install the required dependencies:

   ```bash
    npm install
1. Start the development server:

   ```bash
    npm start
  The app should now be running on http://localhost:3000.


5. To build the project for production, use the following command:

   ```bash
   npm run build
6. Run tests (if applicalble):

   ```bash
   npm test
7. To format your code using Prettier (if integrated):

   ```bash
   npm run format



## 💻 Usage

Once the project is set up and running, you can:

Browse Resources: View a list of available SpaceX launches with key details.
View Launch Details: Click on any launch to see additional information, including images and relevant links.
Use the Carousel: Swipe through the image gallery or let it auto-slide every few seconds.
Navigate: Use the back button to return to the previous page, or the close button to exit a resource view.

## 👨‍💻 Technologies Used

The project uses the following technologies and libraries:

React: Frontend framework for building user interfaces.
React Router: For handling routing within the app.
@tanstack/react-query: For fetching and caching API data efficiently.
Mantine: UI library for components such as Card, Carousel, Modal, and more.
Tabler Icons: Icon library for adding intuitive icons to buttons and links.
SpaceX API: For retrieving SpaceX launch details.







