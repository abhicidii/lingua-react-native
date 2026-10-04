import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, Text, TextInput, View } from "react-native";

const CODE_LENGTH = 6;

type Props = {
  visible: boolean;
  email: string;
  onClose: () => void;
};

export default function VerificationModal({ visible, email, onClose }: Props) {
  const router = useRouter();
  const [code, setCode] = useState("");

  const handleChange = (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, CODE_LENGTH);
    setCode(digits);

    // Last digit entered -> go home
    if (digits.length === CODE_LENGTH) {
      setCode("");
      onClose();
      router.replace("/");
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, justifyContent: "center", padding: 24, backgroundColor: "rgba(13, 19, 43, 0.5)" }}
      >
        <View className="rounded-[28px] bg-background p-6">
          <Text className="text text--h3 text-center">Check your email</Text>
          <Text className="text text--body-md text--secondary mt-2 text-center">
            {`We sent a verification code to ${email || "your email"}. Enter the 6-digit code below.`}
          </Text>

          <View className="mt-6">
            <View className="flex-row justify-between">
              {Array.from({ length: CODE_LENGTH }).map((_, index) => (
                <View
                  key={index}
                  className={`h-14 w-12 items-center justify-center rounded-2xl border bg-surface ${
                    index === code.length ? "border-deep-purple" : "border-border"
                  }`}
                >
                  <Text className="text text--h3">{code[index] ?? ""}</Text>
                </View>
              ))}
            </View>
            {/* Invisible input on top of the boxes: tapping them focuses it */}
            <TextInput
              value={code}
              onChangeText={handleChange}
              keyboardType="number-pad"
              maxLength={CODE_LENGTH}
              autoFocus
              caretHidden
              className="absolute h-full w-full opacity-0"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
