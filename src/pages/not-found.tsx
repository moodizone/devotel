import { Link } from 'react-router-dom';
import { Typography } from '../components/ui/typography';
import { Button } from '../components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
      <Typography variant="h1">404</Typography>
      <Typography variant="h2">Page Not Found</Typography>
      <Typography variant="lead" className="max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button>
        <Link to="/submission">Go to Home</Link>
      </Button>
    </div>
  );
}
