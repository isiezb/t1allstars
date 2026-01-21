import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply - Tyler1 All Stars',
  description: 'Apply to join the Tyler1 All Stars tournament',
};

// This will be fetched from the backend later
async function getApplicationUrl() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/application-url`, {
      cache: 'no-store',
      next: { revalidate: 0 },
    });
    if (!res.ok) throw new Error('Failed to fetch application URL');
    const data = await res.json();
    return data.url || '#';
  } catch (error) {
    console.error('Error fetching application URL:', error);
    return '#';
  }
}

export default async function ApplyPage() {
  const applicationUrl = await getApplicationUrl();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          Apply to <span className="text-tyler1-red">Tyler1 All Stars</span>
        </h1>
        <p className="text-xl text-gray-400">
          Think you have what it takes to compete?
        </p>
      </div>

      <div className="bg-tyler1-grey rounded-lg border-2 border-tyler1-dark p-12 text-center">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Join the Competition?
          </h2>
          <p className="text-gray-300 mb-6">
            Fill out our application form to be considered for upcoming tournaments.
            We're looking for skilled players from NA, EU, and KR regions.
          </p>
        </div>

        <a
          href={applicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-tyler1-red hover:bg-red-700 text-white font-bold text-xl py-4 px-12 rounded-lg transition-colors transform hover:scale-105"
        >
          Apply Here
        </a>
      </div>
    </div>
  );
}
