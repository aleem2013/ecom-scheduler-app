# Job Scheduler Microservice

A scalable job scheduler microservice built with NestJS, TypeScript, and PostgreSQL.

## Setup Instructions

1. **Prerequisites**
   - Node.js (v14 or higher)
   - PostgreSQL
   - npm or yarn

2. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=scheduler_db
   ```

3. **Installation**
   ```bash
   npm install
   ```

4. **Database Migration**
   ```bash
   npm run typeorm:migration:generate
   npm run typeorm:migration:run
   ```

5. **Running the Application**
   ```bash
   # Development
   npm run start:dev
   
   # Production
   npm run build
   npm run start:prod
   ```

## API Documentation

Access the Swagger documentation at `http://localhost:3000/api`

## Scaling Strategy

1. **Horizontal Scaling**
   - Deploy multiple instances behind a load balancer
   - Use container orchestration (Kubernetes) for automatic scaling
   - Implement sticky sessions for job execution consistency

2. **Database Scaling**
   - Implement database read replicas
   - Use connection pooling
   - Implement database sharding for job distribution

3. **Caching Strategy**
   - Use Redis for distributed caching
   - Cache frequently accessed job data
   - Implement cache invalidation patterns

4. **API Management**
   - Rate limiting per user/client
   - API gateway for request routing
   - Circuit breakers for failure isolation

5. **Monitoring and Reliability**
   - Health check endpoints
   - Prometheus metrics integration
   - ELK stack for logging
   - Distributed tracing with Jaeger

6. **Job Execution**
   - Implement job queuing with Redis/RabbitMQ
   - Distribute job execution across worker nodes
   - Implement retry mechanisms for failed jobs

This architecture can handle the specified load of ~6,000 API requests per minute and support ~10,000 users globally.
