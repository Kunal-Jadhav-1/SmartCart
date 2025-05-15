import { useEffect, useState } from "react";

const Settings = () => {
  const [emailNotif, setEmailNotif] = useState(false);
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("INR");

  // Load saved settings from localStorage
  useEffect(() => {
    const savedNotif = localStorage.getItem("emailNotif") === "true";
    const savedEmail = localStorage.getItem("email") || "";
    const savedCurrency = localStorage.getItem("currency") || "USD";

    setEmailNotif(savedNotif);
    setEmail(savedEmail);
    setCurrency(savedCurrency);
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem("emailNotif", emailNotif);
    localStorage.setItem("email", email);
    localStorage.setItem("currency", currency);
  }, [emailNotif, email, currency]);

  const handleReset = () => {
    localStorage.clear();
    setEmailNotif(false);
    setEmail("");
    setCurrency("INR");
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6 text-secondary">
      <h1 className="text-3xl font-bold text-center">Settings</h1>

      {/* Email Notifications Toggle */}
      <div className="flex items-center justify-between">
        <label htmlFor="notif-toggle" className="text-lg font-medium">
          Email Notifications
        </label>
        <input
          id="notif-toggle"
          type="checkbox"
          checked={emailNotif}
          onChange={(e) => setEmailNotif(e.target.checked)}
          className="w-5 h-5"
        />
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-lg font-medium mb-1">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-md text-dark"
          placeholder="your@email.com"
        />
      </div>

      {/* Currency Preference */}
      <div>
        <label className="block text-lg font-medium mb-1">Preferred Currency</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border rounded-md text-dark"
        >
          <option value="INR" className="text-primary">INR (₹)</option>
          <option value="USD" className="text-primary">USD ($)</option>
        </select>
      </div>

      {/* Reset Settings */}
      <button
        onClick={handleReset}
        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
      >
        Reset Settings
      </button>
    </div>
  );
};

export default Settings;
