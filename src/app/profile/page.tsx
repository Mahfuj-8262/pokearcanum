"use client";

const user = {
  username: "AshKetchum",
  email: "ash@poke.com",
  avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  joined: "2024-01-10",
  stats: {
    cards: 38,
    trades: 12,
    averageRating: 4.8,
  },
  ratings: [
    {
      from: "Misty",
      stars: 5,
      comment: "Great trading partner! Super fast and friendly 😊",
      date: "2024-05-29",
    },
    {
      from: "Brock",
      stars: 4,
      comment: "Smooth trade. Would trade again!",
      date: "2024-06-05",
    },
  ]
};

function StarBar({ stars }: { stars: number }) {
  return (
    <span className="text-amber-400">
      {"★".repeat(Math.round(stars)) + "☆".repeat(5 - Math.round(stars))}
    </span>
  )
}

export default function ProfilePage() {
  return (
    <main className="min-h-screen py-12 px-3 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl border border-indigo-100 p-8">
        <div className="flex items-center gap-6">
          <img src={user.avatar} alt={user.username} className="w-20 h-20 rounded-full border" />
          <div>
            <h1 className="text-2xl font-bold text-indigo-800">{user.username}</h1>
            <p className="text-gray-600">{user.email}</p>
            <div className="text-xs text-gray-500 mt-1">
              Joined: {new Date(user.joined).toLocaleDateString()}
            </div>
          </div>
        </div>
        <div className="flex gap-12 mt-8 justify-center text-center">
          <div>
            <span className="text-indigo-700 font-bold text-2xl">{user.stats.cards}</span>
            <div className="text-gray-500">Cards</div>
          </div>
          <div>
            <span className="text-indigo-700 font-bold text-2xl">{user.stats.trades}</span>
            <div className="text-gray-500">Trades</div>
          </div>
          <div>
            <span className="text-indigo-700 font-bold text-2xl flex items-center justify-center gap-2">
              {user.stats.averageRating.toFixed(1)}
              <StarBar stars={user.stats.averageRating} />
            </span>
            <div className="text-gray-500">Avg. Rating</div>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-lg font-bold mb-2 text-indigo-900">Feedback</h2>
          {user.ratings.length === 0 ? (
            <div className="text-gray-500 italic">No feedback yet.</div>
          ) : (
            <ul className="flex flex-col gap-4">
              {user.ratings.map((r, i) =>
                <li key={i} className="bg-indigo-50 rounded p-4 border border-indigo-100">
                  <div className="flex items-center mb-1 gap-2">
                    <b className="text-indigo-800">{r.from}</b>
                    <StarBar stars={r.stars} />
                    <span className="text-xs ml-auto text-gray-500">{new Date(r.date).toLocaleDateString()}</span>
                  </div>
                  <div className="text-gray-700 text-sm">{r.comment}</div>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}