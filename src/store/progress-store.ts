import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ProgressState = {
  completedLessonIds: string[];
  xp: number;
  streak: number;
  completeLesson: (lessonId: string, xpReward: number) => void;
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      completedLessonIds: [],
      xp: 0,
      streak: 0,
      completeLesson: (lessonId, xpReward) =>
        set((state) => {
          if (state.completedLessonIds.includes(lessonId)) return state;
          return {
            completedLessonIds: [...state.completedLessonIds, lessonId],
            xp: state.xp + xpReward,
            streak: Math.max(state.streak, 1),
          };
        }),
    }),
    {
      name: "progress-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
