# Image Management API

An Express.js-based RESTful API designed for image handling, offering functionality for uploading, listing, retrieving, and dynamically resizing images.

## Key Features

* **Image Upload:** Easily upload images to the server using the `/images/upload` endpoint.
* **Dynamic Resizing & Filtering:** Retrieve images with specified dimensions and filters (e.g., width, height) directly via the API endpoints, powered by the high-performance `sharp` library.
* **Database Persistence:** Image metadata (ID, title, URL, dimensions) is stored using SQLite via `better-sqlite3`.
* **RESTful API Documentation:** Built-in **Swagger UI** for interactive API exploration and testing available at `/api-docs`.
* **CORS Enabled:** Configured with permissive Cross-Origin Resource Sharing settings for easy integration.
* **Code Quality:** Uses **ESLint** for code style enforcement and quality checks.
* **Unit Testing Setup:** Pre-configured with **Jest** for node environment unit testing.

## Technology Stack

| Component | Technology/Library | Purpose |
| :--- | :--- | :--- |
| **Server** | `Node.js, Express` | The core web server framework. |
| **Image Processing** | `sharp` | High-performance image resizing, format conversion, and filtering. |
| **Database** | `better-sqlite3` | Lightweight and fast synchronous SQLite database driver. |
| **File Uploads** | `multer` | Middleware for handling `multipart/form-data` (file uploads). |
| **API Docs** | `swagger-ui-express`, `swagger-jsdoc` | Interactive API documentation generation and UI. |
| **Testing** | `jest` | Testing framework configured for a `node` environment. |

## Getting Started

### Prerequisites

You must have **Node.js** and **npm** installed on your system.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/JasperCherry/fm-task.git](https://github.com/JasperCherry/fm-task.git)
    cd fm-task
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Server

Start the application using the defined `start` script:

```bash
npm start
```

### Testing and Quality Assurance

This project utilizes **Jest** for robust unit testing and **ESLint** for maintaining high code quality and consistency.

### Unit Tests (Jest)

Unit tests are configured to run in a Node environment using Jest, as defined in `jest.config.js`.

**Command to Run All Unit Tests:**

```bash
npm run test:unit
```

### Code Linting (ESLint)

Code style and quality rules are enforced using **ESLint**, which uses your custom configuration in `eslint.config.mjs`.

#### Checking Code Quality

To check the entire codebase for linting errors and style violations:

```bash
npm run lint
```

To automatically fix any fixable style errors (such as indentation, quoting styles, or missing semicolons):

```bash
npm run lint-fix
```