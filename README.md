# TypeScript Express Boilerplate  
  
A production-ready TypeScript/Express API server with PostgreSQL database integration, type-safe API contracts, and automated OpenAPI documentation generation. [1-cite-0](#1-cite-0)   
  
## Features  
  
- **Type-Safe Configuration**: Zod-based environment variable validation with fail-fast startup [1-cite-1](#1-cite-1)   
- **Database**: PostgreSQL with Sequelize ORM [1-cite-2](#1-cite-2)   
- **API Contracts**: Type-safe API definitions using @ts-rest and Zod schemas [1-cite-3](#1-cite-3)   
- **Auto-Generated Docs**: Interactive API documentation via Scalar UI at `/reference` [1-cite-4](#1-cite-4)   
- **Structured Logging**: Winston logger with multiple transports [1-cite-5](#1-cite-5)   
- **Code Quality**: Biome for linting and formatting [1-cite-6](#1-cite-6)   
  
## Tech Stack  
  
- **Runtime**: Node.js with TypeScript 5.9.2 [1-cite-7](#1-cite-7)   
- **Framework**: Express 4.18.0 [1-cite-8](#1-cite-8)   
- **Database**: PostgreSQL with Sequelize 6.37.7 [1-cite-2](#1-cite-2)   
- **Validation**: Zod 3.20.0 [1-cite-9](#1-cite-9)   
- **API Contracts**: @ts-rest 3.52.1 [1-cite-10](#1-cite-10)   
- **Logging**: Winston 3.17.0 [1-cite-5](#1-cite-5)   
- **Code Quality**: Biome 0.3.3 [1-cite-11](#1-cite-11)   
  
## Getting Started  
  
### Prerequisites  
  
- Node.js (latest LTS recommended)  
- PostgreSQL database  
- Redis (optional, for caching)  
  
### Installation  
  
1. Clone the repository  
2. Install dependencies:  
   ```bash  
   npm install
