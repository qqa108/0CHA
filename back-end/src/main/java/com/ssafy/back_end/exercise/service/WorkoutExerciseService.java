package com.ssafy.back_end.exercise.service;

import com.ssafy.back_end.exercise.model.ExerciseDto;
import java.util.List;

public interface WorkoutExerciseService {
    List<ExerciseDto> getAllExercises();
    ExerciseDto getExerciseById(int exerciseId);
    int favoriteExercise(int exerciseId, int userId);
    int unfavoriteExercise(int exerciseId, int userId);
    boolean isFavoriteExercise(int exerciseId, int userId);
    List<ExerciseDto> getFavoriteExercisesByUserId(int userId);
    int saveExerciseImage(int exerciseId, String imageUrl); // 이미지 URL 저장 메서드 추가
}
