package com.ssafy.back_end.exercise.mapper;

import com.ssafy.back_end.exercise.model.ExerciseDto;
import com.ssafy.back_end.exercise.model.ExerciseRecordDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface WorkoutExerciseMapper {
    List<ExerciseDto> getAllExercises();

    boolean isExerciseLiked(@Param("exerciseId") int exerciseId, @Param("userId") int userId);

    ExerciseDto getExerciseById(@Param("exerciseId") int exerciseId);

    int favoriteExercise(@Param("exerciseId") int exerciseId, @Param("userId") int userId);

    int unfavoriteExercise(@Param("exerciseId") int exerciseId, @Param("userId") int userId);

    boolean isFavoriteExercise(@Param("exerciseId") int exerciseId, @Param("userId") int userId);

    List<ExerciseDto> getFavoriteExercisesByUserId(@Param("userId") int userId);

    int saveExerciseImage(@Param("exerciseId") int exerciseId, @Param("imageUrl") String imageUrl);

    List<ExerciseRecordDto> getRecentExerciseRecords(@Param("exerciseId") int exerciseId, @Param("userId") int userId);
}
