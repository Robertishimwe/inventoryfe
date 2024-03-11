
export default function Login() {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full space-y-8 p-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Inventory Ms Login</h2>
            <p className="text-gray-500 dark:text-gray-400">Enter your credentials to access the system.</p>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium" for="username">
                Username
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300 dark:bg-gray-900 dark:text-gray-200"
                id="username"
                placeholder="Enter your username"
                required
                type="text"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium" for="password">
                Password
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300 dark:bg-gray-900 dark:text-gray-200"
                id="password"
                placeholder="Enter your password"
                required
                type="password"
              />
            </div>
            <button
              className="w-full bg-gray-900 text-white rounded-md py-2 transition-colors hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
  
  