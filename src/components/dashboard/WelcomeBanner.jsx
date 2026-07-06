export default function WelcomeBanner() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-8">

      <h1 className="text-4xl font-bold">
        Welcome back, {user?.name} 👋
      </h1>

      <p className="text-white/80 mt-2 text-lg">
        InfraGPT — AI-Powered IT Operations Platform
      </p>

    </div>
  );
}