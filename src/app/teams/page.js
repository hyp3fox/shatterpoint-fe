import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Teams() {
  return (
    <div>
      <Header />
       {/* Inventory Display */}
      {inventory.length > 0 && (
        <div className="mt-6 p-4 bg-gray-100 border rounded-md">
          <h3 className="text-lg font-semibold mb-2">My Squad</h3>
          <ul className="list-disc pl-5">
            {inventory.map((item) => (
              <li key={item.id} className="flex justify-between items-center mb-1">
                <span>{item.name}</span>
                <button
                  onClick={() => removeFromInventory(item.id)}
                  className="ml-2 text-xs text-red-600 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Footer />
    </div>
  );
}