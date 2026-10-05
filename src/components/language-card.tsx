import { Text, TouchableOpacity, View } from "react-native";

import type { Language } from "../types/learning";

type Props = {
  language: Language;
  selected: boolean;
  onPress: () => void;
};

export default function LanguageCard({ language, selected, onPress }: Props) {
  const disabled = !language.hasContent;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled}
      onPress={onPress}
      className={`language-card ${selected ? "language-card--selected" : ""} ${
        disabled ? "language-card--disabled" : ""
      }`}
    >
      <View className="language-card__flag">
        <Text className="text-[30px] leading-[38px]">{language.flag}</Text>
      </View>

      <View className="language-card__body">
        <Text className="text text--h4 text-[18px]">{language.name}</Text>
        <Text className="text text--body-sm text--secondary">
          {disabled ? "Coming soon" : `${language.learners} learners`}
        </Text>
      </View>

      {selected ? (
        <View className="language-card__check">
          <View className="-mt-0.5 h-3 w-1.5 rotate-45 border-b-2 border-r-2 border-white" />
        </View>
      ) : (
        <View className="mr-1 h-2.5 w-2.5 -rotate-45 border-b-2 border-r-2 border-text-secondary" />
      )}
    </TouchableOpacity>
  );
}
