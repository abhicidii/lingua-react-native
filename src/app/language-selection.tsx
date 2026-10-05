import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LanguageCard from "../components/language-card";
import { images } from "../constants/images";
import { languages } from "../data/languages";
import { useLanguageStore } from "../store/language-store";
import { colors } from "../theme";
import type { LanguageCode } from "../types/learning";

export default function LanguageSelection() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const savedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const setSelectedLanguage = useLanguageStore(
    (state) => state.setSelectedLanguage,
  );
  const [selected, setSelected] = useState<LanguageCode>(savedLanguage ?? "es");
  const [query, setQuery] = useState("");

  const visibleLanguages = languages.filter((language) =>
    language.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const handleConfirm = () => {
    setSelectedLanguage(selected);
    router.replace("/");
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header */}
        <View className="h-14 flex-row items-center px-5">
          <TouchableOpacity
            onPress={() =>
              router.canGoBack() ? router.back() : router.replace("/")
            }
            hitSlop={12}
            className="h-10 w-10 justify-center"
          >
            <View className="ml-1.5 h-3 w-3 rotate-45 border-b-2 border-l-2 border-text-primary" />
          </TouchableOpacity>
          <Text className="text text--h3 absolute inset-x-0 text-center text-[20px] font-medium">
            Choose a language
          </Text>
        </View>

        <View className="px-5 pb-4">
          {/* Search */}
          <View className="search-field mt-3">
            <View className="h-5 w-5">
              <View className="h-4 w-4 rounded-full border-2 border-text-secondary" />
              <View className="absolute bottom-0 right-0.5 h-2 w-0.5 -rotate-45 bg-text-secondary" />
            </View>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search languages"
              placeholderTextColor={colors["text-secondary"]}
              autoCorrect={false}
              style={{
                flex: 1,
                marginLeft: 12,
                fontSize: 16,
                fontFamily: "Poppins-Regular",
                color: colors["text-primary"],
              }}
            />
          </View>

          {/* Languages */}
          <Text className="text text--h4 mb-3 mt-6 text-[18px]">Popular</Text>
          {visibleLanguages.map((language) => (
            <LanguageCard
              key={language.code}
              language={language}
              selected={language.code === selected}
              onPress={() => setSelected(language.code)}
            />
          ))}
          {visibleLanguages.length === 0 && (
            <Text className="text text--body-md text--secondary py-6 text-center">
              No languages found
            </Text>
          )}

          {/* Confirm */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleConfirm}
            className="button button--primary mt-2 h-[60px] rounded-[20px] bg-deep-purple"
          >
            <Text className="button__label text-[18px]">Confirm</Text>
          </TouchableOpacity>
        </View>

        {/* Earth illustration: the PNG is square with empty padding, so crop it to the globe (17%-83% of its height) */}
        <View
          className="mt-auto overflow-hidden"
          style={{ width, height: width * 0.66 }}
        >
          <Image
            source={images.earth}
            style={{ width, height: width, marginTop: -width * 0.17 }}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
