import { useState } from "react";
import { updateProfile } from "../api/users";
import { useAuth } from "../context/AuthContext.jsx";

const PhoneModal = () => {
  const { user, updateUser } = useAuth();
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  if (!user || user.phoneNumber) {
    return null;
  }

  const handleSave = async () => {
    setSaving(true);
    const updated = await updateProfile(phone);
    updateUser(updated);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h3 className="text-lg font-semibold">Add phone number</h3>
        <p className="text-sm text-slate-500 mb-4">
          We need a phone number to complete your profile.
        </p>
        <input
          className="w-full border rounded px-3 py-2"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Phone number"
        />
        <button
          className="mt-4 w-full bg-brand-500 text-white rounded py-2"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default PhoneModal;
