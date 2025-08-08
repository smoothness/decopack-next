export default function StyleGuide() {
  return (
    <div className="m-auto max-w-[1440px]">
      <h1 className="mb-8 text-3xl">Hello world!</h1>

      {/* Test your custom colors */}
      <div className="space-y-4">
        <h2 className="mb-4 text-2xl">Testing Custom Colors</h2>

        {/* Primary colors test */}
        <div className="space-y-2">
          <h3 className="text-xl">Primary Colors:</h3>
          <div className="bg-primary-500 rounded p-4 text-white">
            Primary 500 Background - Should be purple (#7a43bc)
          </div>
          <div className="text-primary-500 text-lg">
            Primary 500 Text - Should be purple
          </div>
          <div className="border-primary-500 rounded border-2 p-2">
            Primary 500 Border - Should have purple border
          </div>
        </div>

        {/* Gray colors test */}
        <div className="space-y-2">
          <h3 className="text-xl">Gray Colors:</h3>
          <div className="rounded bg-gray-600 p-4 text-white">
            Gray 600 Background - Should be dark gray (#262626)
          </div>
          <div className="text-lg text-gray-600">
            Gray 600 Text - Should be dark gray
          </div>
        </div>

        {/* All primary shades */}
        <div className="space-y-2">
          <h3 className="text-xl">All Primary Shades:</h3>
          <div className="flex space-x-2">
            <div className="bg-primary-100 rounded p-2 text-center">100</div>
            <div className="bg-primary-200 rounded p-2 text-center">200</div>
            <div className="bg-primary-300 rounded p-2 text-center text-white">
              300
            </div>
            <div className="bg-primary-400 rounded p-2 text-center text-white">
              400
            </div>
            <div className="bg-primary-500 rounded p-2 text-center text-white">
              500
            </div>
            <div className="bg-primary-600 rounded p-2 text-center text-white">
              600
            </div>
            <div className="bg-primary-700 rounded p-2 text-center text-white">
              700
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
