export default function HowItWorks() {
  const steps = [
    { title: "Sign Up", desc: "Create your free account in seconds." },
    { title: "Add Your Cards", desc: "Show off your collection or list them for trade/sale." },
    { title: "Trade or Bid", desc: "Send trade offers or place bids on cards you want." },
    { title: "Connect & Rate", desc: "Chat, finalize deals, and build your trader reputation." }
  ];
  return (
    <section className="my-14 px-3 pb-10" >
      <h2 className="text-2xl text-center font-bold text-orange-400 mb-7">How It Works</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <div key={i} className="bg-slate-700 py-6 px-4 rounded-lg shadow flex flex-col items-center">
            <span className="text-3xl mb-2 text-yellow-200">{i + 1}</span>
            <div className="font-bold mb-1 text-blue-400">{s.title}</div>
            <div className="text-sm text-gray-100 mx-auto text-center">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}