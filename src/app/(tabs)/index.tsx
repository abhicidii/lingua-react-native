import { useUser } from "@clerk/expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants/images";
import { getLanguage } from "../../data/languages";
import { getLessonsByUnit } from "../../data/lessons";
import { getUnit, getUnitsByLanguage } from "../../data/units";
import { useLanguageStore } from "../../store/language-store";
import { useProgressStore } from "../../store/progress-store";
import { colors } from "../../theme";

const DAILY_GOAL_XP = 20;

export default function Home() {
  const router = useRouter();
  const { user } = useUser();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const resetLanguage = useLanguageStore((state) => state.reset);
  const { completedLessonIds, xp, streak, completeLesson } = useProgressStore();

  const language = selectedLanguage ? getLanguage(selectedLanguage) : undefined;
  if (!language) return null;

  // Current lesson = first lesson not completed yet (or the last one when all are done).
  const languageLessons = getUnitsByLanguage(language.code).flatMap((unit) =>
    getLessonsByUnit(unit.id),
  );
  const lesson =
    languageLessons.find((lesson) => !completedLessonIds.includes(lesson.id)) ??
    languageLessons[languageLessons.length - 1];
  const unit = lesson ? getUnit(lesson.unitId) : undefined;
  const lessonDone = lesson ? completedLessonIds.includes(lesson.id) : false;

  const userName =
    user?.firstName ??
    user?.username ??
    user?.primaryEmailAddress?.emailAddress.split("@")[0] ??
    "there";
  const progress = Math.min(xp / DAILY_GOAL_XP, 1);

  // Testing only: wipe saved data, then the tabs layout sends us to language selection.
  const handleClearStorage = async () => {
    await AsyncStorage.clear();
    resetLanguage();
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <View className="px-5">
          {/* Header */}
          <View className="mt-3 flex-row items-center">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/language-selection")}
              className="h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-border"
            >
              <Text className="text-[26px] leading-[34px]">
                {language.flag}
              </Text>
            </TouchableOpacity>
            <Text
              className="text text--h4 ml-3 flex-1 text-[18px] font-semibold"
              numberOfLines={1}
            >
              {language.greeting}, {userName}! 👋
            </Text>
            <Image
              source={images.streakFire}
              className="h-9 w-9"
              resizeMode="contain"
            />
            <Text className="text text--h4 ml-0.5 mr-4 text-[18px] font-medium">
              {streak}
            </Text>
            <SymbolView
              name={{
                ios: "bell",
                android: "notifications",
                web: "notifications",
              }}
              size={26}
              tintColor={colors["text-primary"]}
            />
          </View>

          {/* Daily goal */}
          <View className="mt-5 h-[100px] justify-center overflow-hidden rounded-[24px] bg-[#FFF5EC] px-4">
            <Text className="text text--body-sm text-[13px] text--secondary">
              Daily goal
            </Text>
            <Text className="text text--h2 text-[32px] font-bold leading-[40px]">
              {xp}
              <Text className="text-[16px] font-regular text-text-secondary">
                {" "}
                / {DAILY_GOAL_XP} XP
              </Text>
            </Text>
            <View className="mt-1.5 h-2 w-[74%] overflow-hidden rounded-full bg-[#EDEDF0]">
              <View
                className="h-full rounded-full bg-[#F2A33A]"
                style={{ width: `${progress * 100}%` }}
              />
            </View>
            <Image
              source={images.treasure}
              className="absolute right-3 top-3.5 h-[72px] w-[72px]"
              resizeMode="contain"
            />
          </View>

          {/* Continue learning */}
          <View className="mt-4 h-[158px] justify-center overflow-hidden rounded-[24px] bg-[#6C42F0] px-4">
            <Text className="text text--body-sm text-[13px] text-white/80">
              Continue learning
            </Text>
            <Text className="text text--h1 mt-1 text-[28px] leading-[36px] text-white">
              {language.name}
            </Text>
            <Text className="text text--body-sm text-[12px] text-white/70">
              {unit ? `${unit.level} · Unit ${unit.order}` : ""}
            </Text>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => router.push("/learn")}
              className="mt-4 h-10 w-[104px] items-center justify-center rounded-[14px] bg-white"
            >
              <Text className="text text--body-md font-semibold text-[#6C42F0]">
                Continue
              </Text>
            </TouchableOpacity>
            <Image
              source={images.palace}
              className="absolute -bottom-2 -right-3 h-[160px] w-[160px]"
              resizeMode="contain"
            />
          </View>

          {/* Today's plan */}
          <View className="mb-3 mt-6 flex-row items-center justify-between">
            <Text className="text text--h4 text-[17px] font-semibold">
              Today&apos;s plan
            </Text>
            <TouchableOpacity onPress={() => router.push("/learn")}>
              <Text className="text text--body-md font-medium text-blue">
                View all
              </Text>
            </TouchableOpacity>
          </View>

          {lesson && (
            <View className="plan-card">
              <View className="plan-item plan-item--divided">
                <View className="plan-item__icon">
                  <SymbolView
                    name={{
                      ios: "book.fill",
                      android: "menu_book",
                      web: "menu_book",
                    }}
                    size={20}
                    tintColor={colors.purple}
                  />
                </View>
                <View className="plan-item__body">
                  <Text className="text text--body-md font-semibold">
                    Lesson
                  </Text>
                  <Text className="text text--caption text-[12px] text--secondary">
                    {lesson.title}
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  hitSlop={10}
                  disabled={lessonDone}
                  onPress={() => completeLesson(lesson.id, lesson.xpReward)}
                  className={`plan-item__check ${lessonDone ? "plan-item__check--done" : ""}`}
                >
                  {lessonDone && (
                    <SymbolView
                      name={{
                        ios: "checkmark",
                        android: "check",
                        web: "check",
                      }}
                      size={12}
                      weight="bold"
                      tintColor="#FFFFFF"
                    />
                  )}
                </TouchableOpacity>
              </View>

              <View className="plan-item plan-item--divided">
                <View className="plan-item__icon">
                  <SymbolView
                    name={{
                      ios: "headphones",
                      android: "headphones",
                      web: "headphones",
                    }}
                    size={20}
                    tintColor={colors.purple}
                  />
                </View>
                <View className="plan-item__body">
                  <Text className="text text--body-md font-semibold">
                    AI Conversation
                  </Text>
                  <Text className="text text--caption text-[12px] text--secondary">
                    Talk with {lesson.aiTeacher.teacherName}
                  </Text>
                </View>
                <View className="plan-item__check" />
              </View>

              <View className="plan-item">
                <View className="plan-item__icon plan-item__icon--coral">
                  <SymbolView
                    name={{
                      ios: "ellipsis.bubble.fill",
                      android: "chat",
                      web: "chat",
                    }}
                    size={20}
                    tintColor={colors.error}
                  />
                </View>
                <View className="plan-item__body">
                  <Text className="text text--body-md font-semibold">
                    New words
                  </Text>
                  <Text className="text text--caption text-[12px] text--secondary">
                    {lesson.vocabulary.length} words
                  </Text>
                </View>
                <View className="plan-item__check" />
              </View>
            </View>
          )}

          <TouchableOpacity
            onPress={handleClearStorage}
            className="mt-6 items-center"
          >
            <Text className="text text--caption text--secondary">
              Clear storage (testing)
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
