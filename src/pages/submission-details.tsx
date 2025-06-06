import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Typography } from '../components/ui/typography';
import { fetchSubmissions } from '../services/submissions';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';

export default function SubmissionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: submissions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['submissions'],
    queryFn: fetchSubmissions,
  });

  const submission = submissions?.data.find(sub => sub.id === id);

  //================================
  // Render
  //================================
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Typography variant="h1">Submission Details</Typography>
        <Button variant="outline" onClick={() => navigate('/submissions')}>
          Back to List
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-64" />
            </div>
          ))}
        </div>
      ) : error ? (
        <>
          <div className="space-y-4">
            <Typography variant="p" className="text-red-500">
              {error instanceof Error
                ? error.message
                : 'An error occurred while loading the submission'}
            </Typography>
            <Button onClick={() => navigate('/submissions')}>Back to Submissions</Button>
          </div>
          <div className="space-y-4">
            <Typography variant="p">The submission you're looking for doesn't exist.</Typography>
            <Button onClick={() => navigate('/submissions')}>Back to Submissions</Button>
          </div>
        </>
      ) : (
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="space-y-4">
            {Object.entries(submission)
              .filter(([key]) => key !== 'id')
              .map(([key, value]) => ({
                label: key.split(/(?=[A-Z])/).join(' '),
                value: value?.toString() || 'N/A',
              }))
              .map(({ label, value }) => (
                <div key={label} className="flex gap-4 items-center">
                  <Typography variant="p" className="font-medium min-w-[200px]">
                    {label}:
                  </Typography>
                  <Typography variant="p" style={{ margin: 0 }}>
                    {value}
                  </Typography>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
