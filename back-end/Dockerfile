# Run stage: 실제 실행 단계
FROM openjdk:17-jdk-slim

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 디렉토리 생성
RUN mkdir -p /home/ubuntu/images/item
RUN mkdir -p /home/ubuntu/images/feed
RUN mkdir -p /home/ubuntu/images/exercise
RUN mkdir -p /home/ubuntu/images/profile

# 빌드 단계에서 생성된 JAR 파일을 복사합니다.
COPY /build/libs/*.jar back-end.jar

# Firebase serviceAccountKey.json 파일을 복사합니다.
COPY src/main/resources/serviceAccountKey.json /app/serviceAccountKey.json

# 컨테이너 시작 시 실행할 명령어 설정
ENTRYPOINT ["java", "-jar", "back-end.jar"]
