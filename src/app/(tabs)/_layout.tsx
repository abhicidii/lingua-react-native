import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import Tabs from "expo-router/tabs";

import TabBar from "../../components/tab-bar";
import { useLanguageStore } from "../../store/language-store";

export default function TabsLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const hasHydrated = useLanguageStore((state) => state.hasHydrated);
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);

  if (!isLoaded || !hasHydrated) return null;
  if (!isSignedIn) return <Redirect href="/onboarding" />;
  if (!selectedLanguage) return <Redirect href="/language-selection" />;

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="learn" />
      <Tabs.Screen name="ai-teacher" />
      <Tabs.Screen name="chat" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
