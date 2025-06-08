# Devotel - Dynamic Insurance Form Builder

A modern, dynamic insurance form builder application that allows users to create, manage, and submit insurance applications with conditional logic and real-time validation.

## 🌟 Features

### Core Features
- **Dynamic Form Generation**
  - ✅ Fetches form structures from API
  - ✅ Renders forms dynamically without hardcoding
  - ✅ Supports nested form sections (e.g., Address, Vehicle Details)
  - ✅ Conditional field visibility based on user responses
  - ✅ Dynamic option loading from API (e.g., states based on country)

- **Form Management**
  - ✅ Real-time form validation
  - ✅ Conditional field dependencies
  - ✅ Nested form sections
  - ✅ Dynamic field options
  - ✅ Form submission handling

- **Application List View**
  - ✅ Customizable table columns
  - ✅ Sorting and filtering capabilities
  - ✅ Pagination support
  - ✅ Search functionality
  - ✅ Column visibility toggle

### Enhanced Features
- **Internationalization**
  - ✅ Multi-language support (English & Persian)
  - ✅ RTL layout support
  - ✅ Direction-aware components

- **UI/UX**
  - ✅ Responsive design
  - ✅ Dark mode support
  - ✅ Modern UI components
  - ✅ Loading states
  - ✅ Error handling

## 🛠️ Tech Stack

### Core Technologies
- React 19
- TypeScript
- Vite
- Tailwind CSS

### Key Libraries
- `react-hook-form` - Form handling and validation
- `@tanstack/react-query` - API data fetching and caching
- `i18next` - Internationalization
- `react-router-dom` - Routing
- `tailwind-merge` & `clsx` - Utility-first CSS

### Development Tools
- ESLint
- Prettier
- TypeScript
- Vite

## 📁 Project Structure

```
src/
├── app/          # Application configuration
├── assets/       # Static assets
├── components/   # Reusable UI components
│   └── ui/       # Base UI components
├── locales/      # Translation files
├── pages/        # Page components
├── providers/    # Context providers
├── services/     # API services
└── utils/        # Utility functions
```

## 🚀 Getting Started

1. **Installation**
   ```bash
   npm install
   ```

2. **Development**
   ```bash
   npm run dev
   ```

3. **Build**
   ```bash
   npm run build
   ```

4. **Linting**
   ```bash
   npm run lint
   ```

## 📋 Project Progress

### Completed Features
- ✅ Dynamic form generation and rendering
- ✅ Conditional field logic
- ✅ Form validation
- ✅ Multi-language support
- ✅ RTL layout support
- ✅ Dark mode
- ✅ Customizable list view
- ✅ API integration

### In Progress
- ⏳ Autosave drafts
- ⏳ Unit tests
- ⏳ Drag-and-drop field reordering

## 🎯 Acceptance Criteria

### Form Building
- [x] Dynamic form structure from API
- [x] Conditional field visibility
- [x] Nested form sections
- [x] Dynamic field options
- [x] Form validation

### List View
- [x] Customizable columns
- [x] Sorting and filtering
- [x] Pagination
- [x] Search functionality

### Technical Requirements
- [x] Dynamic field handling
- [x] API integration
- [x] Responsive design
- [x] React best practices
- [x] Internationalization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License.
