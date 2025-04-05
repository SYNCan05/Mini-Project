export default function Page404() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-6xl font-bold text-center">404</h1>
          <p className="text-2xl font-semibold text-center mt-4">Page Not Found</p>
          <p className="text-center mt-6">
            The page you are looking for might have been removed had its name changed or is temporarily unavailable.
          </p>
          <div className="flex justify-center mt-8">
            <a href="/" className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
