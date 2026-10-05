import { SymbolView } from "expo-symbols";
import type { BottomTabBarProps } from "expo-router/tabs";
import { useEffect, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "../theme";

const BAR_HEIGHT = 80;
const CIRCLE_SIZE = 56;

// iOS uses SF Symbols, Android/web use Material Symbols.
const tabs = {
  index: { label: "Home", ios: "house", android: "home" },
  learn: { label: "Learn", ios: "book", android: "menu_book" },
  "ai-teacher": { label: "AI Teacher", ios: "face.smiling", android: "face" },
  chat: { label: "Chat", ios: "bubble.left", android: "chat_bubble" },
  profile: { label: "Profile", ios: "person", android: "person" },
} as const;

type TabName = keyof typeof tabs;

export default function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [barWidth, setBarWidth] = useState(0);
  const slotWidth = barWidth / state.routes.length;
  const [circleX] = useState(() => new Animated.Value(0));

  // Slide the circle to the active tab.
  useEffect(() => {
    if (!slotWidth) return;
    Animated.spring(circleX, {
      toValue: state.index * slotWidth + (slotWidth - CIRCLE_SIZE) / 2,
      useNativeDriver: true,
      speed: 14,
      bounciness: 6,
    }).start();
  }, [state.index, slotWidth, circleX]);

  return (
    <View
      style={{
        backgroundColor: colors.background,
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: Math.max(insets.bottom, 12),
      }}
    >
      <View
        onLayout={(event) => setBarWidth(event.nativeEvent.layout.width)}
        style={{
          height: BAR_HEIGHT,
          flexDirection: "row",
          borderRadius: 28,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.background,
          shadowColor: "#0D132B",
          shadowOpacity: 0.08,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 4 },
          elevation: 8,
        }}
      >
        {slotWidth > 0 && (
          <Animated.View
            pointerEvents="none"
            style={{
              position: "absolute",
              top: (BAR_HEIGHT - 2 - CIRCLE_SIZE) / 2,
              width: CIRCLE_SIZE,
              height: CIRCLE_SIZE,
              borderRadius: CIRCLE_SIZE / 2,
              backgroundColor: colors["deep-purple"],
              transform: [{ translateX: circleX }],
            }}
          />
        )}

        {state.routes.map((route, index) => {
          const tab = tabs[route.name as TabName];
          const focused = state.index === index;

          const handlePress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={0.8}
              onPress={handlePress}
              accessibilityRole="button"
              accessibilityLabel={tab.label}
              accessibilityState={{ selected: focused }}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SymbolView
                name={{ ios: tab.ios, android: tab.android, web: tab.android }}
                size={26}
                tintColor={
                  focused ? colors.background : colors["text-secondary"]
                }
              />
              {!focused && (
                <Text className="text text--caption text--secondary mt-1">
                  {tab.label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
