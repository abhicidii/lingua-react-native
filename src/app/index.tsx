import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="screen items-center justify-center">
      <Text className="text text--h1">muolingo</Text>
      <Text className="text text--body-md text--secondary">
        Design system ready
      </Text>
      <Link href="/onboarding" className="text text--h4 mt-6 text-deep-purple">
        Open onboarding
      </Link>
    </View>
  );
}
