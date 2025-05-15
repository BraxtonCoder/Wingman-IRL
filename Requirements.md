Wingman IRL - Project Requirements
Project Overview
Name: Wingman IRL
Tagline: Master the first move
Target Audience: Young men aged 18-30
Purpose: Help users initiate conversations and interactions with women in real-life settings
Business Model: Subscription-based ($4.99/month or $40/year)
Technical Stack
Frontend

Framework: React Native with Expo SDK 52
Styling: NativeWind (Tailwind CSS for React Native)
Language: TypeScript
UI Theme: Dark mode

Backend & Infrastructure

Authentication: Firebase Authentication
Database: Firebase Firestore
Hosting: Firebase Hosting
Functions: Firebase Cloud Functions
Storage: Firebase Storage (if needed for user uploads)

Third-Party Services

Subscription Management: Revenue Cat and/or Superwall

A/B testing for paywalls
Native billing integration


Analytics: Mixpanel

User journey tracking
Onboarding flow analytics
Feature usage metrics


AI Integration: OpenAI API (GPT-4o)

Core Features & Requirements
1. Onboarding Flow

Logo screen with "Master the first move" text and "Get Started" button
Series of onboarding questions to:

Understand user goals
Identify specific challenges
Set commitment levels
Establish psychological investment


User authentication (sign up/sign in)
Hard paywall implementation using Superwall/Revenue Cat
User profile creation with leaderboard username selection

Warning that username will be visible on community leaderboard



2. First Move Tracking (Main Screen)

Calendar view showing daily progress
Three checkbox tracking system per day
Visual growth tree that evolves with progress

50 distinct growth stages
Visual feedback when users check boxes


Running total counter: "You have made the first move to a total of [X] girls"
User pledge/promise display
Top navigation to Community and Leaderboard sections

3. Community Features

Discussion forums
User groups for experience sharing
Moderation tools for maintaining positive environment
Ability to create and join conversations
Optional direct messaging (if within scope)

4. Leaderboard System

Global leaderboard showing users ranked by first-move count
Username display (no personal identifying information)
Time-based filtering (daily, weekly, monthly, all-time)
Honor system acknowledgment

5. AI Coach

ChatGPT wrapper using OpenAI GPT-4o API
Conversation memory to maintain context
Specialized prompting for dating/approach advice
Conversation history storage
Ability to start new conversations
Character limits/usage tracking for API cost management

6. Learning Resources

Curated content on conversation starters
Location recommendations for meeting people
Best practices and techniques
Video tutorials (if within scope)
Progress-based content unlocks (optional)

7. Profile & Settings

Account management
Subscription status and management
Notification preferences
Privacy settings
App theme settings (if alternatives to dark mode are offered)
Goal setting and adjustment
Personal stats and progress visualization

Navigation Structure

Bottom navigation bar with four main sections:

Tracking (Home - Main screen with tree visual)
AI Coach
Learning & Resources
Profile & Settings



User Journey

Splash screen with logo and tagline
Onboarding question sequence
Sign up/sign in flow
Goal-setting and psychological commitment questions
Subscription paywall
Main app interface with bottom navigation
Regular engagement prompts and notifications

Data Models
User

UID (Firebase Auth ID)
Username (for leaderboard)
Registration date
Subscription status and tier
Goals and pledges

Tracking Data

Daily activity logs
First move counts
Timestamps
Growth tree stage

Conversation Logs

AI coach conversation history
Timestamps
Context markers

Community

Forums
Topics
Posts
User participation

Non-Functional Requirements
Performance

App should load within 3 seconds
Smooth transitions between screens
Optimized API calls to OpenAI

Security

Secure authentication
Data encryption
Privacy compliance

Scalability

Support for 10,000+ concurrent users
Database scaling plan
API rate limiting handling

Accessibility

Clear text and contrast ratios
Screen reader compatibility
Alternative input methods

Testing Requirements

Unit tests for core functionality
Integration tests for third-party services
User acceptance testing
Performance testing under load
Cross-device compatibility testing

Deployment Strategy

Phased rollout
Beta testing with limited user group
A/B testing of subscription models
Analytics-driven feature refinement

Future Considerations

iOS and Android feature parity
Web app version
Advanced analytics dashboard
Community moderator roles
Expanded AI features
Social sharing functionality

Metrics for Success

User retention rate
Subscription conversion rate
Daily active users
Average session time
User-reported success stories
Community engagement levels

Timeline

Design phase: [Timeline to be determined]
Development phase: [Timeline to be determined]
Testing phase: [Timeline to be determined]
Deployment phase: [Timeline to be determined]