package com.ssafy.back_end.sns.service;

import com.ssafy.back_end.sns.model.FeedDto;
import com.ssafy.back_end.sns.model.FeedInteractionDto;
import com.ssafy.back_end.sns.model.UserPageDto;

import java.util.List;

public interface SnsFeedService {
    List<FeedDto> getFeeds(int userId);   //특정 유저 피드 모두 보기

    int writeFeed(FeedDto feedDto);   //피드 작성

    int updateFeed(FeedDto feedDto);   //피드 수정

    int deleteFeed(int feedId);   //피드 삭제

    List<UserPageDto> getListLikes(int feedId);   //피드 좋아요 목록 조회

    int isLike(int feedId, int userId);   //내가 좋아요 눌렀는지 확인

    int likeFeed(int feedId, int userId);   //피드 좋아요

    int dislikeFeed(int feedId, int userId);   //피드 좋아요 취소

    List<FeedInteractionDto> getListComments(int feedId);   //피드 댓글 모두 보기

    int writeComment(FeedInteractionDto feedInteractionDto);   //댓글 작성

    int updateComment(FeedInteractionDto feedInteractionDto);   //댓글 수정

    int deleteComment(int feedId);   //댓글 삭제
}
