import './index.css';
import Layout from './Layout';

export default function App() {
  return (
    <Layout>
      <div className="text-gray-900 dark:text-gray-100">
        <h1 className="text-3xl font-bold mb-4">Welcome to the App Layout</h1>
        <p>This is the main content area. Try toggling the theme and direction!</p>
      </div>
    </Layout>
  );
}
