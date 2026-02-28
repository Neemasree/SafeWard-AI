# 🏥 SafeWard AI
> **Intelligent Room-Level Visitor Access Control System**

SafeWard AI is a next-generation hospital security solution designed to protect patient privacy and safety through autonomous room-level access monitoring. Built during the Hackathon, it combines real-time occupancy tracking, policy-driven AI verification, and enterprise-grade security analytics.

![SafeWard AI Banner](https://img.shields.io/badge/Security-Advanced-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-Data_Viz-FF6384?style=for-the-badge)

---

## 🚀 The Vision
In high-pressure hospital environments, traditional logbooks are insufficient. SafeWard AI introduces **Room-Level Intelligence** to ensure that only authorized caregivers and approved visitors enter patient zones, while strictly enforcing safety protocols like Night Mode and maximum occupancy.

## ✨ Key Features

### 🔐 1. Smart AI-Face Verification Terminal
*   **Context-Aware Scans:** AI logic dynamically adapts to active site policies.
*   **Access Rejections:** Automatically blocks unauthorized individuals or those violating current room policies.
*   **Visual Feedback:** Instant UI response (Access Granted/Denied) with biometric simulation.

### 🌓 2. Autonomous Policy Engine
*   **Day Mode:** Standard visitor rules with a 4-person occupancy limit.
*   **Night Mode:** High-security state that **automatically blocks all visitor attempts**, allowing only registered caregivers.

### 📊 3. Enterprise Security Analytics
*   **Live Dashboard:** Real-time monitoring of room occupancy, caregiver count, and visitor activity.
*   **Authorization Breakdown:** Pie charts visualizing the distribution of authorized vs. blocked entries.
*   **Defense Trajectory:** Time-series Bar charts tracking unauthorized access attempts to identify peak security risks.

### 📝 4. Real-time Security Event Stream
*   **Precision Logging:** Every system event—from policy shifts to biometrics failures—is logged with sub-second timestamps.
*   **Exit Tracking:** Full facility entry/exit simulation to maintain 100% occupancy accuracy.

---

## 🛠️ Built With
- **Frontend:** React 18, React Router DOM (v6)
- **State Management:** React Context API (Global App State)
- **Styling:** Premium Glassmorphism UI, Custom CSS, Bootstrap 5, Bootstrap Icons
- **Analytics:** Recharts (Advanced Data Visualization)
- **Animations:** CSS3 Keyframe Animations (SlideUp, Pulse, Scanning Effects)

---

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Neemasree/SafeWard-AI.git
   ```
2. Navigate to the project directory:
   ```bash
   cd SafeWard-AI
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 📸 Presentation Script for Judges
1.  **Safety First:** Register a caregiver and a visitor; observe the dashboard analytics updating in real-time to secure the facility.
2.  **Night Watch:** Toggle the **Night Shift Policy**. Initiate a **Biometric Scan**—watch the AI strictly block the visitor and log a hard security event in the stream.
3.  **Analytics:** Scroll down to the **Security Intelligence** suite to analyze the authorization breakdown and defense trajectory graphs.
4.  **Logistics:** Demonstrate the **Log Departure Event** to prove the system maintains a 100% accurate live occupancy count.
5.  **Crowd Control:** Simulate entries until occupancy reaches **4/4**. Attempt a final entry—the system will enforce a hard block based on capacity safety protocols.

---

Developed with ❤️ for the Hackathon by **Neema Sree**.
