export default function Page404() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-6xl font-bold text-center text-red-500">404</h1>
          <p className="text-2xl font-semibold text-center mt-4 text-red-500">Halaman Tidak Dapat Ditemukan</p>
          <p className="text-center mt-6">
            Halaman yang anda cari tidak dapat ditemukan, silahkan tekan tombol di bawah ini untuk kembali ke halaman utama 
          </p>
          <div className="flex justify-center mt-8">
            <a href="/" className="bg-red-500 text-white font-semibold px-3 py-2 rounded-md hover:bg-red-700">
              Halaman utama
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
