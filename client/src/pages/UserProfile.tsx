import { useState } from "react";
import ProfileTab from "../components/UserProfile/ProfileTab";
import ContentsTab from "../components/UserProfile/ContentsTab";
import NotificationsTab from "../components/UserProfile/NotificationsTab";
import ChatTab from "../components/UserProfile/ChatTab";
import { User, FileText, Bell, MessageCircle } from "lucide-react";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState<"profile" | "contents" | "notifications" | "chat">("profile");

  return (
    <div className="max-w-6xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b">
        <TabButton activeTab={activeTab} setActiveTab={setActiveTab} tab="profile" icon={User} label="Profile" />
        <TabButton activeTab={activeTab} setActiveTab={setActiveTab} tab="contents" icon={FileText} label="My Contents" />
        <TabButton activeTab={activeTab} setActiveTab={setActiveTab} tab="notifications" icon={Bell} label="Notifications" />
        <TabButton activeTab={activeTab} setActiveTab={setActiveTab} tab="chat" icon={MessageCircle} label="Chat" />
      </div>

      {/* Tab Panels */}
      {activeTab === "profile" && <ProfileTab />}
      {activeTab === "contents" && <ContentsTab />}
      {activeTab === "notifications" && <NotificationsTab />}
      {activeTab === "chat" && <ChatTab />}
    </div>
  );
}

// Reusable tab button
const TabButton = ({ activeTab, setActiveTab, tab, icon: Icon, label }: any) => (
  <button
    onClick={() => setActiveTab(tab)}
    className={`py-2 px-4 font-semibold ${
      activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-700"
    }`}
  >
    <Icon className="inline-block h-4 w-4 mr-1" /> {label}
  </button>
);
