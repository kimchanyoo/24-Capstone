package com.teami.capstone.Repository;

import com.teami.capstone.Entity.BoardEntity;
import com.teami.capstone.Repository.ResultSet.GetApplicantResultSet;
import com.teami.capstone.Repository.ResultSet.GetBoardListResultSet;
import com.teami.capstone.Repository.ResultSet.GetBoardResultSet;
import com.teami.capstone.Repository.ResultSet.GetUploadListResultSet;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {

	boolean existsByPostId(Integer postId);

	BoardEntity findByPostId(Integer postId);

	@Query(
			value=
					"SELECT " +
							"b.post_id as postId, " +
							"b.user_id as userId, " +
					"u.nickname as nickname, " +
					"b.title as title, " +
					"b.recruitmentclassification as recruitmentClassification, " +
					"b.body as body, " +
					"b.deadline as deadLine, " +
					"b.processing as processing, " +
					"b.processingduration as processingDuration, " +
					"b.recruitmentperson as recruitmentPerson " +
					"FROM board b, users u " +
					"WHERE post_id = ?1 AND u.user_id = b.user_id ; ",
					nativeQuery = true
	)
	GetBoardResultSet getBoard(Integer postId);

	@Query(
			value=
					"SELECT u.nickname, " +
							"b.post_id as postId, " +
							"b.recruitmentclassification, " +
							"b.recruitmentperson, " +
							"b.deadline, " +
							"b.title, " +
							"b.termination " +
							"FROM board b JOIN users as u ON b.user_id = u.user_id " +
							"ORDER BY termination , b.post_id DESC ",
			nativeQuery = true
	)
	List<GetBoardListResultSet> getBoardList();

	@Query(
			value=
					"SELECT u.nickname, " +
							"b.post_id as postId, " +
							"b.recruitmentclassification, " +
							"b.recruitmentperson, " +
							"b.deadline, " +
							"b.title, " +
							"b.termination " +
							"FROM board b JOIN users as u ON b.user_id = u.user_id AND b.recruitmentclassification = 0 " +
							"ORDER BY termination , b.post_id DESC ",
			nativeQuery = true
	)
	List<GetBoardListResultSet> getBoardListByProject();

	@Query(
			value=
					"SELECT u.nickname, " +
							"b.post_id as postId, " +
							"b.recruitmentclassification, " +
							"b.recruitmentperson, " +
							"b.deadline, " +
							"b.title, " +
							"b.termination " +
							"FROM board b JOIN users as u ON b.user_id = u.user_id AND b.recruitmentclassification = 1 " +
							"ORDER BY termination , b.post_id DESC ",
			nativeQuery = true
	)
	List<GetBoardListResultSet> getBoardListByStudy();

	@Query(
			value=
					"SELECT u.nickname, " +
							"b.post_id as postId, " +
							"b.recruitmentclassification, " +
							"b.recruitmentperson, " +
							"b.deadline, " +
							"b.title, " +
							"b.termination " +
							"FROM board b JOIN users as u ON b.user_id = u.user_id " +
							"where u.schoolname = (SELECT schoolname FROM users WHERE user_id = ?1 ) " +
							"ORDER BY termination , b.post_id DESC ",
			nativeQuery = true
	)
	List<GetBoardListResultSet> getBoardListBySchool(String userId);

	@Query(
			value=
					"SELECT u.nickname, " +
							"b.post_id as postId, " +
							"b.recruitmentclassification, " +
							"b.recruitmentperson, " +
							"b.deadline, " +
							"b.title, " +
							"b.termination " +
							"FROM board b JOIN users as u ON b.user_id = u.user_id " +
							"where u.schoolname = (SELECT schoolname FROM users WHERE user_id = ?1 ) AND b.recruitmentclassification = 0 " +
							"ORDER BY termination , b.post_id DESC ",
			nativeQuery = true
	)
	List<GetBoardListResultSet> getBoardListBySchoolProject(String userId);

	@Query(
			value=
					"SELECT u.nickname, " +
							"b.post_id as postId, " +
							"b.recruitmentclassification, " +
							"b.recruitmentperson, " +
							"b.deadline, " +
							"b.title, " +
							"b.termination " +
							"FROM board b JOIN users as u ON b.user_id = u.user_id " +
							"where u.schoolname = (SELECT schoolname FROM users WHERE user_id = ?1 ) AND b.recruitmentclassification = 1 " +
							"ORDER BY termination , b.post_id DESC ",
			nativeQuery = true
	)
	List<GetBoardListResultSet> getBoardListBySchoolStudy(String userId);

	@Query(
			value=
					"SELECT b.title, b.post_id as postId " +
							"FROM board b  " +
							"where b.user_id = ?1 AND b.termination = FALSE " +
							"ORDER BY b.deadline , b.post_id DESC ",
			nativeQuery = true
	)
	List<GetUploadListResultSet> getUploadList(String userId);

	@Query(
			value=
					"SELECT b.user_id as userId " +
							"FROM board b  " +
							"where b.post_id = ?1 " ,
			nativeQuery = true
	)
	String getWriterUserId(Integer postId);

	@Query(
			value=
					"SELECT * " +
							"FROM board b  " +
							"where b.termination = false " ,
			nativeQuery = true
	)
	List<BoardEntity> getBoards();

	@Transactional
	@Modifying
	@Query(
			value=
					"DELETE FROM board " +
							"WHERE post_id = ?1 ; ",
			nativeQuery = true
	)
	int delete(Integer postId);

}
