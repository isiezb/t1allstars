import { rulesAPI } from "@/lib/api";

export const revalidate = 30;

export default async function RulesPage() {
  let rulesContent = '';

  try {
    const data = await rulesAPI.get();
    rulesContent = data.content || '';
  } catch (error) {
    console.error('Failed to fetch rules:', error);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          Tournament <span className="text-tyler1-red">Rules</span>
        </h1>
        <p className="text-xl text-gray-400">
          Official rules and format for Tyler1 All Stars Season 1
        </p>
      </div>

      {rulesContent ? (
        <div className="bg-tyler1-grey rounded-lg p-8 border border-tyler1-dark">
          <div className="prose prose-invert max-w-none">
            <div className="text-gray-300 whitespace-pre-wrap">
              {rulesContent}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-tyler1-grey rounded-lg">
          <p className="text-gray-400 text-lg">Rules content will be available soon. Check back later!</p>
        </div>
      )}
    </div>
  );
}
