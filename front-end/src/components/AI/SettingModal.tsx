import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const s = {
  ModalOverlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7); // 투명도 설정
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `,
  ModalContent: styled.div`
    background: ${(props) => props.theme.subColor};
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    color: ${(props) => props.theme.textColor};
    width: 80%;
    max-width: 400px;
    overflow: hidden;
  `,
  ModalTitle: styled.h2`
    margin-bottom: 20px;
  `,
  ExerciseList: styled.div`
    margin-bottom: 20px;
    height: 120px; /* Ensure this height matches the combined height of 3 exercises */
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    position: relative;
  `,
  Exercise: styled.div<{ selected: boolean; disabled: boolean }>`
    margin: 10px 0;
    font-size: ${(props) => (props.selected ? '24px' : '16px')};
    font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
    color: ${(props) => (props.selected ? props.theme.mainColor : props.theme.textColor2)};
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
    transition:
      font-size 0.3s,
      font-weight 0.3s,
      color 0.3s;
  `,
  Counter: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
  `,
  CounterBtn: styled.button<{ disabled: boolean }>`
    background-color: ${(props) => (props.disabled ? props.theme.textColor2 : props.theme.btnTextColor)};
    color: ${(props) => props.theme.textColor};
    border: none;
    padding: 10px;
    font-size: 18px;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  `,
  CounterValue: styled.div`
    margin: 0 20px;
    font-size: 24px;
  `,
  ConfirmBtn: styled.button`
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.btnTextColor};
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  `,
};

interface TrainingSettingsModalProps {
  onClose: () => void;
}

const SettingModal: React.FC<TrainingSettingsModalProps> = ({ onClose }) => {
  const [counter, setCounter] = useState(1); // 운동 기본횟수 1회
  // 운동 목록
  const exercises = ['------------', '데드리프트', '스쿼트', '벤치프레스', ' ------------ '];
  // 기본 설정 스쿼트
  const [selectedExercise, setSelectedExercise] = useState('스쿼트');
  const listRef = useRef<HTMLDivElement>(null);

  // 선택된 운동을 중앙으로 이동시키는 함수
  const scrollToCenter = (index: number) => {
    const listElement = listRef.current;
    if (listElement) {
      const itemHeight = listElement.clientHeight / 3;
      const offset = itemHeight * index;
      listElement.scrollTo({
        top: offset - itemHeight,
        behavior: 'smooth',
      });
    }
  };

  // 선택된 운동을 중앙으로
  useEffect(() => {
    // 선택된 운동의 인덱스를 찾는 인덱스
    const idx = exercises.indexOf(selectedExercise);
    // 해당 운동을 중앙으로
    scrollToCenter(idx);
  }, [selectedExercise]);

  // 스크롤링 효과
  useEffect(() => {
    // 스크롤 관련 함수
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      // 방향 설정
      const direction = e.deltaY > 0 ? 1 : -1;
      // 현재 위치에서 방향 값에 따라 이동 위치로
      const currentIdx = exercises.indexOf(selectedExercise);
      const newIdx = currentIdx + direction;

      // 상하 양 끝으로의 이동을 제어하는 함수
      if (newIdx >= 1 && newIdx <= exercises.length - 2) {
        setSelectedExercise(exercises[newIdx]);
        scrollToCenter(newIdx);
      }
    };

    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener('wheel', handleScroll, { passive: false });
    }

    return () => {
      if (listElement) {
        listElement.removeEventListener('wheel', handleScroll);
      }
    };
  }, [selectedExercise]);

  const handleConfirm = () => {
    alert(`${selectedExercise} ${counter}회 시작합니다.`);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <s.ModalOverlay onClick={handleOverlayClick}>
      <s.ModalContent onClick={(e) => e.stopPropagation()}>
        <s.ModalTitle children="트레이닝 설정" />
        <s.ExerciseList ref={listRef}>
          {exercises.map((exercise, index) => (
            <s.Exercise
              key={exercise}
              selected={exercise === selectedExercise}
              disabled={index === 0 || index === exercises.length - 1}
              onClick={() => {
                if (index !== 0 && index !== exercises.length - 1) {
                  setSelectedExercise(exercise);
                  scrollToCenter(index);
                }
              }}
            >
              {exercise}
            </s.Exercise>
          ))}
        </s.ExerciseList>
        <s.Counter>
          <s.CounterBtn onClick={() => counter > 1 && setCounter(counter - 1)} disabled={counter === 1}>
            -
          </s.CounterBtn>
          <s.CounterValue children={counter} />
          <s.CounterBtn onClick={() => counter < 15 && setCounter(counter + 1)} disabled={counter === 15}>
            +
          </s.CounterBtn>
        </s.Counter>
        <s.ConfirmBtn onClick={handleConfirm} children="시작하기" />
      </s.ModalContent>
    </s.ModalOverlay>
  );
};

export default SettingModal;
