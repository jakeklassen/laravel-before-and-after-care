export default function Welcome() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Hello World!
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Welcome to this simple example of a dark mode-enabled page using
          Tailwind CSS. Click the button above to toggle between light and dark
          modes!
        </p>
      </div>
    </div>
  );
}
