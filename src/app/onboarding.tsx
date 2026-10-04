import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants/images";
import { colors } from "../theme";

export default function Onboarding() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="flex-1 justify-between pb-6">
        <View>
          {/* Logo */}
          <View className="mt-2 flex-row items-center justify-center">
            <Image source={images.mascotLogo} className="h-14 w-14" resizeMode="contain" />
            <Text className="text text--h2 ml-1 text-[28px] font-bold">muolingo</Text>
          </View>

          {/* Headline */}
          <View className="mt-8 px-10">
            <Text className="text text--h1 text-[34px] leading-[46px]">
              Your AI language
            </Text>
            <Text className="text text--h1 text-[34px] leading-[46px] text-deep-purple">
              teacher<Text className="text-text-primary">.</Text>
            </Text>
            <Text className="text text--body-md text--secondary mt-4 text-[15px] leading-7">
              Real conversations, personalized lessons, anytime, anywhere.
            </Text>
          </View>

          {/* Illustration */}
          <View className="mt-8 aspect-square w-full">
            <Image source={images.mascotWelcome} className="h-full w-full" resizeMode="contain" />

            <View className="absolute left-[10%] top-[6%] rounded-[20px] bg-[#EAF3FF] px-5 py-4">
              <Text className="text text--body-md font-medium text-[15px]">Hello!</Text>
            </View>
            <View className="absolute right-[13%] top-[0%] rounded-[20px] bg-[#F3F2FF] px-5 py-4">
              <Text className="text text--body-md font-medium text-[15px] text-deep-purple">
                ¡Hola!
              </Text>
            </View>
            <View className="absolute right-[7%] top-[24%] rounded-[20px] bg-[#FFEFEA] px-5 py-4">
              <Text className="text text--body-md font-medium text-[15px] text-error">
                你好!
              </Text>
            </View>
          </View>
        </View>

        {/* CTA */}
        <View className="px-7">
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push("/sign-up")}
            className="button button--primary h-[72px] flex-row justify-between rounded-[24px] bg-deep-purple px-8"
          >
            <View className="w-4" />
            <Text className="button__label text-[18px]">Get Started</Text>
            <View className="h-3 w-3 -rotate-45 border-b-2 border-r-2 border-white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
