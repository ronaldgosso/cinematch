# CineMatch: A Hybrid Movie Recommendation Engine
[Site Link](https://christian-response-ai-fc241c.gitlab.io/)


## Getting started
CineMatch is a full-stack web application that uses a hybrid AI approach to provide personalized movie recommendations [1, 2]. The application analyzes movie metadata and user behavior to suggest relevant films, helping users discover new content they will enjoy. The project showcases expertise in data science, machine learning, and modern web development, with a robust architecture that includes a resilient AI model and an automated deployment pipeline [1]. 

## Key Features
### Hybrid Recommendation Engine: 
The core of the project is a hybrid recommendation system that combines both content-based and collaborative filtering [1].

### Content-based Filtering:
The system uses TF-IDF vectorization and cosine similarity to recommend movies with similar genres, casts, and plots [1].

### Robust AI Model (Online and Offline):
To demonstrate system resilience, the application uses a primary cloud-based AI service for complex recommendations. It includes a fallback mechanism to a locally running model for simpler recommendations, ensuring a smooth user experience even with network interruptions [1].

### Automated CI/CD with Webhooks: 
The project includes a continuous integration/continuous deployment (CI/CD) pipeline. This is triggered by webhooks and automates the testing, building, and deployment process, ensuring rapid and reliable delivery of new features [1].

### Dynamic and Responsive Front-end: 
Built with HTML5 and JavaScript, the front-end provides an intuitive and interactive user interface. Users can input their movie preferences, view recommended films with posters and descriptions, and provide feedback to further refine the recommendations [1].

### Scalable Node.js Back-end: 
The back-end, developed with Node.js, manages API integrations (e.g., with a movie database like TMDB),and the logic for generating recommendations. The architecture is designed to be scalable and efficient.

## Technical Stack
### Front-end: 
HTML5, JavaScript (ES6+), CSS3
### Back-end: 
Node.js, Express.js
### AI/ML: 
Python for model training and serving (potentially using scikit-learn, pandas). Integration with a cloud AI service and a local model for fallback (using a lightweight library).
### DevOps: 
CI/CD pipeline configured with webhooks (GitLab CI/CD).
### Data Source: 
TMDB.