# DSAlytics - DSA Streak Tracker

DSAlytics is a web application designed to help users track their progress and maintain consistency in solving Data Structures and Algorithms (DSA) problems. It provides visualization tools, analytics, and AI-powered insights to motivate users on their problem-solving journey.

![DSAlytics Dashboard](https://storage.googleapis.com/static.aiforge.studio/doc_images/dsalytics-screenshot.png)

## ✨ Key Features

- **🔐 Google Authentication:** Secure and easy sign-in with Google accounts.
- **🗓️ Calendar Heatmap:** Visualize your daily problem-solving consistency at a glance.
- **📊 Progress Analytics:** Track problems solved by topic and difficulty to identify strengths and weaknesses.
- ** streaks:** Monitor your current and longest streaks to stay motivated.
- **🤖 AI-Powered Insights:** Get personalized recommendations from an AI agent on which topics to focus on next based on your solving history.
- **📝 Problem Logging:** Easily log every problem you solve with its title, topic, difficulty, and a link.
- **👤 User Profiles:** A dedicated page to view your account details.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **UI:** [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Authentication & Database:** [Firebase Authentication](https://firebase.google.com/docs/auth) & [Firestore](https://firebase.google.com/docs/firestore)
- **AI/Generative AI:** [Genkit](https://firebase.google.com/docs/genkit)

## 🛠️ Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/dsalytics.git
cd dsalytics
```

### 2. Install Dependencies

Install the required packages using npm:

```bash
npm install
```

### 3. Set Up Firebase

1.  Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  Add a new Web App to your project.
3.  Copy the `firebaseConfig` object provided.
4.  Paste your configuration into `src/lib/firebase.ts`.
5.  **Enable Google Authentication:**
    - In the Firebase Console, go to **Authentication > Sign-in method**.
    - Enable the **Google** provider.
    - Add your local development domain (`localhost`) to the list of authorized domains.
6.  **Set up Firestore:**
    - Go to **Firestore Database** and create a new database.
    - Start in **production mode**.
    - Go to the **Rules** tab and paste the following rules to secure user data:
      ```
      rules_version = '2';
      service cloud.firestore {
        match /databases/{database}/documents {
          match /users/{userId}/problems/{problemId} {
            allow read, write: if request.auth != null && request.auth.uid == userId;
          }
        }
      }
      ```

### 4. Set Up Environment Variables

This project uses Genkit for AI features. You will need a Google AI API key.

1.  Create a `.env` file in the root of the project.
2.  Add your API key to the `.env` file:
    ```
    GEMINI_API_KEY=your_google_ai_api_key
    ```

### 5. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser to see the application.
