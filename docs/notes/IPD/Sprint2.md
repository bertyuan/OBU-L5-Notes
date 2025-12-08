# SPRINT 2: TECHNICAL DESIGN

**Topic:** Technical Design.

Students will focus on defining the **technical backbone** of their projects, such as architecture, data models, and integration strategies.

---

## Deliverables for Week 11–12

* Sprint documentation
  * Sprint 2 Trello board
  * Technical User Stories
  * Acceptance Criteria
  * Tasks
* Working results
  * Product demo
  * Product demo code files
  * High-Level Architecture Diagrams*
  * Your team technical research conclusion

---

High-Level Architecture Diagrams*:

A boilerplate application built with your chosen stack of technology. This application doesn’t need to have any specific functionality, but must enable data exchange between the front end and the database in both directions.

That is to say, the user should be able to, on the front end:

* Retrieve information from the database, and
* Write information into the database.

---

## Defining Acceptance Criteria Examples

### For the database schema

* The schema supports queries for performance data within **100ms**.
* Tables and relationships adhere to the proposed data model.

### For API integration

* OAuth authentication is implemented and tested with **3 platforms**.
* Error handling returns user-friendly messages for failed logins.

---

## High-Level Architecture

**Focus on:**

* Key components (e.g., frontend, backend, database).
* Interactions between components (e.g., APIs, authentication).
* Scalability and modularity.

### Example for a Game Data Analytics Platform

* **Frontend:** React-based dashboard.
* **Backend:** Node.js API handling user data.
* **Database:** PostgreSQL storing performance and inventory data.

---

## The Product Ideas for Students to Select

### 1. Mobile Application: Habit Tracker & Motivation App

**Name:** HabitHive

**Description:**
A mobile app designed to help users build and maintain healthy habits. HabitHive combines habit tracking with motivational gamification, including streaks, rewards, and social accountability.

#### Key Features

1. **Habit Creation and Tracking**

   * Users can create custom habits with reminders (e.g., “Drink water 3x daily”).
   * Track habit completion daily, weekly, or monthly.

2. **Gamification**

   * Users earn points for habit streaks.
   * Redeem points for badges or customize their profile avatar.

3. **Social Sharing and Groups**

   * Join or create habit groups for accountability.
   * Share progress or compete with friends.

4. **Analytics and Insights**

   * View progress charts and identify patterns.
   * Get personalized habit improvement suggestions.

5. **Third-Party Integration (optional)**

   * Sync with Apple Health, or other apps for automated habit tracking.

#### Technical Challenges

* **Data Modeling:** Design a database for habits, user profiles, and progress logs.
* **Third-Party Integration:** Implement APIs for health app syncing.
* **Scalability:** Ensure the app can support thousands of users and handle real-time updates.

#### Technology Stack Suggestions

* **Frontend:** React Native for cross-platform mobile development.
* **Backend:** Node.js with Express for API development.
* **Database:** Firebase or PostgreSQL for habit and user data.

---

### 2. Website: Local Events and Activities Finder

**Name:** EventSphere

**Description:**
A web platform that connects users to local events and activities based on their interests and location. EventSphere makes it easy to discover concerts, workshops, sports events, and meetups.

#### Key Features

1. **Event Discovery**

   * Users can filter events by category (e.g., music, tech, fitness) and date.
   * Personalized recommendations based on user preferences.

2. **Event Management**

   * Users can create and host events with ticketing options.
   * Hosts can manage RSVPs and communicate with attendees.

3. **Map Integration**

   * Events are displayed on an interactive map based on user location.
   * Directions to events via Google Maps integration.

4. **Social Features**

   * Users can follow event hosts or join interest-based groups.
   * Share event details with friends through social media or email.

5. **Analytics for Hosts (optional)**

   * Insights on ticket sales, attendee demographics, and feedback.

#### Technical Challenges

* **Data Modeling:** Handle events, locations, users, and ticketing.
* **API Integration:** Use Google Maps API for location-based services.
* **Real-Time Updates:** Implement real-time notifications for event changes or updates.

#### Technology Stack Suggestions

* **Frontend:** React.js with Material-UI for responsive design.
* **Backend:** Python with Flask or Django for robust web APIs.
* **Database:** PostgreSQL for relational data, Redis for caching.
* **Third-Party APIs:** Baidu Maps API, Stripe for ticket payments.

---

## Technical User Stories for HabitHive (Mobile App)

### Database Design

**User Story:**
As a developer, I want to design a database schema for storing user habits and progress so that the data can be queried efficiently.

**Acceptance Criteria:**

1. The database contains tables for users, habits, progress logs, and achievements.
2. Relationships between tables (e.g., one-to-many between users and habits) are properly implemented.
3. Queries to fetch weekly habit progress take less than **100ms**.

---

### Push Notification System

**User Story:**
As a developer, I want to implement a push notification service so that users are reminded to complete their habits.

**Acceptance Criteria:**

1. Notifications are sent at the user-specified time.
2. The notification service retries failed messages up to **3 times**.
3. Users can toggle notifications on or off.

---

## Technical User Stories for EventSphere (Website)

### Search API

**User Story:**
As a developer, I want to build an API endpoint for event search so that users can filter events by location, category, and date.

**Acceptance Criteria:**

1. The API supports `GET` requests with query parameters for location, category, and date range.
2. The results are sorted by relevance.
3. The API can handle **100 simultaneous requests** without degrading performance.
